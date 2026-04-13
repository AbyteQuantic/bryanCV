import { useState, useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const RechartsCharts = dynamic(() => import('@components/admin/Charts'), {
  ssr: false,
  loading: () => <div style={{ height: '240px', background: '#f9fafb', borderRadius: '12px' }} />,
});

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
    const id = setInterval(fetchMetrics, REFRESH_INTERVAL);
    return () => clearInterval(id);
  }, []);

  if (loading) {
    return <div style={s.page}><p style={s.loadingText}>Loading metrics...</p></div>;
  }
  if (error) {
    return <div style={s.page}><p style={s.errorText}>{error}</p></div>;
  }

  const fmt = (sec) => {
    if (!sec) return '0s';
    const m = Math.floor(sec / 60);
    const ss = sec % 60;
    return m > 0 ? `${m}m ${ss}s` : `${ss}s`;
  };

  const fmtDate = (iso) => {
    if (!iso) return '';
    return new Date(iso).toLocaleString('es-CO', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <>
      <Head><title>Dashboard | Brayan Murcia</title></Head>
      <div style={s.page}>
        <div style={s.container}>
          {/* Header */}
          <div style={s.header}>
            <div>
              <h1 style={s.title}>Recruiter Insights</h1>
              <p style={s.subtitle}>Real-time visitor analytics from Upstash Redis</p>
            </div>
            <button onClick={fetchMetrics} style={s.refreshBtn}>↻ Refresh</button>
          </div>

          {data?.noRedis && (
            <div style={s.warning}>
              ⚠ Redis not configured. Add UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN.
            </div>
          )}

          {/* KPI Row 1 */}
          <div style={s.kpiGrid}>
            <KpiCard label="Total Page Views" value={data?.pageViews || 0} sub={`${data?.todayViews || 0} today`} color="#4CAF50" />
            <KpiCard label="CV Downloads" value={data?.cvDownloads || 0} sub={`${data?.todayDownloads || 0} today`} color="#7C4DFF" />
            <KpiCard label="Conversion Rate" value={`${data?.conversionRate || '0.0'}%`} sub="Downloads / Views" color="#FF6D00" />
            <KpiCard label="Hot Leads" value={data?.hotLeadsCount || 0} sub="CV + chat + 2min+" color="#e53935" />
          </div>

          {/* KPI Row 2 */}
          <div style={s.kpiGrid}>
            <KpiCard label="Chat Interactions" value={data?.chatInteractions || 0} sub="C.H.R.I.S. questions" color="#00B0FF" />
            <KpiCard label="Avg. Session" value={fmt(data?.avgSessionDuration)} sub={`${data?.uniqueVisitorsToday || 0} visitors today`} color="#6b7280" />
          </div>

          {/* Charts */}
          <div style={s.twoCol}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>🌎 Top Visitor Countries</h3>
              {data?.countries?.length > 0 ? (
                <RechartsCharts type="bar" data={data.countries} />
              ) : (
                <p style={s.empty}>No geo data yet. Data appears after visitors browse from Vercel deployment.</p>
              )}
            </div>
            <div style={s.card}>
              <h3 style={s.cardTitle}>📱 Device Distribution</h3>
              {data?.devices?.length > 0 ? (
                <RechartsCharts type="pie" data={data.devices} />
              ) : (
                <p style={s.empty}>No device data yet</p>
              )}
            </div>
          </div>

          {/* Questions + Sections */}
          <div style={s.twoCol}>
            <div style={s.card}>
              <h3 style={s.cardTitle}>
                💬 C.H.R.I.S. Chat Log
                <span style={s.cardBadge}>{data?.chatQuestions?.length || 0}</span>
              </h3>
              {data?.chatQuestions?.length > 0 ? (
                <div style={s.questionList}>
                  {data.chatQuestions.map((item, i) => (
                    <div key={i} style={s.questionItem}>
                      <p style={s.questionText}>&ldquo;{item.q}&rdquo;</p>
                      <span style={s.questionMeta}>
                        {fmtDate(item.at)}
                        {item.country && item.country !== 'unknown' && ` · ${item.country}`}
                        {item.device && ` · ${item.device}`}
                        {item.vid && ` · ${item.vid}`}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={s.empty}>No chat questions yet</p>
              )}
            </div>
            <div style={s.card}>
              <h3 style={s.cardTitle}>📊 Section Engagement</h3>
              {data?.sections?.length > 0 ? (
                <div style={s.sectionList}>
                  {data.sections.map((sec, i) => {
                    const max = data.sections[0]?.value || 1;
                    const pct = Math.round((sec.value / max) * 100);
                    return (
                      <div key={i} style={s.sectionItem}>
                        <div style={s.sectionHeader}>
                          <span style={s.sectionName}>{sec.name}</span>
                          <span style={s.sectionCount}>{sec.value}</span>
                        </div>
                        <div style={s.barBg}>
                          <div style={{ ...s.barFill, width: `${pct}%` }} />
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

const KpiCard = ({ label, value, sub, color }) => (
  <div style={s.kpiCard}>
    <p style={s.kpiLabel}>{label}</p>
    <p style={{ ...s.kpiValue, color }}>{value}</p>
    <p style={s.kpiSub}>{sub}</p>
  </div>
);

const s = {
  page: { minHeight: '100vh', background: '#f8f9fa', fontFamily: "'Outfit', system-ui, sans-serif", padding: '24px', display: 'flex', justifyContent: 'center' },
  container: { width: '100%', maxWidth: '1100px' },
  header: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' },
  title: { fontSize: '26px', fontWeight: 800, color: '#202124', margin: 0 },
  subtitle: { fontSize: '14px', color: '#6b7280', margin: '4px 0 0' },
  refreshBtn: { padding: '8px 18px', border: '1px solid #e5e7eb', borderRadius: '8px', background: '#fff', fontSize: '13px', fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit', color: '#202124' },
  warning: { background: '#fff8e1', border: '1px solid #ffe082', borderRadius: '10px', padding: '14px 18px', fontSize: '13px', color: '#6d4c00', marginBottom: '16px' },
  loadingText: { color: '#6b7280', fontSize: '15px', textAlign: 'center', marginTop: '40vh' },
  errorText: { color: '#e53935', fontSize: '15px', textAlign: 'center', marginTop: '40vh' },
  kpiGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px', marginBottom: '16px' },
  kpiCard: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
  kpiLabel: { fontSize: '11px', fontWeight: 600, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '0 0 8px' },
  kpiValue: { fontSize: '30px', fontWeight: 800, margin: '0 0 4px', lineHeight: 1, letterSpacing: '-0.02em' },
  kpiSub: { fontSize: '12px', color: '#9ca3af', margin: 0 },
  twoCol: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' },
  card: { background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '22px 20px', boxShadow: '0 1px 3px rgba(0,0,0,0.03)' },
  cardTitle: { fontSize: '15px', fontWeight: 700, color: '#202124', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: '8px' },
  cardBadge: { fontSize: '11px', fontWeight: 600, background: '#f3f4f6', color: '#6b7280', padding: '2px 8px', borderRadius: '10px' },
  questionList: { maxHeight: '360px', overflowY: 'auto' },
  questionItem: { padding: '10px 0', borderBottom: '1px solid #f3f4f6' },
  questionText: { fontSize: '13px', color: '#202124', lineHeight: 1.5, margin: '0 0 4px' },
  questionMeta: { fontSize: '11px', color: '#9ca3af' },
  sectionList: { display: 'flex', flexDirection: 'column', gap: '12px' },
  sectionItem: {},
  sectionHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  sectionName: { fontSize: '13px', fontWeight: 500, color: '#202124', textTransform: 'capitalize' },
  sectionCount: { fontSize: '12px', color: '#6b7280' },
  barBg: { height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' },
  barFill: { height: '100%', background: '#4CAF50', borderRadius: '3px', transition: 'width 0.4s ease' },
  empty: { fontSize: '13px', color: '#9ca3af', fontStyle: 'italic', margin: 0 },
};

export default AdminDashboard;
