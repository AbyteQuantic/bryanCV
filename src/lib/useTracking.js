import { useEffect, useRef, useCallback } from 'react';

/* ── Visitor fingerprint (anonymous, no PII) ── */
function getVisitorId() {
  if (typeof window === 'undefined') return null;
  let id = sessionStorage.getItem('_vid');
  if (!id) {
    id = Math.random().toString(36).slice(2) + Date.now().toString(36);
    sessionStorage.setItem('_vid', id);
  }
  return id;
}

function getSessionStart() {
  if (typeof window === 'undefined') return null;
  let ts = sessionStorage.getItem('_vstart');
  if (!ts) {
    ts = String(Date.now());
    sessionStorage.setItem('_vstart', ts);
  }
  return Number(ts);
}

/* ── Fire-and-forget beacon ── */
function sendEvent(event, data = {}) {
  const visitorId = getVisitorId();
  if (!visitorId) return;

  const payload = { event, visitorId, ...data, ts: Date.now() };

  if (navigator.sendBeacon) {
    navigator.sendBeacon(
      '/api/track',
      new Blob([JSON.stringify(payload)], { type: 'application/json' })
    );
  } else {
    fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  }
}

/* ── Hook ── */
export function useTracking() {
  const tracked = useRef(false);

  /* Page view on mount (once per session) */
  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;

    getSessionStart();
    sendEvent('page_view', { section: 'home' });

    /* Session duration on tab close / navigate away */
    const handleUnload = () => {
      const start = getSessionStart();
      if (start) {
        const duration = Math.round((Date.now() - start) / 1000);
        sendEvent('session_end', { duration });
      }
    };

    window.addEventListener('beforeunload', handleUnload);
    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const trackSection = useCallback((section) => {
    sendEvent('page_view', { section });
  }, []);

  const trackChatQuestion = useCallback((question) => {
    sendEvent('chat_question', { question });
  }, []);

  const trackCVDownload = useCallback(() => {
    sendEvent('cv_download');
  }, []);

  return { trackSection, trackChatQuestion, trackCVDownload };
}

/* Direct export for non-hook contexts */
export { sendEvent };
