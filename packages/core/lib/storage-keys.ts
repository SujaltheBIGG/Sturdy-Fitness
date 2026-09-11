/**
 * Claves de localStorage vinculadas al usuario activo.
 * Se limpian en signOut para evitar que datos del usuario anterior
 * persistan en el nuevo usuario tras un cambio de cuenta.
 *
 * IMPORTANTE: si añades una nueva clave global en un hook offline-first,
 * agrégala aquí también.
 */
import { storage } from '../platform'
import { LEGACY_CIRCUIT_UNSAVED_KEY } from './circuitSessionQueue'

// Sesiones en curso / colas locales (#456). Declaradas aquí y no en los
// contexts para que entrar al registro no dependa de recordar este archivo.
/** Sesión de fuerza en curso — ActiveSessionContext (web y mobile). */
export const STRENGTH_ACTIVE_KEY = 'sturdy_strength_active'
/** Sesión de cardio en curso — CardioSessionContext (web y mobile). */
export const CARDIO_ACTIVE_KEY = 'sturdy_cardio_active'
/** Sesiones de cardio pendientes de subir — CardioSessionContext (web y mobile). */
export const CARDIO_UNSAVED_KEY = 'sturdy_cardio_unsaved'
/** Sesión de circuito en curso — CircuitSessionContext (web y mobile). */
export const CIRCUIT_ACTIVE_KEY = 'sturdy_circuit_active'
/** Cola de sesiones libres pendientes — ActiveSessionContext / FreeSessionPage (web). */
export const FREE_SESSION_QUEUE_KEY = 'sturdy_free_session_queue'
/** Días con chequeo lumbar hecho — LumbarCheckModal / SleepLumbarSection (web). */
export const LUMBAR_CHECKS_KEY = 'sturdy_lumbar_checks'

export const USER_SCOPED_STORAGE_KEYS: readonly string[] = [
  // useProgress
  'sturdy_progress',
  'sturdy_settings',
  // useWater
  'sturdy_water',
  'sturdy_water_goal',
  // useWeight
  'sturdy_weight_entries',
  // useSleep
  'sturdy_sleep_entries',
  // useBodyMeasurements
  'sturdy_body_measurements',
  // useRestPreferences
  'sturdy_rest_prefs',
  // useMealReminders
  'sturdy_meal_reminders',
  // useWorkoutReminders
  'sturdy_workout_reminders',
  // useWeeklyMealPlan
  'sturdy_weekly_plan',
  // useMealPlans — planes de un día (meal_day_plans)
  'sturdy_day_plans',
  // useNutrition
  'sturdy_nutrition_entries',
  'sturdy_nutrition_goals',
  // meal logger — last meal type chosen (seeds the picker on next open)
  'sturdy_last_meal_type',
  // useFavorites
  'sturdy_exercise_favorites',
  // useHealthSync — last successful health-hub (Health Connect/HealthKit) sync, per data type
  'sturdy_health_last_sync',
  // first-workout — intención de arrancar el primer entreno al salir del
  // onboarding (#694). Un solo uso y ligada al usuario: no debe arrancar una
  // sesión a quien entre después con otra cuenta.
  'sturdy_first_workout_pending',
  // battleInviteHandoff — token de invitación pendiente. Es una credencial de un solo
  // uso para una plaza: no puede sobrevivir a un cambio de cuenta.
  'sturdy_battle_invite_token',
  // React Query persister (caché serializado offline)
  'sturdy_rq_cache',
  // Sesiones en curso y colas locales — sin esto, la sesión activa/no guardada
  // del usuario anterior sobrevive al cambio de cuenta y las colas pendientes
  // se suben con la cuenta nueva (#456).
  STRENGTH_ACTIVE_KEY,
  CARDIO_ACTIVE_KEY,
  CARDIO_UNSAVED_KEY,
  CIRCUIT_ACTIVE_KEY,
  FREE_SESSION_QUEUE_KEY,
  LUMBAR_CHECKS_KEY,
  // Cola casera de circuitos anterior a #464: ya solo se lee para migrarla,
  // pero una cola vieja del usuario saliente se migraría y subiría con la
  // cuenta nueva si no se limpia aquí.
  LEGACY_CIRCUIT_UNSAVED_KEY,
]

/**
 * NOTA: las claves ya suffijadas por userId (p.ej. `sturdy_onboarding_done_<id>`,
 * `sturdy_tour_*_<id>`) NO se limpian aquí: no filtran datos a otro usuario
 * (cada quien lee solo su clave) y borrarlas re-mostraba el onboarding/tours a
 * usuarios que ya los completaron cada vez que cerraban sesión.
 */

/** Elimina todas las entradas de localStorage vinculadas al usuario activo. */
export function clearUserStorage(_userId?: string): void {
  USER_SCOPED_STORAGE_KEYS.forEach((key) => storage.removeItem(key))
}
