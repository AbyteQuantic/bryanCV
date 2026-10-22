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
      title: '1clic',
      period: 'Aug 2026 – Present',
      role: 'Full Stack Engineer · Contract',
      desc: 'Contract engineering through 1clic: backend services in Go and Kotlin, React + TypeScript front ends, MySQL, Kafka and AWS, with spec-first contracts and an AI-assisted review gate before every PR. Project details are confidential.',
    },
    {
      title: 'Justo',
      period: 'Aug 2026 – Present',
      role: 'Full Stack Engineer · Contract',
      desc: 'Contract engineering for Justo, an online supermarket in Mexico: Java / Spring Boot and Node.js + TypeScript services, Next.js and Python on AWS, shipped behind feature flags with staged rollouts. Project details are confidential.',
    },
    {
      title: 'Chiper',
      period: 'Jan 2025 – Jul 2026',
      role: 'Senior Full Stack Engineer & DevOps Lead',
      desc: 'Owned infrastructure, CI/CD and the monolith-to-microservices migration (LoopBack 3 → NestJS, Go) with saga patterns and zero-downtime deployments, keeping 99.9% uptime on GCP (Cloud Run, Pub/Sub, GCS) for 50K+ daily transactions in three countries. In 2026 led the e-commerce re-platforming: carved catalog, cart and checkout out of the monolith with the Strangler Fig pattern into new Go services. Introduced AI-assisted development (Claude Code, Cursor), cutting feature delivery time by 60%.',
      projects: [
        { name: 'ecommerce-renewal', detail: 'New Go microservices decomposing the B2B e-commerce monolith (2026)' },
        { name: 'reference-catalogue-api', detail: 'Catalog orchestrator microservice (NestJS, saga patterns)' },
        { name: 'catalog-visibility', detail: '4-dimensional catalog system (Location, Cluster, Partner, Stock), 45% lower query latency' },
      ],
    },
    {
      title: 'Chiper',
      period: 'Jun 2022 – Jan 2025',
      role: 'QA Automation Lead',
      desc: 'Built the QA Automation practice from scratch at a Series B B2B marketplace operating in Colombia, Mexico and Brazil. Selenium, Appium and Pytest suites wired into CI/CD reduced production bugs by 40%; added E2E and performance monitoring with BigQuery and Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Selenium + Appium + Pytest pipeline from zero' },
      ],
    },
    {
      title: 'Chiper',
      period: 'Oct 2019 – Jun 2022',
      role: 'Backend Engineer',
      desc: 'Built core backend services for the B2B e-commerce platform: REST APIs and relational databases behind daily operations in Colombia, Mexico and Brazil. Promoted to QA Automation Lead.',
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
      title: '1clic',
      period: 'Ago 2026 – Presente',
      role: 'Full Stack Engineer · Contrato',
      desc: 'Ingeniería por contrato a través de 1clic: servicios backend en Go y Kotlin, front ends en React + TypeScript, MySQL, Kafka y AWS, con contratos spec-first y un gate de revisión asistido por IA antes de cada PR. Los detalles de los proyectos son confidenciales.',
    },
    {
      title: 'Justo',
      period: 'Ago 2026 – Presente',
      role: 'Full Stack Engineer · Contrato',
      desc: 'Ingeniería por contrato para Justo, supermercado en línea en México: servicios en Java / Spring Boot y Node.js + TypeScript, Next.js y Python sobre AWS, desplegados detrás de feature flags con activación gradual. Los detalles de los proyectos son confidenciales.',
    },
    {
      title: 'Chiper',
      period: 'Ene 2025 – Jul 2026',
      role: 'Senior Full Stack Engineer & DevOps Lead',
      desc: 'Responsable de infraestructura, CI/CD y la migración de monolito a microservicios (LoopBack 3 → NestJS, Go) con patrones saga y despliegues sin downtime, con 99.9% de uptime en GCP (Cloud Run, Pub/Sub, GCS) para 50K+ transacciones diarias en tres países. En 2026 lideré la renovación del e-commerce: separé catálogo, carrito y checkout del monolito con el patrón Strangler Fig hacia nuevos servicios en Go. Introduje el desarrollo asistido por IA (Claude Code, Cursor), reduciendo el tiempo de entrega en un 60%.',
      projects: [
        { name: 'ecommerce-renewal', detail: 'Nuevos microservicios en Go descomponiendo el monolito de e-commerce B2B (2026)' },
        { name: 'reference-catalogue-api', detail: 'Microservicio orquestador de catálogo (NestJS, patrones saga)' },
        { name: 'catalog-visibility', detail: 'Sistema de catálogo en 4 dimensiones (Ubicación, Cluster, Partner, Stock), 45% menos latencia en consultas' },
      ],
    },
    {
      title: 'Chiper',
      period: 'Jun 2022 – Ene 2025',
      role: 'QA Automation Lead',
      desc: 'Creé la práctica de QA Automation desde cero en un marketplace B2B Serie B operando en Colombia, México y Brasil. Suites de Selenium, Appium y Pytest integradas a CI/CD redujeron los bugs en producción en un 40%; sumé pruebas E2E y monitoreo de rendimiento con BigQuery y Grafana.',
      projects: [
        { name: 'QA Framework', detail: 'Pipeline Selenium + Appium + Pytest desde cero' },
      ],
    },
    {
      title: 'Chiper',
      period: 'Oct 2019 – Jun 2022',
      role: 'Backend Engineer',
      desc: 'Construí servicios backend centrales de la plataforma e-commerce B2B: APIs REST y bases de datos relacionales detrás de la operación diaria en Colombia, México y Brasil. Ascendido a QA Automation Lead.',
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
