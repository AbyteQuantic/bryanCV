import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const REFRESH_INTERVAL = 30000;

const AdminDashboard = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.status === 401) {
        router.push('/admin/login');
        return;
      }
      const json = await res.json();
      setData(json);
      setError('');
    } catch {
      setError('Failed to load metrics');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMetrics();
    const interval = setInterval(fetchMetrics, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div style={s.page}>
        <p style={s.loadingText}>Loading metrics...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={s.page}>
        <p style={s.errorText}>{error}</p>
      </div>
    );
  }

  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    const m = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return m > 0 ? `${m}m ${sec}s` : `${sec}s`;
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleString('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Head>
        <title>Dashboard | Brayan Murcia</title>
      </Head>
      <div style={s.page}>
        <div style={s.container}>
          {/* Header */}
          <div style={s.header}>
            <div>
              <h1 style={s.title}>Recruiter Insights</h1>
              <p style={s.subtitle}>
                Real-time visitor analytics &amp; lead tracking
              </p>
            </div>
            <button onClick={fetchMetrics} style={s.refreshBtn}>
              ↻ Refresh
            </button>
          </div>

          {data?.noRedis && (
            <div style={s.warning}>
              ⚠ Redis not configured. Add UPSTASH_REDIS_REST_URL and
              UPSTASH_REDIS_REST_TOKEN to your environment variables.
            </div>
          )}

          {/* KPI Cards */}
          <div style={s.kpiGrid}>
            <KpiCard
              label="Total Page Views"
              value={data?.pageViews || 0}
              sub={`${data?.todayViews || 0} today`}
              color="#4CAF50"
            />
            <KpiCard
              label="CV Downloads"
              value={data?.cvDownloads || 0}
              sub={`${data?.todayDownloads || 0} today`}
              color="#7C4DFF"
            />
            <KpiCard
              label="Hot Leads"
              value={data?.hotLeadsCount || 0}
              sub="CV + chat + 2min+"
              color="#FF6D00"
            />
            <KpiCard
              label="Avg. Session"
              value={formatDuration(data?.avgSessionDuration)}
              sub={`${data?.uniqueVisitorsToday || 0} visitors today`}
              color="#00B0FF"
            />
          </div>

          {/* Two-column layout */}
          <div style={s.twoCol}>
            {/* Chat Questions */}
            <div style={s.card}>
              <h3 style={s.cardTitle}>
                💬 Recent Chat Questions
                <span style={s.cardBadge}>
                  {data?.chatQuestions?.length || 0}
                </span>
              </h3>
              {data?.chatQuestions?.length > 0 ? (
                <div style={s.questionList}>
                  {data.chatQuestions.map((item, i) => (
                    <div key={i} style={s.questionItem}>
                      <p style={s.questionText}>
                        &ldquo;{item.q}&rdquo;
                      </p>
                      <span style={s.questionMeta}>
                        {formatDate(item.at)} &middot; visitor {item.vid}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={s.empty}>No chat questions yet</p>
              )}
            </div>

            {/* Sections */}
            <div style={s.card}>
              <h3 style={s.cardTitle}>📊 Section Engagement</h3>
              {data?.sections?.length > 0 ? (
                <div style={s.sectionList}>
                  {data.sections.map((sec, i) => {
                    const max = data.sections[0]?.views || 1;
                    const pct = Math.round((sec.views / max) * 100);
                    return (
                      <div key={i} style={s.sectionItem}>
                        <div style={s.sectionHeader}>
                          <span style={s.sectionName}>{sec.name}</span>
                          <span style={s.sectionCount}>
                            {sec.views} views
                          </span>
                        </div>
                        <div style={s.barBg}>
                          <div
                            style={{
                              ...s.barFill,
                              width: `${pct}%`,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p style={s.empty}>No section data yet</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

/* ── KPI Card ── */
const KpiCard = ({ label, value, sub, color }) => (
  <div style={s.kpiCard}>
    <p style={s.kpiLabel}>{label}</p>
    <p style={{ ...s.kpiValue, color }}>{value}</p>
    <p style={s.kpiSub}>{sub}</p>
  </div>
);

/* ── Styles ── */
const s = {
  page: {
    minHeight: '100vh',
    background: '#f8f9fa',
    fontFamily: "'Outfit', system-ui, sans-serif",
    padding: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    width: '100%',
    maxWidth: '1080px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '28px',
    flexWrap: 'wrap',
    gap: '12px',
  },
  title: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#202124',
    margin: 0,
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '4px 0 0',
  },
  refreshBtn: {
    padding: '8px 18px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    background: '#fff',
    fontSize: '13px',
    fontWeight: 500,
    cursor: 'pointer',
    fontFamily: 'inherit',
    color: '#202124',
  },
  warning: {
    background: '#fff8e1',
    border: '1px solid #ffe082',
    borderRadius: '10px',
    padding: '14px 18px',
    fontSize: '13px',
    color: '#6d4c00',
    marginBottom: '20px',
  },
  loadingText: {
    color: '#6b7280',
    fontSize: '15px',
    textAlign: 'center',
    marginTop: '40vh',
  },
  errorText: {
    color: '#e53935',
    fontSize: '15px',
    textAlign: 'center',
    marginTop: '40vh',
  },

  /* KPI Grid */
  kpiGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '14px',
    marginBottom: '20px',
  },
  kpiCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '22px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  kpiLabel: {
    fontSize: '12px',
    fontWeight: 600,
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    margin: '0 0 8px',
  },
  kpiValue: {
    fontSize: '32px',
    fontWeight: 800,
    margin: '0 0 4px',
    lineHeight: 1,
    letterSpacing: '-0.02em',
  },
  kpiSub: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },

  /* Cards */
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1.2fr 0.8fr',
    gap: '14px',
  },
  card: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    padding: '22px 20px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
  },
  cardTitle: {
    fontSize: '15px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  cardBadge: {
    fontSize: '11px',
    fontWeight: 600,
    background: '#f3f4f6',
    color: '#6b7280',
    padding: '2px 8px',
    borderRadius: '10px',
  },

  /* Questions */
  questionList: {
    maxHeight: '400px',
    overflowY: 'auto',
  },
  questionItem: {
    padding: '10px 0',
    borderBottom: '1px solid #f3f4f6',
  },
  questionText: {
    fontSize: '13px',
    color: '#202124',
    lineHeight: 1.5,
    margin: '0 0 4px',
  },
  questionMeta: {
    fontSize: '11px',
    color: '#9ca3af',
  },

  /* Sections */
  sectionList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  sectionItem: {},
  sectionHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '4px',
  },
  sectionName: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#202124',
    textTransform: 'capitalize',
  },
  sectionCount: {
    fontSize: '12px',
    color: '#6b7280',
  },
  barBg: {
    height: '6px',
    background: '#f3f4f6',
    borderRadius: '3px',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    background: '#4CAF50',
    borderRadius: '3px',
    transition: 'width 0.4s ease',
  },

  empty: {
    fontSize: '13px',
    color: '#9ca3af',
    fontStyle: 'italic',
    margin: 0,
  },
};

export default AdminDashboard;
