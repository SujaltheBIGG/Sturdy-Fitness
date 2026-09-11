/// <reference path="../pb_data/types.d.ts" />

/**
 * Backfill the English half of the Ashtanga Yoga program's i18n fields.
 *
 * `1775100006_seed_yoga_program.js` originally wrote `{ es: ... }` only. The
 * web app ships English-only (`apps/web/src/lib/i18n.ts` pins
 * `supportedLngs: ['en']`), and `localize()` falls back to the first non-empty
 * locale when `en` is absent — so the program surfaced in Spanish on /programs.
 *
 * Fixing the seed migration alone is not enough: it has already run on every
 * existing database, and PocketBase never re-applies an applied migration.
 * This backfills the rows that are already there. It is idempotent — rows that
 * already carry an `en` value are left untouched.
 */
migrate((app) => {
  const TEXT = {
    'Ashtanga Yoga — Principiante': 'Ashtanga Yoga — Beginner',
    'Programa progresivo de Ashtanga Yoga. Desde los Saludos al Sol hasta la Serie Primaria completa en 24 semanas.':
      'A progressive Ashtanga Yoga program. From Sun Salutations to the complete Primary Series in 24 weeks.',
    'Ashtanga Yoga': 'Ashtanga Yoga',
    'Fundamentos': 'Foundations',
    'Construcción': 'Building',
    'Media Serie Primaria': 'Half Primary Series',
    'Serie Primaria Completa': 'Full Primary Series',
    'Descanso': 'Rest',
    'Lunes': 'Monday',
    'Martes': 'Tuesday',
    'Miércoles': 'Wednesday',
    'Jueves': 'Thursday',
    'Viernes': 'Friday',
    'Sábado': 'Saturday',
    'Domingo': 'Sunday',
  }

  /**
   * Read a locale-map field into a plain JS object.
   *
   * The JSVM hands JSON columns back as raw bytes (types.JSONRaw), not a
   * parsed object, so `typeof val === 'object'` is true but `val.es` is
   * undefined. Stringify first and parse, and fall back to treating a bare
   * string as a legacy pre-i18n value.
   */
  function readMap(rec, field) {
    const val = rec.get(field)
    if (val === null || val === undefined) return null
    if (typeof val === 'object' && typeof val.es === 'string') return val
    let text
    try { text = String(val) } catch (e) { return null }
    if (!text || text === 'null') return null
    if (text.charAt(0) !== '{') return { es: text }
    try {
      const parsed = JSON.parse(text)
      return parsed && typeof parsed === 'object' ? parsed : null
    } catch (e) { return null }
  }

  /** Add `en` to a locale-map field when it only has `es`. Returns true if changed. */
  function addEnglish(rec, field) {
    const map = readMap(rec, field)
    if (!map) return false
    if (map.en !== undefined && String(map.en).trim() !== '') return false
    const es = map.es
    if (!es || typeof es !== 'string') return false
    const en = TEXT[es]
    if (!en) return false
    map.en = en
    rec.set(field, map)
    return true
  }

  let programsFixed = 0
  try {
    const programs = app.findRecordsByFilter('programs', "name ~ 'Ashtanga Yoga'", '', 200, 0)
    for (const rec of programs) {
      let changed = false
      for (const f of ['name', 'description']) {
        if (addEnglish(rec, f)) changed = true
      }
      if (changed) { app.save(rec); programsFixed++ }
    }
  } catch (e) {
    console.log('[backfill_en_yoga] programs: ' + e)
  }

  let phasesFixed = 0
  try {
    const phases = app.findRecordsByFilter('program_phases', "id != ''", '', 2000, 0)
    for (const rec of phases) {
      if (addEnglish(rec, 'name')) { app.save(rec); phasesFixed++ }
    }
  } catch (e) {
    console.log('[backfill_en_yoga] program_phases: ' + e)
  }

  let exercisesFixed = 0
  try {
    const rows = app.findRecordsByFilter('program_exercises', "day_type = 'yoga'", '', 5000, 0)
    for (const rec of rows) {
      let changed = false
      for (const f of ['day_name', 'day_focus', 'workout_title', 'exercise_name', 'muscles', 'note']) {
        if (addEnglish(rec, f)) changed = true
      }
      if (changed) { app.save(rec); exercisesFixed++ }
    }
  } catch (e) {
    console.log('[backfill_en_yoga] program_exercises: ' + e)
  }

  console.log('[backfill_en_yoga] programs=' + programsFixed +
    ' phases=' + phasesFixed + ' exercises=' + exercisesFixed)
}, (app) => {
  // Down: nothing to undo. Removing the English half would only restore a bug.
})
