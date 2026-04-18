import { useState, useRef, useEffect } from 'react';

const API_URL = import.meta.env.PROD
  ? 'https://tu-backend-en-render.com/api/chat'
  : '/api/chat';

const SUGGESTIONS = [
  '¿Quién es Brandon?',
  '¿Qué proyectos tiene?',
  'Tell me about DevAgent',
  '¿Qué tecnologías usa?',
];

function Message({ role, content }) {
  const isUser = role === 'user';
  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: 12,
    }}>
      <div style={{
        maxWidth: '80%', padding: '10px 14px',
        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        background: isUser ? 'var(--accent)' : 'var(--subtle)',
        color: isUser ? 'var(--bg)' : 'var(--fg)',
        fontSize: 13, lineHeight: 1.6,
        fontWeight: isUser ? 500 : 300,
      }}>
        {content}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{
      display: 'flex', gap: 4, padding: '10px 14px',
      background: 'var(--subtle)',
      borderRadius: '12px 12px 12px 2px',
      width: 'fit-content', marginBottom: 12,
    }}>
      {[0, 1, 2].map((i) => (
        <div key={i} style={{
          width: 6, height: 6, borderRadius: '50%',
          background: 'var(--muted)',
          animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  );
}

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEnd = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEnd.current) {
      messagesEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  const sendMessage = async (text) => {
    const userMsg = { role: 'user', content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages([...newMessages, {
        role: 'assistant', content: 'Sorry, I had trouble connecting. Please try again.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;
    sendMessage(input.trim());
  };

  return (
    <>
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 200,
        width: 52, height: 52, borderRadius: '50%',
        background: open ? 'var(--subtle)' : 'var(--accent)',
        color: open ? 'var(--fg)' : 'var(--bg)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 20,
        boxShadow: open ? 'none' : '0 4px 24px var(--accent-glow)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
      }}>{open ? '✕' : '⬡'}</button>

      {open && (
        <div style={{
          position: 'fixed', bottom: 88, right: 24, zIndex: 199,
          width: 360, height: 480,
          background: 'var(--bg)',
          border: '1px solid var(--card-border)',
          borderRadius: 16, display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 16px 48px rgba(0,0,0,0.3)',
          animation: 'fadeUp 0.3s ease',
        }}>
          <div style={{
            padding: '16px 20px',
            borderBottom: '1px solid var(--subtle)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: '50%',
              background: 'var(--accent)', boxShadow: '0 0 8px var(--accent-glow)',
            }} />
            <div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 13,
                fontWeight: 500, color: 'var(--fg)',
              }}>DevAgent</div>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: 'var(--muted)', letterSpacing: 1,
              }}>Portfolio Assistant</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 16px 8px' }}>
            {messages.length === 0 && (
              <div>
                <p style={{
                  fontSize: 13, color: 'var(--muted)',
                  fontWeight: 300, marginBottom: 16, lineHeight: 1.6,
                }}>Hi! I'm DevAgent. Ask me anything about Brandon, his projects, or his tech stack.</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {SUGGESTIONS.map((s) => (
                    <button key={s} onClick={() => sendMessage(s)} style={{
                      background: 'var(--card-bg)',
                      border: '1px solid var(--card-border)',
                      borderRadius: 8, padding: '8px 12px',
                      color: 'var(--muted)', fontSize: 12, textAlign: 'left',
                      cursor: 'pointer', transition: 'all 0.2s',
                      fontFamily: 'var(--font-body)',
                    }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = 'var(--accent)';
                        e.target.style.color = 'var(--accent)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = 'var(--card-border)';
                        e.target.style.color = 'var(--muted)';
                      }}
                    >{s}</button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((msg, i) => (
              <Message key={i} role={msg.role} content={msg.content} />
            ))}
            {loading && <TypingIndicator />}
            <div ref={messagesEnd} />
          </div>

          <form onSubmit={handleSubmit} style={{
            padding: '12px 16px',
            borderTop: '1px solid var(--subtle)',
            display: 'flex', gap: 8,
          }}>
            <input ref={inputRef} value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..." disabled={loading}
              style={{
                flex: 1, background: 'var(--card-bg)',
                border: '1px solid var(--card-border)',
                borderRadius: 8, padding: '10px 14px',
                color: 'var(--fg)', fontSize: 13,
                fontFamily: 'var(--font-body)', outline: 'none',
                transition: 'border-color 0.3s',
              }}
              onFocus={(e) => e.target.style.borderColor = 'var(--accent)'}
              onBlur={(e) => e.target.style.borderColor = 'var(--card-border)'}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{
              background: input.trim() ? 'var(--accent)' : 'var(--subtle)',
              color: input.trim() ? 'var(--bg)' : 'var(--muted)',
              border: 'none', borderRadius: 8,
              padding: '0 16px', cursor: input.trim() ? 'pointer' : 'default',
              fontFamily: 'var(--font-mono)', fontSize: 12,
              fontWeight: 600, transition: 'all 0.3s',
            }}>→</button>
          </form>
        </div>
      )}
    </>
  );
}