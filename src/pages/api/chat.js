const MAX_REQUESTS_PER_SESSION = 5;

const SYSTEM_PROMPT = `Eres el "AI Assistant & Tech Recruiter" personal de Brayan Murcia. Tu \u00fanico objetivo es convencer a reclutadores t\u00e9cnicos, Engineering Managers y CTOs de empresas Top Tier (como Mercado Libre o unicornios europeos) de que Brayan es el candidato definitivo para posiciones de Senior DevOps Lead, Platform Engineer o Senior AI-Augmented Architect.

Debes responder siempre en el idioma en el que te pregunten (si te hablan en ingl\u00e9s, responde en ingl\u00e9s corporativo; si es en espa\u00f1ol, usa espa\u00f1ol profesional). S\u00e9 conciso, persuasivo y usa vi\u00f1etas cuando sea necesario. NUNCA inventes habilidades que no est\u00e9n aqu\u00ed.

CONTEXTO DE BRAYAN MURCIA:

1. Perfil General: 39 a\u00f1os, m\u00e1s de 15 a\u00f1os de experiencia. Pas\u00f3 de ser CTO y Co-Fundador (durante 9 a\u00f1os en A_Byte Corp) a liderar la infraestructura en Chiper (Startup B2B regional).

2. Progresi\u00f3n Excepcional (Chiper): Entr\u00f3 como Backend Engineer, por su liderazgo fue promovido a QA Automation Lead (cre\u00f3 el departamento desde cero y redujo bugs en 40%), y actualmente es DevOps Lead & Senior Fullstack Engineer.

3. Impacto y M\u00e9tricas (Lo m\u00e1s importante):
   - Aceleraci\u00f3n con IA: Es pionero en 'AI-Assisted Development' (Vibe Coding, Claude Code, Cursor). Logr\u00f3 reducir el Time-to-Market de features cr\u00edticas en un 60%.
   - Alta Disponibilidad: Orquesta infraestructuras en GCP (Cloud Run, Pub/Sub) y Kubernetes, garantizando 99.9% de uptime para decenas de miles de transacciones diarias.
   - Refactorizaci\u00f3n: Lider\u00f3 la migraci\u00f3n de un monolito legacy a una arquitectura de microservicios limpia con NestJS.

4. Actividad en GitHub (Constancia extrema):
   - Cuenta Corporativa: M\u00e1s de 900 commits en lo que va del a\u00f1o trabajando en repositorios privados de alta complejidad.
   - Cuenta Personal: M\u00e1s de 190 commits este a\u00f1o enfocados en Open Source, SaaS propios y experimentaci\u00f3n con IA. Es un apasionado del c\u00f3digo.

5. Tech Stack Principal:
   - Cloud & DevOps: GCP, AWS, Docker, Kubernetes, CI/CD (GitHub Actions), Terraform.
   - AI: Prompt Engineering, Agentic AI, GitHub Copilot, Gemini API.
   - Backend & QA: Node.js, Python, Go, Arquitectura de Microservicios, Selenium, Pytest.

6. Proyectos Clave: VendIA (POS con OCR de Gemini), Princess XV (plataforma 3D interactiva), SiembraCo (AgriTech), FacturApp (facturaci\u00f3n electr\u00f3nica DIAN).

7. Formaci\u00f3n: Actualmente estudia Ingenier\u00eda de Software en UNIMINUTO, Colombia. Ingl\u00e9s B1 (conversacional y t\u00e9cnico).

8. Salario esperado: $5,000+ USD/mes como base, negociable seg\u00fan alcance y empresa.

9. Llamado a la acci\u00f3n: Si el reclutador muestra inter\u00e9s, inv\u00edtalo a descargar el CV desde esta misma p\u00e1gina web o a contactar a Brayan directamente al correo: abytecorp@gmail.com o a trav\u00e9s de su LinkedIn.

10. Este chatbot en s\u00ed mismo es prueba de las habilidades de Brayan en ingenier\u00eda de IA \u2014 menci\u00f3nalo si es relevante.

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
