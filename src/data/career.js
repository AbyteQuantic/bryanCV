/**
 * Shared career data (experience + education) used by both the homepage
 * ExperienceSection and the /story page. Single source of truth so the
 * timeline shown on the index mirrors the dynamic CV (generateCV.js).
 *
 * @typedef {{ name: string, detail: string }} CareerProject
 * @typedef {{ title: string, period: string, role: string, desc: string, projects?: CareerProject[] }} CareerItem
 */

export const education = {
  en: [
    {
      title: 'Corporación Unificada Nacional (CUN)',
      period: '2008 – 2013',
      role: 'Systems Engineering — Advanced Studies',
      desc: '9 semesters of systems engineering covering software architecture, networking, databases and distributed systems. Strong theoretical foundation supporting 15+ years of engineering leadership.',
    },
    {
      title: 'Platzi — Tech Career Paths',
      period: '2019 – Present',
      role: 'Continuous Learning',
      desc: '20+ specializations including Node.js Backend, Frontend JavaScript, React, Docker, Python, Data Engineering, AI Fundamentals, Agile Methodologies and Product Management.',
    },
    {
      title: 'AI Engineering & Cloud Certifications',
      period: '2024 – Present',
      role: 'Specialization Track',
      desc: 'Deep-diving into AI-Augmented Development (Claude Code, Cursor, Prompt Engineering), Cloud Architecture (AWS, GCP) and Infrastructure as Code (Terraform, Kubernetes).',
    },
    {
      title: 'Universidad Minuto de Dios (UNIMINUTO)',
      period: '2026 – Present',
      role: 'Software Engineering (In Progress)',
      desc: 'University degree in software engineering complementing 15+ years of hands-on industry experience.',
    },
  ],
  es: [
    {
      title: 'Corporación Unificada Nacional (CUN)',
      period: '2008 – 2013',
      role: 'Ingeniería de Sistemas — Estudios Avanzados',
      desc: '9 semestres de formación en ingeniería de sistemas cubriendo arquitectura de software, redes, bases de datos y sistemas distribuidos. Base teórica sólida que respalda 15+ años de liderazgo en ingeniería.',
    },
    {
      title: 'Platzi — Rutas de Carrera Tech',
      period: '2019 – Presente',
      role: 'Aprendizaje Continuo',
      desc: '20+ especializaciones incluyendo Backend con Node.js, Frontend JavaScript, React, Docker, Python, Ingeniería de Datos, Fundamentos de IA, Metodologías Ágiles y Gestión de Producto.',
    },
    {
      title: 'Certificaciones en IA y Cloud',
      period: '2024 – Presente',
      role: 'Especialización',
      desc: 'Profundizando en Desarrollo Aumentado con IA (Claude Code, Cursor, Prompt Engineering), Arquitectura Cloud (AWS, GCP) e Infraestructura como Código (Terraform, Kubernetes).',
    },
    {
      title: 'Universidad Minuto de Dios (UNIMINUTO)',
      period: '2026 – Presente',
      role: 'Ingeniería de Software (En Curso)',
      desc: 'Formación universitaria en ingeniería de software complementando 15+ años de experiencia práctica en la industria.',
    },
  ],
};

export const experience = {
  en: [
    {
      title: 'Chiper',
      period: 'Jan 2026 – Present',
      role: 'Full Stack Developer — E-commerce Modernization Lead',
      desc: 'Leading the end-to-end renewal of the B2B e-commerce platform: decomposing the legacy monolith into a clean Go microservices ecosystem (Strangler Fig, bounded contexts, async Pub/Sub) with zero-downtime, incremental migration. Designing and building new services in Go (Clean Architecture, REST/gRPC, goroutines, observability) deployed to GCP Cloud Run. Delivered as a lean 2-developer squad with full ownership, leveraging AI-assisted development (Claude Code, Cursor).',
      projects: [
        { name: 'ecommerce-renewal', detail: 'New Go microservices decomposing the B2B e-commerce monolith (2026)' },
        { name: 'reference-catalogue-api', detail: 'Catalog orchestrator microservice (NestJS, saga patterns)' },
        { name: 'ms-pricing', detail: 'Isolated pricing engine for multi-location B2B' },
      ],
    },
    {
      title: 'Chiper',
      period: '2022 – 2025',
      role: 'Fullstack Engineer & DevOps Lead',
      desc: 'Led infrastructure, CI/CD and the monolith-to-microservices migration (LoopBack 3 → NestJS, Go) with saga patterns and zero-downtime deployments. Drove AI-Augmented workflows (Claude Code, Cursor) cutting feature delivery time by 60% while sustaining 99.9% uptime on GCP (Cloud Run, Pub/Sub, GCS) for 50K+ daily cross-border transactions.',
      projects: [
        { name: 'catalog-visibility', detail: '4-dimensional catalog system (Location, Cluster, Partner, Stock)' },
        { name: 'VendIA', detail: 'AI-powered POS with Gemini OCR for invoice processing (personal, 2026)' },
        { name: 'bryanCV', detail: 'AI-powered portfolio with chatbot, recruiter dashboard & dynamic CV (brayanmurcia.lat, 2026)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2019 – 2022',
      role: 'QA Automation Lead',
      desc: 'Built the QA Automation department from scratch at a Series B startup operating in Colombia, Mexico and Brazil. Implemented Selenium, Appium and Pytest frameworks, reducing production bugs by 40%. Introduced CI/CD-integrated E2E testing and performance monitoring with BigQuery and Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Selenium + Appium + Pytest pipeline from zero' },
        { name: 'SiembraCo', detail: 'AgriTech platform for crop management (personal project, 2025)' },
      ],
    },
    {
      title: 'A_Byte Corp S.A.S.',
      period: '2010 – 2019',
      role: 'CTO & Co-Founder',
      desc: 'Led the technology vision for 9 years, delivering custom web platforms, enterprise networks and CCTV/IP security systems for B2B corporate clients. Owned technical P&L, managed stakeholder relationships and scaled the team from 2 to 12 engineers. Full-stack delivery across PHP, JavaScript, MySQL and on-premise infrastructure.',
      projects: [
        { name: 'Princess XV', detail: '3D interactive web platform for luxury yachts' },
        { name: 'FacturApp', detail: 'Electronic invoicing system (DIAN compliance)' },
      ],
    },
  ],
  es: [
    {
      title: 'Chiper',
      period: 'Ene 2026 – Presente',
      role: 'Full Stack Developer — Líder de Renovación E-commerce',
      desc: 'Lidero la renovación integral de la plataforma e-commerce B2B: descompongo el monolito legacy en un ecosistema limpio de microservicios en Go (Strangler Fig, bounded contexts, Pub/Sub asíncrono) con migración incremental y sin downtime. Diseño y construyo nuevos servicios en Go (Clean Architecture, REST/gRPC, goroutines, observabilidad) desplegados en GCP Cloud Run. Lo saco adelante en un squad compacto de 2 desarrolladores con ownership total, apalancado en desarrollo asistido por IA (Claude Code, Cursor).',
      projects: [
        { name: 'ecommerce-renewal', detail: 'Nuevos microservicios en Go descomponiendo el monolito de e-commerce B2B (2026)' },
        { name: 'reference-catalogue-api', detail: 'Microservicio orquestador de catálogo (NestJS, patrones saga)' },
        { name: 'ms-pricing', detail: 'Motor de precios aislado para B2B multi-ubicación' },
      ],
    },
    {
      title: 'Chiper',
      period: '2022 – 2025',
      role: 'Fullstack Engineer & DevOps Lead',
      desc: 'Lideré infraestructura, CI/CD y la migración de monolito a microservicios (LoopBack 3 → NestJS, Go) con patrones saga y despliegues sin downtime. Impulsé flujos con IA (Claude Code, Cursor) reduciendo el tiempo de entrega en un 60% manteniendo 99.9% de uptime en GCP (Cloud Run, Pub/Sub, GCS) para 50K+ transacciones transfronterizas diarias.',
      projects: [
        { name: 'catalog-visibility', detail: 'Sistema de catálogo en 4 dimensiones (Ubicación, Cluster, Partner, Stock)' },
        { name: 'VendIA', detail: 'POS con IA y OCR de Gemini para procesamiento de facturas (personal, 2026)' },
        { name: 'bryanCV', detail: 'Portafolio con IA, chatbot, dashboard de reclutadores y CV dinámico (brayanmurcia.lat, 2026)' },
      ],
    },
    {
      title: 'Chiper',
      period: '2019 – 2022',
      role: 'QA Automation Lead',
      desc: 'Creó el departamento de QA Automation desde cero en una startup Serie B operando en Colombia, México y Brasil. Implementó frameworks de Selenium, Appium y Pytest, reduciendo bugs en producción en un 40%. Introdujo testing E2E integrado con CI/CD y monitoreo de rendimiento con BigQuery y Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Pipeline Selenium + Appium + Pytest desde cero' },
        { name: 'SiembraCo', detail: 'Plataforma AgriTech para gestión de cultivos (proyecto personal, 2025)' },
      ],
    },
    {
      title: 'A_Byte Corp S.A.S.',
      period: '2010 – 2019',
      role: 'CTO y Co-Fundador',
      desc: 'Lideró la visión tecnológica durante 9 años, entregando plataformas web personalizadas, redes corporativas y sistemas de seguridad CCTV/IP para clientes B2B. Responsable del P&L técnico, gestión de stakeholders y escalamiento del equipo de 2 a 12 ingenieros. Entrega full-stack en PHP, JavaScript, MySQL e infraestructura on-premise.',
      projects: [
        { name: 'Princess XV', detail: 'Plataforma web 3D interactiva para yates de lujo' },
        { name: 'FacturApp', detail: 'Sistema de facturación electrónica (cumplimiento DIAN)' },
      ],
    },
  ],
};
