---
#preview
title: "VendIA \u2014 POS Inteligente para Retail Tradicional"
titleEn: "VendIA \u2014 AI-Powered POS for Traditional Retail"
image: /img/portfolio/2.svg
category: SaaS & AI
short: "POS SaaS offline-first para tenderos de la tercera edad en Colombia. OCR de facturas con IA, gerontodise\xF1o y multi-tenant."
shortEn: "Offline-first SaaS POS for elderly shopkeepers in Colombia. AI invoice OCR, gerontodesign UI, multi-tenant architecture."

#full details
details:
    - label: "Rol:"
      labelEn: "Role:"
      value: "Tech Lead"

    - label: "Fecha:"
      labelEn: "Date:"
      value: "2024 - Presente"
      valueEn: "2024 - Present"

    - label: "Estado:"
      labelEn: "Status:"
      value: "MVP"

    - label: "$category"

description:
    enabled: 1
    content: "
        <p><strong>Contexto de Negocio:</strong> En Colombia, m\xE1s de 600,000 tiendas de barrio son operadas por due\xF1os mayores de 65 a\xF1os con m\xEDnima alfabetizaci\xF3n tecnol\xF3gica e internet intermitente. Las soluciones POS existentes les fallan: interfaces complejas, conectividad obligatoria y sin soporte para cr\xE9dito informal, envases retornables ni pagos locales.</p>
        <p><strong>La Soluci\xF3n:</strong> VendIA es un POS SaaS B2B con principios de Gerontodise\xF1o \u2014 \xE1reas t\xE1ctiles m\xEDnimas de 60x60px, fuentes 18pt+, solo gestos de tap, feedback h\xE1ptico. Funciona 100% offline y sincroniza cuando hay conectividad.</p>
    "
    contentEn: "
        <p><strong>Business Context:</strong> In Colombia, 600,000+ traditional stores are run by elderly owners (65+) with minimal tech literacy and intermittent internet. Existing POS solutions fail them \u2014 complex UIs, mandatory connectivity, and no support for informal credit, returnable bottles, or local payment methods.</p>
        <p><strong>The Solution:</strong> VendIA is a B2B SaaS POS built with Gerontodesign principles \u2014 60x60px minimum touch targets, 18pt+ fonts, tap-only gestures, haptic feedback. Works 100% offline and syncs when connectivity returns.</p>
    "

gallery:
    enabled: 0
    items:
        - image: /img/portfolio/project-1/2.jpg
          alt: "VendIA"

description2:
    enabled: 1
    heading: "Arquitectura e Integraci\xF3n con IA"
    headingEn: "Architecture & AI Integration"
    content: "
        <p><strong>3 Componentes:</strong> Backend Go (Gin + GORM) en Cloud Run, app Flutter con Isar DB para offline-first, y panel admin Next.js 16 con Apache ECharts. PostgreSQL 16 en Neon.tech con multi-tenant via JWT.</p>
        <p><strong>OCR con IA:</strong> El tendero fotograf\xEDa la factura y Gemini Flash extrae productos, cantidades y precios al inventario. Pre-procesamiento regex filtra 70% de los casos antes de llamar a la IA.</p>
        <p><strong>Sync Offline-First:</strong> Transacciones guardadas localmente con UUID v4. Cola de sincronizaci\xF3n cada 30s con Last-Write-Wins. El tendero nunca deja de vender.</p>
        <p><strong>M\xF3dulos Colombianos:</strong> El Fiar (cr\xE9dito informal + cobro WhatsApp), envases retornables, modo Bar/Mesas, pagos QR Nequi/Daviplata sin comisiones, bot\xF3n SOS con GPS.</p>
    "
    contentEn: "
        <p><strong>3-Component Architecture:</strong> Go backend (Gin + GORM) on Cloud Run, Flutter mobile with Isar DB for offline-first, and Next.js 16 admin panel with Apache ECharts. PostgreSQL 16 on Neon.tech with multi-tenant via JWT.</p>
        <p><strong>AI-Powered OCR:</strong> Shopkeeper photographs supplier invoice and Gemini Flash extracts products, quantities and prices into inventory. Regex pre-processing filters 70% of cases before calling AI.</p>
        <p><strong>Offline-First Sync:</strong> Transactions saved locally with UUID v4. Sync queue retries every 30s with Last-Write-Wins. The shopkeeper never stops selling.</p>
        <p><strong>Colombian-Native Modules:</strong> El Fiar (informal credit + WhatsApp collection), returnable bottles, Bar/Table mode, Nequi/Daviplata QR payments (zero fees), SOS panic button with GPS.</p>
    "
    button:
        label: "Ver en GitHub"
        labelEn: "View on GitHub"
        link: "https://github.com/AbyteQuantic"
        target: "_blank"

gallery2:
    enabled: 0
    items:
        - image: /img/portfolio/project-1/5.jpg
          alt: "VendIA"
---