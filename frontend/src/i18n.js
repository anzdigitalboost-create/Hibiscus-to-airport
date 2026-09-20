// Minimal i18n bootstrap. The mirrored booking page (src/pages/BookNow.jsx,
// copied verbatim from bookaride.co.nz) reads the active language via
// react-i18next and stamps it on each booking. This site is English-only.
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: 'en',
  resources: { en: { translation: {} } },
  interpolation: { escapeValue: false },
})

export default i18n
