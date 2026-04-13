---
#preview
title: "bryanCV — Portafolio AI-Powered"
titleEn: "bryanCV — AI-Powered Portfolio"
image: /img/portfolio/1.svg
category: Fullstack & AI
short: "Portafolio profesional con chatbot IA (C.H.R.I.S.), dashboard de reclutadores, generacion dinamica de CV y telemetria en tiempo real."
shortEn: "Professional portfolio with AI chatbot (C.H.R.I.S.), recruiter insights dashboard, dynamic CV generation and real-time telemetry."

#full details
details:
    - label: "Rol:"
      labelEn: "Role:"
      value: "Fullstack Architect & AI Engineer"

    - label: "Fecha:"
      labelEn: "Date:"
      value: "2026"

    - label: "$category"

description:
    enabled: 1
    content: "
        <p><strong>Contexto:</strong> Los portafolios tradicionales son paginas estaticas que no convierten. bryanCV es un portafolio inteligente disenado para atraer reclutadores de empresas Top Tier, con un asistente de IA entrenado con mi perfil profesional, tracking de visitantes y generacion dinamica de CV.</p>
        <p><strong>El Reto:</strong> Construir un sistema completo que combine UI corporativa premium, inteligencia artificial conversacional, telemetria en tiempo real y un panel de administracion privado — todo en un solo proyecto Next.js desplegado en Vercel.</p>
    "
    contentEn: "
        <p><strong>Context:</strong> Traditional portfolios are static pages that don't convert. bryanCV is an intelligent portfolio designed to attract Top Tier recruiters, featuring an AI assistant trained on my professional profile, visitor tracking and dynamic CV generation.</p>
        <p><strong>The Challenge:</strong> Build a complete system combining premium corporate UI, conversational AI, real-time telemetry and a private admin dashboard — all in a single Next.js project deployed on Vercel.</p>
    "

gallery:
    enabled: 0
    items:
        - image: /img/portfolio/project-1/2.jpg
          alt: "bryanCV"

description2:
    enabled: 1
    heading: "Arquitectura Tecnica"
    headingEn: "Technical Architecture"
    content: "
        <p><strong>C.H.R.I.S. (AI Assistant):</strong> Chatbot conversacional con Gemini 2.5 Flash Lite, system prompt optimizado para convencer reclutadores, rate limiting (5 msg/sesion), respuestas bilingues forzadas por locale.</p>
        <p><strong>Recruiter Insights Dashboard:</strong> Panel /admin protegido con cookie auth, metricas en tiempo real desde Upstash Redis: page views, CV downloads, hot leads, paises, dispositivos, graficos Recharts (barras, donut, area 7 dias).</p>
        <p><strong>Telemetria:</strong> Tracking ligero con sendBeacon/fetch a Upstash Redis. Detecta pais (x-vercel-ip-country), dispositivo (user-agent), clasifica hot leads (CV download + chat + sesion 2min+).</p>
        <p><strong>CV Dinamico:</strong> Generacion de PDF con jsPDF al hacer click, bilingue EN/ES, links clicables, diseno ATS-friendly.</p>
        <p><strong>GitHub Heatmap Interactivo:</strong> Consola tipo terminal con tabs (Enterprise/Personal), selector de anos (2020-2026), tooltips nativos.</p>
        <p><strong>Stack:</strong> Next.js 15 (Pages Router), Framer Motion, Formik, Upstash Redis, Gemini API, jsPDF, Recharts, react-github-calendar, Vercel.</p>
    "
    contentEn: "
        <p><strong>C.H.R.I.S. (AI Assistant):</strong> Conversational chatbot powered by Gemini 2.5 Flash Lite, system prompt optimized to convince recruiters, rate limiting (5 msg/session), language forced by locale.</p>
        <p><strong>Recruiter Insights Dashboard:</strong> Protected /admin panel with cookie auth, real-time metrics from Upstash Redis: page views, CV downloads, hot leads, countries, devices, Recharts graphs (bar, donut, 7-day area).</p>
        <p><strong>Telemetry:</strong> Lightweight tracking via sendBeacon/fetch to Upstash Redis. Detects country (x-vercel-ip-country), device (user-agent), classifies hot leads (CV download + chat + 2min+ session).</p>
        <p><strong>Dynamic CV:</strong> PDF generation with jsPDF on click, bilingual EN/ES, clickable links, ATS-friendly design.</p>
        <p><strong>Interactive GitHub Heatmap:</strong> Terminal-style console with tabs (Enterprise/Personal), year selector (2020-2026), native tooltips.</p>
        <p><strong>Stack:</strong> Next.js 15 (Pages Router), Framer Motion, Formik, Upstash Redis, Gemini API, jsPDF, Recharts, react-github-calendar, Vercel.</p>
    "
    buttons:
        - label: "Ver Sitio en Vivo"
          labelEn: "View Live Site"
          link: "https://www.brayanmurcia.lat"
          target: "_blank"
        - label: "Ver en GitHub"
          labelEn: "View on GitHub"
          link: "https://github.com/AbyteQuantic/bryanCV"
          target: "_blank"

gallery2:
    enabled: 0
    items:
        - image: /img/portfolio/project-1/5.jpg
          alt: "bryanCV"
---
