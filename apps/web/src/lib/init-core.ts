/**
 * Inicialización de @sturdy/core para web.
 *
 * DEBE ser de los primeros imports de main.tsx (solo después de Sentry):
 * los módulos de core leen el platform adapter al evaluarse.
 */
import * as Sentry from '@sentry/react'
import { OpenPanel } from '@openpanel/web'
import { initCore } from '@sturdy/core/platform'
import { shouldSendAnalytics } from '@sturdy/core/lib/analytics'

// Session replay (rrweb) solo en builds de producción y navegadores reales:
// el e2e de CI corre contra el bundle de prod con `vite preview`, y no queremos
// grabaciones de Playwright en el panel. navigator.webdriver los descarta.
const replayEnabled =
  !import.meta.env.DEV && typeof navigator !== 'undefined' && !navigator.webdriver

// OpenPanel is self-hosted (see the comment on `sessionReplay` below) — there
// is no SaaS to point at, only your own deployed instance. `analytics.sturdy.app`
// was a placeholder from the rebrand and was never a real server, so every
// `op.track()`/`op.identify()` call was failing with ERR_NAME_NOT_RESOLVED.
// Disabled here (no client constructed, no network calls) until a real
// OpenPanel instance exists. To re-enable: set VITE_OPENPANEL_API_URL and
// flip ANALYTICS_ENABLED back to true.
const ANALYTICS_ENABLED = false
const OPENPANEL_API_URL = import.meta.env.VITE_OPENPANEL_API_URL || 'https://analytics.sturdy.app/api'

const op = ANALYTICS_ENABLED
  ? new OpenPanel({
      apiUrl: OPENPANEL_API_URL,
      clientId: import.meta.env.VITE_OPENPANEL_CLIENT_ID ?? '95f75c3f-fb38-4c0b-a401-a3a63f8b91f5',
      trackScreenViews: true,
      trackOutgoingLinks: true,
      trackAttributes: true,
      // #696: la cuenta demo del revisor de Play no cuenta. El filtro corre antes
      // de encolar cualquier payload (track, screen_view automático, identify,
      // replay), así que no hace falta gatear cada llamada.
      filter: shouldSendAnalytics,
      sessionReplay: {
        enabled: replayEnabled,
        // maskAllText y maskAllInputs quedan en su default (true): la app maneja datos
        // de salud (peso, lesiones, condiciones médicas, comidas) y no deben salir del
        // navegador. Solo se desenmascara lo que marque `data-op-unmask`, que hoy son
        // las páginas públicas de marketing (ver components/MarketingUnmask.tsx).
        unmaskTextSelector: '[data-op-unmask]',
      },
    })
  : null

initCore({
  storage: localStorage,
  env: {
    // Vacío en prod → la web se sirve desde el propio PocketBase
    pbUrl: import.meta.env.VITE_POCKETBASE_URL || (import.meta.env.DEV ? 'http://127.0.0.1:8090' : window.location.origin),
    // Vacío en dev → el proxy de Vite maneja /api/*
    aiApiUrl: import.meta.env.VITE_AI_API_URL || (import.meta.env.DEV ? '' : 'https://api.sturdy.app'),
    isDev: import.meta.env.DEV,
    // Identidad del cliente → cabeceras X-App-* en cada request a PocketBase.
    // `build: 0` a propósito: la web no tiene builds instalados que puedan
    // quedarse atrás (el service worker en modo prompt ya la actualiza sola), y
    // `evaluateUpdate` trata el 0 como "nunca bloquear". La versión sigue
    // viajando para poder correlacionar un bug con un deploy concreto.
    client: { version: __APP_VERSION__, build: 0, platform: 'web' },
  },
  analytics: {
    track: (name, properties) => op?.track(name, properties),
    // El payload del facade es laxo; OpenPanel exige profileId — los callers de core siempre lo mandan.
    identify: (payload) => {
      op?.identify(payload as Parameters<NonNullable<typeof op>['identify']>[0])
      // Cruce OpenPanel↔Sentry: el mismo id de PocketBase en los dos lados.
      // Sin esto Sentry solo tiene la IP y cruzar una sesión del panel con un
      // issue era «mismo dispositivo + misma hora». Solo el id, nada de PII.
      // Independiente de si OpenPanel está activo — Sentry siempre se beneficia.
      const profileId = (payload as { profileId?: string }).profileId
      if (profileId) Sentry.setUser({ id: profileId })
    },
    clear: () => {
      op?.clear()
      Sentry.setUser(null)
    },
  },
  reportError: (e) => Sentry.captureException(e),
  lifecycle: {
    isForeground: () => document.visibilityState === 'visible',
    onForeground: (handler) => {
      const onVisibility = () => {
        if (document.visibilityState === 'visible') handler()
      }
      document.addEventListener('visibilitychange', onVisibility)
      return () => document.removeEventListener('visibilitychange', onVisibility)
    },
    onBackground: (handler) => {
      const onVisibility = () => {
        if (document.visibilityState === 'hidden') handler()
      }
      document.addEventListener('visibilitychange', onVisibility)
      return () => document.removeEventListener('visibilitychange', onVisibility)
    },
  },
  connectivity: {
    isOnline: () => navigator.onLine,
    onOnline: (handler) => {
      window.addEventListener('online', handler)
      return () => window.removeEventListener('online', handler)
    },
    onChange: (handler) => {
      const on = () => handler(true)
      const off = () => handler(false)
      window.addEventListener('online', on)
      window.addEventListener('offline', off)
      return () => {
        window.removeEventListener('online', on)
        window.removeEventListener('offline', off)
      }
    },
  },
})
