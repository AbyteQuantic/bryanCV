import { motion } from 'framer-motion';
import { BrainCircuit, Cloud, Blocks, ShieldCheck } from 'lucide-react';
import Layouts from '@layouts/Layouts';
import PageBanner from '@components/PageBanner';
import CallToActionSection from '@components/sections/CallToAction';
import { useLocale } from '@library/useLocale';

const competencies = {
  en: [
    {
      Icon: BrainCircuit,
      title: 'AI-Augmented Engineering',
      desc: 'Pioneering AI-Assisted workflows (Claude Code, Cursor). I multiply engineering velocity, reducing feature delivery time by up to 60% while maintaining rigorous code quality standards.',
    },
    {
      Icon: Cloud,
      title: 'Cloud & DevOps Orchestration',
      desc: 'Designing and managing high-availability infrastructure on GCP and AWS. Expert in Kubernetes, Docker, and CI/CD pipelines ensuring 99.9% uptime for multi-country deployments.',
    },
    {
      Icon: Blocks,
      title: 'Legacy-to-Microservices',
      desc: 'Leading safe and progressive architectural refactoring. Transitioning heavy monolithic systems (like LoopBack) into decoupled, event-driven microservices (NestJS, Go) without downtime.',
    },
    {
      Icon: ShieldCheck,
      title: 'QA Automation & Resilience',
      desc: 'Building quality-first deployment cultures from scratch. Implementing E2E testing (Selenium, Appium, Pytest) integrated directly into CI/CD to slash production bugs.',
    },
  ],
  es: [
    {
      Icon: BrainCircuit,
      title: 'Ingenier\u00eda Aumentada con IA',
      desc: 'Pionero en flujos de trabajo con IA (Claude Code, Cursor). Multiplico la velocidad de ingenier\u00eda, reduciendo el tiempo de entrega de features hasta en un 60% manteniendo est\u00e1ndares rigurosos de calidad.',
    },
    {
      Icon: Cloud,
      title: 'Orquestaci\u00f3n Cloud & DevOps',
      desc: 'Dise\u00f1o y gesti\u00f3n de infraestructura de alta disponibilidad en GCP y AWS. Experto en Kubernetes, Docker y pipelines CI/CD garantizando 99.9% de uptime en despliegues multi-pa\u00eds.',
    },
    {
      Icon: Blocks,
      title: 'Monolito a Microservicios',
      desc: 'Liderando refactorizaci\u00f3n arquitect\u00f3nica segura y progresiva. Transici\u00f3n de sistemas monol\u00edticos pesados (como LoopBack) a microservicios desacoplados y event-driven (NestJS, Go) sin downtime.',
    },
    {
      Icon: ShieldCheck,
      title: 'QA Automation & Resiliencia',
      desc: 'Construyendo culturas de despliegue quality-first desde cero. Implementando testing E2E (Selenium, Appium, Pytest) integrado directamente en CI/CD para reducir bugs en producci\u00f3n.',
    },
  ],
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const Services = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const data = isEs ? competencies.es : competencies.en;

  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <PageBanner
        pageTitle={
          isEs ? 'Competencias Clave' : 'Architectural Value Proposition'
        }
        align="center"
      />

      {/* Subtitle */}
      <div style={s.subtitleWrap}>
        <p style={s.subtitle}>
          {isEs
            ? 'Conectando infraestructura de alta disponibilidad con entrega hiperacelerada.'
            : 'Bridging the gap between high-availability infrastructure and hyper-accelerated delivery.'}
        </p>
      </div>

      {/* Cards Grid */}
      <section className="mil-p-90-60">
        <motion.div
          style={s.grid}
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {data.map((item, idx) => {
            const { Icon } = item;
            return (
              <motion.div
                key={idx}
                variants={cardVariant}
                whileHover={{
                  y: -4,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.07)',
                  transition: { duration: 0.2 },
                }}
                style={s.card}
              >
                <div style={s.iconBox}>
                  <Icon size={20} color="#4CAF50" strokeWidth={1.8} />
                </div>
                <h4 style={s.cardTitle}>{item.title}</h4>
                <p style={s.cardDesc}>{item.desc}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      <CallToActionSection />
    </Layouts>
  );
};

const s = {
  subtitleWrap: {
    textAlign: 'center',
    padding: '0 20px 10px',
  },
  subtitle: {
    fontSize: '15px',
    color: '#6b7280',
    lineHeight: 1.6,
    maxWidth: '560px',
    margin: '0 auto',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '16px',
  },
  card: {
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '28px 24px',
    cursor: 'default',
    transition: 'box-shadow 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  iconBox: {
    width: '40px',
    height: '40px',
    borderRadius: '10px',
    background: '#f0fdf4',
    border: '1px solid #dcfce7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '16px',
  },
  cardTitle: {
    fontSize: '16px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 10px',
    lineHeight: 1.3,
  },
  cardDesc: {
    fontSize: '14px',
    color: '#6b7280',
    lineHeight: 1.6,
    margin: 0,
  },
};

export default Services;
