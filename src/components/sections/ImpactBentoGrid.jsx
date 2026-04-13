import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { useLocale } from '@library/useLocale';
import { sendEvent } from '@library/useTracking';

const metrics = {
  en: [
    {
      value: '60%',
      subtitle: 'Faster Delivery',
      label:
        'Leveraging Agentic AI (Claude/Cursor) to optimize the full SDLC.',
      accent: true,
      span: true,
    },
    {
      value: '99.9%',
      subtitle: 'Uptime',
      label: 'High-availability architectures on GCP & Kubernetes.',
    },
    {
      value: '40%',
      subtitle: 'Bug Reduction',
      label: 'Automated QA frameworks built from the ground up.',
    },
    {
      value: '15+',
      subtitle: 'Years of Experience',
      label: 'From CTO & Founder to DevOps Lead.',
      span: true,
    },
  ],
  es: [
    {
      value: '60%',
      subtitle: 'Entrega m\u00e1s r\u00e1pida',
      label:
        'Apalancando IA Ag\u00e9ntica (Claude/Cursor) para optimizar el SDLC completo.',
      accent: true,
      span: true,
    },
    {
      value: '99.9%',
      subtitle: 'Uptime',
      label: 'Arquitecturas de alta disponibilidad en GCP y Kubernetes.',
    },
    {
      value: '40%',
      subtitle: 'Menos bugs',
      label: 'Frameworks de QA automatizado construidos desde cero.',
    },
    {
      value: '15+',
      subtitle: 'A\u00f1os de experiencia',
      label: 'De CTO y Fundador a DevOps Lead.',
      span: true,
    },
  ],
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const ACCENT = '#4CAF50';

const ImpactBentoGrid = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const data = isEs ? metrics.es : metrics.en;
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });

  useEffect(() => {
    if (isInView) sendEvent('page_view', { section: 'impact-metrics' });
  }, [isInView]);

  return (
    <section ref={sectionRef} className="mil-p-90-30">
      <div className="mil-section-title mil-up">
        <div className="mil-divider" />
        <h3>
          {isEs ? 'Impacto en Ingenier\u00eda' : 'Engineering Impact & Metrics'}
        </h3>
      </div>

      <motion.div
        style={s.grid}
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
      >
        {data.map((item, idx) => (
          <motion.div
            key={idx}
            variants={cardVariant}
            whileHover={{
              y: -4,
              boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
              transition: { duration: 0.2 },
            }}
            style={{
              ...s.card,
              gridColumn: item.span ? '1 / -1' : undefined,
            }}
          >
            <div style={{ ...s.value, color: item.accent ? ACCENT : '#202124' }}>
              {item.value}
            </div>
            <div style={s.subtitle}>{item.subtitle}</div>
            <p style={s.label}>{item.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

const s = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '14px',
    marginTop: '20px',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '28px 24px',
    cursor: 'default',
    transition: 'box-shadow 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
  },
  value: {
    fontSize: '40px',
    fontWeight: 800,
    lineHeight: 1,
    letterSpacing: '-0.03em',
    marginBottom: '4px',
  },
  subtitle: {
    fontSize: '14px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    marginBottom: '10px',
  },
  label: {
    fontSize: '14px',
    fontWeight: 400,
    color: '#6b7280',
    lineHeight: 1.55,
    margin: 0,
  },
};

export default ImpactBentoGrid;
