import { jsPDF } from 'jspdf';

/*
 * ATS-friendly CV: one column, real text, plain header, common section names.
 * The data below is the fact bank. buildCV(lang, profile) can reorder and select
 * these facts for a specific job offer, but never adds new ones.
 */

const C = {
  black: [32, 33, 36],
  dark: [54, 55, 58],
  gray: [110, 110, 114],
  accent: [46, 125, 50],
};

const M = 20;
const PW = 210;
const CW = PW - M * 2;
const LINE_H = 4.1;
const BULLET_INDENT = 6;
const PAGE_BOTTOM = 280;

const LINKS = {
  site: 'https://www.brayanmurcia.lat',
  linkedin: 'https://www.linkedin.com/in/brayan-murcia-sanchez-51121a95/',
  github: 'https://github.com/AbyteQuantic',
  email: 'mailto:abytecorp@gmail.com',
  phone: 'https://wa.me/573223121409',
};

const i18nData = {
  en: {
    role: 'Senior Backend Engineer  |  Go & Node.js/TypeScript  |  Microservices on AWS & GCP',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  Fusagasugá, Colombia (remote)',
      'Portfolio: brayanmurcia.lat  |  linkedin.com/in/brayan-murcia-sanchez-51121a95  |  github.com/AbyteQuantic',
    ],
    metaTitle: 'Brayan Murcia - Senior Backend Engineer - CV',
    summaryTitle: 'Professional Summary',
    summary: 'Senior backend engineer with 7 years at product companies, most of them on a B2B e-commerce platform operating in three countries, after 9 years as CTO of my own software firm. Builds services in Go, Node.js/TypeScript and Java on AWS and GCP. Led a zero-downtime migration from a legacy monolith to Go microservices, cut catalog query latency by 45% and owned infrastructure for 50K+ daily transactions at 99.9% uptime. Works daily with AI coding agents behind automated review gates.',
    skillsTitle: 'Technical Skills',
    skills: [
      ['Backend', 'Go (Golang), Node.js, TypeScript, NestJS, Express, Java, Spring Boot, Kotlin, Python, REST APIs, gRPC, OpenAPI, AsyncAPI.'],
      ['Architecture', 'Microservices, distributed systems, event-driven architecture, Domain-Driven Design, Clean and Hexagonal Architecture, Saga and Strangler Fig patterns.'],
      ['Data & Messaging', 'MySQL, PostgreSQL, DynamoDB, MongoDB, Redis, Elasticsearch, BigQuery, Kafka, AWS SNS/SQS, GCP Pub/Sub.'],
      ['Cloud & DevOps', 'AWS (EKS, S3, SQS, DynamoDB), GCP (Cloud Run, Pub/Sub, GCS), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins), OpenTelemetry, feature flags.'],
      ['Testing & Quality', 'Unit, contract and E2E testing (Jest, JUnit, Pytest, Selenium, Appium), K6 performance testing, Sonar quality gates.'],
      ['AI-Assisted Development', 'Claude Code, Codex and Cursor with LLM review gates in CI; LLM features with the Gemini API.'],
      ['Frontend', 'React, Next.js, TypeScript; Flutter and React Native for mobile.'],
    ],
    softSkillsTitle: 'Soft Skills',
    softSkills: 'Technical leadership of small teams; mentoring developers into new practices (QA automation, AI-assisted development); ownership of production systems; working with business stakeholders (owned technical P&L as CTO and grew a team from 2 to 12).',
    experienceTitle: 'Work Experience',
    jobs: [
      {
        id: 'contract',
        title: 'Full Stack Engineer (Independent Contractor)',
        period: 'Aug 2026 - Present',
        company: 'Justo (Mexico, current) and 1clic (Aug - Nov 2026)',
        location: 'Remote',
        bullets: [
          'Justo: develop Java/Spring Boot and Node.js/TypeScript services on AWS (EKS, DynamoDB, SNS/SQS); contribute to Next.js and Python components and ship staged deployments with feature flags.',
          '1clic: built backend services with Go, Kotlin, MySQL and Kafka, defined API contracts with OpenAPI and AsyncAPI, and built React/TypeScript interfaces for AWS-hosted applications.',
          '1clic: worked with orchestrated AI coding agents behind a pre-PR review gate that combines deterministic checks with specialized LLM reviewers.',
        ],
      },
      {
        id: 'chiper-senior',
        title: 'Senior Full Stack Engineer & DevOps Lead',
        period: 'Jan 2025 - Jul 2026',
        company: 'Chiper (B2B e-commerce)',
        location: 'Colombia',
        bullets: [
          'Led a two-engineer team in a zero-downtime migration of a legacy monolith (LoopBack 3) to Go and NestJS microservices on GCP Cloud Run, using the Strangler Fig and Saga patterns, Clean Architecture, REST/gRPC and Pub/Sub to carve out catalog, cart and checkout for 15K+ active users.',
          'Designed a 4-dimensional catalog visibility system (location, cluster, partner, stock) over MySQL, Elasticsearch and Redis, cutting catalog query latency by 45%.',
          'Owned cloud infrastructure and delivery for services processing 50K+ transactions daily across three countries; kept 99.9% uptime with GCP (Cloud Run, Pub/Sub, GCS), Terraform and CI/CD.',
          'Introduced AI-assisted development (Claude Code, Cursor) to the team, cutting the feature delivery cycle by 60%.',
        ],
      },
      {
        id: 'chiper-qa',
        title: 'QA Automation Lead',
        period: 'Jun 2022 - Jan 2025',
        company: 'Chiper',
        location: 'Colombia',
        bullets: [
          'Built the QA automation practice from scratch: Selenium, Appium and Pytest suites wired into CI/CD reduced production bugs by 40%.',
          'Added E2E testing, performance monitoring with BigQuery and Grafana, and automated reporting through the Jira Cloud REST API.',
        ],
      },
      {
        id: 'chiper-backend',
        title: 'Backend Engineer',
        period: 'Oct 2019 - Jun 2022',
        company: 'Chiper',
        location: 'Colombia',
        bullets: [
          'Built core backend services for the B2B e-commerce platform: REST APIs and relational databases behind daily operations in three countries.',
        ],
      },
      {
        id: 'cto',
        title: 'CTO & Co-Founder',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        location: 'Colombia',
        bullets: [
          'Led technology for 9 years, delivering custom web platforms (PHP, JavaScript, MySQL), enterprise networks and IP security systems for B2B clients.',
          'Owned the technical P&L and client relationships, and grew the engineering team from 2 to 12 people.',
        ],
      },
    ],
    projectsTitle: 'Projects',
    projects: [
      ['VendIA (SaaS POS)', 'Point-of-sale SaaS for neighborhood retail. Go + Flutter + Next.js.'],
      ['bryanCV (AI Portfolio)', 'Portfolio with an AI chatbot (Gemini), recruiter dashboard (Upstash Redis), dynamic PDF CV and telemetry. Next.js on Vercel. Live: brayanmurcia.lat'],
      ['FacturApp (FinTech)', 'Colombian e-invoicing (DIAN): UBL 2.1 XML, X.509 signing, tax calculations, PDF and WhatsApp delivery. Multi-tenant B2B.'],
      ['SiembraCo (AgriTech)', 'Crop rental marketplace with real-time geolocation and WebSocket tracking. NestJS + Python pipeline.'],
      ['Princess XV', 'Interactive event platform with 3D animations (Three.js) and real-time WebSocket voting for 200+ concurrent users.'],
    ],
    defaultProjects: ['VendIA (SaaS POS)', 'bryanCV (AI Portfolio)'],
    educationTitle: 'Education & Training',
    education: [
      { title: 'Software Engineering (in progress)', period: '2026 - Present', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Systems Engineering (9 semesters completed)', period: '2008 - 2013', detail: 'Corporación Unificada Nacional (CUN), Colombia.' },
      { title: 'Continuing education', period: '2019 - Present', detail: 'Platzi (20+ specializations: Node.js, React, Docker, Python, data engineering, AI), plus cloud architecture (AWS, GCP), Terraform and Kubernetes.' },
    ],
    languagesTitle: 'Languages',
    languages: 'Spanish: native  |  English: B1',
  },
  es: {
    role: 'Ingeniero Backend Senior  |  Go y Node.js/TypeScript  |  Microservicios en AWS y GCP',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  Fusagasugá, Colombia (remoto)',
      'Portafolio: brayanmurcia.lat  |  linkedin.com/in/brayan-murcia-sanchez-51121a95  |  github.com/AbyteQuantic',
    ],
    metaTitle: 'Brayan Murcia - Ingeniero Backend Senior - Hoja de vida',
    summaryTitle: 'Perfil profesional',
    summary: 'Ingeniero backend senior con 7 años en empresas de producto, la mayoría en una plataforma de e-commerce B2B que opera en tres países, después de 9 años como CTO de mi propia empresa de software. Construyo servicios en Go, Node.js/TypeScript y Java sobre AWS y GCP. Lideré la migración sin downtime de un monolito legacy a microservicios en Go, reduje 45% la latencia de consultas del catálogo y tuve a cargo la infraestructura de 50K+ transacciones diarias con 99.9% de disponibilidad. Trabajo a diario con agentes de código de IA detrás de gates de revisión automatizados.',
    skillsTitle: 'Habilidades técnicas',
    skills: [
      ['Backend', 'Go (Golang), Node.js, TypeScript, NestJS, Express, Java, Spring Boot, Kotlin, Python, APIs REST, gRPC, OpenAPI, AsyncAPI.'],
      ['Arquitectura', 'Microservicios, sistemas distribuidos, arquitectura orientada a eventos, Domain-Driven Design, Clean y Hexagonal Architecture, patrones Saga y Strangler Fig.'],
      ['Datos y mensajería', 'MySQL, PostgreSQL, DynamoDB, MongoDB, Redis, Elasticsearch, BigQuery, Kafka, AWS SNS/SQS, GCP Pub/Sub.'],
      ['Cloud y DevOps', 'AWS (EKS, S3, SQS, DynamoDB), GCP (Cloud Run, Pub/Sub, GCS), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins), OpenTelemetry, feature flags.'],
      ['Pruebas y calidad', 'Pruebas unitarias, de contrato y E2E (Jest, JUnit, Pytest, Selenium, Appium), pruebas de rendimiento con K6, quality gates con Sonar.'],
      ['Desarrollo asistido por IA', 'Claude Code, Codex y Cursor con gates de revisión con LLM en CI; funciones con LLM usando la API de Gemini.'],
      ['Frontend', 'React, Next.js, TypeScript; Flutter y React Native para móvil.'],
    ],
    softSkillsTitle: 'Habilidades blandas',
    softSkills: 'Liderazgo técnico de equipos pequeños; acompañamiento a desarrolladores en prácticas nuevas (automatización de pruebas, desarrollo asistido por IA); responsabilidad sobre sistemas en producción; trabajo con áreas de negocio (manejé el P&L técnico como CTO y crecí un equipo de 2 a 12 personas).',
    experienceTitle: 'Experiencia laboral',
    jobs: [
      {
        id: 'contract',
        title: 'Full Stack Engineer (Contratista independiente)',
        period: 'Ago 2026 - Presente',
        company: 'Justo (México, actual) y 1clic (ago - nov 2026)',
        location: 'Remoto',
        bullets: [
          'Justo: desarrollo servicios en Java/Spring Boot y Node.js/TypeScript sobre AWS (EKS, DynamoDB, SNS/SQS); contribuyo en componentes de Next.js y Python y hago despliegues graduales con feature flags.',
          '1clic: construí servicios backend con Go, Kotlin, MySQL y Kafka, definí contratos de API con OpenAPI y AsyncAPI y construí interfaces en React/TypeScript para aplicaciones en AWS.',
          '1clic: trabajé con agentes de código de IA orquestados detrás de un gate de revisión previo al PR que combina controles deterministas y revisores LLM especializados.',
        ],
      },
      {
        id: 'chiper-senior',
        title: 'Senior Full Stack Engineer & DevOps Lead',
        period: 'Ene 2025 - Jul 2026',
        company: 'Chiper (e-commerce B2B)',
        location: 'Colombia',
        bullets: [
          'Lideré un equipo de dos ingenieros en la migración sin downtime de un monolito legacy (LoopBack 3) a microservicios en Go y NestJS sobre GCP Cloud Run, con los patrones Strangler Fig y Saga, Clean Architecture, REST/gRPC y Pub/Sub, para separar catálogo, carrito y checkout de 15K+ usuarios activos.',
          'Diseñé un sistema de visibilidad de catálogo en 4 dimensiones (ubicación, cluster, partner, stock) sobre MySQL, Elasticsearch y Redis, que redujo 45% la latencia de consultas.',
          'Tuve a cargo la infraestructura cloud y la entrega de servicios con 50K+ transacciones diarias en tres países; mantuve 99.9% de disponibilidad con GCP (Cloud Run, Pub/Sub, GCS), Terraform y CI/CD.',
          'Introduje el desarrollo asistido por IA (Claude Code, Cursor) en el equipo y reduje 60% el ciclo de entrega de funcionalidades.',
        ],
      },
      {
        id: 'chiper-qa',
        title: 'QA Automation Lead',
        period: 'Jun 2022 - Ene 2025',
        company: 'Chiper',
        location: 'Colombia',
        bullets: [
          'Creé la práctica de automatización de pruebas desde cero: suites de Selenium, Appium y Pytest integradas a CI/CD redujeron 40% los bugs en producción.',
          'Sumé pruebas E2E, monitoreo de rendimiento con BigQuery y Grafana y reportes automáticos con la API REST de Jira Cloud.',
        ],
      },
      {
        id: 'chiper-backend',
        title: 'Backend Engineer',
        period: 'Oct 2019 - Jun 2022',
        company: 'Chiper',
        location: 'Colombia',
        bullets: [
          'Construí servicios backend centrales de la plataforma de e-commerce B2B: APIs REST y bases de datos relacionales detrás de la operación diaria en tres países.',
        ],
      },
      {
        id: 'cto',
        title: 'CTO y Co-Fundador',
        period: '2010 - 2019',
        company: 'A_Byte Corp S.A.S.',
        location: 'Colombia',
        bullets: [
          'Dirigí la tecnología durante 9 años: plataformas web a la medida (PHP, JavaScript, MySQL), redes empresariales y sistemas de seguridad IP para clientes B2B.',
          'Manejé el P&L técnico y la relación con clientes, y crecí el equipo de ingeniería de 2 a 12 personas.',
        ],
      },
    ],
    projectsTitle: 'Proyectos',
    projects: [
      ['VendIA (SaaS POS)', 'SaaS de punto de venta para tiendas de barrio. Go + Flutter + Next.js.'],
      ['bryanCV (Portafolio IA)', 'Portafolio con chatbot de IA (Gemini), dashboard de reclutadores (Upstash Redis), CV en PDF dinámico y telemetría. Next.js en Vercel. En línea: brayanmurcia.lat'],
      ['FacturApp (FinTech)', 'Facturación electrónica DIAN: XML UBL 2.1, firma X.509, cálculo de impuestos, entrega por PDF y WhatsApp. Multi-tenant B2B.'],
      ['SiembraCo (AgriTech)', 'Marketplace de alquiler de cultivos con geolocalización en tiempo real y tracking por WebSocket. NestJS + Python.'],
      ['Princess XV', 'Plataforma interactiva de eventos con animaciones 3D (Three.js) y votación en tiempo real por WebSocket para 200+ usuarios concurrentes.'],
    ],
    defaultProjects: ['VendIA (SaaS POS)', 'bryanCV (Portafolio IA)'],
    educationTitle: 'Educación y formación complementaria',
    education: [
      { title: 'Ingeniería de Software (en curso)', period: '2026 - Presente', detail: 'Universidad Minuto de Dios (UNIMINUTO), Colombia.' },
      { title: 'Ingeniería de Sistemas (9 semestres cursados)', period: '2008 - 2013', detail: 'Corporación Unificada Nacional (CUN), Colombia.' },
      { title: 'Formación complementaria', period: '2019 - Presente', detail: 'Platzi (20+ especializaciones: Node.js, React, Docker, Python, ingeniería de datos, IA), además de arquitectura cloud (AWS, GCP), Terraform y Kubernetes.' },
    ],
    languagesTitle: 'Idiomas',
    languages: 'Español: nativo  |  Inglés: B1',
  },
};

/**
 * Applies a per-offer profile to the fact bank. A profile may replace the headline
 * and summary, reorder skill categories and bullets, and pick projects. It cannot
 * add jobs, bullets or projects that are not in the fact bank.
 *
 * @param {object} base
 * @param {{ role?: string, summary?: string, skillsOrder?: string[], skillsOverride?: Record<string,string>,
 *   bulletOrder?: Record<string, number[]>, projects?: string[], keywords?: string[] }} profile
 */
function applyProfile(base, profile = {}) {
  const order = profile.skillsOrder || [];
  const rank = (cat) => (order.indexOf(cat) === -1 ? order.length : order.indexOf(cat));
  const skills = [...base.skills]
    .map(([cat, items]) => [cat, (profile.skillsOverride && profile.skillsOverride[cat]) || items])
    .sort((a, b) => rank(a[0]) - rank(b[0]));

  const jobs = base.jobs.map((job) => {
    const idx = profile.bulletOrder && profile.bulletOrder[job.id];
    if (!idx) return job;
    const picked = idx.filter((i) => i >= 0 && i < job.bullets.length).map((i) => job.bullets[i]);
    return { ...job, bullets: picked.length ? picked : job.bullets };
  });

  const wanted = profile.projects || base.defaultProjects;
  const projects = wanted
    .map((name) => base.projects.find(([n]) => n === name))
    .filter(Boolean);

  return {
    ...base,
    role: profile.role || base.role,
    summary: profile.summary || base.summary,
    skills,
    jobs,
    projects,
    keywords: profile.keywords || [],
  };
}

/* ── Drawing helpers ── */

function needsNewPage(doc, y, needed = 20) {
  if (y + needed > PAGE_BOTTOM) {
    doc.addPage();
    return M;
  }
  return y;
}

function drawSectionTitle(doc, y, title) {
  y = needsNewPage(doc, y, 16);
  y += 3;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.accent);
  doc.text(title.toUpperCase(), M, y);
  doc.setDrawColor(...C.accent);
  doc.setLineWidth(0.3);
  doc.line(M, y + 1.6, M + CW, y + 1.6);
  doc.setTextColor(...C.black);
  return y + 6.5;
}

function drawBody(doc, y, text, size = 9) {
  y = needsNewPage(doc, y, 8);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(size);
  doc.setTextColor(...C.dark);
  const lines = doc.splitTextToSize(text, CW);
  doc.text(lines, M, y);
  return y + lines.length * LINE_H + 1;
}

function drawBullet(doc, y, text) {
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  const lines = doc.splitTextToSize(text, CW - BULLET_INDENT);
  y = needsNewPage(doc, y, lines.length * LINE_H + 1);
  doc.setTextColor(...C.dark);
  doc.text('-', M + 1.5, y);
  doc.text(lines, M + BULLET_INDENT, y);
  return y + lines.length * LINE_H + 1;
}

function drawLabeledLine(doc, y, label, text) {
  doc.setFontSize(8.8);
  doc.setFont('helvetica', 'bold');
  const labelStr = `${label}: `;
  const labelW = doc.getTextWidth(labelStr);
  doc.setFont('helvetica', 'normal');
  const first = doc.splitTextToSize(text, CW - labelW);
  const rest = first.length > 1 ? doc.splitTextToSize(first.slice(1).join(' '), CW) : [];
  y = needsNewPage(doc, y, (1 + rest.length) * 3.9 + 1);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...C.black);
  doc.text(labelStr, M, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...C.dark);
  doc.text(first[0], M + labelW, y);
  if (rest.length) doc.text(rest, M, y + 3.9);
  return y + (1 + rest.length) * 3.9 + 0.8;
}

function addLink(doc, x, y, w, h, url) {
  try {
    doc.link(x, y - h + 1, w, h, { url });
  } catch {
    /* link annotations are optional */
  }
}

function drawHeader(doc, d) {
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.setTextColor(...C.black);
  doc.text('BRAYAN MURCIA', M, 20);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(...C.accent);
  doc.text(d.role, M, 27);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.8);
  doc.setTextColor(...C.dark);
  const linkTexts = [
    ['abytecorp@gmail.com', LINKS.email],
    ['+57 322 312 1409', LINKS.phone],
    ['brayanmurcia.lat', LINKS.site],
    ['linkedin.com/in/brayan-murcia-sanchez-51121a95', LINKS.linkedin],
    ['github.com/AbyteQuantic', LINKS.github],
  ];
  d.contactLines.forEach((line, i) => {
    const lineY = 33 + i * 4.6;
    doc.text(line, M, lineY);
    linkTexts.forEach(([text, url]) => {
      const pos = line.indexOf(text);
      if (pos >= 0) {
        addLink(doc, M + doc.getTextWidth(line.substring(0, pos)), lineY, doc.getTextWidth(text), 4, url);
      }
    });
  });
  return 33 + d.contactLines.length * 4.6 + 1;
}

/* ── Main ── */

/**
 * Builds the CV document. Without a profile it renders the base CV.
 * @param {'en'|'es'} lang
 * @param {object} [profile] per-offer ordering and selection, see applyProfile
 * @returns {jsPDF}
 */
export function buildCV(lang = 'en', profile) {
  const base = i18nData[lang] || i18nData.en;
  const d = applyProfile(base, profile);
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  doc.setProperties({
    title: d.metaTitle,
    subject: d.role.replace(/\s+\|\s+/g, ' - '),
    author: 'Brayan Murcia',
    creator: 'Brayan Murcia',
    keywords: [...d.keywords, ...d.skills.map(([cat]) => cat)].join(', '),
  });
  doc.setLanguage(lang === 'es' ? 'es-CO' : 'en-US');

  let y = drawHeader(doc, d);

  y = drawSectionTitle(doc, y, d.summaryTitle);
  y = drawBody(doc, y, d.summary);

  y = drawSectionTitle(doc, y, d.skillsTitle);
  d.skills.forEach(([cat, items]) => {
    y = drawLabeledLine(doc, y, cat, items);
  });

  y = drawSectionTitle(doc, y, d.experienceTitle);
  d.jobs.forEach((job) => {
    y = needsNewPage(doc, y, 18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(...C.black);
    doc.text(job.title, M, y);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.gray);
    doc.text(job.period, M + CW, y, { align: 'right' });
    y += 4.4;
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...C.dark);
    doc.text(`${job.company}  |  ${job.location}`, M, y);
    y += 4.8;
    job.bullets.forEach((item) => {
      y = drawBullet(doc, y, item);
    });
    y += 2.2;
  });

  y = drawSectionTitle(doc, y, d.projectsTitle);
  d.projects.forEach(([name, desc]) => {
    y = drawLabeledLine(doc, y, name, desc);
  });

  y = drawSectionTitle(doc, y, d.educationTitle);
  d.education.forEach((edu) => {
    y = needsNewPage(doc, y, 10);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...C.black);
    doc.text(edu.title, M, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...C.gray);
    doc.text(edu.period, M + CW, y, { align: 'right' });
    y += 4.1;
    y = drawBody(doc, y, edu.detail);
    y += 0.8;
  });

  y = drawSectionTitle(doc, y, d.softSkillsTitle);
  y = drawBody(doc, y, d.softSkills);

  y = drawSectionTitle(doc, y, d.languagesTitle);
  drawBody(doc, y, d.languages);

  return doc;
}

export function generateCV(lang = 'en') {
  buildCV(lang).save(`Brayan_Murcia_CV_${lang === 'es' ? 'ES' : 'EN'}.pdf`);
}

export { i18nData as cvFactBank };
