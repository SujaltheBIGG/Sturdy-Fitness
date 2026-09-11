import { describe, it, expect, vi, beforeEach } from 'vitest'
import { storage } from '../platform'
import { USER_SCOPED_STORAGE_KEYS, clearUserStorage } from './storage-keys'

vi.mock('../platform', () => ({
  storage: {
    getItem: vi.fn(),
    setItem: vi.fn(),
    removeItem: vi.fn(),
  },
}))

const EXPECTED_KEYS = [
  'sturdy_progress',
  'sturdy_settings',
  'sturdy_water',
  'sturdy_water_goal',
  'sturdy_weight_entries',
  'sturdy_sleep_entries',
  'sturdy_body_measurements',
  'sturdy_rest_prefs',
  'sturdy_meal_reminders',
  'sturdy_workout_reminders',
  'sturdy_weekly_plan',
  'sturdy_day_plans',
  'sturdy_nutrition_entries',
  'sturdy_nutrition_goals',
  'sturdy_last_meal_type',
  'sturdy_exercise_favorites',
  'sturdy_health_last_sync',
  'sturdy_first_workout_pending',
  'sturdy_battle_invite_token',
  'sturdy_rq_cache',
  'sturdy_strength_active',
  'sturdy_cardio_active',
  'sturdy_cardio_unsaved',
  'sturdy_circuit_active',
  'sturdy_free_session_queue',
  'sturdy_lumbar_checks',
  'sturdy_circuit_unsaved',
]

describe('USER_SCOPED_STORAGE_KEYS', () => {
  it('contiene exactamente las 27 claves de localStorage por usuario', () => {
    expect(USER_SCOPED_STORAGE_KEYS).toHaveLength(27)
    expect([...USER_SCOPED_STORAGE_KEYS].sort()).toEqual([...EXPECTED_KEYS].sort())
  })
})

describe('clearUserStorage', () => {
  beforeEach(() => {
    vi.mocked(storage.removeItem).mockClear()
  })

  it('llama a storage.removeItem una vez por cada clave', () => {
    clearUserStorage()
    expect(storage.removeItem).toHaveBeenCalledTimes(EXPECTED_KEYS.length)
  })

  it('elimina cada clave esperada', () => {
    clearUserStorage()
    for (const key of EXPECTED_KEYS) {
      expect(storage.removeItem).toHaveBeenCalledWith(key)
    }
  })
})
