import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import LegalPage from './LegalPage'

/**
 * The privacy policy is the only place that publishes who sees what
 * (issue #295). These cases do not check layout: they check that the claims
 * verified against the PocketBase rules are still there, and that the false
 * sentences that were removed do not come back. If a backend rule changes, the
 * failure has to show up here and not in an email from a user.
 *
 * The page does not go through i18n: the English copy is embedded in the
 * component, so the asserts compare against the real text.
 */
function renderPage() {
  render(
    <MemoryRouter initialEntries={['/legal']}>
      <LegalPage />
    </MemoryRouter>,
  )
}

/** The visibility table, located by its accessible caption. */
function visibilityTable() {
  return screen.getByRole('table', { name: /What each person sees of your data/i })
}

describe('LegalPage - privacy', () => {
  it('lists the health data categories the app stores', () => {
    renderPage()
    // Exact <strong> label: "AI-generated summaries" also appears in the
    // medical disclaimer, and a loose regex would find two nodes.
    for (const category of [
      'Body data (health data):',
      'Rest data (health data):',
      'Medical conditions and injuries (health data):',
      'Health device data (health data):',
      'AI-generated summaries (health data):',
    ]) {
      expect(screen.getByText(category)).toBeInTheDocument()
    }
  })

  it('marks as owner-only exactly what the rules leave owner-only', () => {
    renderPage()
    const onlyYou = within(visibilityTable()).getAllByText('Only you.')
    // photos+measurements+weight, meals+water+sleep, medical conditions, health+AI
    expect(onlyYou).toHaveLength(4)
  })

  it('says workouts are visible to any account, not just followers', () => {
    renderPage()
    const row = within(visibilityTable()).getByRole('row', { name: /Completed workouts/ })
    expect(row).toHaveTextContent(/Anyone with an account, not just people who follow you/)
  })

  // Since the #386 stack (1783400000/1783400001) blocking DOES hide sets,
  // records and race participation. The table used to say the opposite.
  it('says blocking hides sets, records and races', () => {
    renderPage()
    const table = visibilityTable()
    expect(within(table).getByRole('row', { name: /Sets, reps and personal records/ }))
      .toHaveTextContent(/Hidden from anyone you have blocked/)
    expect(within(table).getByRole('row', { name: /Race participation/ }))
      .toHaveTextContent(/Hidden from anyone you have blocked/)
  })

  // #316 closed the last GPS route hole: `gps_track` moved out of
  // `race_participants` into `race_routes`, owner-only. The page no longer
  // announces a current limitation, but it MUST still say one existed.
  it('no longer announces the race GPS route limitation as current', () => {
    renderPage()
    expect(screen.queryByRole('heading', { name: /known limitation/i })).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /Where your GPS tracks are stored/ })).toBeInTheDocument()
  })

  it('says the race track was exposed until August 12, 2026', () => {
    renderPage()
    expect(screen.getByText(/until August 12, 2026 for races/)).toBeInTheDocument()
    expect(screen.getByText(/the server did not prevent it either/)).toBeInTheDocument()
  })

  it('makes clear cardio and race routes are now owner-only', () => {
    renderPage()
    const table = visibilityTable()
    expect(within(table).getByRole('row', { name: /The GPS route of your cardio sessions/ }))
      .toHaveTextContent(/Only you/)
    expect(within(table).getByRole('row', { name: /The GPS track of your races/ }))
      .toHaveTextContent(/Only you/)
  })

  it('explains that photos are served from an unguessable address', () => {
    renderPage()
    expect(screen.getByText(/without checking who opens it/)).toBeInTheDocument()
  })

  it('names the providers that receive data', () => {
    renderPage()
    for (const provider of [
      /AI providers \(Anthropic, OpenAI and Google\)/,
      /Langfuse/,
      /Sentry/,
      /OpenPanel/,
      /Expo, Firebase Cloud Messaging/,
      /CARTO/,
    ]) {
      expect(screen.getByText(provider)).toBeInTheDocument()
    }
  })

  it('clarifies that progress photos, measurements and medical conditions do not go to the AI', () => {
    renderPage()
    expect(screen.getByText(/receive your progress photos, your body measurements or your medical conditions/))
      .toBeInTheDocument()
  })

  it('describes the self-service deletion that exists since #300, on web and Android', () => {
    renderPage()
    expect(screen.getByText(/You can delete your account yourself from your profile/)).toBeInTheDocument()
    expect(screen.getByText(/We ask you to type your email to confirm/)).toBeInTheDocument()
    expect(screen.getByText(/a deleted account cannot be recovered/)).toBeInTheDocument()
  })

  it('includes cardio and races in what is deleted with the account', () => {
    renderPage()
    // Before #300 these two categories were deleted by hand because their
    // relation to `users` did not cascade; now they go with the rest.
    expect(screen.getByText(/cardio sessions with their GPS route, circuits, race participations/))
      .toBeInTheDocument()
  })

  it('describes the real export: two CSVs and web only', () => {
    renderPage()
    expect(screen.getByText(/There is currently no export from the Android app/)).toBeInTheDocument()
  })
})

describe('LegalPage - withdrawn sentences', () => {
  it('no longer says account deletion does not exist or must be requested by email', () => {
    renderPage()
    expect(screen.queryByText(/There is still no button to delete your account/)).not.toBeInTheDocument()
    expect(screen.queryByText(/there is still no button to do it inside the app/))
      .not.toBeInTheDocument()
    // And the cardio/race exception does not come back either, now cascaded.
    expect(screen.queryByText(/We delete them by hand/)).not.toBeInTheDocument()
  })

  it('no longer says Google OAuth is the only third party', () => {
    renderPage()
    expect(screen.queryByText(/We do not sell or share your personal information with third parties, except/))
      .not.toBeInTheDocument()
  })

  it('both sections carry the same updated date', () => {
    renderPage()
    expect(screen.getAllByText(/Last updated: August 12, 2026/)).toHaveLength(2)
  })
})
