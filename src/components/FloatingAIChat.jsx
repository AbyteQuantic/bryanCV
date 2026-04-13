import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, X } from 'lucide-react';
import { useLocale } from '@library/useLocale';
import { sendEvent } from '@library/useTracking';
import ChrisAvatarButton from '@components/ChrisAvatarButton';

const MAX_MESSAGES = 5;

const FloatingAIChat = () => {
  const locale = useLocale();
  const isEs = locale === 'es';
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [requestCount, setRequestCount] = useState(0);
  const [limitReached, setLimitReached] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const welcomeMsg = isEs
    ? '\u00a1Hola! Soy el asistente de IA de Brayan. Fui construido por \u00e9l con Next.js y Gemini. \u00bfQu\u00e9 te gustar\u00eda saber sobre su experiencia? (5 mensajes por sesi\u00f3n)'
    : "Hi! I'm Brayan's AI Assistant. He built me with Next.js and Gemini. What would you like to know about his experience? (5 messages per session)";

  const limitMsg = isEs
    ? 'Has alcanzado el l\u00edmite de 5 mensajes por sesi\u00f3n. Contacta a Brayan en abytecorp@gmail.com'
    : "You've reached the 5-message session limit. Reach Brayan at abytecorp@gmail.com";

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{ role: 'bot', text: welcomeMsg }]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) inputRef.current?.focus();
  }, [isOpen]);

  const sendMessage = async () => {
    if (!input.trim() || loading || limitReached) return;

    const userMsg = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages
        .filter((m, i) => !(m.role === 'bot' && i === 0))
        .map((m) => ({
          role: m.role === 'user' ? 'user' : 'model',
          text: m.text,
        }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMsg,
          history,
          requestCount,
          locale: isEs ? 'es' : 'en',
        }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'bot', text: data.reply }]);
      sendEvent('chat_question', { question: userMsg });

      const newCount = requestCount + 1;
      setRequestCount(newCount);

      if (data.limitReached || newCount >= MAX_MESSAGES) {
        setLimitReached(true);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: isEs
            ? 'Error de conexi\u00f3n. Contacta a Brayan en abytecorp@gmail.com.'
            : 'Connection error. Reach Brayan at abytecorp@gmail.com.',
        },
      ]);
    }

    setLoading(false);
  };

  const remaining = MAX_MESSAGES - requestCount;

  const styles = {
    fab: {
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '56px',
      height: '56px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #4CAF50, #2E7D32)',
      border: 'none',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 20px rgba(76,175,80,0.4)',
      zIndex: 9999,
      transition: 'transform 0.2s, box-shadow 0.2s',
      color: '#fff',
    },
    panel: {
      position: 'fixed',
      bottom: '90px',
      right: '24px',
      width: '380px',
      maxWidth: 'calc(100vw - 48px)',
      height: '500px',
      maxHeight: 'calc(100vh - 140px)',
      borderRadius: '16px',
      background: 'rgba(255,255,255,0.97)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      boxShadow:
        '0 8px 40px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      fontFamily: "'Outfit', system-ui, sans-serif",
    },
    header: {
      padding: '16px 20px',
      background: 'linear-gradient(135deg, #202124, #2d2d30)',
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    headerTitle: {
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      fontSize: '14px',
      fontWeight: 600,
      letterSpacing: '0.3px',
    },
    headerBadge: {
      fontSize: '10px',
      background: '#4CAF50',
      padding: '2px 8px',
      borderRadius: '10px',
      fontWeight: 500,
    },
    closeBtn: {
      background: 'none',
      border: 'none',
      color: '#999',
      cursor: 'pointer',
      padding: '4px',
      display: 'flex',
      transition: 'color 0.2s',
    },
    messagesArea: {
      flex: 1,
      overflowY: 'auto',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
    },
    message: (isUser) => ({
      maxWidth: '85%',
      padding: '10px 14px',
      borderRadius: isUser ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      background: isUser
        ? 'linear-gradient(135deg, #4CAF50, #388E3C)'
        : '#f1f3f4',
      color: isUser ? '#fff' : '#202124',
      fontSize: '13px',
      lineHeight: '1.5',
      alignSelf: isUser ? 'flex-end' : 'flex-start',
      wordBreak: 'break-word',
    }),
    messageLabel: {
      fontSize: '10px',
      color: '#999',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
    },
    inputArea: {
      padding: '12px 16px',
      borderTop: '1px solid #eee',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
    },
    inputRow: {
      display: 'flex',
      gap: '8px',
      alignItems: 'center',
    },
    input: {
      flex: 1,
      border: '1px solid #e0e0e0',
      borderRadius: '24px',
      padding: '10px 16px',
      fontSize: '13px',
      outline: 'none',
      fontFamily: 'inherit',
      transition: 'border-color 0.2s',
      background: limitReached ? '#f5f5f5' : '#fafafa',
      color: limitReached ? '#999' : '#202124',
    },
    sendBtn: {
      width: '38px',
      height: '38px',
      borderRadius: '50%',
      background: loading || limitReached ? '#ccc' : '#4CAF50',
      border: 'none',
      cursor: loading || limitReached ? 'default' : 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#fff',
      transition: 'background 0.2s',
      flexShrink: 0,
    },
    counter: {
      fontSize: '11px',
      color: limitReached ? '#e53935' : '#999',
      textAlign: 'center',
      fontWeight: limitReached ? 600 : 400,
    },
    typing: {
      fontSize: '12px',
      color: '#999',
      fontStyle: 'italic',
      padding: '4px 14px',
    },
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <div style={styles.headerTitle}>
              <Bot size={18} />
              <span>{isEs ? 'Asistente IA de Brayan' : "Brayan\u2019s AI Assistant"}</span>
              <span style={styles.headerBadge}>Gemini</span>
            </div>
            <button
              style={styles.closeBtn}
              onClick={() => setIsOpen(false)}
            >
              <X size={18} />
            </button>
          </div>

          <div style={styles.messagesArea}>
            {messages.map((msg, i) => (
              <div key={i}>
                <div
                  style={{
                    ...styles.messageLabel,
                    justifyContent:
                      msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  {msg.role === 'user' ? (
                    <>
                      <User size={10} /> {isEs ? 'T\u00fa' : 'You'}
                    </>
                  ) : (
                    <>
                      <Bot size={10} /> {isEs ? 'Asistente IA' : 'AI Assistant'}
                    </>
                  )}
                </div>
                <div style={styles.message(msg.role === 'user')}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div style={styles.typing}>
                {isEs ? 'Pensando...' : 'Thinking...'}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={styles.inputArea}>
            <div style={styles.inputRow}>
              <input
                ref={inputRef}
                style={styles.input}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                placeholder={
                  limitReached
                    ? isEs
                      ? 'L\u00edmite alcanzado'
                      : 'Limit reached'
                    : isEs
                      ? 'Pregunta sobre Brayan...'
                      : 'Ask about Brayan...'
                }
                disabled={loading || limitReached}
              />
              <button
                style={styles.sendBtn}
                onClick={sendMessage}
                disabled={loading || limitReached}
              >
                <Send size={16} />
              </button>
            </div>
            <div style={styles.counter}>
              {limitReached
                ? limitMsg
                : isEs
                  ? `${remaining} mensaje${remaining !== 1 ? 's' : ''} restante${remaining !== 1 ? 's' : ''}`
                  : `${remaining} message${remaining !== 1 ? 's' : ''} remaining`}
            </div>
          </div>
        </div>
      )}

      {/* C.H.R.I.S. Avatar Button */}
      <ChrisAvatarButton
        onClick={() => setIsOpen(!isOpen)}
        isOpen={isOpen}
      />
    </>
  );
};

export default FloatingAIChat;
