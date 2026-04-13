---
#preview
title: "FacturApp \u2014 Facturaci\xF3n Electr\xF3nica"
titleEn: "FacturApp \u2014 Electronic Invoicing System"
image: /img/portfolio/4.svg
category: FinTech & B2B
short: "Facturaci\xF3n electr\xF3nica compatible con la DIAN. C\xE1lculos fiscales autom\xE1ticos, PDF y entrega por WhatsApp."
shortEn: "DIAN-compliant electronic invoicing. Automated tax calculations, PDF generation and WhatsApp delivery."

#full details
details:
    - label: "Rol:"
      labelEn: "Role:"
      value: "Backend Engineer"

    - label: "Fecha:"
      labelEn: "Date:"
      value: "2024"

    - label: "$category"

description:
    enabled: 1
    content: "
        <p><strong>Contexto de Negocio:</strong> La DIAN exige facturaci\xF3n electr\xF3nica para todos los negocios, pero los peque\xF1os comerciantes luchan con requisitos complejos: XML, firmas digitales, numeraci\xF3n consecutiva. El incumplimiento genera multas desde el 5% del valor.</p>
        <p><strong>La Soluci\xF3n:</strong> FacturApp abstrae toda la complejidad DIAN. El comerciante crea facturas con pocos toques; el sistema maneja impuestos (IVA, ICA, ReteFuente), genera XML, firma digitalmente, env\xEDa a la DIAN y entrega PDF al cliente en menos de 3 segundos.</p>
    "
    contentEn: "
        <p><strong>Business Context:</strong> Colombia's DIAN mandates electronic invoicing for all businesses, but small retailers struggle with complex compliance \u2014 XML validation, digital signatures, consecutive numbering. Non-compliance triggers fines starting at 5% of invoice value.</p>
        <p><strong>The Solution:</strong> FacturApp abstracts the entire DIAN compliance layer. Shop owners create invoices with a few taps; the system handles taxes (IVA, ICA, ReteFuente), generates XML, signs digitally, submits to DIAN, and delivers a PDF in under 3 seconds.</p>
    "

gallery:
    enabled: 0
    items:
        - image: /img/portfolio/project-1/2.jpg
          alt: "FacturApp"

description2:
    enabled: 1
    heading: "Arquitectura T\xE9cnica"
    headingEn: "Technical Architecture"
    content: "
        <p><strong>Integraci\xF3n DIAN:</strong> Est\xE1ndar UBL 2.1 completo. XML automatizado con firma X.509, numeraci\xF3n consecutiva validada y env\xEDo en tiempo real con l\xF3gica de reintentos.</p>
        <p><strong>Motor Fiscal:</strong> Reglas configurables por categor\xEDa y municipio. C\xE1lculo autom\xE1tico de IVA (19%), ICA, ReteFuente y ReteICA. Redondeo fiscal colombiano (50 COP).</p>
        <p><strong>PDF y Entrega:</strong> Generaci\xF3n server-side con QR de verificaci\xF3n DIAN. Entrega autom\xE1tica por email y WhatsApp. Archivo con b\xFAsqueda full-text.</p>
        <p><strong>Multi-Tenant B2B:</strong> Tenants aislados con branding, configuraci\xF3n fiscal y roles (propietario, cajero, contador).</p>
    "
    contentEn: "
        <p><strong>DIAN Integration:</strong> Full UBL 2.1 standard. Automated XML with X.509 signing, consecutive numbering validation, and real-time submission with retry logic.</p>
        <p><strong>Tax Engine:</strong> Configurable rules per product category and municipality. Automatic IVA (19%), ICA, ReteFuente, ReteICA calculation. Colombian fiscal rounding (50 COP).</p>
        <p><strong>PDF & Delivery:</strong> Server-side generation with DIAN verification QR. Automated delivery via email and WhatsApp. Full-text search archive.</p>
        <p><strong>Multi-Tenant B2B:</strong> Isolated tenants with custom branding, tax configuration, and user roles (owner, cashier, accountant).</p>
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
          alt: "FacturApp"
---