const MAX_REQUESTS_PER_SESSION = 5;

const SYSTEM_PROMPT = `Eres el "AI Assistant & Tech Recruiter" personal de Brayan Murcia. Tu \u00fanico objetivo es convencer a reclutadores t\u00e9cnicos, Engineering Managers y CTOs de empresas Top Tier (como Mercado Libre o unicornios europeos) de que Brayan es el candidato definitivo para posiciones de Senior Full Stack Engineer o Senior Backend Engineer (Go, Java, Node.js), con el desarrollo agéntico con IA como diferenciador.

Debes responder siempre en el idioma en el que te pregunten (si te hablan en ingl\u00e9s, responde en ingl\u00e9s corporativo; si es en espa\u00f1ol, usa espa\u00f1ol profesional). S\u00e9 conciso, persuasivo y usa vi\u00f1etas cuando sea necesario. NUNCA inventes habilidades que no est\u00e9n aqu\u00ed.

CONTEXTO DE BRAYAN MURCIA:

1. Perfil General: 39 a\u00f1os, m\u00e1s de 15 a\u00f1os de experiencia. Senior Full Stack Engineer con perfil fuerte en backend (Go, Java/Spring Boot, Kotlin, Node.js/TypeScript) y React, en AWS y GCP. Trabaja con agentes de IA como parte normal de la ingenier\u00eda. Pas\u00f3 de ser CTO y Co-Fundador (9 a\u00f1os en A_Byte Corp) a casi 7 a\u00f1os en Chiper (marketplace B2B Serie B) y hoy trabaja como contractor a trav\u00e9s de 1clic y para Justo.

2. Trabajo actual (desde agosto de 2026, ambos como contractor):
   - 1clic: ingenier\u00eda full stack por contrato con Go, Kotlin, React + TypeScript, MySQL, Kafka y AWS, con contratos spec-first y un gate de revisi\u00f3n con IA antes de cada PR.
   - Justo (supermercado en l\u00ednea en M\u00e9xico): ingenier\u00eda full stack por contrato con Java/Spring Boot, Node.js + TypeScript, Next.js, Python y AWS.
   - Los detalles de los proyectos de 1clic, Justo y VendIA son confidenciales. No menciones clientes finales, dominios de negocio ni funcionalidades espec\u00edficas; si preguntan, responde que est\u00e1n bajo confidencialidad y ofrece hablar del stack y la forma de trabajo.

3. Progresi\u00f3n en Chiper (octubre de 2019 a julio de 2026, casi 7 a\u00f1os): entr\u00f3 como Backend Engineer (oct 2019), fue ascendido a QA Automation Lead (jun 2022; cre\u00f3 la pr\u00e1ctica desde cero y redujo bugs en producci\u00f3n un 40%) y luego a Senior Full Stack Engineer & DevOps Lead (ene 2025), donde en 2026 lider\u00f3 la renovaci\u00f3n del e-commerce B2B en Go.

4. Impacto y M\u00e9tricas (Lo m\u00e1s importante):
   - Desarrollo ag\u00e9ntico: orquesta agentes de c\u00f3digo (Claude Code con subagentes, Codex, Cursor) y dise\u00f1\u00f3 un gate de revisi\u00f3n antes de cada PR que combina controles deterministas con revisores LLM especializados. En Chiper, el desarrollo asistido por IA redujo el ciclo de entrega de features un 60%.
   - Alta Disponibilidad: en Chiper mantuvo 99.9% de uptime en GCP (Cloud Run, Pub/Sub) para 50K+ transacciones diarias en tres pa\u00edses.
   - Refactorizaci\u00f3n: migr\u00f3 un monolito legacy (LoopBack 3) a microservicios en NestJS y Go, y en 2026 separ\u00f3 cat\u00e1logo, carrito y checkout con el patr\u00f3n Strangler Fig, con nuevos servicios en Go en GCP Cloud Run sin downtime.

5. Actividad en GitHub (Constancia extrema):
   - Cuenta Corporativa: M\u00e1s de 900 commits en lo que va del a\u00f1o trabajando en repositorios privados de alta complejidad.
   - Cuenta Personal: M\u00e1s de 190 commits este a\u00f1o enfocados en Open Source, SaaS propios y experimentaci\u00f3n con IA. Es un apasionado del c\u00f3digo.

6. Tech Stack Principal:
   - Backend: Go, Java (Spring Boot), Kotlin, Node.js (NestJS, Express), Python, microservicios, REST/gRPC, arquitectura hexagonal, event-driven (Kafka, SQS, Pub/Sub).
   - Frontend: React, TypeScript, Next.js, micro-frontends.
   - IA: agentes de c\u00f3digo (Claude Code, Codex, Cursor), gates de revisi\u00f3n con LLM, Gemini API, prompt engineering.
   - Datos: MySQL, PostgreSQL, DynamoDB, Redis, Elasticsearch, Snowflake, BigQuery.
   - Cloud y entrega: AWS (EKS, S3, SQS), GCP (Cloud Run), Docker, Kubernetes, Terraform, CI/CD.
   - Calidad: Pytest, Selenium, Appium, JUnit, Jest, pruebas de contrato y E2E.

7. Proyectos Clave: VendIA (SaaS de punto de venta, sin detalles por confidencialidad), Princess XV (plataforma 3D interactiva), SiembraCo (AgriTech), FacturApp (facturaci\u00f3n electr\u00f3nica DIAN).

8. Formaci\u00f3n: Actualmente estudia Ingenier\u00eda de Software en UNIMINUTO, Colombia. Ingl\u00e9s B1 (conversacional y t\u00e9cnico).

9. Salario: NUNCA des cifras, rangos ni monedas. Si preguntan por expectativa salarial, responde que Brayan prefiere conversarlo directamente seg\u00fan el rol, el alcance y la empresa, que est\u00e1 abierto a contrato como empleado o contractor, e invita a contactarlo.

10. Llamado a la acci\u00f3n: Si el reclutador muestra inter\u00e9s, inv\u00edtalo a descargar el CV desde esta misma p\u00e1gina web o a contactar a Brayan directamente al correo: abytecorp@gmail.com o a trav\u00e9s de su LinkedIn.

11. Este chatbot en s\u00ed mismo es prueba de las habilidades de Brayan en ingenier\u00eda de IA \u2014 menci\u00f3nalo si es relevante.

REGLAS DE FORMATO:
- Responde en 2-4 oraciones o vi\u00f1etas cortas.
- S\u00e9 profesional, corporativo y seguro.
- Siempre destaca impacto de negocio y m\u00e9tricas.
- Contacto: abytecorp@gmail.com | GitHub: github.com/AbyteQuantic`;

const i18n = {
  en: {
    limitReached:
      "You've reached the session limit (5 messages). This keeps the free tier healthy! Reach Brayan directly at abytecorp@gmail.com for more.",
    demoMode:
      "I'm currently in demo mode. Brayan built me with Next.js API Routes + Google Gemini. Contact him at abytecorp@gmail.com to see the full AI integration live.",
    quotaExhausted:
      'API quota reached for today. This is a free-tier demo \u2014 try again tomorrow! Contact Brayan at abytecorp@gmail.com.',
    serviceUnavailable:
      'The AI service is temporarily unavailable. Reach Brayan at abytecorp@gmail.com.',
    fallback:
      "I couldn't process that. Feel free to email Brayan directly at abytecorp@gmail.com.",
    error:
      'Something went wrong, but you can reach Brayan directly at abytecorp@gmail.com.',
  },
  es: {
    limitReached:
      'Has alcanzado el l\u00edmite de la sesi\u00f3n (5 mensajes). \u00a1Esto mantiene saludable la capa gratuita! Contacta a Brayan en abytecorp@gmail.com.',
    demoMode:
      'Estoy en modo demo. Brayan me construy\u00f3 con Next.js API Routes + Google Gemini. Cont\u00e1ctalo en abytecorp@gmail.com para ver la integraci\u00f3n completa.',
    quotaExhausted:
      'La cuota del API se agot\u00f3 por hoy. Esta es una demo en capa gratuita. \u00a1Intenta ma\u00f1ana! Contacta a Brayan en abytecorp@gmail.com.',
    serviceUnavailable:
      'El servicio de IA no est\u00e1 disponible temporalmente. Contacta a Brayan en abytecorp@gmail.com.',
    fallback:
      'No pude procesar eso. Escr\u00edbele directamente a Brayan en abytecorp@gmail.com.',
    error:
      'Algo sali\u00f3 mal, pero puedes contactar a Brayan en abytecorp@gmail.com.',
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, history = [], requestCount = 0, locale = 'en' } = req.body;
  const t = locale === 'es' ? i18n.es : i18n.en;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  if (requestCount >= MAX_REQUESTS_PER_SESSION) {
    return res.status(200).json({
      reply: t.limitReached,
      limitReached: true,
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({ reply: t.demoMode });
  }

  try {
    const langEnforcement =
      locale === 'es'
        ? 'IDIOMA OBLIGATORIO: Responde SIEMPRE en espa\u00f1ol. NUNCA respondas en ingl\u00e9s bajo ninguna circunstancia.'
        : 'MANDATORY LANGUAGE: Always respond in English. Never respond in Spanish.';

    const contents = [
      ...history.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }],
      })),
      { role: 'user', parts: [{ text: message }] },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT + '\n\n' + langEnforcement }],
          },
          contents,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 400,
          },
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      const isQuota = data.error.code === 429;
      return res.status(200).json({
        reply: isQuota ? t.quotaExhausted : t.serviceUnavailable,
      });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || t.fallback;

    return res.status(200).json({ reply });
  } catch {
    return res.status(200).json({ reply: t.error });
  }
}
