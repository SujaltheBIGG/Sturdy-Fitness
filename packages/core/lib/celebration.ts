/**
 * Tagline motivacional para la pantalla de "¡SESSION COMPLETE!".
 *
 * Determinista a partir del contexto (no aleatorio) para que se sienta
 * "consciente" de lo que acabas de hacer: prioriza hitos concretos de la
 * sesión (volumen, duración) sobre la hora del día. Tono gym, en español,
 * a juego con el "💪" del título y las frases de campeón.
 *
 * Pura y sin dependencias: el front móvil/web solo le pasa números.
 */
export interface CelebrationContext {
  /** Duración total de la sesión en minutos. */
  durationMin: number
  /** Series registradas en la sesión. */
  totalSets: number
  /** Cantidad de ejercicios distintos. */
  exerciseCount: number
  /** Hora local 0–23 (new Date().getHours()). */
  hour: number
}

export const getCelebrationTagline = (ctx: CelebrationContext): string => {
  const { durationMin, totalSets, exerciseCount, hour } = ctx

  // 1) Hitos de la propia sesión — lo más específico va primero.
  if (durationMin >= 60) return 'A full hour. That is craft. 🔥'
  if (totalSets >= 30) return `${totalSets} sets. You were unstoppable today.`
  if (durationMin >= 45) return 'Long session, zero excuses. 💯'
  if (exerciseCount >= 8) return 'Full body, nothing skipped.'
  if (durationMin > 0 && durationMin <= 18 && totalSets >= 8) return 'Short and intense. Pure quality. ⚡'

  // 2) Momento del día — siempre hay algo que decir.
  if (hour < 6) return 'Training before dawn. Another league. 🌙'
  if (hour < 12) return 'You started the day winning. ☀️'
  if (hour < 18) return 'A well-earned rest is waiting.'
  if (hour >= 22) return 'Closing the day strong. 🌙'

  // 3) Fallback neutro pero con energía.
  return 'Another mark on the wall. Keep going. 💪'
}
