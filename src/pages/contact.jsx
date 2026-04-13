import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Formik } from 'formik';
import {
  Mail,
  Calendar,
  Send,
  Loader2,
  Sparkles,
  MapPin,
  Clock,
  X,
  Check,
  ArrowRight,
  Copy,
} from 'lucide-react';
import Layouts from '@layouts/Layouts';
import PageBanner from '@components/PageBanner';
import appData from '@data/app.json';
import { useLocale } from '@library/useLocale';
import FadeInView from '@components/FadeInView';
import { sendEvent } from '@library/useTracking';

/* ═══════════════════════════════════════════
   1. REAL-TIME STATUS CARD
   ═══════════════════════════════════════════ */
const RealTimeStatusCard = ({ isEs }) => {
  const [time, setTime] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString(isEs ? 'es-CO' : 'en-US', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [isEs]);

  const hour = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    hour: 'numeric',
    hour12: false,
  });
  const h = parseInt(hour, 10);
  const isOnline = h >= 8 && h < 22;

  const handleClick = () => {
    setShowModal(true);
    sendEvent('page_view', { section: 'status_card_click' });
  };

  return (
    <>
      <motion.div
        style={s.statusCard}
        whileHover={{ y: -2, boxShadow: '0 6px 24px rgba(0,0,0,0.07)' }}
        onClick={handleClick}
      >
        <div style={s.statusRow}>
          <div style={s.statusDotWrap}>
            <span style={{ ...s.statusDot, background: isOnline ? '#22c55e' : '#9ca3af' }} />
            {isOnline && <span style={s.statusPing} />}
          </div>
          <div style={s.statusBadge(isOnline)}>
            {isOnline ? (isEs ? 'Disponible' : 'Online') : 'Offline'}
          </div>
        </div>
        <p style={s.statusTitle}>
          {isEs ? 'Estado de Disponibilidad' : 'Executive Availability Status'}
        </p>
        <div style={s.statusMeta}>
          <MapPin size={12} />
          <span>Colombia (UTC-5)</span>
          <Clock size={12} style={{ marginLeft: '8px' }} />
          <span>{time}</span>
        </div>
        <p style={s.statusHint}>
          {isEs ? 'Click para ver horarios preferidos' : 'Click to view preferred meeting hours'}
        </p>
      </motion.div>

      {/* Availability Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            style={s.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              style={s.modal}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.97 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button style={s.modalClose} onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
              <h4 style={s.modalTitle}>
                {isEs ? 'Horario Preferido de Reuniones' : 'Preferred Meeting Schedule'}
              </h4>
              <p style={s.modalSub}>UTC-5 (Colombia)</p>
              <div style={s.heatmapGrid}>
                {Array.from({ length: 24 }, (_, i) => {
                  const active = i >= 9 && i <= 17;
                  const label = `${String(i).padStart(2, '0')}:00`;
                  return (
                    <div
                      key={i}
                      style={{
                        ...s.heatmapCell,
                        background: active ? '#dcfce7' : '#f9fafb',
                        borderColor: active ? '#86efac' : '#e5e7eb',
                        color: active ? '#15803d' : '#9ca3af',
                        fontWeight: active ? 600 : 400,
                      }}
                    >
                      {label}
                    </div>
                  );
                })}
              </div>
              <div style={s.modalNote}>
                <Check size={14} color="#22c55e" />
                <span>
                  {isEs
                    ? 'Prefiero reuniones entre 9:00 y 17:00 UTC-5. \u00a1Agenda abajo!'
                    : 'I prefer meetings between 9 AM and 5 PM UTC-5. Book below!'}
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

/* ═══════════════════════════════════════════
   2. PRIORITY CALL BOOKING CARD
   ═══════════════════════════════════════════ */
const PriorityCallBookingCard = ({ isEs }) => (
  <motion.a
    href="https://calendly.com/abytecorp"
    target="_blank"
    rel="noopener noreferrer"
    style={s.bookingCard}
    whileHover={{ y: -3, boxShadow: '0 8px 30px rgba(76,175,80,0.18)' }}
    onClick={() => sendEvent('page_view', { section: 'calendly_link_click' })}
  >
    <div style={s.bookingIconBox}>
      <Calendar size={22} color="#fff" strokeWidth={1.8} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={s.bookingLabel}>
        {isEs ? 'Prioridad' : 'Prioritize'}
      </p>
      <p style={s.bookingTitle}>
        {isEs ? 'Agenda una llamada de 15 min' : 'Book a 15-min Discovery Call'}
      </p>
      <p style={s.bookingSub}>
        {isEs
          ? 'Asegura un espacio para discutir estrategia'
          : 'Directly secure a slot to discuss strategy'}
      </p>
    </div>
    <ArrowRight size={18} color="#16a34a" />
  </motion.a>
);

/* ═══════════════════════════════════════════
   3. EXECUTIVE SOCIAL BENTO
   ═══════════════════════════════════════════ */
const LinkedInSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubSvg = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#202124">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

const SOCIAL_LINKS = [
  {
    id: 'email',
    icon: (p) => <Mail size={18} color="#202124" {...p} />,
    label: 'abytecorp@gmail.com',
    href: 'mailto:abytecorp@gmail.com',
    external: false,
  },
  {
    id: 'linkedin',
    icon: () => <LinkedInSvg />,
    label: 'linkedin.com/in/brayan-murcia',
    href: 'https://www.linkedin.com/in/brayan-murcia/',
    external: true,
  },
  {
    id: 'github',
    icon: () => <GitHubSvg />,
    label: 'github.com/AbyteQuantic',
    href: 'https://github.com/AbyteQuantic',
    external: true,
  },
];

const ExecutiveSocialBento = () => {
  const [copied, setCopied] = useState(null);

  const handleCopy = useCallback((text, id) => {
    navigator.clipboard?.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  }, []);

  return (
    <div style={s.socialGrid}>
      {SOCIAL_LINKS.map((link) => (
        <motion.div key={link.id} style={s.socialCard} whileHover={{ y: -2, boxShadow: '0 4px 16px rgba(0,0,0,0.07)' }}>
          <a
            href={link.href}
            target={link.external ? '_blank' : undefined}
            rel="noopener noreferrer"
            style={s.socialLink}
            onClick={() => sendEvent('page_view', { section: `social_${link.id}_click` })}
          >
            {link.icon()}
            <span style={s.socialLabel}>{link.label}</span>
          </a>
          {link.id === 'email' && (
            <button
              style={s.copyBtn}
              onClick={(e) => {
                e.preventDefault();
                handleCopy('abytecorp@gmail.com', 'email');
              }}
            >
              {copied === 'email' ? <Check size={13} color="#22c55e" /> : <Copy size={13} color="#9ca3af" />}
            </button>
          )}
        </motion.div>
      ))}
    </div>
  );
};

/* ═══════════════════════════════════════════
   4. C.H.R.I.S. BANNER
   ═══════════════════════════════════════════ */
const ChrisBanner = ({ isEs }) => (
  <div style={s.chrisBanner}>
    <Sparkles size={15} color="#16a34a" style={{ flexShrink: 0, marginTop: '2px' }} />
    <p style={s.chrisText}>
      {isEs
        ? '\u00bfCon prisa? Pregunta a C.H.R.I.S., mi asistente IA, usando el n\u00facleo flotante abajo a la derecha.'
        : "In a hurry? Ask C.H.R.I.S., my AI assistant, using the floating core on the bottom right."}
    </p>
  </div>
);

/* ═══════════════════════════════════════════
   5. MODERN EXECUTIVE CONTACT FORM
   ═══════════════════════════════════════════ */
const ModernExecutiveContactForm = ({ isEs }) => {
  const [statusMsg, setStatusMsg] = useState('');
  const [success, setSuccess] = useState(false);

  return (
    <Formik
      initialValues={{ name: '', company: '', email: '', message: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = true;
        if (!values.email) {
          errors.email = true;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = true;
        }
        if (!values.message) errors.message = true;
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setStatusMsg('');
        setSuccess(false);
        const data = new FormData();
        data.append('name', values.name);
        data.append('company', values.company);
        data.append('email', values.email);
        data.append('message', values.message);

        sendEvent('page_view', { section: 'form_submit' });

        try {
          const res = await fetch(appData.settings.formspreeURL, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          if (res.ok) {
            setSuccess(true);
            setStatusMsg(isEs ? '\u00a1Mensaje enviado! Te responder\u00e9 en menos de 24 horas.' : "Message sent! I'll respond within 24 hours.");
            resetForm();
          } else {
            setStatusMsg(isEs ? 'Error al enviar. Intenta de nuevo.' : 'Failed to send. Please try again.');
          }
        } catch {
          setStatusMsg(isEs ? 'Error de conexi\u00f3n.' : 'Connection error.');
        }
        setSubmitting(false);
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
        <form onSubmit={handleSubmit} style={s.form}>
          <div className="contact-form-row-responsive" style={s.formRow}>
            <div style={s.field}>
              <label style={s.label}>{isEs ? 'Nombre completo' : 'Full name'} *</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isEs ? 'Ej. Mar\u00eda G\u00f3mez' : 'e.g., Jane Doe'}
                style={{ ...s.input, borderColor: errors.name && touched.name ? '#ef4444' : '#e5e7eb' }}
              />
            </div>
            <div style={s.field}>
              <label style={s.label}>{isEs ? 'Empresa o rol' : 'Company or role'}</label>
              <input
                type="text"
                name="company"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isEs ? 'Ej. Mercado Libre, Recruiter' : 'e.g., Company, Recruiter'}
                style={s.input}
              />
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Email *</label>
            <input
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@company.com"
              style={{ ...s.input, borderColor: errors.email && touched.email ? '#ef4444' : '#e5e7eb' }}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>{isEs ? 'Mensaje' : 'Message'} *</label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={6}
              placeholder={isEs ? 'Comparte brevemente tu propuesta o proyecto...' : 'Briefly share your proposal or project...'}
              style={{ ...s.input, ...s.textarea, borderColor: errors.message && touched.message ? '#ef4444' : '#e5e7eb' }}
            />
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            style={{ ...s.submitBtn, opacity: isSubmitting ? 0.7 : 1 }}
            whileHover={isSubmitting ? {} : { backgroundColor: '#15803d' }}
            whileTap={isSubmitting ? {} : { scale: 0.98 }}
          >
            {isSubmitting ? <Loader2 size={16} style={s.spinner} /> : <Send size={15} />}
            <span>{isSubmitting ? (isEs ? 'Enviando...' : 'Sending...') : (isEs ? 'Enviar mensaje' : 'Send message')}</span>
          </motion.button>

          <AnimatePresence>
            {statusMsg && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{ ...s.statusMsg, color: success ? '#16a34a' : '#ef4444' }}
              >
                {success && <Check size={14} />}
                <span>{statusMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          <p style={s.privacy}>
            {isEs
              ? '* Tu informaci\u00f3n no ser\u00e1 compartida con terceros.'
              : '* Your information will not be shared with third parties.'}
          </p>
        </form>
      )}
    </Formik>
  );
};

/* ═══════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════ */
const Contact = () => {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <Layouts rightPanelBackground="/img/person/bg-1.jpg" rightPanelImg="/img/person/1.png">
      <PageBanner pageTitle={isEs ? 'Hablemos' : "Let\u2019s Talk"} align="center" />

      <section className="mil-p-90-60">
        <div className="contact-grid-responsive" style={s.grid}>
          {/* ── Left Column ── */}
          <FadeInView delay={0.1}>
            <div style={s.leftCol}>
              <RealTimeStatusCard isEs={isEs} />
              <PriorityCallBookingCard isEs={isEs} />
              <ExecutiveSocialBento />
            </div>
          </FadeInView>

          {/* ── Right Column: Form ── */}
          <FadeInView delay={0.2}>
            <div style={s.formCard}>
              <h3 style={s.formTitle}>{isEs ? 'Escr\u00edbeme' : 'Send a message'}</h3>
              <p style={s.formSub}>
                {isEs
                  ? 'Completa el formulario y te responder\u00e9 en menos de 24 horas.'
                  : "Complete the form and I'll respond within 24 hours."}
              </p>
              <ChrisBanner isEs={isEs} />
              <ModernExecutiveContactForm isEs={isEs} />
            </div>
          </FadeInView>
        </div>
      </section>
    </Layouts>
  );
};

/* ═══════════════════════════════════════════
   STYLES
   ═══════════════════════════════════════════ */
const s = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.5fr',
    gap: '36px',
    alignItems: 'start',
  },
  leftCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '100%',
  },

  /* Status Card */
  statusCard: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '14px',
    padding: '20px',
    cursor: 'pointer',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    width: '100%',
    boxSizing: 'border-box',
  },
  statusRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '10px',
  },
  statusDotWrap: {
    position: 'relative',
    width: '10px',
    height: '10px',
  },
  statusDot: {
    position: 'absolute',
    inset: '1px',
    borderRadius: '50%',
  },
  statusPing: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '2px solid #22c55e',
    animation: 'pingAnim 1.5s ease-out infinite',
  },
  statusBadge: (on) => ({
    fontSize: '11px',
    fontWeight: 600,
    padding: '2px 10px',
    borderRadius: '10px',
    background: on ? '#dcfce7' : '#f3f4f6',
    color: on ? '#15803d' : '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  }),
  statusTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 6px',
  },
  statusMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '12px',
    color: '#6b7280',
    marginBottom: '8px',
  },
  statusHint: {
    fontSize: '11px',
    color: '#9ca3af',
    margin: 0,
    fontStyle: 'italic',
  },

  /* Modal */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.4)',
    backdropFilter: 'blur(4px)',
    zIndex: 10000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  modal: {
    background: '#fff',
    borderRadius: '16px',
    padding: '28px 24px',
    maxWidth: '420px',
    width: '100%',
    position: 'relative',
    boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
  },
  modalClose: {
    position: 'absolute',
    top: '12px',
    right: '12px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#9ca3af',
    padding: '4px',
    display: 'flex',
  },
  modalTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 4px',
  },
  modalSub: {
    fontSize: '13px',
    color: '#6b7280',
    margin: '0 0 16px',
  },
  heatmapGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '4px',
    marginBottom: '16px',
  },
  heatmapCell: {
    padding: '6px 0',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    fontSize: '11px',
    textAlign: 'center',
  },
  modalNote: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '13px',
    color: '#374151',
    background: '#f0fdf4',
    borderRadius: '8px',
    padding: '10px 12px',
  },

  /* Booking Card */
  bookingCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '20px',
    background: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 100%)',
    border: '1px solid #bbf7d0',
    borderRadius: '14px',
    textDecoration: 'none',
    cursor: 'pointer',
    width: '100%',
    boxSizing: 'border-box',
  },
  bookingIconBox: {
    width: '44px',
    height: '44px',
    borderRadius: '12px',
    background: '#16a34a',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bookingLabel: {
    fontSize: '10px',
    fontWeight: 700,
    color: '#16a34a',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    margin: '0 0 2px',
  },
  bookingTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 2px',
    lineHeight: 1.3,
  },
  bookingSub: {
    fontSize: '12px',
    color: '#6b7280',
    margin: 0,
  },

  /* Social */
  socialGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialCard: {
    display: 'flex',
    alignItems: 'center',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    width: '100%',
    boxSizing: 'border-box',
    overflow: 'hidden',
  },
  socialLink: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    padding: '13px 16px',
    textDecoration: 'none',
    flex: 1,
    minWidth: 0,
  },
  socialLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#202124',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  copyBtn: {
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    borderLeft: '1px solid #f3f4f6',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
  },

  /* CHRIS Banner */
  chrisBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '12px 14px',
    background: '#f0fdf4',
    border: '1px solid #dcfce7',
    borderRadius: '10px',
    marginBottom: '18px',
  },
  chrisText: {
    fontSize: '12px',
    color: '#15803d',
    lineHeight: 1.5,
    margin: 0,
  },

  /* Form Card */
  formCard: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '32px 28px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.03)',
  },
  formTitle: {
    fontSize: '20px',
    fontWeight: 800,
    color: '#202124',
    margin: '0 0 4px',
  },
  formSub: {
    fontSize: '14px',
    color: '#6b7280',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  field: {
    width: '100%',
    minWidth: 0,
  },
  label: {
    display: 'block',
    fontSize: '13px',
    fontWeight: 500,
    color: '#374151',
    marginBottom: '6px',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    fontSize: '14px',
    fontFamily: 'inherit',
    background: '#ffffff',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
  },
  textarea: {
    resize: 'vertical',
    minHeight: '140px',
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '14px',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  statusMsg: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: 500,
  },
  privacy: {
    fontSize: '11px',
    color: '#9ca3af',
    margin: 0,
  },
};

export default Contact;
