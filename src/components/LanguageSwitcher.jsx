import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';

function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const currentLang = i18n.language?.startsWith('es') ? 'es' : 'en';
  const nextLang = currentLang === 'es' ? 'en' : 'es';

  const handleSwitch = (e) => {
    e.preventDefault();
    e.stopPropagation();
    i18n.changeLanguage(nextLang);
    router.push(router.asPath, router.asPath, { locale: nextLang });
  };

  // SSR: render neutral placeholder to avoid mismatch
  if (!mounted) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', width: '50px', height: '28px' }} />
    );
  }

  return (
    <div
      onClick={handleSwitch}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        cursor: 'pointer',
        userSelect: 'none',
      }}
    >
      <img
        src={currentLang === 'es' ? '/img/logos/CO.png' : '/img/logos/US.png'}
        alt={currentLang === 'es' ? 'ES' : 'EN'}
        style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
      />
      <span style={{
        fontSize: '11px',
        fontWeight: 600,
        letterSpacing: '1px',
      }}>
        {currentLang === 'es' ? 'ES' : 'EN'}
      </span>
    </div>
  );
}

export default LanguageSwitcher;
