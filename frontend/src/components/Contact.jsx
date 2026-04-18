import { PROFILE } from '../data/profile';
import { useReveal } from '../hooks/useReveal';

function ContactLink({ href, label, value, delay, visible }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, border-color 0.3s, background 0.3s`,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 24px', borderRadius: 8,
      border: '1px solid var(--card-border)', cursor: 'pointer',
    }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent)';
        e.currentTarget.style.background = 'var(--card-bg)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--card-border)';
        e.currentTarget.style.background = 'transparent';
      }}
    >
      <div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--accent)', letterSpacing: 2,
          textTransform: 'uppercase', display: 'block', marginBottom: 6,
        }}>{label}</span>
        <span style={{ fontSize: 15, fontWeight: 300, color: 'var(--muted)' }}>{value}</span>
      </div>
      <span style={{
        fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--muted)', opacity: 0.5,
      }}>→</span>
    </a>
  );
}

export default function Contact() {
  const [ref, visible] = useReveal(0.1);

  const r = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section ref={ref} id="contact" style={{
      padding: '120px var(--pad-x) 80px',
      borderTop: '1px solid var(--subtle)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          ...r(0.1),
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--accent)', letterSpacing: 3,
          textTransform: 'uppercase', display: 'block', marginBottom: 16,
        }}>Contact</span>

        <h2 style={{
          ...r(0.2),
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontFamily: 'var(--font-body)', fontWeight: 200,
          lineHeight: 1.3, color: 'var(--fg)', marginBottom: 16,
        }}>Let's <span style={{ fontWeight: 600 }}>connect</span></h2>

        <p style={{
          ...r(0.3),
          fontSize: 15, lineHeight: 1.75, fontWeight: 300,
          color: 'var(--muted)', marginBottom: 48, maxWidth: 480,
        }}>Open to opportunities in Data Science, ML Engineering, and Python development. Feel free to reach out.</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: 12, maxWidth: 640,
        }}>
          <ContactLink href={`mailto:${PROFILE.email}`} label="Email" value={PROFILE.email} delay={0.35} visible={visible} />
          <ContactLink href={PROFILE.github} label="GitHub" value="brandoneroza" delay={0.45} visible={visible} />
          <ContactLink href={PROFILE.linkedin} label="LinkedIn" value="brandoneroza" delay={0.55} visible={visible} />
        </div>

        <div style={{
          ...r(0.7), marginTop: 80, paddingTop: 32,
          borderTop: '1px solid var(--subtle)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: 16,
        }}>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--muted)', letterSpacing: 2, opacity: 0.4,
          }}>BE.</span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 11,
            color: 'var(--muted)', opacity: 0.4,
          }}>Built with React + Vite</span>
        </div>
      </div>
    </section>
  );
}