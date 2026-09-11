/**
 * Server clock offset for the race flow.
 *
 * The implementation moved to `@sturdy/core/lib/serverClock` when battles (#356)
 * needed the same synchronization — web and mobile had byte-identical copies. Both now
 * re-export the shared one, so a single measured offset serves every feature.
 */
export {
  measureOffset,
  serverNow,
  msUntil,
  resetOffset,
  getOffsetMs,
} from '@sturdy/core/lib/serverClock'
