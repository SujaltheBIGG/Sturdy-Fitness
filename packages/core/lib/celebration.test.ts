import { describe, it, expect } from 'vitest'
import { getCelebrationTagline } from './celebration'

const base = { durationMin: 30, totalSets: 12, exerciseCount: 5, hour: 14 }

describe('getCelebrationTagline', () => {
  it('prioritises the 60-min milestone over everything else', () => {
    expect(getCelebrationTagline({ ...base, durationMin: 60, hour: 3 })).toMatch(/full hour/i)
  })

  it('celebrates high volume with the actual set count', () => {
    expect(getCelebrationTagline({ ...base, totalSets: 32 })).toContain('32 sets')
  })

  it('session milestones win over time-of-day', () => {
    // 45-min session at 5am: duration milestone, not the madrugada line
    expect(getCelebrationTagline({ ...base, durationMin: 45, hour: 5 })).toMatch(/zero excuses/i)
  })

  it('flags a short, dense session', () => {
    expect(getCelebrationTagline({ ...base, durationMin: 16, totalSets: 10 })).toMatch(/short and intense/i)
  })

  it('falls back to a time-of-day line when no session milestone hits', () => {
    expect(getCelebrationTagline({ durationMin: 25, totalSets: 6, exerciseCount: 3, hour: 5 })).toMatch(/before dawn/i)
    expect(getCelebrationTagline({ durationMin: 25, totalSets: 6, exerciseCount: 3, hour: 9 })).toMatch(/started the day winning/i)
  })

  it('is deterministic for the same context', () => {
    const ctx = { ...base, hour: 16 }
    expect(getCelebrationTagline(ctx)).toBe(getCelebrationTagline(ctx))
  })

  it('always returns a non-empty string', () => {
    for (let hour = 0; hour < 24; hour++) {
      expect(getCelebrationTagline({ durationMin: 25, totalSets: 6, exerciseCount: 3, hour }).length).toBeGreaterThan(0)
    }
  })
})
