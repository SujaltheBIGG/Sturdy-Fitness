import { useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const UPDATED = 'August 12, 2026'

/**
 * Privacy policy and terms of service (issue #295).
 *
 * Every claim in the privacy section is anchored to the code that backs it, so
 * the next review can verify it instead of taking it on faith:
 *
 * - Health collections, all owner-only: `body_photos` (1774000008:101,106),
 *   `body_measurements` (1774000022:88,93), `weight_entries` (1774000007:81,86),
 *   `sleep_entries` (1774000042:28,29), `user_health` (1781700000:35,36),
 *   `user_insights` (1780000000:87,92), `sleep_insights` (1781400000:87,92),
 *   `nutrition_entries` (1774000004:160,165), `daily_health_cache` (1777000001:36,37).
 * - Readable by any authenticated account: `sessions`, `user_stats` and
 *   `cardio_sessions` with a block filter (1778000002:11-22,27-31), and
 *   `sets_log` (1777000005:12,13), `settings` (1775100007:14,15) and
 *   `race_participants` (1775200002:27,28) WITHOUT a block filter.
 * - Cardio GPS routes: RESOLVED in #299. `gps_points` moved out of
 *   `cardio_sessions` into the owner-only `cardio_routes` collection (1782500000),
 *   with all five rules bound to the owner. The feed is still open but no longer
 *   carries the route.
 * - Race GPS routes: RESOLVED in #316. `gps_track` moved out of
 *   `race_participants` into the owner-only `race_routes` collection (1783600000),
 *   with all five rules bound to the owner. Participation stays open — the live
 *   race needs it — but no longer carries the track, not even via the realtime
 *   payload, which used to broadcast the whole row on finish.
 * - Files with `protected: false`: progress photos (1774000008:50) and meal
 *   photos (1774000064:18) -> long URL with no session check.
 * - Since #300 every relation to `users` cascades: the 7 that were missing
 *   (`cardio_sessions`, `circuit_sessions`, `race_participants`, `races`,
 *   `referrals` x2, `content_reports.target_user`) were fixed in
 *   `1782600000_cascade_delete_user_relations.js`. Without them PocketBase would
 *   not even allow deleting the account (400 on a required relation).
 * - Third parties: AI providers in `mcp-server/src/api/model-resolver.ts:22-32`,
 *   meal photos sent in `meal-analyzer.ts:204-213`, summary context in
 *   `insight-context-server.ts:468-679`, Langfuse without masking in
 *   `mcp-server/src/instrumentation.ts:22-24`, Sentry web with PII in
 *   `apps/web/src/instrument.ts:12`, mobile without it in
 *   `apps/mobile/src/lib/instrument.ts:15`, self-hosted OpenPanel in
 *   `apps/web/src/lib/init-core.ts:12` with session replay masked except in the
 *   `data-op-unmask` subtrees (`components/MarketingUnmask.tsx`) and identify
 *   with email in `packages/core/hooks/useAuth.ts:70,119`, push in
 *   `push-sender.ts:100-174`, CARTO maps in
 *   `apps/web/src/components/cardio/RouteMap.tsx:21-22`.
 * - Weekly summary cron: `pb_hooks/weekly_insights.pb.js:13,22-35`
 *   (enumerates users with a push token, not everyone).
 * - Export: `apps/web/src/components/progress/ExportData.tsx:55-65`.
 * - Medical conditions and injuries do NOT go to the AI: they are used only on
 *   the client (`packages/core/lib/matchPrograms.ts:78-79`, `lib/injuryMatch.ts`).
 * - Self-service deletion (#300): `users.deleteRule` is `id = @request.auth.id`;
 *   the UI lives in `components/profile/DeleteAccountDialog.tsx` (web) and
 *   `apps/mobile/src/components/profile/DeleteAccountModal.tsx` (Android), with
 *   the shared operation in `packages/core/hooks/useDeleteAccount.ts`.
 */

/** Visibility table row: `who` accepts several sentences. */
function VisibilityRow({ what, who }: { what: string; who: string }) {
  return (
    <tr className="border-b border-border last:border-b-0 align-top">
      <th scope="row" className="py-3 pr-4 text-left font-medium">{what}</th>
      <td className="py-3 text-muted-foreground">{who}</td>
    </tr>
  )
}

export default function LegalPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const hash = location.hash

  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace('#', ''))
      el?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [hash])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-4 py-8">
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Back
        </button>

        {/* Privacy Policy */}
        <section id="privacy" className="mb-16">
          <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-sm text-muted-foreground mb-6">Last updated: {UPDATED}</p>

          <p className="mb-4">
            Sturdy ("we", "us" or "the app") is committed to protecting your privacy.
            This policy describes how we collect, use and protect your personal information when
            you use our application.
          </p>

          <p className="mb-4">
            The app stores data about your body and your health, so this policy describes what
            happens today in detail, including the uncomfortable parts. Where something does not
            work the way you would like, we say so instead of leaving it out.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Information we collect</h2>
          <p className="mb-2">
            Almost everything below is entered by you. If you do not fill in a section, that data
            does not exist. We mark as <strong>health data</strong> the categories that warrant
            that treatment.
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Account data:</strong> name, email address and profile photo when you register or sign in with Google, plus your language and time zone.</li>
            <li><strong>Training data:</strong> exercises, sets, reps, weights, notes, completed sessions, circuits, programs and your personal records for pull-ups, push-ups, L-sit, pistol squat and handstand.</li>
            <li><strong>Cardio and location data:</strong> distance, pace, elevation and the full GPS route of the session. Location is recorded only while a cardio session is active.</li>
            <li><strong>Nutrition data:</strong> meals, quantities, targets, water, pantry, saved recipes and any meal photos you upload.</li>
            <li><strong>Body data (health data):</strong> weight, up to eight body circumferences (chest, waist, neck, hips, both arms and both thighs), the body-fat percentage estimated from them, and front, side and back progress photos.</li>
            <li><strong>Rest data (health data):</strong> bedtime and wake time, duration, awakenings, perceived quality, caffeine, screen use before bed and stress level.</li>
            <li><strong>Medical conditions and injuries (health data):</strong> those you declare at registration or in your profile. They are used to adapt program recommendations and do not leave your device for any third-party service.</li>
            <li><strong>Health device data (health data):</strong> if you connect Health Connect on Android, the app stores a daily summary with steps, calories, resting heart rate, variability, VO2max, sleep minutes and quality, weight and body-fat percentage.</li>
            <li><strong>AI-generated summaries (health data):</strong> the weekly texts the app generates about your own records and stores in your account.</li>
            <li><strong>Device and usage data:</strong> browser type, operating system, language, app version and usage events, used to improve the experience and diagnose faults.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. How we use your information</h2>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Provide, maintain and improve the app's services.</li>
            <li>Personalize your training and nutrition experience.</li>
            <li>Enable social features such as friends, leaderboards and challenges.</li>
            <li>Estimate nutritional values from the meal photos you send for analysis.</li>
            <li>Generate weekly summaries of your records. This happens automatically on Monday mornings, without you asking, if you have notifications enabled on any device.</li>
            <li>Send reminders and notifications you have configured.</li>
            <li>Detect and diagnose application errors.</li>
            <li>Analyze usage to improve the app.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Who sees your data inside the app</h2>
          <p className="mb-4">
            There are no public profiles: without a signed-in account nothing at all is visible.
            With an account, this is what is visible.
          </p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border-collapse">
              <caption className="sr-only">What each person sees of your data</caption>
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="py-2 pr-4 text-left font-semibold">Data</th>
                  <th scope="col" className="py-2 text-left font-semibold">Who can see it</th>
                </tr>
              </thead>
              <tbody>
                <VisibilityRow
                  what="Progress photos, measurements and weight"
                  who="Only you."
                />
                <VisibilityRow
                  what="Meals, meal photos, water and sleep"
                  who="Only you."
                />
                <VisibilityRow
                  what="Medical conditions and injuries"
                  who="Only you."
                />
                <VisibilityRow
                  what="Health Connect data and AI-generated summaries"
                  who="Only you."
                />
                <VisibilityRow
                  what="Completed workouts and general statistics"
                  who="Anyone with an account, not just people who follow you. Hidden from anyone you have blocked and anyone who has blocked you."
                />
                <VisibilityRow
                  what="Sets, reps and personal records"
                  who="Anyone with an account: this is the data that makes the leaderboard and challenges work. Hidden from anyone you have blocked and anyone who has blocked you."
                />
                <VisibilityRow
                  what="Cardio sessions: distance, pace and duration"
                  who="Anyone with an account, not just people who follow you. Hidden from anyone you have blocked and anyone who has blocked you."
                />
                <VisibilityRow
                  what="The GPS route of your cardio sessions"
                  who="Only you. It is stored separately from the rest of the session, precisely so the feed can show the activity without exposing where you went."
                />
                <VisibilityRow
                  what="Race participation: live position, distance and pace"
                  who="Anyone with an account. While the race is running, your position is what lets other participants watch you progress. Hidden from anyone you have blocked and anyone who has blocked you."
                />
                <VisibilityRow
                  what="The GPS track of your races"
                  who="Only you. It is stored separately from the participation record, just like the cardio route, so the race can show your position without exposing where you went."
                />
                <VisibilityRow
                  what="Your name, your photo and your statistics"
                  who="Anyone with an account who opens your profile."
                />
              </tbody>
            </table>
          </div>

          <h3 className="text-lg font-semibold mt-6 mb-2">How your photos are served</h3>
          <p className="mb-4">
            The photos you upload, both progress and meal photos, are stored as files with a long,
            hard-to-guess name, and served from that address without checking who opens it. The app
            only lists them for your account and nobody can reach them by browsing, but if that exact
            address were leaked, whoever had it could open it. Do not upload anything you would not
            publish if that address were leaked.
          </p>

          <h3 className="text-lg font-semibold mt-6 mb-2">Where your GPS tracks are stored</h3>
          <p className="mb-4">
            Neither your cardio session tracks nor your race tracks are stored alongside the rest of
            the activity: they live somewhere separate that only your account can reach. That is what
            lets the feed show that you went for a run, and a race show your position to other
            participants, without anyone being able to reconstruct where you went. Since a route
            usually starts and ends at your home, we think that is an important distinction.
          </p>
          <p className="mb-4">
            It was not always this way, and we would rather tell you: until August 3, 2026 for cardio,
            and until August 12, 2026 for races, the track was stored inside the activity record
            itself, and that record is readable by any signed-in account. No screen in the app drew
            another person's track, but the server did not prevent it either. Tracks you recorded
            before those dates were moved to the new location, so today they are no longer within
            anyone else's reach.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. Providers we share data with</h2>
          <p className="mb-4">
            We do not sell your personal information or share it for advertising purposes. To
            function, the app relies on these services:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li><strong>Google (sign-in):</strong> we use Google OAuth. Google may collect data according to its own privacy policy.</li>
            <li><strong>AI providers (Anthropic, OpenAI and Google):</strong> they receive the meal photos you send for analysis and, for the weekly summaries, a text summary of your workouts, cardio, meals, water, sleep, weight and Health Connect data. They do <strong>not</strong> receive your progress photos, your body measurements or your medical conditions and injuries. The specific provider depends on service availability at the time.</li>
            <li><strong>Langfuse (AI observability):</strong> when enabled, it retains a copy of the requests sent to the providers above and of their responses.</li>
            <li><strong>Sentry (error diagnostics):</strong> on the web, your name and email are sent along with the error, and a session replay is recorded with all text masked and images blocked. In the Android app no personal data is sent.</li>
            <li><strong>OpenPanel (usage analytics):</strong> hosted on our own infrastructure rather than a third-party service. It records your identifier, your name, your email and app usage events. On the web it also records a session replay (clicks, scrolling and navigation) with all text and form fields masked; readable text is only stored on the public landing, blog and download pages, where no personal data appears.</li>
            <li><strong>Notification services (Expo, Firebase Cloud Messaging and your browser's push service):</strong> they receive your device's notification identifier and the text of each alert.</li>
            <li><strong>CARTO (maps):</strong> serves the map tiles your cardio route is drawn on, so it knows the area being displayed.</li>
            <li><strong>Legal requirements:</strong> if the law requires it.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Storage and security</h2>
          <p className="mb-4">
            Your data is stored on our own servers. We implement reasonable security measures to
            protect your information, including encryption in transit (HTTPS) and per-account access
            control. The specific limitations we are aware of are described in section 3 rather than
            summarized into a generic promise.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Retention and deletion</h2>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>We do not delete anything automatically. For as long as your account exists, everything you record is kept.</li>
            <li>You can delete your account yourself from your profile, on both the web and the Android app, without asking us. We ask you to type your email to confirm and the deletion is immediate. If you would prefer we do it, write to the address in section 12.</li>
            <li>Deleting the account also deletes your progress photos, measurements, weight, sleep, meals and their photos, medical conditions and injuries, Health Connect data, AI-generated summaries, workouts, sets, cardio sessions with their GPS route, circuits, race participations with their track and any races you created, your comments and reactions, challenges, settings, personal records and statistics.</li>
            <li>We keep no copy after deletion, so a deleted account cannot be recovered.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Exporting your data</h2>
          <p className="mb-4">
            From the web you can download two CSV files: one with your workouts and sets, and another
            with your weight history. There is currently no export from the Android app, nor for
            nutrition, sleep, measurements or photos. If you want a complete copy of your data, ask us
            and we will send it.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Your rights</h2>
          <p className="mb-2">You have the right to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Access your personal data from your profile and download it as explained in section 7.</li>
            <li>Modify or correct your information.</li>
            <li>Request deletion of your account and all your data as explained in section 6.</li>
            <li>Revoke Google OAuth access at any time from your Google account settings.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">9. Cookies and local storage</h2>
          <p className="mb-4">
            We use browser local storage (localStorage) to keep you signed in and save preferences.
            We do not use third-party tracking cookies: usage analytics runs on our own
            infrastructure.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">10. Minors</h2>
          <p className="mb-4">
            This app is not directed at children under 13. We do not knowingly collect information
            from children under 13.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">11. Changes to this policy</h2>
          <p className="mb-4">
            We may update this policy from time to time. We will notify you of significant changes
            through the app.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">12. Contact</h2>
          <p className="mb-4">
            If you have questions about this policy, or want to request deletion or a copy of your
            data, write to us at:{' '}
            <a href="mailto:contacto@sturdy.app" className="text-primary hover:underline">
              contacto@sturdy.app
            </a>
          </p>
        </section>

        {/* Terms of Service */}
        <section id="terms">
          <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
          <p className="text-sm text-muted-foreground mb-6">Last updated: {UPDATED}</p>

          <p className="mb-4">
            By using Sturdy, you accept these terms of service. If you do not agree,
            please do not use the app.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">1. Service description</h2>
          <p className="mb-4">
            Sturdy is a training and nutrition tracking application that lets users
            log exercises, create training programs, track their progress and take part in
            social features such as challenges and leaderboards.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">2. User accounts</h2>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>You can register with email/password or through Google OAuth.</li>
            <li>You are responsible for maintaining the security of your account.</li>
            <li>You must provide accurate information when registering.</li>
            <li>One account per person.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">3. Acceptable use</h2>
          <p className="mb-2">By using the app, you agree to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>Not use the app for illegal activities.</li>
            <li>Not attempt to access other users' accounts.</li>
            <li>Not interfere with the operation of the app.</li>
            <li>Not submit offensive, abusive or inappropriate content.</li>
            <li>Not use bots or automated scripts.</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-3">4. User content</h2>
          <p className="mb-4">
            You retain ownership of the data you record (workouts, meals, etc.).
            You grant us a limited license to store and display this content within
            the app.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">5. Medical disclaimer</h2>
          <p className="mb-4">
            Sturdy is not a medical service nor a substitute for professional medical advice.
            The medical conditions and injuries you declare are used solely to adjust which
            programs are recommended to you; they are not a clinical assessment and are not
            reviewed by any healthcare professional. AI-generated summaries are
            indicative and can be wrong. Consult a health professional before starting
            any exercise program. We are not responsible for injuries arising from use
            of the app.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">6. Service availability</h2>
          <p className="mb-4">
            We strive to keep the app available, but we do not guarantee uninterrupted
            service. We may modify, suspend or discontinue the service at any time.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">7. Limitation of liability</h2>
          <p className="mb-4">
            The app is provided "as is" without warranties of any kind. We are not responsible
            for indirect, incidental or consequential damages arising from use of the app.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">8. Termination</h2>
          <p className="mb-4">
            We may suspend or cancel your account if you violate these terms. You can delete your
            account whenever you like from your profile, on both the web and the Android app: your
            account and your data are removed at that moment, as described in section 6 of the
            privacy policy. You can also write to us and we will do it.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">9. Modifications</h2>
          <p className="mb-4">
            We may modify these terms at any time. Continued use of the
            app after changes constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-3">10. Contact</h2>
          <p className="mb-4">
            For questions about these terms:{' '}
            <a href="mailto:contacto@sturdy.app" className="text-primary hover:underline">
              contacto@sturdy.app
            </a>
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Sturdy. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
