import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Formik } from 'formik';
import {
  Mail,
  Calendar,
  Send,
  Loader2,
  Sparkles,
  MapPin,
  ExternalLink,
} from 'lucide-react';
import Layouts from '@layouts/Layouts';
import PageBanner from '@components/PageBanner';
import appData from '@data/app.json';
import { useLocale } from '@library/useLocale';
import FadeInView from '@components/FadeInView';

/* ── Live Timezone ── */
const LiveTimezoneStatus = ({ isEs }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString(isEs ? 'es-CO' : 'en-US', {
          timeZone: 'America/Bogota',
          hour: '2-digit',
          minute: '2-digit',
        })
      );
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [isEs]);

  return (
    <div style={s.timezone}>
      <div style={s.pingWrap}>
        <span style={s.pingDot} />
        <span style={s.pingRing} />
      </div>
      <div>
        <p style={s.tzTitle}>
          <MapPin size={13} style={{ marginRight: '4px', flexShrink: 0 }} />
          Colombia (UTC-5) {time && <span style={s.tzTime}>&middot; {time}</span>}
        </p>
        <p style={s.tzSub}>
          {isEs
            ? 'Disponible para roles remotos globales'
            : 'Available for global remote roles'}
        </p>
      </div>
    </div>
  );
};

/* ── Booking Card ── */
const DirectBookingCard = ({ isEs }) => (
  <motion.a
    href="https://calendly.com/abytecorp"
    target="_blank"
    rel="noopener noreferrer"
    style={s.bookingCard}
    whileHover={{
      y: -3,
      boxShadow: '0 8px 30px rgba(76,175,80,0.15)',
    }}
  >
    <div style={s.bookingIcon}>
      <Calendar size={22} color="#4CAF50" />
    </div>
    <div>
      <p style={s.bookingTitle}>
        {isEs
          ? 'Agenda una llamada de 15 min'
          : 'Book a 15-min Discovery Call'}
      </p>
      <p style={s.bookingSub}>
        {isEs
          ? 'Hablemos sobre tu equipo y c\u00f3mo puedo aportar'
          : "Let\u2019s discuss your team and how I can contribute"}
      </p>
    </div>
    <span style={s.bookingArrow}>&rarr;</span>
  </motion.a>
);

/* ── Social Links ── */
const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="#202124">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const SOCIALS = [
  {
    Icon: Mail,
    isLucide: true,
    labelEn: 'Email',
    labelEs: 'Correo',
    href: 'mailto:abytecorp@gmail.com',
  },
  {
    Icon: LinkedInIcon,
    isLucide: false,
    labelEn: 'LinkedIn',
    labelEs: 'LinkedIn',
    href: 'https://www.linkedin.com/in/brayan-murcia/',
  },
  {
    Icon: GitHubIcon,
    isLucide: false,
    labelEn: 'GitHub',
    labelEs: 'GitHub',
    href: 'https://github.com/AbyteQuantic',
  },
];

const SocialBento = ({ isEs }) => (
  <div style={s.socialGrid}>
    {SOCIALS.map(({ Icon, labelEn, labelEs, href, isLucide }) => (
      <motion.a
        key={href}
        href={href}
        target={href.startsWith('mailto') ? undefined : '_blank'}
        rel="noopener noreferrer"
        style={s.socialBtn}
        whileHover={{
          y: -2,
          boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        }}
      >
        {isLucide ? <Icon size={18} color="#202124" /> : <Icon />}
        <span style={s.socialLabel}>{isEs ? labelEs : labelEn}</span>
      </motion.a>
    ))}
  </div>
);

/* ── CHRIS Banner ── */
const ChrisBanner = ({ isEs }) => (
  <div style={s.chrisBanner}>
    <Sparkles size={15} color="#4CAF50" style={{ flexShrink: 0 }} />
    <p style={s.chrisText}>
      {isEs
        ? '\u00bfCon prisa? Pregunta a C.H.R.I.S., mi asistente IA, sobre mi perfil directamente usando el n\u00facleo flotante abajo a la derecha.'
        : 'In a hurry? Ask C.H.R.I.S., my AI assistant, about my profile directly using the floating core on the bottom right.'}
    </p>
  </div>
);

/* ── Contact Form ── */
const ModernContactForm = ({ isEs }) => {
  const [statusMsg, setStatusMsg] = useState('');

  return (
    <Formik
      initialValues={{ name: '', company: '', email: '', message: '' }}
      validate={(values) => {
        const errors = {};
        if (!values.name) errors.name = isEs ? 'Requerido' : 'Required';
        if (!values.email) {
          errors.email = isEs ? 'Requerido' : 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = isEs ? 'Email inv\u00e1lido' : 'Invalid email';
        }
        if (!values.message) errors.message = isEs ? 'Requerido' : 'Required';
        return errors;
      }}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        setStatusMsg('');
        const data = new FormData();
        data.append('name', values.name);
        data.append('company', values.company);
        data.append('email', values.email);
        data.append('message', values.message);

        try {
          const res = await fetch(appData.settings.formspreeURL, {
            method: 'POST',
            body: data,
            headers: { Accept: 'application/json' },
          });
          if (res.ok) {
            setStatusMsg(
              isEs
                ? '\u00a1Gracias! Te responder\u00e9 pronto.'
                : "Thanks! I'll get back to you soon."
            );
            resetForm();
          } else {
            setStatusMsg(
              isEs
                ? 'Hubo un problema al enviar tu mensaje.'
                : 'There was a problem sending your message.'
            );
          }
        } catch {
          setStatusMsg(
            isEs
              ? 'Error de conexi\u00f3n. Intenta de nuevo.'
              : 'Connection error. Please try again.'
          );
        }
        setSubmitting(false);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit} style={s.form}>
          <div className="contact-form-row-responsive" style={s.formRow}>
            <div style={s.fieldHalf}>
              <label style={s.label}>{isEs ? 'Nombre' : 'Name'} *</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={isEs ? 'Tu nombre completo' : 'Your full name'}
                style={{
                  ...s.input,
                  borderColor:
                    errors.name && touched.name ? '#e53935' : '#e5e7eb',
                }}
              />
            </div>
            <div style={s.fieldHalf}>
              <label style={s.label}>
                {isEs ? 'Empresa / Reclutador' : 'Company / Recruiter'}
              </label>
              <input
                type="text"
                name="company"
                value={values.company}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={
                  isEs ? 'Tu empresa (opcional)' : 'Your company (optional)'
                }
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
              style={{
                ...s.input,
                borderColor:
                  errors.email && touched.email ? '#e53935' : '#e5e7eb',
              }}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>{isEs ? 'Mensaje' : 'Message'} *</label>
            <textarea
              name="message"
              value={values.message}
              onChange={handleChange}
              onBlur={handleBlur}
              rows={5}
              placeholder={
                isEs
                  ? 'Cu\u00e9ntame sobre tu proyecto o propuesta...'
                  : 'Tell me about your project or proposal...'
              }
              style={{
                ...s.input,
                ...s.textarea,
                borderColor:
                  errors.message && touched.message ? '#e53935' : '#e5e7eb',
              }}
            />
          </div>

          <div style={s.formFooter}>
            <p style={s.privacy}>
              <span style={{ color: '#4CAF50' }}>*</span>{' '}
              {isEs
                ? 'Tu informaci\u00f3n no ser\u00e1 compartida con terceros.'
                : 'Your information will not be shared with third parties.'}
            </p>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              style={{
                ...s.submitBtn,
                opacity: isSubmitting ? 0.7 : 1,
              }}
              whileHover={isSubmitting ? {} : { scale: 1.01, backgroundColor: '#15803d' }}
              whileTap={isSubmitting ? {} : { scale: 0.98 }}
            >
              {isSubmitting ? (
                <Loader2 size={16} style={s.spinner} />
              ) : (
                <Send size={15} />
              )}
              <span>
                {isSubmitting
                  ? isEs
                    ? 'Enviando...'
                    : 'Sending...'
                  : isEs
                    ? 'Enviar mensaje'
                    : 'Send message'}
              </span>
            </motion.button>
          </div>

          {statusMsg && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              style={s.status}
            >
              {statusMsg}
            </motion.p>
          )}
        </form>
      )}
    </Formik>
  );
};

/* ── Main Page ── */
const Contact = () => {
  const locale = useLocale();
  const isEs = locale === 'es';

  return (
    <Layouts
      rightPanelBackground={"/img/person/bg-1.jpg"}
      rightPanelImg={"/img/person/1.png"}
    >
      <PageBanner
        pageTitle={isEs ? 'Hablemos' : "Let\u2019s Talk"}
        align="center"
      />

      <FadeInView>
        <ChrisBanner isEs={isEs} />
      </FadeInView>

      <section className="mil-p-90-60">
        <div className="contact-grid-responsive" style={s.grid}>
          {/* Left Panel */}
          <FadeInView delay={0.1}>
            <div style={s.leftPanel}>
              <LiveTimezoneStatus isEs={isEs} />
              <DirectBookingCard isEs={isEs} />
              <SocialBento isEs={isEs} />
            </div>
          </FadeInView>

          {/* Right Panel - Form */}
          <FadeInView delay={0.2}>
            <div style={s.formCard}>
              <h3 style={s.formTitle}>
                {isEs ? 'Escr\u00edbeme' : 'Send a message'}
              </h3>
              <ModernContactForm isEs={isEs} />
            </div>
          </FadeInView>
        </div>
      </section>
    </Layouts>
  );
};

/* ── Styles ── */
const s = {
  grid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1.4fr',
    gap: '40px',
    alignItems: 'start',
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: '14px',
    width: '100%',
  },

  /* Timezone */
  timezone: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '18px 20px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    width: '100%',
    boxSizing: 'border-box',
  },
  pingWrap: {
    position: 'relative',
    width: '12px',
    height: '12px',
    flexShrink: 0,
  },
  pingDot: {
    position: 'absolute',
    inset: '2px',
    borderRadius: '50%',
    background: '#4CAF50',
  },
  pingRing: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    border: '2px solid #4CAF50',
    animation: 'pingAnim 1.5s ease-out infinite',
  },
  tzTitle: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#202124',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
  tzTime: {
    fontWeight: 400,
    color: '#6b7280',
    marginLeft: '4px',
  },
  tzSub: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0',
  },

  /* Booking Card */
  bookingCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
    padding: '22px 20px',
    background: '#f0fdf4',
    border: '1px solid #bbf7d0',
    borderRadius: '12px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  bookingIcon: {
    width: '44px',
    height: '44px',
    borderRadius: '10px',
    background: '#fff',
    border: '1px solid #dcfce7',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  bookingTitle: {
    fontSize: '14px',
    fontWeight: 700,
    color: '#202124',
    margin: 0,
  },
  bookingSub: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '2px 0 0',
  },
  bookingArrow: {
    marginLeft: 'auto',
    fontSize: '18px',
    color: '#4CAF50',
    fontWeight: 300,
  },

  /* Social */
  socialGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '14px 18px',
    background: '#fff',
    border: '1px solid #e5e7eb',
    borderRadius: '10px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'box-shadow 0.2s',
    boxShadow: '0 1px 2px rgba(0,0,0,0.02)',
    width: '100%',
    boxSizing: 'border-box',
  },
  socialLabel: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#202124',
  },

  /* CHRIS Banner */
  chrisBanner: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    padding: '14px 18px',
    background: '#f0fdf4',
    border: '1px solid #dcfce7',
    borderRadius: '10px',
    marginBottom: '10px',
  },
  chrisText: {
    fontSize: '13px',
    color: '#3f6212',
    lineHeight: 1.5,
    margin: 0,
  },

  /* Form Card */
  formCard: {
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: '16px',
    padding: '32px 28px',
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  },
  formTitle: {
    fontSize: '18px',
    fontWeight: 700,
    color: '#202124',
    margin: '0 0 24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '14px',
  },
  field: {
    width: '100%',
  },
  fieldHalf: {
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
    minHeight: '120px',
  },
  formFooter: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  privacy: {
    fontSize: '12px',
    color: '#9ca3af',
    margin: 0,
  },
  submitBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    width: '100%',
    padding: '13px 24px',
    background: '#16a34a',
    color: '#fff',
    border: 'none',
    borderRadius: '10px',
    fontSize: '15px',
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'background 0.2s',
  },
  spinner: {
    animation: 'spin 1s linear infinite',
  },
  status: {
    fontSize: '13px',
    fontWeight: 500,
    color: '#4CAF50',
    margin: 0,
  },
};

export default Contact;
