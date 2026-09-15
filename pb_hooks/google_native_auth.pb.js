/// <reference path="../pb_data/types.d.ts" />

/**
 * Native Google Sign-In for the Android app.
 *
 * Why this exists: PocketBase's OAuth2 API only speaks the authorization-code
 * redirect flow, which forces the app out to a browser tab. Android's
 * Credential Manager instead hands the app a signed **ID token** directly, with
 * no browser — that's the in-app account sheet users expect. Nothing in
 * PocketBase consumes an ID token, so this endpoint bridges the two: verify the
 * token with Google, then mint a normal PocketBase auth session for the
 * matching user.
 *
 * The browser bridge flow (see apps/mobile/src/lib/auth.ts) stays as a fallback
 * for devices without Play Services.
 *
 * Setup:
 *   GOOGLE_OAUTH_CLIENT_ID      — Web client id. Native sign-in is configured
 *                                 with this as `webClientId`, so it is the
 *                                 audience of the ID token we receive.
 *   GOOGLE_ANDROID_CLIENT_ID    — Android client id (package + SHA-1). Accepted
 *                                 as an audience too, since some Play Services
 *                                 versions mint tokens against it.
 */
routerAdd("POST", "/api/google-native-auth", (e) => {
  const payload = new DynamicModel({ idToken: "" })
  try {
    e.bindBody(payload)
  } catch (err) {
    return e.json(400, { error: "invalid_body" })
  }

  const idToken = String(payload.idToken || "").trim()
  if (!idToken) {
    return e.json(400, { error: "missing_id_token" })
  }

  // Let Google validate signature and expiry rather than verifying the JWT
  // against its JWKS by hand — one call, and no key-rotation handling to get
  // wrong. Short timeout: this sits in the user's sign-in path.
  let res
  try {
    res = $http.send({
      url: "https://oauth2.googleapis.com/tokeninfo?id_token=" + encodeURIComponent(idToken),
      method: "GET",
      timeout: 15,
    })
  } catch (err) {
    console.log("[google_native_auth] tokeninfo unreachable:", err)
    return e.json(502, { error: "verification_unavailable" })
  }

  if (res.statusCode !== 200 || !res.json) {
    return e.json(401, { error: "invalid_id_token" })
  }

  const claims = res.json

  // `aud` is the only thing stopping an ID token minted for some other app
  // from logging in here, so it is not optional.
  const allowedAudiences = [
    $os.getenv("GOOGLE_OAUTH_CLIENT_ID"),
    $os.getenv("GOOGLE_ANDROID_CLIENT_ID"),
  ].filter((v) => !!v)

  if (allowedAudiences.length === 0) {
    console.log("[google_native_auth] no client id configured — refusing")
    return e.json(503, { error: "not_configured" })
  }
  if (allowedAudiences.indexOf(String(claims.aud)) === -1) {
    return e.json(401, { error: "unexpected_audience" })
  }

  const iss = String(claims.iss || "")
  if (iss !== "accounts.google.com" && iss !== "https://accounts.google.com") {
    return e.json(401, { error: "unexpected_issuer" })
  }

  // tokeninfo returns these as strings.
  if (String(claims.email_verified) !== "true") {
    return e.json(401, { error: "email_not_verified" })
  }

  const email = String(claims.email || "").trim().toLowerCase()
  if (!email) {
    return e.json(401, { error: "no_email" })
  }

  let user = null
  try {
    user = $app.findAuthRecordByEmail("users", email)
  } catch (err) {
    user = null
  }

  if (!user) {
    // Same linking rule PocketBase's own OAuth2 uses: a Google-verified email
    // identifies the account. Safe only because email_verified was checked.
    try {
      const collection = $app.findCollectionByNameOrId("users")
      user = new Record(collection)
      user.set("email", email)
      user.set("emailVisibility", false)
      user.set("verified", true)
      if (claims.name) {
        user.set("name", String(claims.name).slice(0, 255))
      }
      // Password auth stays unusable for these accounts: the value is random
      // and never surfaced. They sign in through Google.
      user.setPassword($security.randomString(48))
      $app.save(user)
    } catch (err) {
      console.log("[google_native_auth] could not create user:", err)
      return e.json(500, { error: "user_create_failed" })
    }
  }

  return $apis.recordAuthResponse(e, user, "google-native")
})
