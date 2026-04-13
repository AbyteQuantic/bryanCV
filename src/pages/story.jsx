import Layouts from "@layouts/Layouts";
import PageBanner from "@components/PageBanner";
import CallToActionSection from "@components/sections/CallToAction";
import { useLocale } from "@library/useLocale";

const education = {
  en: [
    {
      title: 'Corporaci\u00f3n Unificada Nacional (CUN)',
      period: '2008 \u2013 2013',
      role: 'Systems Engineering \u2014 Advanced Studies',
      desc: '9 semesters of systems engineering covering software architecture, networking, databases and distributed systems. Strong theoretical foundation supporting 15+ years of engineering leadership.',
    },
    {
      title: 'Platzi \u2014 Tech Career Paths',
      period: '2019 \u2013 Present',
      role: 'Continuous Learning',
      desc: '20+ specializations including Node.js Backend, Frontend JavaScript, React, Docker, Python, Data Engineering, AI Fundamentals, Agile Methodologies and Product Management.',
    },
    {
      title: 'AI Engineering & Cloud Certifications',
      period: '2024 \u2013 Present',
      role: 'Specialization Track',
      desc: 'Deep-diving into AI-Augmented Development (Claude Code, Cursor, Prompt Engineering), Cloud Architecture (AWS, GCP) and Infrastructure as Code (Terraform, Kubernetes).',
    },
    {
      title: 'Universidad Minuto de Dios (UNIMINUTO)',
      period: '2026 \u2013 Present',
      role: 'Software Engineering (In Progress)',
      desc: 'University degree in software engineering complementing 15+ years of hands-on industry experience.',
    },
  ],
  es: [
    {
      title: 'Corporaci\u00f3n Unificada Nacional (CUN)',
      period: '2008 \u2013 2013',
      role: 'Ingenier\u00eda de Sistemas \u2014 Estudios Avanzados',
      desc: '9 semestres de formaci\u00f3n en ingenier\u00eda de sistemas cubriendo arquitectura de software, redes, bases de datos y sistemas distribuidos. Base te\u00f3rica s\u00f3lida que respalda 15+ a\u00f1os de liderazgo en ingenier\u00eda.',
    },
    {
      title: 'Platzi \u2014 Rutas de Carrera Tech',
      period: '2019 \u2013 Presente',
      role: 'Aprendizaje Continuo',
      desc: '20+ especializaciones incluyendo Backend con Node.js, Frontend JavaScript, React, Docker, Python, Ingenier\u00eda de Datos, Fundamentos de IA, Metodolog\u00edas \u00c1giles y Gesti\u00f3n de Producto.',
    },
    {
      title: 'Certificaciones en IA y Cloud',
      period: '2024 \u2013 Presente',
      role: 'Especializaci\u00f3n',
      desc: 'Profundizando en Desarrollo Aumentado con IA (Claude Code, Cursor, Prompt Engineering), Arquitectura Cloud (AWS, GCP) e Infraestructura como C\u00f3digo (Terraform, Kubernetes).',
    },
    {
      title: 'Universidad Minuto de Dios (UNIMINUTO)',
      period: '2026 \u2013 Presente',
      role: 'Ingenier\u00eda de Software (En Curso)',
      desc: 'Formaci\u00f3n universitaria en ingenier\u00eda de software complementando 15+ a\u00f1os de experiencia pr\u00e1ctica en la industria.',
    },
  ],
};

const experience = {
  en: [
    {
      title: 'A_Byte Corp S.A.S.',
      period: '2010 \u2013 2019',
      role: 'CTO & Co-Founder',
      desc: 'Led the technology vision for 9 years, delivering custom web platforms, enterprise networks and CCTV/IP security systems for B2B corporate clients. Owned technical P&L, managed stakeholder relationships and scaled the team from 2 to 12 engineers. Full-stack delivery across PHP, JavaScript, MySQL and on-premise infrastructure.',
      projects: [
        { name: 'Princess XV', detail: '3D interactive web platform for luxury yachts' },
        { name: 'FacturApp', detail: 'Electronic invoicing system (DIAN compliance)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2019 \u2013 2022',
      role: 'QA Automation Lead',
      desc: 'Built the QA Automation department from scratch at a Series B startup operating in Colombia, Mexico and Brazil. Implemented Selenium, Appium and Pytest frameworks, reducing production bugs by 40%. Introduced CI/CD-integrated E2E testing and performance monitoring with BigQuery and Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Selenium + Appium + Pytest pipeline from zero' },
        { name: 'SiembraCo', detail: 'AgriTech platform for crop management (personal project, 2025)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2022 \u2013 Present',
      role: 'DevOps Lead & Senior Fullstack Engineer',
      desc: 'Leading infrastructure, CI/CD and the monolith-to-microservices migration (LoopBack 3 \u2192 NestJS). Implemented AI-Augmented workflows (Claude Code, Cursor) reducing feature delivery time by 60%. Managing multi-country Cloud deployments on GCP (Cloud Run, Pub/Sub, GCS) with 99.9% uptime.',
      projects: [
        { name: 'reference-catalogue-api', detail: 'Catalog orchestrator microservice (NestJS, saga patterns)' },
        { name: 'ms-pricing', detail: 'Isolated pricing engine for multi-location B2B' },
        { name: 'VendIA', detail: 'AI-powered POS with Gemini OCR for invoice processing (personal, 2026)' },
        { name: 'bryanCV', detail: 'AI-powered portfolio with chatbot, recruiter dashboard & dynamic CV (brayanmurcia.lat, 2026)' },
      ],
    },
  ],
  es: [
    {
      title: 'A_Byte Corp S.A.S.',
      period: '2010 \u2013 2019',
      role: 'CTO y Co-Fundador',
      desc: 'Lider\u00f3 la visi\u00f3n tecnol\u00f3gica durante 9 a\u00f1os, entregando plataformas web personalizadas, redes corporativas y sistemas de seguridad CCTV/IP para clientes B2B. Responsable del P&L t\u00e9cnico, gesti\u00f3n de stakeholders y escalamiento del equipo de 2 a 12 ingenieros. Entrega full-stack en PHP, JavaScript, MySQL e infraestructura on-premise.',
      projects: [
        { name: 'Princess XV', detail: 'Plataforma web 3D interactiva para yates de lujo' },
        { name: 'FacturApp', detail: 'Sistema de facturaci\u00f3n electr\u00f3nica (cumplimiento DIAN)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2019 \u2013 2022',
      role: 'QA Automation Lead',
      desc: 'Cre\u00f3 el departamento de QA Automation desde cero en una startup Serie B operando en Colombia, M\u00e9xico y Brasil. Implement\u00f3 frameworks de Selenium, Appium y Pytest, reduciendo bugs en producci\u00f3n en un 40%. Introdujo testing E2E integrado con CI/CD y monitoreo de rendimiento con BigQuery y Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Pipeline Selenium + Appium + Pytest desde cero' },
        { name: 'SiembraCo', detail: 'Plataforma AgriTech para gesti\u00f3n de cultivos (proyecto personal, 2025)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2022 \u2013 Presente',
      role: 'DevOps Lead & Senior Fullstack Engineer',
      desc: 'Lidera infraestructura, CI/CD y la migraci\u00f3n de monolito a microservicios (LoopBack 3 \u2192 NestJS). Implement\u00f3 flujos de trabajo con IA (Claude Code, Cursor) reduciendo el tiempo de entrega en un 60%. Gestiona despliegues Cloud multi-pa\u00eds en GCP (Cloud Run, Pub/Sub, GCS) con 99.9% de uptime.',
      projects: [
        { name: 'reference-catalogue-api', detail: 'Microservicio orquestador de cat\u00e1logo (NestJS, patrones saga)' },
        { name: 'ms-pricing', detail: 'Motor de precios aislado para B2B multi-ubicaci\u00f3n' },
        { name: 'VendIA', detail: 'POS con IA y OCR de Gemini para procesamiento de facturas (personal, 2026)' },
        { name: 'bryanCV', detail: 'Portafolio con IA, chatbot, dashboard de reclutadores y CV dinamico (brayanmurcia.lat, 2026)' },
      ],
    },
  ],
};

const TimelineItem = ({ item }) => (
  <li className="mil-up">
    <div className="mil-item-head mil-mb-5">
      <h4>{item.title}</h4>
      <div className="mil-text-sm">{item.period}</div>
    </div>
    <p className="mil-text-sm mil-mb-15">{item.role}</p>
    <p>{item.desc}</p>
    {item.projects && item.projects.length > 0 && (
      <div style={s.projects}>
        <p style={s.projectsLabel}>
          {'\u25B8'} Key Projects:
        </p>
        {item.projects.map((proj, idx) => (
          <div key={idx} style={s.projectChip}>
            <span style={s.projectName}>{proj.name}</span>
            <span style={s.projectDetail}> \u2014 {proj.detail}</span>
          </div>
        ))}
      </div>
    )}
  </li>
);

const Story = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const edu = isEs ? education.es : education.en;
  const exp = isEs ? experience.es : experience.en;

  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <PageBanner pageTitle={isEs ? "Mi Trayectoria" : "My Story"} />

      <section>
        <div className="row">
          {/* Education */}
          <div className="col-xl-6">
            <div className="mil-section-title mil-up mil-left mil-mb-90">
              <div className="mil-divider" />
              <h3>{isEs ? 'Educaci\u00f3n:' : 'Education:'}</h3>
            </div>
            <div className="mil-timeline mil-mb-90">
              <div className="mil-timeline-track" />
              <ul>
                {edu.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>

          {/* Experience */}
          <div className="col-xl-6">
            <div className="mil-section-title mil-up mil-left mil-mb-90">
              <div className="mil-divider" />
              <h3>{isEs ? 'Experiencia:' : 'Experience:'}</h3>
            </div>
            <div className="mil-timeline mil-mb-90">
              <div className="mil-timeline-track" />
              <ul>
                {exp.map((item, i) => (
                  <TimelineItem key={i} item={item} />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CallToActionSection />
    </Layouts>
  );
};

const s = {
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

export default Story;

export async function getStaticProps() {
  return { props: {} };
}
