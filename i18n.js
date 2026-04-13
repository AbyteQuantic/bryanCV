import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Importar traducciones directamente desde src/locales
import enTranslations from './src/locales/en/translation.json';
import esTranslations from './src/locales/es/translation.json';

const isServer = typeof window === 'undefined';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Configuración de idiomas
    supportedLngs: ['en', 'es'],
    fallbackLng: 'en',
    debug: false,
    
    // Recursos pre-cargados (funciona en servidor y cliente)
    resources: {
      en: {
        translation: enTranslations,
      },
      es: {
        translation: esTranslations,
      },
    },
    
    // Configuración del detector de idioma (solo cliente)
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng',
    },
    
    // Namespace configuration
    ns: ['translation'],
    defaultNS: 'translation',
    
    interpolation: {
      escapeValue: false, // React ya escapa por defecto
    },
    
    react: {
      useSuspense: false, // CRÍTICO: evita hydration errors
      bindI18n: 'languageChanged',
      bindI18nStore: false,
      transEmptyNodeValue: '',
      transSupportBasicHtmlNodes: true,
      transKeepBasicHtmlNodesFor: ['br', 'strong', 'i'],
    },
    
    // Configuración para evitar warnings
    saveMissing: false,
    updateMissing: false,
    missingKeyHandler: false,
    
    // Configuración de interpolación
    keySeparator: '.',
    nsSeparator: ':',
  });

export default i18n;