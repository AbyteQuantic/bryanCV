import { useLocale } from '@library/useLocale';
import FadeInView from '@components/FadeInView';

const categories = {
  en: [
    {
      title: 'Core & Production-Tested',
      color: '#4CAF50',
      skills: [
        { name: 'Docker & Kubernetes', detail: 'Containerization & orchestration for high-availability multi-country deployments.' },
        { name: 'Node.js & NestJS', detail: 'Microservices architecture, saga patterns, event-driven systems at scale.' },
        { name: 'GCP Cloud Run', detail: 'Serverless containers, Pub/Sub messaging, GCS storage across 3 countries.' },
        { name: 'CI/CD Pipelines', detail: 'GitHub Actions & GitLab CI automating build, test and deploy workflows.' },
        { name: 'Next.js & React', detail: 'SSR/SSG applications, API routes, performance-optimized frontends.' },
        { name: 'Python', detail: 'Automation scripts, data pipelines, Jupyter notebooks for analytics.' },
        { name: 'Microservices', detail: 'Domain-driven design, saga orchestration, progressive monolith decoupling.' },
        { name: 'Linux Administration', detail: 'Server provisioning, security hardening, shell scripting for DevOps.' },
      ],
    },
    {
      title: 'A.I. & Automation Engine',
      color: '#7C4DFF',
      skills: [
        { name: 'Claude Code', detail: 'Agentic development workflows reducing delivery time by 60%.' },
        { name: 'Cursor IDE', detail: 'A.I.-assisted pair programming for rapid prototyping and refactoring.' },
        { name: 'Prompt Engineering', detail: 'System prompts, chain-of-thought, structured outputs for production A.I.' },
        { name: 'A.I. Agents', detail: 'Autonomous pipelines for code generation, review and deployment.' },
        { name: 'Gemini A.I.', detail: 'Vision OCR for invoice processing, cost-optimized with regex pre-filtering.' },
        { name: 'GitHub Copilot', detail: 'Context-aware code completion integrated into team development workflows.' },
      ],
    },
    {
      title: 'Data & Infrastructure',
      color: '#FF6D00',
      skills: [
        { name: 'Terraform & IaC', detail: 'Infrastructure as Code for reproducible cloud environments.' },
        { name: 'MySQL & PostgreSQL', detail: 'Relational modeling, query optimization, multi-tenant schemas.' },
        { name: 'MongoDB & Redis', detail: 'Document stores for config/audit, Redis caching for high-throughput.' },
        { name: 'Elasticsearch', detail: 'Full-text search indexing, real-time catalog updates via Painless scripts.' },
        { name: 'BigQuery & Grafana', detail: 'Analytics dashboards, performance monitoring, operational metrics.' },
        { name: 'Go', detail: 'High-performance backend services, REST APIs with Gin framework.' },
      ],
    },
  ],
  es: [
    {
      title: 'Core & Probado en Producci\u00f3n',
      color: '#4CAF50',
      skills: [
        { name: 'Docker & Kubernetes', detail: 'Contenedorizaci\u00f3n y orquestaci\u00f3n para despliegues multi-pa\u00eds de alta disponibilidad.' },
        { name: 'Node.js & NestJS', detail: 'Arquitectura de microservicios, patrones saga, sistemas event-driven a escala.' },
        { name: 'GCP Cloud Run', detail: 'Contenedores serverless, Pub/Sub, GCS storage en 3 pa\u00edses.' },
        { name: 'CI/CD Pipelines', detail: 'GitHub Actions & GitLab CI automatizando build, test y deploy.' },
        { name: 'Next.js & React', detail: 'Aplicaciones SSR/SSG, API routes, frontends optimizados en rendimiento.' },
        { name: 'Python', detail: 'Scripts de automatizaci\u00f3n, pipelines de datos, Jupyter notebooks para anal\u00edtica.' },
        { name: 'Microservicios', detail: 'Dise\u00f1o orientado a dominio, orquestaci\u00f3n saga, desacoplamiento progresivo de monolitos.' },
        { name: 'Administraci\u00f3n Linux', detail: 'Provisionamiento de servidores, hardening de seguridad, scripting para DevOps.' },
      ],
    },
    {
      title: 'I.A. & Motor de Automatizaci\u00f3n',
      color: '#7C4DFF',
      skills: [
        { name: 'Claude Code', detail: 'Flujos de desarrollo ag\u00e9ntico reduciendo tiempo de entrega en un 60%.' },
        { name: 'Cursor IDE', detail: 'Pair programming asistido por I.A. para prototipado r\u00e1pido y refactorizaci\u00f3n.' },
        { name: 'Prompt Engineering', detail: 'System prompts, cadena de pensamiento, outputs estructurados para I.A. en producci\u00f3n.' },
        { name: 'Agentes I.A.', detail: 'Pipelines aut\u00f3nomos para generaci\u00f3n de c\u00f3digo, review y despliegue.' },
        { name: 'Gemini I.A.', detail: 'OCR por visi\u00f3n para facturas, optimizado en costo con pre-filtrado regex.' },
        { name: 'GitHub Copilot', detail: 'Completado de c\u00f3digo context-aware integrado en flujos de equipo.' },
      ],
    },
    {
      title: 'Datos & Infraestructura',
      color: '#FF6D00',
      skills: [
        { name: 'Terraform & IaC', detail: 'Infraestructura como c\u00f3digo para entornos cloud reproducibles.' },
        { name: 'MySQL & PostgreSQL', detail: 'Modelado relacional, optimizaci\u00f3n de queries, esquemas multi-tenant.' },
        { name: 'MongoDB & Redis', detail: 'Document stores para config/auditor\u00eda, Redis caching para alto throughput.' },
        { name: 'Elasticsearch', detail: 'Indexaci\u00f3n full-text, actualizaciones de cat\u00e1logo en tiempo real con Painless scripts.' },
        { name: 'BigQuery & Grafana', detail: 'Dashboards anal\u00edticos, monitoreo de rendimiento, m\u00e9tricas operacionales.' },
        { name: 'Go', detail: 'Servicios backend de alto rendimiento, REST APIs con framework Gin.' },
      ],
    },
  ],
};

const SeniorSkillsGrid = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const data = isEs ? categories.es : categories.en;
  const sectionTitle = isEs ? 'Stack T\u00e9cnico & Competencias' : 'Technical Stack & Competencies';

  const styles = {
    category: {
      marginBottom: '40px',
    },
    categoryHeader: (color) => ({
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '20px',
    }),
    dot: (color) => ({
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      background: color,
      flexShrink: 0,
    }),
    categoryTitle: {
      fontSize: '18px',
      fontWeight: 600,
      color: '#202124',
      margin: 0,
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
      gap: '12px',
    },
    card: (color) => ({
      padding: '16px 18px',
      borderRadius: '10px',
      background: '#fafafa',
      border: '1px solid #eee',
      transition: 'all 0.25s ease',
      cursor: 'default',
      borderLeft: `3px solid ${color}`,
    }),
    skillName: {
      fontSize: '14px',
      fontWeight: 600,
      color: '#202124',
      marginBottom: '4px',
    },
    skillDetail: {
      fontSize: '12px',
      color: '#666',
      lineHeight: '1.5',
      margin: 0,
    },
  };

  return (
    <>
      <div className="mil-section-title mil-up">
        <div className="mil-divider" />
        <h3>{sectionTitle}</h3>
      </div>

      <section className="mil-p-90-30">
        {data.map((cat, catIdx) => (
          <FadeInView key={catIdx} delay={catIdx * 0.1}>
            <div style={styles.category}>
              <div style={styles.categoryHeader(cat.color)}>
                <div style={styles.dot(cat.color)} />
                <h4 style={styles.categoryTitle}>{cat.title}</h4>
              </div>
              <div style={styles.grid}>
                {cat.skills.map((skill, skillIdx) => (
                  <div
                    key={skillIdx}
                    style={styles.card(cat.color)}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#f0f0f0';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#fafafa';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={styles.skillName}>{skill.name}</div>
                    <p style={styles.skillDetail}>{skill.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeInView>
        ))}
      </section>
    </>
  );
};

export default SeniorSkillsGrid;
