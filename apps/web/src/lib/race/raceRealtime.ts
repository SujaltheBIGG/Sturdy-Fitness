/**
 * Realtime subscriptions for the race flow.
 *
 * The implementation moved to `@sturdy/core/lib/race/raceRealtime` (#466) — web
 * and mobile had byte-identical copies with no platform-specific imports. Both now
 * re-export the shared one.
 */
export { subscribeRace } from '@sturdy/core/lib/race/raceRealtime'
export type { RaceRealtimeHandlers } from '@sturdy/core/lib/race/raceRealtime'
