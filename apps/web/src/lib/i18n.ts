/**
 * i18next initialization.
 * Import this module for its side-effect (calls i18next.init).
 * Translations are bundled — no HTTP fetch needed.
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import en from '@sturdy/core/locales/en/translation.json'

// Declare the page as English and opt out of machine translation.
//
// Chrome and Safari offer to translate when the detected content language does
// not match `lang`. Both are also set statically in `index.html`; they are
// reasserted here so the opt-out survives anything that rewrites the element,
// and so it holds in dev where `index.html` is transformed.
document.documentElement.lang = 'en'
document.documentElement.setAttribute('translate', 'no')
document.documentElement.classList.add('notranslate')

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en'],
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
