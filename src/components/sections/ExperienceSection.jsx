import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from '@library/useLocale';
import { sendEvent } from '@library/useTracking';
import { experience } from '@data/career';

const TimelineItem = ({ item }) => (
  <li className="mil-up">
    <div className="mil-item-head mil-mb-5">
      <h4>{item.title}</h4>
      <div className="mil-text-sm">{item.period}</div>
    </div>
    <p className="mil-text-sm mil-mb-15" style={s.role}>{item.role}</p>
    <p>{item.desc}</p>
    {item.projects && item.projects.length > 0 && (
      <div style={s.projects}>
        <p style={s.projectsLabel}>{'▸'} {item.projectsLabel}</p>
        {item.projects.map((proj, idx) => (
          <div key={idx} style={s.projectChip}>
            <span style={s.projectName}>{proj.name}</span>
            <span style={s.projectDetail}> — {proj.detail}</span>
          </div>
        ))}
      </div>
    )}
  </li>
);

const ExperienceSection = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const exp = isEs ? experience.es : experience.en;
  const projectsLabel = isEs ? 'Proyectos clave:' : 'Key projects:';

  const sectionRef = useRef(null);
  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          sendEvent('page_view', { section: 'experience' });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="mil-p-90-30">
      <div className="mil-section-title mil-up">
        <div className="mil-divider" />
        <h3>{isEs ? 'Experiencia Profesional' : 'Professional Experience'}</h3>
      </div>

      <p className="mil-up mil-mb-60" style={s.intro}>
        {isEs
          ? 'De CTO y Co-Fundador a Full Stack Developer & Arquitecto de Soluciones: 15+ años construyendo, modernizando y escalando sistemas en producción.'
          : 'From CTO & Co-Founder to Full Stack Developer & Solutions Architect: 15+ years building, modernizing and scaling production systems.'}
      </p>

      <div className="row justify-content-center">
        <div className="col-xl-9">
          <div className="mil-timeline mil-mb-60">
            <div className="mil-timeline-track" />
            <ul>
              {exp.map((item, i) => (
                <TimelineItem key={i} item={{ ...item, projectsLabel }} />
              ))}
            </ul>
          </div>

          <div className="mil-center">
            <Link href="/story" className="mil-link mil-up">
              <span>{isEs ? 'Ver trayectoria completa' : 'View full story'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-arrow-right">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

const s = {
  intro: {
    textAlign: 'center',
    maxWidth: '720px',
    margin: '0 auto 60px',
    color: '#555',
  },
  role: {
    color: '#4CAF50',
    fontWeight: 600,
  },
  projects: {
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '1px solid #eee',
  },
  projectsLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#4CAF50',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    margin: '0 0 8px',
  },
  projectChip: {
    fontSize: '13px',
    lineHeight: 1.5,
    marginBottom: '4px',
    color: '#555',
  },
  projectName: {
    fontWeight: 600,
    color: '#202124',
  },
  projectDetail: {
    fontWeight: 400,
  },
};

export default ExperienceSection;
