/**
 * Helpers for reading translated PocketBase JSON fields.
 *
 * PB fields that support i18n are stored as:
 *   { "es": "Texto", "en": "Text" }
 *
 * Legacy (pre-migration) fields are plain strings.
 */

/** A PB field that may be a locale map or a legacy plain string. */
export type TranslatableField = Record<string, string> | string

/**
 * Extract the localized string from a PB JSON field.
 * Fallback chain: current locale → 'en' → first non-empty → empty string.
 *
 * English comes before any other locale in the chain on purpose. The web app
 * ships English-only (`apps/web/src/lib/i18n.ts` pins `supportedLngs: ['en']`),
 * so a record whose `en` translation is missing used to fall through to `es`
 * and render Spanish inside an otherwise English UI.
 *
 * Empty strings count as missing: the catalog stores `""` for untranslated
 * fields, and `??` alone would return that blank instead of trying the next
 * locale.
 */
export function localize(
  field: TranslatableField | undefined | null,
  locale: string,
): string {
  if (!field) return ''
  if (typeof field === 'string') return field
  const firstFilled = Object.values(field).find((v) => typeof v === 'string' && v.trim() !== '')
  return field[locale]?.trim() || field['en']?.trim() || firstFilled || ''
}

/**
 * Wrap a user-entered string in an i18n JSON object keyed by the current locale.
 * Used when saving user-created content to PocketBase.
 */
export function toTranslatable(value: string, locale: string): Record<string, string> {
  return { [locale]: value }
}

/** Per-locale copy suffix. Falls back to English for untranslated locales. */
const COPY_SUFFIX: Record<string, string> = { es: '(copia)', en: '(copy)' }

/**
 * Nombre de una copia, conservando el mapa i18n del original (issue #602).
 *
 * Interpolar el campo directamente (`${field} (copia)`) daba
 * «[object Object] (copia)», y además escribía un string plano en una columna
 * `json`, así que `localize()` tampoco lo recuperaba después. Aquí cada locale
 * presente en el original recibe su propio sufijo.
 *
 * Un string plano (fila anterior a la migración i18n) no dice en qué idioma
 * está, así que la copia se guarda solo bajo `locale`, igual que `toTranslatable`.
 */
export function duplicatedName(
  field: TranslatableField | undefined | null,
  locale: string,
): Record<string, string> {
  const suffixed = (text: string, loc: string) =>
    `${text} ${COPY_SUFFIX[loc] ?? COPY_SUFFIX.en}`.trim()
  const entries = field && typeof field === 'object' ? Object.entries(field) : []
  if (entries.length === 0) return toTranslatable(suffixed(localize(field, locale), locale), locale)
  return Object.fromEntries(entries.map(([loc, text]) => [loc, suffixed(String(text), loc)]))
}
