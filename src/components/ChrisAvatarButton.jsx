import { useState, useEffect, useRef, useCallback } from 'react';
import {
  motion,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from 'framer-motion';
import { useLocale } from '@library/useLocale';

const SUGGESTIONS = {
  en: [
    "Hi, I'm C.H.R.I.S. Ask me why you should hire Brayan!",
    'Ask about his GCP & Kubernetes experience',
    'Want to know how he cut delivery time by 60%?',
  ],
  es: [
    '\u00a1Hola! Soy C.H.R.I.S. \u00bfQuieres saber por qu\u00e9 deber\u00edas contratar a Brayan?',
    'Preg\u00fantame sobre su experiencia en GCP y Kubernetes',
    '\u00bfSabes c\u00f3mo redujo el tiempo de entrega en un 60%?',
  ],
};

const TOOLTIP_DELAY = 3000;
const TOOLTIP_AUTO_DISMISS = 10000;
const TOOLTIP_ROTATE_INTERVAL = 6000;
const MOUSE_RANGE = 5;

const ChrisAvatarButton = ({ onClick, isOpen }) => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const suggestions = isEs ? SUGGESTIONS.es : SUGGESTIONS.en;

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipIdx, setTooltipIdx] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const buttonRef = useRef(null);

  /* ── Mouse tracking with MotionValues (zero re-renders) ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = 400;
      const factor = Math.min(dist, maxDist) / maxDist;
      mouseX.set((dx / (dist || 1)) * MOUSE_RANGE * factor);
      mouseY.set((dy / (dist || 1)) * MOUSE_RANGE * factor);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  /* ── Tooltip auto-show after delay ── */
  useEffect(() => {
    if (isOpen || dismissed) return;
    const timer = setTimeout(() => setShowTooltip(true), TOOLTIP_DELAY);
    return () => clearTimeout(timer);
  }, [isOpen, dismissed]);

  /* ── Rotate tooltip messages ── */
  useEffect(() => {
    if (!showTooltip) return;
    const interval = setInterval(() => {
      setTooltipIdx((prev) => (prev + 1) % suggestions.length);
    }, TOOLTIP_ROTATE_INTERVAL);
    return () => clearInterval(interval);
  }, [showTooltip, suggestions.length]);

  /* ── Auto-dismiss tooltip after 10s ── */
  useEffect(() => {
    if (!showTooltip) return;
    const timer = setTimeout(() => {
      setShowTooltip(false);
      setDismissed(true);
    }, TOOLTIP_AUTO_DISMISS);
    return () => clearTimeout(timer);
  }, [showTooltip]);

  /* ── Hide tooltip on scroll ── */
  useEffect(() => {
    if (!showTooltip) return;
    const handleScroll = () => {
      setShowTooltip(false);
      setDismissed(true);
    };
    window.addEventListener('scroll', handleScroll, { once: true, passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTooltip]);

  const handleClick = useCallback(() => {
    setShowTooltip(false);
    setDismissed(true);
    onClick?.();
  }, [onClick]);

  const handleDismiss = useCallback((e) => {
    e.stopPropagation();
    setShowTooltip(false);
    setDismissed(true);
  }, []);

  return (
    <div style={s.wrapper}>
      {/* ── Tooltip bubble ── */}
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            style={s.tooltip}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={tooltipIdx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                style={s.tooltipText}
              >
                {suggestions[tooltipIdx]}
              </motion.p>
            </AnimatePresence>
            <button onClick={handleDismiss} style={s.tooltipClose}>
              &times;
            </button>
            {/* Arrow pointing right */}
            <div style={s.tooltipArrow} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── C.H.R.I.S. Avatar Button ── */}
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        onMouseEnter={() => {
          setIsHovered(true);
          setShowTooltip(false);
          setDismissed(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        style={s.button}
        whileTap={{ scale: 0.92 }}
        aria-label="Open C.H.R.I.S. AI Assistant"
      >
        {/* Outer ring — rotates on hover */}
        <motion.div
          style={s.outerRing}
          animate={{
            rotate: isHovered ? 360 : 0,
            borderColor: isHovered
              ? 'rgba(76,175,80,0.8)'
              : 'rgba(76,175,80,0.3)',
          }}
          transition={{
            rotate: { duration: 3, ease: 'linear', repeat: isHovered ? Infinity : 0 },
            borderColor: { duration: 0.3 },
          }}
        >
          {/* Dashed accent segments */}
          <div style={{ ...s.segment, top: '-2px', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...s.segment, bottom: '-2px', left: '50%', transform: 'translateX(-50%)' }} />
          <div style={{ ...s.segment, left: '-2px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' }} />
          <div style={{ ...s.segment, right: '-2px', top: '50%', transform: 'translateY(-50%) rotate(90deg)' }} />
        </motion.div>

        {/* Middle glow ring */}
        <motion.div
          style={s.glowRing}
          animate={{
            boxShadow: isHovered
              ? '0 0 20px rgba(76,175,80,0.6), inset 0 0 15px rgba(76,175,80,0.3)'
              : '0 0 12px rgba(76,175,80,0.3), inset 0 0 8px rgba(76,175,80,0.15)',
          }}
          transition={{ duration: 0.4 }}
        />

        {/* Core — breathing + mouse tracking */}
        <motion.div
          style={{
            ...s.core,
            x: springX,
            y: springY,
          }}
          animate={{
            scale: isOpen ? [1, 0.9, 1] : [1, 1.08, 1],
          }}
          transition={{
            scale: {
              duration: 2.5,
              repeat: Infinity,
              ease: 'easeInOut',
            },
          }}
        >
          {/* Inner iris */}
          <motion.div
            style={s.iris}
            animate={{
              background: isOpen
                ? 'radial-gradient(circle, #e53935 0%, #b71c1c 100%)'
                : isHovered
                  ? 'radial-gradient(circle, #81C784 0%, #388E3C 100%)'
                  : 'radial-gradient(circle, #66BB6A 0%, #2E7D32 100%)',
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Bright center dot */}
            <div style={s.pupil} />
          </motion.div>
        </motion.div>

        {/* Close X overlay when chat is open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              style={s.closeOverlay}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Label */}
        <AnimatePresence>
          {!isOpen && isHovered && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              style={s.label}
            >
              C.H.R.I.S.
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

/* ── Styles ── */
const s = {
  wrapper: {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  button: {
    position: 'relative',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    border: 'none',
    background: 'rgba(13,17,23,0.85)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'visible',
    padding: 0,
  },
  outerRing: {
    position: 'absolute',
    inset: '2px',
    borderRadius: '50%',
    border: '1.5px dashed rgba(76,175,80,0.3)',
    pointerEvents: 'none',
  },
  segment: {
    position: 'absolute',
    width: '8px',
    height: '2px',
    background: '#4CAF50',
    borderRadius: '1px',
  },
  glowRing: {
    position: 'absolute',
    inset: '6px',
    borderRadius: '50%',
    border: '1px solid rgba(76,175,80,0.25)',
    pointerEvents: 'none',
  },
  core: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  iris: {
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    background: 'radial-gradient(circle, #66BB6A 0%, #2E7D32 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 10px rgba(76,175,80,0.5)',
  },
  pupil: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    background: 'rgba(255,255,255,0.85)',
    boxShadow: '0 0 6px rgba(255,255,255,0.6)',
  },
  closeOverlay: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    background: 'rgba(229,57,53,0.8)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 5,
  },
  label: {
    position: 'absolute',
    bottom: '-22px',
    left: '50%',
    transform: 'translateX(-50%)',
    fontSize: '9px',
    fontWeight: 700,
    color: '#4CAF50',
    letterSpacing: '0.12em',
    whiteSpace: 'nowrap',
    fontFamily: 'monospace',
    textTransform: 'uppercase',
    pointerEvents: 'none',
  },
  /* Tooltip */
  tooltip: {
    position: 'absolute',
    right: '76px',
    bottom: '8px',
    background: 'rgba(255,255,255,0.97)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '12px 36px 12px 16px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.04)',
    maxWidth: '260px',
    minWidth: '200px',
  },
  tooltipText: {
    fontSize: '13px',
    color: '#202124',
    lineHeight: 1.45,
    margin: 0,
    fontFamily: "'Outfit', system-ui, sans-serif",
  },
  tooltipClose: {
    position: 'absolute',
    top: '6px',
    right: '8px',
    width: '20px',
    height: '20px',
    border: 'none',
    background: 'none',
    color: '#9ca3af',
    fontSize: '16px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    lineHeight: 1,
  },
  tooltipArrow: {
    position: 'absolute',
    right: '-6px',
    top: '50%',
    transform: 'translateY(-50%) rotate(45deg)',
    width: '12px',
    height: '12px',
    background: 'rgba(255,255,255,0.97)',
    boxShadow: '2px -2px 4px rgba(0,0,0,0.04)',
  },
};

export default ChrisAvatarButton;
