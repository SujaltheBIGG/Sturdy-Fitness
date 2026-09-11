/**
 * Race API calls against PocketBase.
 *
 * The implementation moved to `@sturdy/core/lib/race/raceApi` (#466) — web and
 * mobile had byte-identical copies with no platform-specific imports. Both now
 * re-export the shared one.
 */
export {
  createRace,
  loadRace,
  joinRace,
  markReady,
  startCountdown,
  activateRace,
  updateProgress,
  finishParticipant,
  finishRace,
  cancelRace,
  leaveRace,
  markDnf,
} from '@sturdy/core/lib/race/raceApi'
export type {
  CreateRaceInput,
  ProgressUpdate,
  FinishParticipantInput,
} from '@sturdy/core/lib/race/raceApi'
