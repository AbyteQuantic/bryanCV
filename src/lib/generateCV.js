import { jsPDF } from 'jspdf';

const COLORS = {
  black: [32, 33, 36],
  dark: [54, 55, 58],
  gray: [120, 120, 124],
  accent: [76, 175, 80],
  white: [255, 255, 255],
};

const MARGIN = 20;
const PAGE_W = 210;
const CONTENT_W = PAGE_W - MARGIN * 2;

const i18nData = {
  en: {
    role: 'Senior DevOps Lead & AI-Augmented Architect',
    contact: 'abytecorp@gmail.com  |  Colombia  |  brayanmurcia.lat  |  English: B1 (Conversational & Technical)',
    contact2: 'linkedin.com/in/brayan-murcia  |  github.com/AbyteQuantic  |  15+ years experience',
    summaryTitle: 'Professional Summary',
    summary: 'Senior DevOps Lead & AI Architect with 15+ years of experience. From CTO & Co-Founder (9 years building A_Byte Corp) to infrastructure leader at Chiper, a high-growth Series B startup operating across Colombia, Mexico and Brazil. Expert in Cloud orchestration (GCP, Kubernetes, Terraform) and pioneer in integrating Agentic AI into the SDLC, achieving a 60% reduction in Time-to-Market while maintaining 99.9% platform uptime for multi-country operations serving 50K+ daily transactions.',
    competenciesTitle: 'Core Competencies',
    skills: [
      ['Cloud & Infrastructure', 'GCP (Cloud Run, Pub/Sub, GCS), AWS, Kubernetes, Docker, Terraform, CI/CD (GitHub Actions, GitLab CI), Linux.'],
      ['AI & Productivity', 'Prompt Engineering, Agentic AI, Claude Code, Cursor, AI-Assisted SDLC, GitHub Copilot, Gemini API.'],
      ['Backend & Architecture', 'Node.js (NestJS), Go, Python, Microservices, Event-Driven Design, Saga Patterns, Legacy Refactoring.'],
      ['Frontend & Mobile', 'React, Next.js, Vue.js, Flutter, React Native.'],
      ['Data & Observability', 'MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis, BigQuery, Grafana.'],
      ['QA & Resilience', 'Selenium, Appium, Pytest, K6 (Performance), E2E Testing, CI/CD-Integrated QA Pipelines.'],
      ['Leadership', 'Agile/Scrum, SDLC Orchestration, Tech Debt Management, B2B Stakeholder Management, Team Scaling (2\u219212).'],
    ],
    experienceTitle: 'Professional Experience',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 \u2013 Present',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B Startup',
        bullets: [
          'Led Cloud strategy on GCP (Cloud Run, Pub/Sub, GCS), ensuring 99.9% uptime for critical cross-border operations serving 50K+ daily transactions across 3 countries.',
          'Reduced feature delivery cycle by 60% through implementation of AI-Augmented Development workflows (Claude Code, Cursor), multiplying engineering velocity without sacrificing code quality.',
          'Orchestrated safe monolith-to-microservices migration (LoopBack 3 \u2192 NestJS, Go) with saga patterns and zero-downtime deployments, serving 15K+ active users.',
          'Designed 4-dimensional catalog visibility system (Location, Cluster, Partner, Stock) across MySQL, Elasticsearch, Redis and ms-pricing API, reducing catalog query latency by 45%.',
          'Managed CI/CD pipelines, multi-country deployment orchestration and infrastructure-as-code with Terraform and Docker.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 \u2013 2022',
        company: 'Chiper \u2014 B2B Marketplace',
        bullets: [
          'Built the QA Automation department from scratch, establishing a quality-first deployment culture across the engineering organization.',
          'Implemented Selenium, Appium and Pytest frameworks integrated directly into CI/CD pipelines, reducing production bugs by 40%.',
          'Introduced E2E testing, performance monitoring with BigQuery and Grafana, and automated reporting via Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Founder',
        period: '2010 \u2013 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Led the technology vision for 9 years, delivering custom web platforms, enterprise networks and CCTV/IP security systems for B2B corporate clients.',
          'Owned technical P&L, managed stakeholder relationships and scaled the engineering team from 2 to 12 members.',
          'Full-stack delivery across PHP, JavaScript, MySQL and on-premise infrastructure. Key projects: Princess XV (3D interactive platform), FacturApp (DIAN e-invoicing).',
        ],
      },
    ],
    projectsTitle: 'Strategic Projects',
    projects: [
      ['VendIA (SaaS POS)', 'AI-powered offline-first POS for traditional retail. Go backend + Flutter mobile + Next.js admin. Gemini AI OCR for invoice scanning, age-inclusive UI for elderly shopkeepers (65+), multi-tenant architecture, QR payments integration. Demonstrates end-to-end SaaS product scaling from architecture to production.'],
      ['SiembraCo (AgriTech)', 'Crop rental marketplace with real-time geolocation (Google Maps API), WebSocket growth tracking, satellite imagery and automated ROI projections. Full-stack NestJS + Python data pipeline. Demonstrates capacity to architect domain-specific SaaS platforms from zero.'],
      ['Princess XV', 'Interactive event platform with scroll-driven 3D animations (GSAP, Three.js), AI photo booth, real-time voting via WebSockets, iTunes API integration, and full guest management panel. 200+ concurrent users.'],
      ['FacturApp (FinTech)', 'DIAN-compliant electronic invoicing system. UBL 2.1 XML generation, X.509 digital signing, automated tax calculations (IVA, ICA, ReteFuente), PDF + WhatsApp delivery. Multi-tenant B2B architecture.'],
    ],
    educationTitle: 'Education & Certifications',
    education: [
      { title: 'Software Engineering (In Progress)', period: '2026 \u2013 Present', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Advanced Studies in Systems Engineering', period: '2008 \u2013 2013', detail: 'Corporaci\u00f3n Unificada Nacional (CUN), Colombia \u2014 9 semesters completed.' },
      { title: 'Continuous Learning \u2014 Platzi (20+ specializations)', period: '2019 \u2013 Present', detail: 'Node.js Backend, React, Docker, Python, Data Engineering, AI Fundamentals, Agile, Product Management.' },
      { title: 'AI Engineering & Cloud Certifications', period: '2024 \u2013 Present', detail: 'AI-Augmented Development (Claude Code, Cursor, Prompt Engineering), Cloud Architecture (AWS, GCP), IaC (Terraform, Kubernetes).' },
    ],
    footer: 'Brayan Murcia \u2014 brayanmurcia.lat \u2014 CV generated dynamically with Next.js + jsPDF',
  },
  es: {
    role: 'Senior DevOps Lead & Arquitecto AI-Augmented',
    contact: 'abytecorp@gmail.com  |  Colombia  |  brayanmurcia.lat  |  Ingl\u00e9s: B1 (Conversacional & T\u00e9cnico)',
    contact2: 'linkedin.com/in/brayan-murcia  |  github.com/AbyteQuantic  |  15+ a\u00f1os de experiencia',
    summaryTitle: 'Perfil Profesional',
    summary: 'Senior DevOps Lead & Arquitecto AI con m\u00e1s de 15 a\u00f1os de trayectoria. De CTO & Co-Fundador (9 a\u00f1os construyendo A_Byte Corp) a l\u00edder de infraestructura en Chiper, startup Serie B de alto crecimiento operando en Colombia, M\u00e9xico y Brasil. Experto en orquestaci\u00f3n Cloud (GCP, Kubernetes, Terraform) y pionero en la integraci\u00f3n de IA Ag\u00e9ntica en el SDLC, logrando una reducci\u00f3n del 60% en el Time-to-Market manteniendo 99.9% de uptime en operaciones multi-pa\u00eds con 50K+ transacciones diarias.',
    competenciesTitle: 'Competencias Clave',
    skills: [
      ['Cloud & Infraestructura', 'GCP (Cloud Run, Pub/Sub, GCS), AWS, Kubernetes, Docker, Terraform, CI/CD (GitHub Actions, GitLab CI), Linux.'],
      ['IA & Productividad', 'Prompt Engineering, IA Ag\u00e9ntica, Claude Code, Cursor, SDLC Asistido por IA, GitHub Copilot, Gemini API.'],
      ['Backend & Arquitectura', 'Node.js (NestJS), Go, Python, Microservicios, Dise\u00f1o Event-Driven, Patrones Saga, Refactorizaci\u00f3n Legacy.'],
      ['Frontend & M\u00f3vil', 'React, Next.js, Vue.js, Flutter, React Native.'],
      ['Datos & Observabilidad', 'MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis, BigQuery, Grafana.'],
      ['QA & Resiliencia', 'Selenium, Appium, Pytest, K6 (Performance), Testing E2E, Pipelines QA Integrados en CI/CD.'],
      ['Liderazgo', 'Agile/Scrum, Orquestaci\u00f3n SDLC, Gesti\u00f3n de Deuda T\u00e9cnica, Stakeholders B2B, Escalamiento de Equipos (2\u219212).'],
    ],
    experienceTitle: 'Experiencia Profesional',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 \u2013 Presente',
        company: 'Chiper \u2014 Marketplace B2B (Col, Mex, Bra) | Startup Serie B',
        bullets: [
          'Lider\u00e9 la estrategia Cloud en GCP (Cloud Run, Pub/Sub, GCS), garantizando 99.9% de uptime para operaciones cr\u00edticas transfronterizas sirviendo 50K+ transacciones diarias en 3 pa\u00edses.',
          'Reducci\u00f3n del 60% en el ciclo de entrega de features mediante la implementaci\u00f3n de flujos de trabajo AI-Augmented Development (Claude Code, Cursor), multiplicando la velocidad de ingenier\u00eda sin sacrificar calidad.',
          'Orquest\u00e9 la migraci\u00f3n arquitect\u00f3nica de monolitos (LoopBack 3) hacia microservicios de alto rendimiento (NestJS, Go) con patrones saga y despliegues sin tiempo de inactividad para 15K+ usuarios activos.',
          'Dise\u00f1\u00e9 sistema de visibilidad de cat\u00e1logo en 4 dimensiones (Ubicaci\u00f3n, Cluster, Partner, Stock) a trav\u00e9s de MySQL, Elasticsearch, Redis y API de Pricing, reduciendo la latencia de consultas en un 45%.',
          'Gestion\u00e9 pipelines CI/CD, orquestaci\u00f3n de despliegues multi-pa\u00eds e infraestructura como c\u00f3digo con Terraform y Docker.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 \u2013 2022',
        company: 'Chiper \u2014 Marketplace B2B',
        bullets: [
          'Cre\u00e9 el departamento de QA Automation desde cero, estableciendo una cultura de despliegue quality-first en toda la organizaci\u00f3n de ingenier\u00eda.',
          'Implement\u00e9 frameworks de Selenium, Appium y Pytest integrados directamente en pipelines CI/CD, reduciendo bugs en producci\u00f3n en un 40%.',
          'Introduje testing E2E, monitoreo de rendimiento con BigQuery y Grafana, y reportes automatizados v\u00eda Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Fundador',
        period: '2010 \u2013 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Lider\u00e9 la visi\u00f3n tecnol\u00f3gica durante 9 a\u00f1os, entregando plataformas web a medida, redes empresariales y sistemas de seguridad CCTV/IP para clientes corporativos B2B.',
          'Responsable del P&L t\u00e9cnico, gesti\u00f3n de stakeholders y escalamiento del equipo de ingenier\u00eda de 2 a 12 miembros.',
          'Entrega full-stack en PHP, JavaScript, MySQL e infraestructura on-premise. Proyectos clave: Princess XV (plataforma 3D interactiva), FacturApp (facturaci\u00f3n electr\u00f3nica DIAN).',
        ],
      },
    ],
    projectsTitle: 'Proyectos Estrat\u00e9gicos',
    projects: [
      ['VendIA (SaaS POS)', 'POS offline-first con IA para retail tradicional. Backend Go + Flutter m\u00f3vil + Admin Next.js. OCR de facturas con Gemini AI, UI inclusiva para tenderos adultos mayores (65+), arquitectura multi-tenant, integraci\u00f3n pagos QR. Demuestra capacidad de escalar productos SaaS desde arquitectura hasta producci\u00f3n.'],
      ['SiembraCo (AgriTech)', 'Marketplace de renta de cultivos con geolocalizaci\u00f3n en tiempo real (Google Maps API), tracking de crecimiento v\u00eda WebSockets, im\u00e1genes satelitales y proyecciones de ROI automatizadas. Full-stack NestJS + pipeline de datos Python. Demuestra capacidad de arquitectar plataformas SaaS de dominio espec\u00edfico desde cero.'],
      ['Princess XV', 'Plataforma interactiva con animaciones 3D controladas por scroll (GSAP, Three.js), photo booth con IA, votaci\u00f3n en tiempo real v\u00eda WebSockets, integraci\u00f3n iTunes API y panel de gesti\u00f3n de invitados. 200+ usuarios concurrentes.'],
      ['FacturApp (FinTech)', 'Facturaci\u00f3n electr\u00f3nica compatible con DIAN. Generaci\u00f3n XML UBL 2.1, firma digital X.509, c\u00e1lculos fiscales autom\u00e1ticos (IVA, ICA, ReteFuente), entrega PDF + WhatsApp. Arquitectura multi-tenant B2B.'],
    ],
    educationTitle: 'Educaci\u00f3n & Certificaciones',
    education: [
      { title: 'Ingenier\u00eda de Software (En Curso)', period: '2026 \u2013 Presente', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Estudios Avanzados en Ingenier\u00eda de Sistemas', period: '2008 \u2013 2013', detail: 'Corporaci\u00f3n Unificada Nacional (CUN), Colombia \u2014 9 semestres completados.' },
      { title: 'Aprendizaje Continuo \u2014 Platzi (20+ especializaciones)', period: '2019 \u2013 Presente', detail: 'Node.js Backend, React, Docker, Python, Data Engineering, Fundamentos de IA, Agile, Product Management.' },
      { title: 'Certificaciones en IA & Cloud', period: '2024 \u2013 Presente', detail: 'Desarrollo AI-Augmented (Claude Code, Cursor, Prompt Engineering), Arquitectura Cloud (AWS, GCP), IaC (Terraform, Kubernetes).' },
    ],
    footer: 'Brayan Murcia \u2014 brayanmurcia.lat \u2014 CV generado din\u00e1micamente con Next.js + jsPDF',
  },
};

function checkPage(doc, y, needed = 20) {
  if (y + needed > 280) {
    doc.addPage();
    return 20;
  }
  return y;
}

function sectionTitle(doc, y, title) {
  y = checkPage(doc, y, 16);
  doc.setFillColor(...COLORS.accent);
  doc.rect(MARGIN, y, CONTENT_W, 0.8, 'F');
  y += 6;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.accent);
  doc.text(title.toUpperCase(), MARGIN, y);
  y += 6;
  doc.setTextColor(...COLORS.black);
  return y;
}

function bodyText(doc, y, text, opts = {}) {
  const { bold = false, size = 9, indent = 0, maxWidth = CONTENT_W } = opts;
  y = checkPage(doc, y, 10);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...(opts.color || COLORS.dark));
  const lines = doc.splitTextToSize(text, maxWidth - indent);
  doc.text(lines, MARGIN + indent, y);
  return y + lines.length * (size * 0.45) + 2;
}

function bulletPoint(doc, y, text) {
  y = checkPage(doc, y, 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...COLORS.dark);
  doc.setFillColor(...COLORS.accent);
  doc.circle(MARGIN + 3, y - 1.2, 1, 'F');
  const lines = doc.splitTextToSize(text, CONTENT_W - 10);
  doc.text(lines, MARGIN + 8, y);
  return y + lines.length * 4.2 + 1.5;
}

export function generateCV(lang = 'en') {
  const d = i18nData[lang] || i18nData.en;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  // ===== HEADER =====
  doc.setFillColor(...COLORS.black);
  doc.rect(0, 0, PAGE_W, 48, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...COLORS.white);
  doc.text('BRAYAN MURCIA', MARGIN, 20);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...COLORS.accent);
  doc.text(d.role, MARGIN, 28);
  doc.setFontSize(8.5);
  doc.setTextColor(200, 200, 200);
  doc.text(d.contact, MARGIN, 36);
  doc.text(d.contact2, MARGIN, 42);

  let y = 56;

  // ===== SUMMARY =====
  y = sectionTitle(doc, y, d.summaryTitle);
  y = bodyText(doc, y, d.summary);
  y += 2;

  // ===== COMPETENCIES =====
  y = sectionTitle(doc, y, d.competenciesTitle);
  d.skills.forEach(([cat, items]) => {
    y = checkPage(doc, y, 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.black);
    doc.text(cat + ':', MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dark);
    const catW = doc.getTextWidth(cat + ':  ');
    const lines = doc.splitTextToSize(items, CONTENT_W - catW);
    doc.text(lines, MARGIN + catW, y);
    y += lines.length * 3.8 + 2;
  });
  y += 2;

  // ===== EXPERIENCE =====
  y = sectionTitle(doc, y, d.experienceTitle);
  d.jobs.forEach((job) => {
    y = checkPage(doc, y, 25);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...COLORS.black);
    doc.text(job.title, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...COLORS.gray);
    doc.text(job.period, MARGIN + CONTENT_W, y, { align: 'right' });
    y += 4.5;
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...COLORS.accent);
    doc.text(job.company, MARGIN, y);
    y += 6;
    job.bullets.forEach((item) => {
      y = bulletPoint(doc, y, item);
    });
    y += 3;
  });

  // ===== PROJECTS =====
  y = sectionTitle(doc, y, d.projectsTitle);
  d.projects.forEach(([name, desc]) => {
    y = checkPage(doc, y, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.black);
    doc.text(name + ': ', MARGIN, y);
    const nameW = doc.getTextWidth(name + ': ');
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.dark);
    const lines = doc.splitTextToSize(desc, CONTENT_W - nameW);
    if (lines.length > 0) {
      doc.text(lines[0], MARGIN + nameW, y);
    }
    if (lines.length > 1) {
      const rest = lines.slice(1);
      doc.text(rest, MARGIN, y + 4);
      y += 4 + rest.length * 3.8;
    }
    y += 5;
  });

  // ===== EDUCATION =====
  y = sectionTitle(doc, y, d.educationTitle);
  d.education.forEach((edu) => {
    y = checkPage(doc, y, 12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...COLORS.black);
    doc.text(edu.title, MARGIN, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...COLORS.gray);
    doc.text(edu.period, MARGIN + CONTENT_W, y, { align: 'right' });
    y += 4;
    doc.setTextColor(...COLORS.dark);
    y = bodyText(doc, y, edu.detail);
    y += 2;
  });

  // ===== FOOTER =====
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...COLORS.gray);
    doc.text(d.footer, MARGIN, 290);
    doc.text(`${i} / ${pageCount}`, PAGE_W - MARGIN, 290, { align: 'right' });
  }

  doc.save('Brayan_Murcia_CV.pdf');
}
