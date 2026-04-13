import { motion } from 'framer-motion';
import { useLocale } from '@library/useLocale';
import FadeInView from '@components/FadeInView';
import { sendEvent } from '@library/useTracking';

const DownloadIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const DownloadCVButton = () => {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <FadeInView delay={0.15}>
      <div style={s.banner}>
        <div style={s.content}>
          <div style={s.textBlock}>
            <h4 style={s.title}>
              {isEs
                ? '\u00bfListo para construir algo extraordinario?'
                : 'Ready to build something extraordinary?'}
            </h4>
            <p style={s.subtitle}>
              {isEs
                ? 'Descarga mi CV completo con detalles t\u00e9cnicos, certificaciones y m\u00e1s.'
                : 'Download my full resume with technical details, certifications & more.'}
            </p>
          </div>

          <motion.button
            onClick={() => {
              sendEvent('cv_download');
              import('@library/generateCV').then(({ generateCV }) =>
                generateCV(isEs ? 'es' : 'en')
              );
            }}
            style={s.button}
            whileHover={{
              scale: 1.02,
              boxShadow: '0 6px 20px rgba(76,175,80,0.25)',
            }}
            whileTap={{ scale: 0.97 }}
          >
            <DownloadIcon />
            <span>
              {isEs ? 'Descargar CV Completo' : 'Download Full Tech Resume'}
            </span>
          </motion.button>
        </div>
      </div>
    </FadeInView>
  );
};

const s = {
  banner: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
    marginBottom: '40px',
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '28px 28px',
    gap: '24px',
    flexWrap: 'wrap',
  },
  textBlock: {
    flex: '1 1 280px',
  },
  title: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 6px',
    lineHeight: 1.35,
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: 0,
    lineHeight: 1.5,
  },
  button: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: 600,
    color: '#ffffff',
    background: '#202124',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    flexShrink: 0,
    transition: 'box-shadow 0.2s ease',
  },
};

export default DownloadCVButton;
