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
    role: 'Senior Full Stack Engineer  |  Backend & AI-Agentic Development',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  brayanmurcia.lat  |  Colombia',
      'linkedin.com/in/brayan-murcia-sanchez-51121a95  |  github.com/AbyteQuantic  |  English B1  |  15+ years',
    ],
    links: {
      site: { text: 'brayanmurcia.lat', url: 'https://www.brayanmurcia.lat' },
      linkedin: { text: 'linkedin.com/in/brayan-murcia-sanchez-51121a95', url: 'https://www.linkedin.com/in/brayan-murcia-sanchez-51121a95/' },
      github: { text: 'github.com/AbyteQuantic', url: 'https://github.com/AbyteQuantic' },
      email: { text: 'abytecorp@gmail.com', url: 'mailto:abytecorp@gmail.com' },
      phone: { text: '+57 322 312 1409', url: 'https://wa.me/573223121409' },
    },
    summaryTitle: 'Professional Summary',
    summary: 'Full Stack Engineer with 15+ years building backend systems and the products on top of them, mostly in Go, Java/Kotlin and Node.js/TypeScript with React, on AWS and GCP. I build with AI agents as part of everyday engineering: orchestrated coding agents, automated review gates before every PR and spec-first contracts, which lets me ship more without lowering the bar. Today I work as a contractor through 1clic and for Justo, an online supermarket in Mexico. Before that I spent nearly 7 years at Chiper, a Series B B2B marketplace in Colombia, Mexico and Brazil, growing from Backend Engineer to QA Automation Lead to Senior Full Stack Engineer & DevOps Lead, where I led the e-commerce re-platforming in Go. That path is why I test what I build and take it to production myself.',
    competenciesTitle: 'Core Competencies',
    skills: [
      ['Backend & Architecture', 'Go, Java (Spring Boot), Kotlin, Node.js (NestJS, Express), Python. Microservices, REST/gRPC, hexagonal & Clean Architecture, DDD, event-driven design, Saga & Strangler Fig, spec-first APIs (OpenAPI, AsyncAPI).'],
      ['Frontend', 'React, TypeScript, Next.js, micro-frontends, React Query, Ant Design. Mobile: Flutter, React Native.'],
      ['AI-Agentic Development', 'Orchestrated coding agents (Claude Code with subagents, Codex, Cursor), LLM review gates in CI, LLM features in products (Gemini API), prompt engineering.'],
      ['Data & Messaging', 'MySQL, PostgreSQL, DynamoDB, MongoDB, Redis, Elasticsearch, Snowflake, BigQuery. Kafka, AWS SNS/SQS, GCP Pub/Sub.'],
      ['Cloud & Delivery', 'AWS (EKS, S3, SQS), GCP (Cloud Run, GCS), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins), OpenTelemetry, feature flags (GrowthBook).'],
      ['Quality', 'Test automation (Pytest, Selenium, Appium, JUnit, Jest), contract and E2E testing, performance testing (K6), Sonar quality gates.'],
    ],
    experienceTitle: 'Professional Experience',
    jobs: [
      {
        title: 'Full Stack Engineer (Contract)',
        period: 'Aug 2026 - Present',
        company: '1clic',
        bullets: [
          'Contract full stack engineering: backend services in Go and Kotlin, React + TypeScript front ends, MySQL, Kafka and AWS, with spec-first contracts (OpenAPI, AsyncAPI).',
          'AI-assisted workflow with a pre-PR gate that combines deterministic checks with specialized LLM reviewers. Project details are confidential.',
        ],
      },
      {
        title: 'Full Stack Engineer (Contract)',
        period: 'Aug 2026 - Present',
        company: 'Justo \u2014 Online supermarket, Mexico',
        bullets: [
          'Contract full stack engineering: Java / Spring Boot and Node.js + TypeScript services, Next.js and Python on AWS (EKS, DynamoDB, SNS/SQS), shipped behind feature flags with staged rollouts. Project details are confidential.',
        ],
      },
      {
        title: 'Senior Full Stack Engineer & DevOps Lead',
        period: 'Jan 2025 - Jul 2026',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B',
        bullets: [
          'Led the 2026 e-commerce re-platforming: carved catalog, cart and checkout out of the legacy monolith with the Strangler Fig pattern and async Pub/Sub into new Go services (Clean Architecture, REST/gRPC) on GCP Cloud Run, with zero downtime. Two-developer squad.',
          'Migrated the monolith to microservices (LoopBack 3 to NestJS and Go) with saga patterns and zero-downtime deployments for 15K+ active users.',
          'Designed a 4-dimensional catalog visibility system (location, cluster, partner, stock) over MySQL, Elasticsearch and Redis, cutting catalog query latency by 45%.',
          'Owned GCP infrastructure (Cloud Run, Pub/Sub, GCS), CI/CD and Terraform: 99.9% uptime for 50K+ daily transactions in three countries.',
          'Introduced AI-assisted development (Claude Code, Cursor) to the team, cutting the feature delivery cycle by 60%.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: 'Jun 2022 - Jan 2025',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B',
        bullets: [
          'Built the QA Automation practice from scratch: Selenium, Appium and Pytest suites wired into CI/CD reduced production bugs by 40%.',
          'Added E2E testing, performance monitoring with BigQuery and Grafana, and automated reporting through the Jira Cloud REST API.',
        ],
      },
      {
        title: 'Backend Engineer',
        period: 'Oct 2019 - Jun 2022',
        company: 'Chiper \u2014 B2B Marketplace (Col, Mex, Bra) | Series B',
        bullets: [
          'Built core backend services for the B2B e-commerce platform: REST APIs and relational databases behind daily operations in three countries. Promoted to QA Automation Lead.',
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
      ['VendIA (SaaS POS)', 'Point-of-sale SaaS for neighborhood retail. Go + Flutter + Next.js.'],
      ['SiembraCo (AgriTech)', 'Crop rental marketplace with real-time geolocation, WebSocket tracking, satellite imagery and ROI projections. NestJS + Python pipeline.'],
      ['Princess XV', 'Interactive event platform with 3D scroll animations (GSAP, Three.js), AI photo booth, real-time WebSocket voting. 200+ concurrent users.'],
      ['FacturApp (FinTech)', 'DIAN-compliant e-invoicing. UBL 2.1 XML, X.509 signing, automated tax calculations, PDF + WhatsApp delivery. Multi-tenant B2B.'],
      ['bryanCV (AI Portfolio)', 'Intelligent portfolio with AI chatbot (Gemini), recruiter dashboard (Upstash Redis + Recharts), dynamic PDF CV (jsPDF), telemetry, hot lead detection. Next.js 15, Framer Motion, Vercel. Live: brayanmurcia.lat'],
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
    role: 'Senior Full Stack Engineer  |  Backend y Desarrollo Agentico con IA',
    contactLines: [
      'abytecorp@gmail.com  |  +57 322 312 1409  |  brayanmurcia.lat  |  Colombia',
      'linkedin.com/in/brayan-murcia-sanchez-51121a95  |  github.com/AbyteQuantic  |  Ingles B1  |  15+ anos',
    ],
    links: {
      site: { text: 'brayanmurcia.lat', url: 'https://www.brayanmurcia.lat' },
      linkedin: { text: 'linkedin.com/in/brayan-murcia-sanchez-51121a95', url: 'https://www.linkedin.com/in/brayan-murcia-sanchez-51121a95/' },
      github: { text: 'github.com/AbyteQuantic', url: 'https://github.com/AbyteQuantic' },
      email: { text: 'abytecorp@gmail.com', url: 'mailto:abytecorp@gmail.com' },
      phone: { text: '+57 322 312 1409', url: 'https://wa.me/573223121409' },
    },
    summaryTitle: 'Perfil Profesional',
    summary: 'Full Stack Engineer con mas de 15 anos construyendo sistemas backend y los productos que corren sobre ellos, sobre todo en Go, Java/Kotlin y Node.js/TypeScript con React, en AWS y GCP. Trabajo con agentes de IA como parte normal de la ingenieria: agentes de codigo orquestados, gates de revision automatica antes de cada PR y contratos spec-first, lo que me permite entregar mas sin bajar el estandar. Hoy trabajo como contractor a traves de 1clic y para Justo, supermercado en linea en Mexico. Antes estuve casi 7 anos en Chiper, marketplace B2B Serie B en Colombia, Mexico y Brasil, donde pase de Backend Engineer a QA Automation Lead y luego a Senior Full Stack Engineer & DevOps Lead, liderando la renovacion del e-commerce en Go. Por ese camino pruebo lo que construyo y lo llevo a produccion yo mismo.',
    competenciesTitle: 'Competencias Clave',
    skills: [
      ['Backend & Arquitectura', 'Go, Java (Spring Boot), Kotlin, Node.js (NestJS, Express), Python. Microservicios, REST/gRPC, arquitectura hexagonal y Clean Architecture, DDD, diseno event-driven, Saga y Strangler Fig, APIs spec-first (OpenAPI, AsyncAPI).'],
      ['Frontend', 'React, TypeScript, Next.js, micro-frontends, React Query, Ant Design. Movil: Flutter, React Native.'],
      ['Desarrollo Agentico con IA', 'Agentes de codigo orquestados (Claude Code con subagentes, Codex, Cursor), gates de revision con LLM en CI, funciones con LLM en producto (Gemini API), prompt engineering.'],
      ['Datos & Mensajeria', 'MySQL, PostgreSQL, DynamoDB, MongoDB, Redis, Elasticsearch, Snowflake, BigQuery. Kafka, AWS SNS/SQS, GCP Pub/Sub.'],
      ['Cloud & Entrega', 'AWS (EKS, S3, SQS), GCP (Cloud Run, GCS), Docker, Kubernetes, Terraform, CI/CD (GitHub Actions, Jenkins), OpenTelemetry, feature flags (GrowthBook).'],
      ['Calidad', 'Automatizacion de pruebas (Pytest, Selenium, Appium, JUnit, Jest), pruebas de contrato y E2E, performance (K6), quality gates con Sonar.'],
    ],
    experienceTitle: 'Experiencia Profesional',
    jobs: [
      {
        title: 'Full Stack Engineer (Contrato)',
        period: 'Ago 2026 - Presente',
        company: '1clic',
        bullets: [
          'Ingenieria full stack por contrato: servicios backend en Go y Kotlin, front ends en React + TypeScript, MySQL, Kafka y AWS, con contratos spec-first (OpenAPI, AsyncAPI).',
          'Flujo de trabajo asistido por IA con un gate antes del PR que combina controles deterministas y revisores LLM especializados. Los detalles de los proyectos son confidenciales.',
        ],
      },
      {
        title: 'Full Stack Engineer (Contrato)',
        period: 'Ago 2026 - Presente',
        company: 'Justo - Supermercado en linea, Mexico',
        bullets: [
          'Ingenieria full stack por contrato: servicios en Java / Spring Boot y Node.js + TypeScript, Next.js y Python sobre AWS (EKS, DynamoDB, SNS/SQS), desplegados detras de feature flags con activacion gradual. Los detalles de los proyectos son confidenciales.',
        ],
      },
      {
        title: 'Senior Full Stack Engineer & DevOps Lead',
        period: 'Ene 2025 - Jul 2026',
        company: 'Chiper - Marketplace B2B (Col, Mex, Bra) | Serie B',
        bullets: [
          'Lidere la renovacion del e-commerce en 2026: separe catalogo, carrito y checkout del monolito legacy con el patron Strangler Fig y Pub/Sub asincrono hacia nuevos servicios en Go (Clean Architecture, REST/gRPC) en GCP Cloud Run, sin downtime. Squad de dos desarrolladores.',
          'Migre el monolito a microservicios (LoopBack 3 a NestJS y Go) con patrones saga y despliegues sin downtime para 15K+ usuarios activos.',
          'Disene un sistema de visibilidad de catalogo en 4 dimensiones (ubicacion, cluster, partner, stock) sobre MySQL, Elasticsearch y Redis, reduciendo la latencia de consultas en un 45%.',
          'Responsable de la infraestructura en GCP (Cloud Run, Pub/Sub, GCS), CI/CD y Terraform: 99.9% de uptime para 50K+ transacciones diarias en tres paises.',
          'Introduje el desarrollo asistido por IA (Claude Code, Cursor) en el equipo, reduciendo el ciclo de entrega de features en un 60%.',
        ],
      },
      {
        title: 'QA Automation Lead',
        period: 'Jun 2022 - Ene 2025',
        company: 'Chiper - Marketplace B2B (Col, Mex, Bra) | Serie B',
        bullets: [
          'Cree la practica de QA Automation desde cero: suites de Selenium, Appium y Pytest integradas a CI/CD redujeron los bugs en produccion en un 40%.',
          'Sume pruebas E2E, monitoreo de rendimiento con BigQuery y Grafana y reportes automaticos con la API REST de Jira Cloud.',
        ],
      },
      {
        title: 'Backend Engineer',
        period: 'Oct 2019 - Jun 2022',
        company: 'Chiper - Marketplace B2B (Col, Mex, Bra) | Serie B',
        bullets: [
          'Construi servicios backend centrales de la plataforma e-commerce B2B: APIs REST y bases de datos relacionales detras de la operacion diaria en tres paises. Ascendido a QA Automation Lead.',
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
      ['VendIA (SaaS POS)', 'SaaS de punto de venta para tiendas de barrio. Go + Flutter + Next.js.'],
      ['SiembraCo (AgriTech)', 'Marketplace de cultivos con geolocalizacion en tiempo real, tracking WebSocket, imagenes satelitales y proyecciones ROI. NestJS + Python.'],
      ['Princess XV', 'Plataforma interactiva con animaciones 3D (GSAP, Three.js), photo booth IA, votacion WebSocket en tiempo real. 200+ usuarios concurrentes.'],
      ['FacturApp (FinTech)', 'Facturacion electronica DIAN. XML UBL 2.1, firma X.509, calculos fiscales automaticos, entrega PDF + WhatsApp. Multi-tenant B2B.'],
      ['bryanCV (Portafolio IA)', 'Portafolio inteligente con chatbot IA (Gemini), dashboard de reclutadores (Upstash Redis + Recharts), CV PDF dinamico (jsPDF), telemetria, deteccion de hot leads. Next.js 15, Framer Motion, Vercel. Live: brayanmurcia.lat'],
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
