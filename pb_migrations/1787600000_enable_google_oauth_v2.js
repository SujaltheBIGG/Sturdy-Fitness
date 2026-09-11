/// <reference path="../pb_data/types.d.ts" />

/**
 * Enable Google OAuth2 on the users collection.
 *
 * Two things this works around:
 *
 * 1. No superuser exists on this deployment, so the provider can't be set via
 *    the admin UI. A migration runs inside the server process with
 *    superuser-level access, so it can write the setting directly.
 *
 * 2. Supersedes 1787500000, which mutated `users.oauth2.enabled` in place and
 *    silently did nothing: the JSVM hands back a copy of the Go struct, so
 *    property writes on it are discarded. Assigning the whole `oauth2` object
 *    is what actually persists.
 *
 * Credentials come from env vars, never from this file — GitHub's secret
 * scanning (correctly) blocks a client secret committed to the repo. Set
 * GOOGLE_OAUTH_CLIENT_ID / GOOGLE_OAUTH_CLIENT_SECRET on the service.
 * If they're absent the migration is a no-op, so a fresh clone without the
 * vars still boots cleanly instead of failing.
 */
migrate((app) => {
  const clientId = $os.getenv("GOOGLE_OAUTH_CLIENT_ID")
  const clientSecret = $os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")

  if (!clientId || !clientSecret) {
    console.log("[enable_google_oauth] GOOGLE_OAUTH_CLIENT_ID/SECRET not set — skipping")
    return
  }

  const users = app.findCollectionByNameOrId("users")
  users.oauth2 = {
    enabled: true,
    providers: [{ name: "google", clientId: clientId, clientSecret: clientSecret }],
  }
  app.save(users)

  const check = app.findCollectionByNameOrId("users")
  console.log("[enable_google_oauth] enabled=" + check.oauth2.enabled +
    " providers=" + (check.oauth2.providers || []).length)
}, (app) => {
  const users = app.findCollectionByNameOrId("users")
  users.oauth2 = { enabled: false, providers: [] }
  app.save(users)
})
