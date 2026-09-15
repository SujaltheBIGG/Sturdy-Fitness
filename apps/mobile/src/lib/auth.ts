/**
 * OAuth Google en RN — flujo de código / deep-link (sin SSE realtime).
 *
 * Por qué NO el flujo realtime del SDK: ese espera el código OAuth por un socket
 * SSE de larga vida. Al abrir el navegador (Custom Tabs) la app pasa a background
 * y la gestión de batería agresiva de algunos OEM (Honor/MagicOS) congela ese
 * socket sin emitir error → el código nunca llega → login "Conectando..." para
 * siempre. Aquí el código vuelve por un deep-link de un solo uso, inmune al freeze.
 *
 * Flujo:
 *   1. core.loginWithOAuth2Code pide el authURL a PB (listAuthMethods) y le concatena
 *      OAUTH_BRIDGE_URL como redirect_uri.
 *   2. Abrimos ese authURL; Google redirige a OAUTH_BRIDGE_URL (página https en
 *      pb_public) que reenvía el code+state al esquema de la app (APP_RETURN_URL).
 *   3. openAuthSessionAsync resuelve con esa URL; parseamos code+state.
 *   4. core intercambia el código (authWithOAuth2Code) → token en pb.authStore.
 *
 * Setup externo necesario (ver runbook): registrar OAUTH_BRIDGE_URL en el cliente
 * OAuth de Google y servir oauth-bridge.html en pb_public.
 */
import * as WebBrowser from 'expo-web-browser'
import * as Linking from 'expo-linking'
import {
  GoogleSignin,
  statusCodes,
  isSuccessResponse,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin'
import { loginWithOAuth2Code, loginWithGoogleIdToken } from '@sturdy/core/lib/pocketbase'

WebBrowser.maybeCompleteAuthSession()

// URL https que Google redirige tras el consentimiento. Debe estar en las
// "Authorized redirect URIs" del cliente OAuth de Google y servirse en pb_public.
// El bridge reenvía el code+state a APP_RETURN_URL.
const OAUTH_BRIDGE_URL =
  process.env.EXPO_PUBLIC_OAUTH_BRIDGE_URL || 'https://sturdy-app-production.up.railway.app/oauth-bridge.html'

// Esquema propio de la app al que vuelve el deep-link. Literal (no Linking.createURL)
// para que coincida EXACTO con el redirect hardcodeado del bridge estático.
// expo-web-browser cierra el navegador al detectar esta URL. Requiere build
// standalone / dev-client (Expo Go usa otro esquema y no sirve para OAuth).
const APP_RETURN_URL = 'sturdy://oauthredirect'

/** El usuario cerró el navegador sin completar el login (no es un error a reportar). */
export class OAuthCancelledError extends Error {
  constructor(public readonly reason: string) {
    super(`oauth_cancelled_${reason}`)
    this.name = 'OAuthCancelledError'
  }
}

export const isAuthCancelled = (e: unknown): e is OAuthCancelledError =>
  e instanceof OAuthCancelledError

// Cliente OAuth **web**: es el audience que Google pone en el ID token del
// login nativo, y el que verifica el hook del backend. El cliente Android
// (paquete + huella SHA-1) también hace falta en Google Cloud, pero no se
// nombra aquí: Play Services lo resuelve por la firma del APK.
const GOOGLE_WEB_CLIENT_ID = process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID || ''

let googleConfigured = false
function configureGoogle() {
  if (googleConfigured || !GOOGLE_WEB_CLIENT_ID) return
  GoogleSignin.configure({ webClientId: GOOGLE_WEB_CLIENT_ID })
  googleConfigured = true
}

/**
 * Login nativo: hoja de cuentas de Android, sin salir de la app.
 *
 * Devuelve null cuando este dispositivo no puede hacerlo (sin Play Services, o
 * sin webClientId configurado) para que el llamante caiga al flujo de
 * navegador. Una cancelación del usuario sí se propaga como OAuthCancelledError:
 * eligió salir, reabrirle un navegador sería peor.
 */
async function tryNativeGoogleLogin() {
  if (!GOOGLE_WEB_CLIENT_ID) return null
  configureGoogle()

  try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true })
  } catch {
    return null
  }

  let response
  try {
    response = await GoogleSignin.signIn()
  } catch (err) {
    if (isErrorWithCode(err)) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) {
        throw new OAuthCancelledError('cancelled')
      }
      if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        return null
      }
    }
    throw err
  }

  // El usuario cerró la hoja sin elegir cuenta.
  if (!isSuccessResponse(response)) {
    throw new OAuthCancelledError('dismissed')
  }

  const idToken = response.data?.idToken
  // Sin idToken no hay nada que verificar en el backend; cae al navegador en
  // vez de fallar, porque suele significar una config incompleta del cliente.
  if (!idToken) return null

  return loginWithGoogleIdToken(idToken, {
    name: response.data?.user?.name ?? undefined,
    avatarURL: response.data?.user?.photo ?? undefined,
  })
}

export async function loginWithGoogle() {
  const native = await tryNativeGoogleLogin()
  if (native) return native

  return loginWithOAuth2Code('google', OAUTH_BRIDGE_URL, async (authUrl) => {
    const res = await WebBrowser.openAuthSessionAsync(authUrl, APP_RETURN_URL)
    if (res.type !== 'success' || !res.url) {
      throw new OAuthCancelledError(res.type)
    }
    const { queryParams } = Linking.parse(res.url)
    // Google devuelve ?error=access_denied si el usuario rechaza el consentimiento:
    // es una cancelación, no un fallo → no reportar a Sentry.
    if (queryParams?.error) {
      throw new OAuthCancelledError(String(queryParams.error))
    }
    return {
      code: String(queryParams?.code ?? ''),
      state: String(queryParams?.state ?? ''),
    }
  })
}
