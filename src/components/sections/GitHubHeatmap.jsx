import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocale } from '@library/useLocale';
import FadeInView from '@components/FadeInView';

const GitHubCalendar = dynamic(
  () =>
    import('react-github-calendar').then((mod) => ({
      default: mod.GitHubCalendar,
    })),
  {
    ssr: false,
    loading: () => <div style={s.skeleton} />,
  }
);

const CURRENT_YEAR = new Date().getFullYear();
const ENTERPRISE_YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026].filter(
  (y) => y <= CURRENT_YEAR
);

const TABS = {
  enterprise: {
    id: 'enterprise',
    username: 'bryan-murcia-chiper',
    labelEn: 'Enterprise Strategy',
    labelEs: 'Estrategia Corporativa',
    badge: 'Chiper',
    badgeColor: '#3fb950',
  },
  personal: {
    id: 'personal',
    username: 'AbyteQuantic',
    labelEn: 'Open Source & Research',
    labelEs: 'Open Source e Investigaci\u00f3n',
    badge: 'Personal',
    badgeColor: '#7C4DFF',
  },
};

const greenTheme = {
  dark: ['#161b22', '#0e4429', '#006d32', '#26a641', '#39d353'],
};
const purpleTheme = {
  dark: ['#161b22', '#2d1b69', '#5b21b6', '#7c3aed', '#a78bfa'],
};

/* ── Tooltip text formatter ── */
const makeTooltipText = (isEs) => (activity) => {
  const d = new Date(activity.date + 'T12:00:00');
  const formatted = d.toLocaleDateString(isEs ? 'es-CO' : 'en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  if (activity.count === 0) {
    return isEs
      ? `Sin contribuciones el ${formatted}`
      : `No contributions on ${formatted}`;
  }
  const plural = activity.count !== 1;
  return isEs
    ? `${activity.count} contribuci\u00f3n${plural ? 'es' : ''} el ${formatted}`
    : `${activity.count} contribution${plural ? 's' : ''} on ${formatted}`;
};

const GitHubHeatmap = () => {
  const locale = useLocale();
  const isEs = locale === 'es';

  const [activeTab, setActiveTab] = useState('enterprise');
  const [selectedYear, setSelectedYear] = useState(CURRENT_YEAR);

  const tab = TABS[activeTab];
  const theme = activeTab === 'enterprise' ? greenTheme : purpleTheme;
  const calendarYear =
    activeTab === 'enterprise' ? selectedYear : CURRENT_YEAR;
  const tooltipText = makeTooltipText(isEs);

  return (
    <section className="mil-p-90-30">
      <div className="mil-section-title mil-up">
        <div className="mil-divider" />
        <h3>
          {isEs
            ? 'Actividad e Impacto en GitHub'
            : 'GitHub Activity & Impact'}
        </h3>
      </div>

      <FadeInView delay={0.1}>
        <div style={s.console}>
          {/* ── Terminal header ── */}
          <div style={s.terminalBar}>
            <div style={s.dots}>
              <span style={{ ...s.dot, background: '#ff5f56' }} />
              <span style={{ ...s.dot, background: '#ffbd2e' }} />
              <span style={{ ...s.dot, background: '#27c93f' }} />
            </div>
            <span style={s.terminalTitle}>
              github-contributions — {tab.username}
            </span>
            <div style={s.dots} />
          </div>

          {/* ── Tabs ── */}
          <div style={s.tabBar}>
            {Object.values(TABS).map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTab(t.id);
                }}
                style={{
                  ...s.tab,
                  ...(activeTab === t.id ? s.tabActive : {}),
                  borderBottomColor:
                    activeTab === t.id ? t.badgeColor : 'transparent',
                }}
              >
                {isEs ? t.labelEs : t.labelEn}
                <span
                  style={{
                    ...s.badge,
                    background: `${t.badgeColor}22`,
                    color: t.badgeColor,
                  }}
                >
                  {t.badge}
                </span>
              </button>
            ))}
          </div>

          {/* ── Year selector (enterprise only) ── */}
          <AnimatePresence mode="wait">
            {activeTab === 'enterprise' && (
              <motion.div
                key="year-selector"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={s.yearBar}
              >
                <span style={s.yearLabel}>
                  {isEs ? 'Trayectoria desde 2020' : 'Track record since 2020'}
                </span>
                <div style={s.yearPills}>
                  {ENTERPRISE_YEARS.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      style={{
                        ...s.yearPill,
                        ...(selectedYear === year ? s.yearPillActive : {}),
                      }}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* ── Calendar with native tooltips ── */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`${tab.username}-${calendarYear}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              style={s.calendarWrap}
            >
              <GitHubCalendar
                username={tab.username}
                year={calendarYear}
                colorScheme="dark"
                theme={theme}
                blockSize={13}
                blockMargin={4}
                blockRadius={3}
                fontSize={13}
                showColorLegend
                hideTotalCount={false}
                tooltips={{
                  activity: {
                    text: tooltipText,
                    withArrow: true,
                  },
                }}
                labels={{
                  totalCount: isEs
                    ? '{{count}} contribuciones en {{year}}'
                    : '{{count}} contributions in {{year}}',
                }}
              />
            </motion.div>
          </AnimatePresence>

          {/* ── Footer ── */}
          <div style={s.footer}>
            <div style={s.footerDot(tab.badgeColor)} />
            <span style={s.footerText}>
              {activeTab === 'enterprise'
                ? isEs
                  ? 'Incluye repos privados corporativos anonimizados'
                  : 'Includes anonymized private enterprise repositories'
                : isEs
                  ? 'Proyectos open source, investigaci\u00f3n e IA'
                  : 'Open source projects, research & AI experiments'}
            </span>
          </div>
        </div>
      </FadeInView>
    </section>
  );
};

/* ── Styles ── */
const s = {
  skeleton: {
    height: '160px',
    borderRadius: '8px',
    background: '#161b22',
  },
  console: {
    background: '#0d1117',
    borderRadius: '14px',
    border: '1px solid #30363d',
    overflow: 'hidden',
    marginTop: '20px',
  },
  terminalBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px',
    background: '#161b22',
    borderBottom: '1px solid #30363d',
  },
  dots: {
    display: 'flex',
    gap: '7px',
    minWidth: '52px',
  },
  dot: {
    width: '12px',
    height: '12px',
    borderRadius: '50%',
    display: 'inline-block',
  },
  terminalTitle: {
    fontSize: '12px',
    color: '#8b949e',
    fontFamily: 'monospace',
    letterSpacing: '0.03em',
  },
  tabBar: {
    display: 'flex',
    borderBottom: '1px solid #30363d',
    padding: '0 16px',
  },
  tab: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    background: 'none',
    border: 'none',
    borderBottom: '2px solid transparent',
    color: '#8b949e',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  tabActive: {
    color: '#e6edf3',
  },
  badge: {
    fontSize: '10px',
    fontWeight: 600,
    padding: '2px 8px',
    borderRadius: '10px',
    letterSpacing: '0.04em',
    textTransform: 'uppercase',
  },
  yearBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 20px',
    borderBottom: '1px solid #21262d',
    overflow: 'hidden',
    flexWrap: 'wrap',
    gap: '10px',
  },
  yearLabel: {
    fontSize: '12px',
    color: '#8b949e',
  },
  yearPills: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
  },
  yearPill: {
    padding: '5px 14px',
    borderRadius: '16px',
    border: '1px solid #30363d',
    background: 'transparent',
    color: '#8b949e',
    fontSize: '12px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  yearPillActive: {
    background: '#3fb950',
    color: '#0d1117',
    borderColor: '#3fb950',
    fontWeight: 700,
  },
  calendarWrap: {
    padding: '24px 20px 16px',
    overflowX: 'auto',
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px 16px',
    borderTop: '1px solid #21262d',
  },
  footerDot: (color) => ({
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: color,
    flexShrink: 0,
  }),
  footerText: {
    fontSize: '11px',
    color: '#8b949e',
    fontStyle: 'italic',
  },
};

export default GitHubHeatmap;
