import { PROFILE } from '../data/profile';
import { useReveal } from '../hooks/useReveal';

export default function About() {
  const [ref, visible] = useReveal(0.15);

  const r = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section ref={ref} id="about" style={{
      padding: '120px var(--pad-x)',
      borderTop: '1px solid var(--subtle)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          ...r(0.1),
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--accent)', letterSpacing: 3,
          textTransform: 'uppercase', display: 'block', marginBottom: 40,
        }}>About</span>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.4fr)',
          gap: 60, alignItems: 'start',
        }}>
          <div>
            <h2 style={{
              ...r(0.2),
              fontSize: 'clamp(1.8rem, 4vw, 2.5rem)',
              fontFamily: 'var(--font-body)', fontWeight: 200,
              lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--fg)',
            }}>
              Turning data into<br />
              <span style={{ fontWeight: 600 }}>intelligent systems</span>
            </h2>

            <div style={{ ...r(0.4), marginTop: 40, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { label: 'Degree', value: 'B.Sc. Computer Science — BUAP' },
                { label: 'Focus', value: 'ML / NLP / GenAI' },
                { label: 'Stack', value: 'Python · FastAPI · AWS · Docker' },
                { label: 'Location', value: PROFILE.location },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'baseline' }}>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--accent)', letterSpacing: 2,
                    textTransform: 'uppercase', minWidth: 70,
                  }}>{item.label}</span>
                  <span style={{ fontSize: 14, color: 'var(--muted)', fontWeight: 300 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {PROFILE.about.map((paragraph, i) => (
              <p key={i} style={{
                ...r(0.25 + i * 0.15),
                fontSize: 15, lineHeight: 1.8, fontWeight: 300, color: 'var(--muted)',
              }}>{paragraph}</p>
            ))}
            <div style={{
              ...r(0.6), width: 40, height: 1, marginTop: 8,
              background: 'var(--accent)', opacity: 0.4,
            }} />
          </div>
        </div>
      </div>
    </section>
  );
}