import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import translation files
import arEG from '@/locales/ar-EG.json';
import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import de from '@/locales/de.json';
import ru from '@/locales/ru.json';
import uk from '@/locales/uk.json';
import zh from '@/locales/zh.json';
import fr from '@/locales/fr.json';
import it from '@/locales/it.json';
import es from '@/locales/es.json';
import pt from '@/locales/pt.json';
import tr from '@/locales/tr.json';
import ja from '@/locales/ja.json';
import ko from '@/locales/ko.json';
import hi from '@/locales/hi.json';

// Translation resources
const resources = {
  'ar-EG': { translation: arEG },
  ar: { translation: ar },
  en: { translation: en },
  de: { translation: de },
  ru: { translation: ru },
  uk: { translation: uk },
  zh: { translation: zh },
  fr: { translation: fr },
  it: { translation: it },
  es: { translation: es },
  pt: { translation: pt },
  tr: { translation: tr },
  ja: { translation: ja },
  ko: { translation: ko },
  hi: { translation: hi },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'translation',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'khargony-language',
    },
  });

// Set RTL direction for Arabic languages
i18n.on('languageChanged', (lng) => {
  const isRTL = lng === 'ar-EG' || lng === 'ar';
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  document.documentElement.lang = lng;
});

export default i18n;
