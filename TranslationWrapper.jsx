import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Componente para text que evita hydration mismatch
export function SafeTranslation({ i18nKey, fallback, ...props }) {
  const { t, i18n } = useTranslation();
  const [isClient, setIsClient] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Esperar a que i18n esté completamente listo
    if (i18n.isInitialized && i18n.language) {
      setIsReady(true);
    } else {
      const handleLanguageChanged = () => {
        setIsReady(true);
      };
      
      i18n.on('languageChanged', handleLanguageChanged);
      i18n.on('initialized', handleLanguageChanged);
      
      return () => {
        i18n.off('languageChanged', handleLanguageChanged);
        i18n.off('initialized', handleLanguageChanged);
      };
    }
  }, [i18n]);

  // Durante SSR y antes de que el cliente esté listo, mostrar fallback
  if (!isClient || !isReady) {
    return <span {...props}>{fallback || i18nKey}</span>;
  }

  // Una vez que el cliente está listo, mostrar traducción
  return <span {...props}>{t(i18nKey)}</span>;
}

// Hook personalizado para traduciones seguras
export function useSafeTranslation() {
  const { t, i18n } = useTranslation();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (i18n.isInitialized && i18n.language) {
      setIsReady(true);
    } else {
      const handleReady = () => setIsReady(true);
      
      i18n.on('languageChanged', handleReady);
      i18n.on('initialized', handleReady);
      
      return () => {
        i18n.off('languageChanged', handleReady);
        i18n.off('initialized', handleReady);
      };
    }
  }, [i18n]);

  return {
    t: isReady ? t : (key) => key,
    isReady,
    i18n,
  };
}

// Wrapper para componentes que usan traducciones
export default function TranslationProvider({ children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Durante SSR, renderizar con estado inicial
  if (!mounted) {
    return <div className="translation-loading">{children}</div>;
  }

  return children;
}