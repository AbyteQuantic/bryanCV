import { jsPDF } from 'jspdf';

const C = {
  black: [32, 33, 36],
  dark: [54, 55, 58],
  gray: [120, 120, 124],
  accent: [76, 175, 80],
  white: [255, 255, 255],
  lightGray: [200, 200, 200],
};

const M = 24; /* wider margins for breathing room */
const PW = 210;
const CW = PW - M * 2; /* content width */
const LINE_H = 4.2; /* standard line height for 9pt */
const BULLET_INDENT = 8;

const i18nData = {
  en: {
    role: 'Senior DevOps Lead & AI-Augmented Architect',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  brayanmurcia.lat  |  Colombia',
      'linkedin.com/in/brayan-murcia  |  github.com/AbyteQuantic  |  English B1  |  15+ years',
    ],
    links: {
      site: { text: 'brayanmurcia.lat', url: 'https://www.brayanmurcia.lat' },
      linkedin: { text: 'linkedin.com/in/brayan-murcia', url: 'https://www.linkedin.com/in/brayan-murcia/' },
      github: { text: 'github.com/AbyteQuantic', url: 'https://github.com/AbyteQuantic' },
      email: { text: 'abytecorp@gmail.com', url: 'mailto:abytecorp@gmail.com' },
      phone: { text: '+57 322 312 1409', url: 'https://wa.me/573223121409' },
    },
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
      ['Leadership', 'Agile/Scrum, SDLC Orchestration, Tech Debt Management, B2B Stakeholder Management, Team Scaling (2 to 12).'],
    ],
    experienceTitle: 'Professional Experience',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 - Present',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B Startup',
        bullets: [
          'Led Cloud strategy on GCP (Cloud Run, Pub/Sub, GCS), ensuring 99.9% uptime for critical cross-border operations serving 50K+ daily transactions across 3 countries.',
          'Reduced feature delivery cycle by 60% through implementation of AI-Augmented Development workflows (Claude Code, Cursor), multiplying engineering velocity without sacrificing code quality.',
          'Orchestrated safe monolith-to-microservices migration (LoopBack 3 to NestJS, Go) with saga patterns and zero-downtime deployments, serving 15K+ active users.',
          'Designed 4-dimensional catalog visibility system (Location, Cluster, Partner, Stock) across MySQL, Elasticsearch, Redis and ms-pricing API, reducing catalog query latency by 45%.',
          'Managed CI/CD pipelines, multi-country deployment orchestration and infrastructure-as-code with Terraform and Docker.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 - 2022',
        company: 'Chiper \u2014 B2B Marketplace',
        bullets: [
          'Built the QA Automation department from scratch, establishing a quality-first deployment culture across the engineering organization.',
          'Implemented Selenium, Appium and Pytest frameworks integrated directly into CI/CD pipelines, reducing production bugs by 40%.',
          'Introduced E2E testing, performance monitoring with BigQuery and Grafana, and automated reporting via Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Founder',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Led the technology vision for 9 years, delivering custom web platforms, enterprise networks and CCTV/IP security systems for B2B corporate clients.',
          'Owned technical P&L, managed stakeholder relationships and scaled the engineering team from 2 to 12 members.',
          'Full-stack delivery across PHP, JavaScript, MySQL and on-premise infrastructure. Key projects: Princess XV, FacturApp.',
        ],
      },
    ],
    projectsTitle: 'Strategic Projects',
    projects: [
      ['VendIA (SaaS POS)', 'AI-powered offline-first POS for traditional retail. Go + Flutter + Next.js. Gemini AI OCR, age-inclusive UI (65+), multi-tenant, QR payments. End-to-end SaaS scaling.'],
      ['SiembraCo (AgriTech)', 'Crop rental marketplace with real-time geolocation, WebSocket tracking, satellite imagery and ROI projections. NestJS + Python pipeline.'],
      ['Princess XV', 'Interactive event platform with 3D scroll animations (GSAP, Three.js), AI photo booth, real-time WebSocket voting. 200+ concurrent users.'],
      ['FacturApp (FinTech)', 'DIAN-compliant e-invoicing. UBL 2.1 XML, X.509 signing, automated tax calculations, PDF + WhatsApp delivery. Multi-tenant B2B.'],
    ],
    educationTitle: 'Education & Certifications',
    education: [
      { title: 'Software Engineering (In Progress)', period: '2026 - Present', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Systems Engineering (Advanced Studies)', period: '2008 - 2013', detail: 'Corporacion Unificada Nacional (CUN), Colombia. 9 semesters completed.' },
      { title: 'Continuous Learning - Platzi (20+ specializations)', period: '2019 - Present', detail: 'Node.js, React, Docker, Python, Data Engineering, AI Fundamentals, Agile, Product Management.' },
      { title: 'AI Engineering & Cloud Certifications', period: '2024 - Present', detail: 'Claude Code, Cursor, Prompt Engineering, Cloud Architecture (AWS, GCP), IaC (Terraform, K8s).' },
    ],
    footer: 'Brayan Murcia  |  brayanmurcia.lat  |  CV generated dynamically with Next.js + jsPDF',
  },
  es: {
    role: 'Senior DevOps Lead & Arquitecto AI-Augmented',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  brayanmurcia.lat  |  Colombia',
      'linkedin.com/in/brayan-murcia  |  github.com/AbyteQuantic  |  Ingles B1  |  15+ anos',
    ],
    links: {
      site: { text: 'brayanmurcia.lat', url: 'https://www.brayanmurcia.lat' },
      linkedin: { text: 'linkedin.com/in/brayan-murcia', url: 'https://www.linkedin.com/in/brayan-murcia/' },
      github: { text: 'github.com/AbyteQuantic', url: 'https://github.com/AbyteQuantic' },
      email: { text: 'abytecorp@gmail.com', url: 'mailto:abytecorp@gmail.com' },
      phone: { text: '+57 322 312 1409', url: 'https://wa.me/573223121409' },
    },
    summaryTitle: 'Perfil Profesional',
    summary: 'Senior DevOps Lead & Arquitecto AI con mas de 15 anos de trayectoria. De CTO & Co-Fundador (9 anos construyendo A_Byte Corp) a lider de infraestructura en Chiper, startup Serie B operando en Colombia, Mexico y Brasil. Experto en orquestacion Cloud (GCP, Kubernetes, Terraform) y pionero en la integracion de IA Agentica en el SDLC, logrando una reduccion del 60% en el Time-to-Market manteniendo 99.9% de uptime con 50K+ transacciones diarias.',
    competenciesTitle: 'Competencias Clave',
    skills: [
      ['Cloud & Infraestructura', 'GCP (Cloud Run, Pub/Sub, GCS), AWS, Kubernetes, Docker, Terraform, CI/CD (GitHub Actions, GitLab CI), Linux.'],
      ['IA & Productividad', 'Prompt Engineering, IA Agentica, Claude Code, Cursor, SDLC Asistido por IA, GitHub Copilot, Gemini API.'],
      ['Backend & Arquitectura', 'Node.js (NestJS), Go, Python, Microservicios, Diseno Event-Driven, Patrones Saga, Refactorizacion Legacy.'],
      ['Frontend & Movil', 'React, Next.js, Vue.js, Flutter, React Native.'],
      ['Datos & Observabilidad', 'MySQL, PostgreSQL, MongoDB, Elasticsearch, Redis, BigQuery, Grafana.'],
      ['QA & Resiliencia', 'Selenium, Appium, Pytest, K6 (Performance), Testing E2E, Pipelines QA en CI/CD.'],
      ['Liderazgo', 'Agile/Scrum, Orquestacion SDLC, Gestion de Deuda Tecnica, Stakeholders B2B, Escalamiento de Equipos (2 a 12).'],
    ],
    experienceTitle: 'Experiencia Profesional',
    jobs: [
      {
        title: 'DevOps Lead & Senior Fullstack Engineer',
        period: '2022 - Presente',
        company: 'Chiper - Marketplace B2B (Col, Mex, Bra) | Startup Serie B',
        bullets: [
          'Lidere la estrategia Cloud en GCP (Cloud Run, Pub/Sub, GCS), garantizando 99.9% de uptime para operaciones criticas transfronterizas sirviendo 50K+ transacciones diarias en 3 paises.',
          'Reduccion del 60% en el ciclo de entrega de features mediante flujos AI-Augmented Development (Claude Code, Cursor), multiplicando la velocidad de ingenieria.',
          'Orqueste la migracion de monolitos (LoopBack 3) hacia microservicios (NestJS, Go) con patrones saga y despliegues sin downtime para 15K+ usuarios activos.',
          'Disene sistema de visibilidad de catalogo en 4 dimensiones (Ubicacion, Cluster, Partner, Stock) reduciendo la latencia de consultas en un 45%.',
          'Gestione pipelines CI/CD, orquestacion de despliegues multi-pais e infraestructura como codigo con Terraform y Docker.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: '2019 - 2022',
        company: 'Chiper - Marketplace B2B',
        bullets: [
          'Cree el departamento de QA Automation desde cero, estableciendo cultura quality-first en toda la organizacion.',
          'Implemente Selenium, Appium y Pytest integrados en CI/CD, reduciendo bugs en produccion en un 40%.',
          'Introduje testing E2E, monitoreo con BigQuery y Grafana, y reportes automatizados via Jira Cloud REST API.',
        ],
      },
      {
        title: 'CTO & Co-Fundador',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        bullets: [
          'Lidere la vision tecnologica durante 9 anos, entregando plataformas web, redes empresariales y sistemas CCTV/IP para clientes B2B.',
          'Responsable del P&L tecnico, gestion de stakeholders y escalamiento del equipo de 2 a 12 ingenieros.',
          'Entrega full-stack en PHP, JavaScript, MySQL e infraestructura on-premise. Proyectos clave: Princess XV, FacturApp.',
        ],
      },
    ],
    projectsTitle: 'Proyectos Estrategicos',
    projects: [
      ['VendIA (SaaS POS)', 'POS offline-first con IA para retail tradicional. Go + Flutter + Next.js. OCR Gemini AI, UI inclusiva (65+), multi-tenant, pagos QR. Escalamiento SaaS end-to-end.'],
      ['SiembraCo (AgriTech)', 'Marketplace de cultivos con geolocalizacion en tiempo real, tracking WebSocket, imagenes satelitales y proyecciones ROI. NestJS + Python.'],
      ['Princess XV', 'Plataforma interactiva con animaciones 3D (GSAP, Three.js), photo booth IA, votacion WebSocket en tiempo real. 200+ usuarios concurrentes.'],
      ['FacturApp (FinTech)', 'Facturacion electronica DIAN. XML UBL 2.1, firma X.509, calculos fiscales automaticos, entrega PDF + WhatsApp. Multi-tenant B2B.'],
    ],
    educationTitle: 'Educacion & Certificaciones',
    education: [
      { title: 'Ingenieria de Software (En Curso)', period: '2026 - Presente', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Ingenieria de Sistemas (Estudios Avanzados)', period: '2008 - 2013', detail: 'Corporacion Unificada Nacional (CUN), Colombia. 9 semestres completados.' },
      { title: 'Aprendizaje Continuo - Platzi (20+ especializaciones)', period: '2019 - Presente', detail: 'Node.js, React, Docker, Python, Data Engineering, Fundamentos IA, Agile, Product Management.' },
      { title: 'Certificaciones IA & Cloud', period: '2024 - Presente', detail: 'Claude Code, Cursor, Prompt Engineering, Arquitectura Cloud (AWS, GCP), IaC (Terraform, K8s).' },
    ],
    footer: 'Brayan Murcia  |  brayanmurcia.lat  |  CV generado dinamicamente con Next.js + jsPDF',
  },
};

/* ── Helpers ── */

function needsNewPage(doc, y, needed = 20) {
  if (y + needed > 275) {
    doc.addPage();
    return M;
  }
  return y;
}

function drawSectionTitle(doc, y, title) {
  y = needsNewPage(doc, y, 18);
  y += 4; /* breathing room above line */
  doc.setFillColor(...C.accent);
  doc.rect(M, y, CW, 0.6, 'F');
  y += 7;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.accent);
  doc.text(title.toUpperCase(), M, y);
  y += 7; /* breathing room below title */
  doc.setTextColor(...C.black);
  return y;
}

function drawBody(doc, y, text, opts = {}) {
  const { bold = false, size = 9, indent = 0 } = opts;
  y = needsNewPage(doc, y, 8);
  doc.setFont('helvetica', bold ? 'bold' : 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...(opts.color || C.dark));
  const lines = doc.splitTextToSize(text, CW - indent);
  doc.text(lines, M + indent, y);
  return y + lines.length * LINE_H + 1.5;
}

function drawBullet(doc, y, text) {
  y = needsNewPage(doc, y, 10);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.dark);
  doc.setFillColor(...C.accent);
  doc.circle(M + 3, y - 1.2, 0.9, 'F');
  const lines = doc.splitTextToSize(text, CW - BULLET_INDENT);
  doc.text(lines, M + BULLET_INDENT, y);
  return y + lines.length * LINE_H + 1.5;
}

function addLink(doc, x, y, w, h, url) {
  try {
    doc.link(x, y - h + 1, w, h, { url });
  } catch {
    /* jsPDF link not supported in all builds — graceful fallback */
  }
}

/* ── Main export ── */

export function generateCV(lang = 'en') {
  const d = i18nData[lang] || i18nData.en;
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });

  /* ===== HEADER (dark bar) ===== */
  doc.setFillColor(...C.black);
  doc.rect(0, 0, PW, 52, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(...C.white);
  doc.text('BRAYAN MURCIA', M, 20);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(...C.accent);
  doc.text(d.role, M, 29);

  /* Contact lines with more line-height */
  doc.setFontSize(8.5);
  doc.setTextColor(...C.lightGray);
  doc.text(d.contactLines[0], M, 38);
  doc.text(d.contactLines[1], M, 44);

  /* Clickable links in header */
  const lk = d.links;
  [lk.email, lk.phone, lk.site, lk.linkedin, lk.github].forEach((link) => {
    /* Find text position in contact lines to add link annotation */
    for (let lineIdx = 0; lineIdx < d.contactLines.length; lineIdx++) {
      const lineY = lineIdx === 0 ? 38 : 44;
      const pos = d.contactLines[lineIdx].indexOf(link.text);
      if (pos >= 0) {
        doc.setFontSize(8.5);
        const before = d.contactLines[lineIdx].substring(0, pos);
        const xOff = doc.getTextWidth(before);
        const linkW = doc.getTextWidth(link.text);
        addLink(doc, M + xOff, lineY, linkW, 4, link.url);
      }
    }
  });

  let y = 60;

  /* ===== SUMMARY ===== */
  y = drawSectionTitle(doc, y, d.summaryTitle);
  y = drawBody(doc, y, d.summary);
  y += 2;

  /* ===== COMPETENCIES ===== */
  y = drawSectionTitle(doc, y, d.competenciesTitle);
  d.skills.forEach(([cat, items]) => {
    y = needsNewPage(doc, y, 10);

    /* Category label in bold */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.black);
    const catLabel = cat + ':  ';
    doc.text(catLabel, M, y);
    const catW = doc.getTextWidth(catLabel);

    /* Skills text in normal — wraps under category if long */
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(...C.dark);
    const availW = CW - catW;
    const skillLines = doc.splitTextToSize(items, availW);

    /* First line next to category */
    if (skillLines.length > 0) {
      doc.text(skillLines[0], M + catW, y);
    }
    /* Remaining lines below, full width */
    if (skillLines.length > 1) {
      const rest = skillLines.slice(1);
      doc.text(rest, M, y + 3.8);
      y += rest.length * 3.8;
    }
    y += 4.5;
  });
  y += 1;

  /* ===== EXPERIENCE ===== */
  y = drawSectionTitle(doc, y, d.experienceTitle);
  d.jobs.forEach((job) => {
    y = needsNewPage(doc, y, 28);

    /* Title left, period right — same Y */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(...C.black);
    doc.text(job.title, M, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.gray);
    doc.text(job.period, M + CW, y, { align: 'right' });

    y += 5;

    /* Company */
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...C.accent);
    doc.text(job.company, M, y);
    y += 6;

    /* Bullets */
    job.bullets.forEach((item) => {
      y = drawBullet(doc, y, item);
    });
    y += 4;
  });

  /* ===== PROJECTS (now with bullets) ===== */
  y = drawSectionTitle(doc, y, d.projectsTitle);
  d.projects.forEach(([name, desc]) => {
    y = needsNewPage(doc, y, 14);

    /* Project name as bold inline prefix in bullet */
    const fullText = name + ':  ' + desc;
    y = needsNewPage(doc, y, 10);
    doc.setFillColor(...C.accent);
    doc.circle(M + 3, y - 1.2, 0.9, 'F');

    /* Render name bold + desc normal on same logical block */
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.black);
    const nameStr = name + ':  ';
    doc.text(nameStr, M + BULLET_INDENT, y);
    const nameW = doc.getTextWidth(nameStr);

    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C.dark);
    const descLines = doc.splitTextToSize(desc, CW - BULLET_INDENT - nameW);

    if (descLines.length > 0) {
      doc.text(descLines[0], M + BULLET_INDENT + nameW, y);
    }
    if (descLines.length > 1) {
      const rest = doc.splitTextToSize(
        descLines.slice(1).join(' '),
        CW - BULLET_INDENT
      );
      doc.text(rest, M + BULLET_INDENT, y + LINE_H);
      y += rest.length * LINE_H;
    }
    y += LINE_H + 2;
  });

  /* ===== EDUCATION ===== */
  y = drawSectionTitle(doc, y, d.educationTitle);
  d.education.forEach((edu) => {
    y = needsNewPage(doc, y, 14);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.black);
    doc.text(edu.title, M, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.gray);
    doc.text(edu.period, M + CW, y, { align: 'right' });
    y += 4.5;

    doc.setTextColor(...C.dark);
    y = drawBody(doc, y, edu.detail);
    y += 2;
  });

  /* ===== FOOTER on every page ===== */
  const pages = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setTextColor(...C.gray);
    doc.text(d.footer, M, 288);
    doc.text(`${i} / ${pages}`, PW - M, 288, { align: 'right' });
    /* Footer link to site */
    addLink(doc, M, 288, doc.getTextWidth(d.footer), 3, 'https://www.brayanmurcia.lat');
  }

  doc.save('Brayan_Murcia_CV.pdf');
}
