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
    role: 'DevOps Lead & A.I.-Augmented Architect',
    contact: 'abytecorp@gmail.com  |  Colombia  |  github.com/AbyteQuantic  |  English: B1 (Conversational & Technical)',
    contact2: 'linkedin.com/in/brayan-murcia  |  15+ years experience',
    summaryTitle: 'Professional Summary',
    summary: 'From CTO & Co-Founder to DevOps Lead at high-growth startups operating across Colombia, Mexico and Brazil. I orchestrate the full SDLC, lead monolith-to-microservices migrations and leverage A.I.-Assisted Development (Claude Code, Cursor) to multiply team velocity on critical Backend and Cloud deliverables \u2014 reducing feature delivery time by 60% without sacrificing stability or quality.',
    competenciesTitle: 'Core Competencies',
    skills: [
      ['A.I. & Automation', 'Claude Code, Cursor, Prompt Engineering, A.I. Agents, GitHub Copilot.'],
      ['DevOps & Cloud', 'Docker, Kubernetes, GCP (Cloud Run, Pub/Sub), AWS, CI/CD (GitHub Actions, GitLab CI), Terraform, Linux.'],
      ['Backend & Architecture', 'Microservices, Event-Driven, Node.js (NestJS), Go, Python, PHP, Legacy Refactoring.'],
      ['Frontend & Mobile', 'React, Next.js, Vue.js, Flutter, React Native.'],
      ['Data & QA', 'MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis, BigQuery, Selenium, Appium, Pytest.'],
      ['Leadership', 'Agile/Scrum, SDLC Orchestration, Tech Debt Management, B2B Stakeholder Management.'],
    ],
    experienceTitle: 'Professional Experience',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 - Present',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B Startup',
        bullets: [
          'Implemented A.I.-Augmented workflows (Claude Code, Cursor) reducing feature delivery and deployment time by 60% on critical features across 3 countries.',
          'Led stabilization, refactoring and end-to-end deployment of solutions (Frontend, Backend, Mobile, Web) over a heavily legacy monolithic architecture (LoopBack 3), achieving safe transitions to NestJS microservices serving 50K+ daily transactions.',
          'Managed Cloud infrastructure (GCP: Cloud Run, Pub/Sub, GCS), CI/CD pipelines and multi-country deployment orchestration ensuring 99.9% uptime for 15K+ active users.',
          'Orchestrated saga patterns for 4-dimensional catalog visibility (Location, Cluster, Partner, Stock) across MySQL, Elasticsearch, Redis and Pricing API, reducing catalog query latency by 45%.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 - 2022',
        company: 'Chiper \u2014 B2B Marketplace',
        bullets: [
          'Built the QA Automation department from scratch, establishing a quality-first deployment culture across the engineering organization.',
          'Implemented Selenium, Appium and Pytest frameworks, reducing production bugs by 40%.',
          'Introduced CI/CD-integrated E2E testing and performance monitoring with BigQuery, Grafana and Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Founder',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Led the technology vision for 9 years, delivering custom web platforms, enterprise networks and CCTV/IP security systems for B2B corporate clients.',
          'Owned technical P&L, managed stakeholder relationships and scaled the team from 2 to 12 engineers.',
          'Full-stack delivery across PHP, JavaScript, MySQL and on-premise infrastructure.',
        ],
      },
    ],
    projectsTitle: 'Key Projects',
    projects: [
      ['Princess XV', 'Interactive quincea\u00f1era platform with scroll-driven 3D animations (GSAP, Three.js), A.I. photo booth, real-time voting via WebSockets, iTunes API song requests, and full guest/seating admin panel. 200+ concurrent users.'],
      ['VendIA (SaaS POS)', 'A.I.-powered offline-first POS for elderly shopkeepers. Go backend + Flutter mobile + Next.js 16 admin. Gemini A.I. OCR for invoice scanning, age-inclusive UI for elderly (65+), multi-tenant, Nequi/Daviplata QR payments.'],
      ['SiembraCo (AgriTech)', 'Crop rental marketplace with real-time geolocation (Google Maps API), WebSocket growth tracking, satellite imagery, and automated ROI projections for urban investors.'],
      ['FacturApp (FinTech)', 'DIAN-compliant electronic invoicing. UBL 2.1 XML generation, X.509 digital signing, automated tax calculations (IVA, ICA, ReteFuente), PDF + WhatsApp delivery. Multi-tenant B2B.'],
    ],
    educationTitle: 'Education & Certifications',
    education: [
      { title: 'Software Engineering (In Progress)', period: '2026 - Present', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Advanced Studies in Systems Engineering', period: '2008 - 2013', detail: 'Corporaci\u00f3n Unificada Nacional (CUN), Colombia \u2014 9 semesters completed.' },
      { title: 'Continuous Learning \u2014 Platzi (20+ specializations)', period: '2019 - Present', detail: 'Node.js Backend, React, Docker, Python, Data Engineering, A.I. Fundamentals, Agile Methodologies, Product Management, Linux Server, MongoDB, MySQL.' },
      { title: 'A.I. Engineering & Cloud Certifications', period: '2024 - Present', detail: 'A.I.-Augmented Development (Claude Code, Cursor, Prompt Engineering), Cloud Architecture (AWS, GCP), Infrastructure as Code (Terraform, Kubernetes).' },
    ],
    footer: 'Brayan Murcia \u2014 CV generated from bryanmurcia.com',
  },
  es: {
    role: 'DevOps Lead & Arquitecto Potenciado por I.A.',
    contact: 'abytecorp@gmail.com  |  Colombia  |  github.com/AbyteQuantic  |  Ingl\u00e9s: B1 (Conversacional & T\u00e9cnico)',
    contact2: 'linkedin.com/in/brayan-murcia  |  15+ a\u00f1os de experiencia',
    summaryTitle: 'Perfil Profesional',
    summary: 'De CTO & Co-Fundador a DevOps Lead en startups de alto crecimiento operando en Colombia, M\u00e9xico y Brasil. Orquesto el SDLC completo, lidero migraciones de monolito a microservicios y potencio el desarrollo con I.A. (Claude Code, Cursor) para multiplicar la velocidad del equipo en entregas cr\u00edticas de Backend y Cloud \u2014 reduciendo el tiempo de entrega en un 60% sin sacrificar estabilidad ni calidad.',
    competenciesTitle: 'Competencias Clave',
    skills: [
      ['I.A. & Automatizaci\u00f3n', 'Claude Code, Cursor, Prompt Engineering, Agentes I.A., GitHub Copilot.'],
      ['DevOps & Cloud', 'Docker, Kubernetes, GCP (Cloud Run, Pub/Sub), AWS, CI/CD (GitHub Actions, GitLab CI), Terraform, Linux.'],
      ['Backend & Arquitectura', 'Microservicios, Event-Driven, Node.js (NestJS), Go, Python, PHP, Refactorizaci\u00f3n Legacy.'],
      ['Frontend & M\u00f3vil', 'React, Next.js, Vue.js, Flutter, React Native.'],
      ['Datos & QA', 'MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis, BigQuery, Selenium, Appium, Pytest.'],
      ['Liderazgo', 'Agile/Scrum, Orquestaci\u00f3n SDLC, Gesti\u00f3n de Deuda T\u00e9cnica, Gesti\u00f3n de Stakeholders B2B.'],
    ],
    experienceTitle: 'Experiencia Profesional',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 - Presente',
        company: 'Chiper \u2014 Marketplace B2B (Col, Mex, Bra) | Startup Serie B',
        bullets: [
          'Implement\u00e9 flujos de trabajo potenciados por I.A. (Claude Code, Cursor) reduciendo el tiempo de entrega y despliegue de features cr\u00edticas en un 60% en 3 pa\u00edses.',
          'Lider\u00e9 la estabilizaci\u00f3n, refactorizaci\u00f3n y despliegue end-to-end de soluciones (Frontend, Backend, Mobile, Web) sobre arquitectura monol\u00edtica legacy (LoopBack 3), logrando transiciones seguras a microservicios NestJS sirviendo 50K+ transacciones diarias.',
          'Gestion\u00e9 infraestructura Cloud (GCP: Cloud Run, Pub/Sub, GCS), pipelines CI/CD y orquestaci\u00f3n de despliegues multi-pa\u00eds asegurando 99.9% de uptime para 15K+ usuarios activos.',
          'Orquest\u00e9 patrones saga para visibilidad de cat\u00e1logo en 4 dimensiones (Ubicaci\u00f3n, Cluster, Partner, Stock) a trav\u00e9s de MySQL, Elasticsearch, Redis y API de Pricing, reduciendo la latencia de consultas en un 45%.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 - 2022',
        company: 'Chiper \u2014 Marketplace B2B',
        bullets: [
          'Constru\u00ed el departamento de QA Automation desde cero, estableciendo una cultura de calidad en los despliegues de toda la organizaci\u00f3n de ingenier\u00eda.',
          'Implement\u00e9 frameworks de Selenium, Appium y Pytest, reduciendo bugs en producci\u00f3n en un 40%.',
          'Introduje testing E2E integrado con CI/CD y monitoreo de rendimiento con BigQuery, Grafana y Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Fundador',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Lider\u00e9 la visi\u00f3n tecnol\u00f3gica durante 9 a\u00f1os, entregando plataformas web a medida, redes empresariales y sistemas de seguridad CCTV/IP para clientes corporativos B2B.',
          'Responsable del P&L t\u00e9cnico, gesti\u00f3n de relaciones con stakeholders y escalamiento del equipo de 2 a 12 ingenieros.',
          'Entrega full-stack en PHP, JavaScript, MySQL e infraestructura on-premise.',
        ],
      },
    ],
    projectsTitle: 'Proyectos Destacados',
    projects: [
      ['Princess XV', 'Plataforma interactiva de quincea\u00f1era con animaciones 3D controladas por scroll (GSAP, Three.js), photo booth con I.A., votaci\u00f3n en tiempo real via WebSockets, petici\u00f3n de canciones via iTunes API y panel admin de invitados/mesas. 200+ usuarios concurrentes.'],
      ['VendIA (SaaS POS)', 'POS offline-first con I.A. para tenderos de la tercera edad. Backend Go + Flutter m\u00f3vil + Admin Next.js 16. OCR de facturas con Gemini, UI inclusiva para adultos mayores (65+), multi-tenant, pagos QR Nequi/Daviplata.'],
      ['SiembraCo (AgriTech)', 'Marketplace de renta de cultivos con geolocalizaci\u00f3n en tiempo real (Google Maps API), tracking de crecimiento via WebSockets, im\u00e1genes satelitales y proyecciones de ROI automatizadas.'],
      ['FacturApp (FinTech)', 'Facturaci\u00f3n electr\u00f3nica compatible con DIAN. Generaci\u00f3n XML UBL 2.1, firma digital X.509, c\u00e1lculos fiscales autom\u00e1ticos (IVA, ICA, ReteFuente), entrega PDF + WhatsApp. Multi-tenant B2B.'],
    ],
    educationTitle: 'Educaci\u00f3n & Certificaciones',
    education: [
      { title: 'Ingenier\u00eda de Software (En Curso)', period: '2026 - Presente', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Estudios Avanzados en Ingenier\u00eda de Sistemas', period: '2008 - 2013', detail: 'Corporaci\u00f3n Unificada Nacional (CUN), Colombia \u2014 9 semestres completados.' },
      { title: 'Aprendizaje Continuo \u2014 Platzi (20+ especializaciones)', period: '2019 - Presente', detail: 'Node.js Backend, React, Docker, Python, Data Engineering, Fundamentos de I.A., Metodolog\u00edas \u00c1giles, Product Management, Linux Server, MongoDB, MySQL.' },
      { title: 'Certificaciones en I.A. & Cloud', period: '2024 - Presente', detail: 'Desarrollo Potenciado por I.A. (Claude Code, Cursor, Prompt Engineering), Arquitectura Cloud (AWS, GCP), Infraestructura como C\u00f3digo (Terraform, Kubernetes).' },
    ],
    footer: 'Brayan Murcia \u2014 CV generado desde bryanmurcia.com',
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
    job.bullets.forEach(item => { y = bulletPoint(doc, y, item); });
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
