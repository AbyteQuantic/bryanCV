import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

const AdminLogin = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        router.push('/admin');
      } else {
        setError('Invalid password');
      }
    } catch {
      setError('Connection error');
    }

    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Admin | Brayan Murcia</title>
      </Head>
      <div style={s.page}>
        <form onSubmit={handleSubmit} style={s.card}>
          <div style={s.lock}>🔒</div>
          <h2 style={s.title}>Recruiter Insights</h2>
          <p style={s.subtitle}>Enter admin password to continue</p>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            style={s.input}
            autoFocus
          />

          {error && <p style={s.error}>{error}</p>}

          <button type="submit" disabled={loading} style={s.button}>
            {loading ? 'Verifying...' : 'Access Dashboard'}
          </button>
        </form>
      </div>
    </>
  );
};

const s = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#f8f9fa',
    fontFamily: "'Outfit', system-ui, sans-serif",
    padding: '20px',
  },
  card: {
    background: '#fff',
    borderRadius: '16px',
    padding: '48px 40px',
    width: '100%',
    maxWidth: '380px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
    border: '1px solid #e5e7eb',
    textAlign: 'center',
  },
  lock: {
    fontSize: '36px',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 6px',
  },
  subtitle: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 28px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    fontFamily: 'inherit',
    boxSizing: 'border-box',
    marginBottom: '12px',
  },
  error: {
    color: '#e53935',
    fontSize: '13px',
    margin: '0 0 12px',
  },
  button: {
    width: '100%',
    padding: '12px',
    background: '#202124',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
};

export default AdminLogin;
