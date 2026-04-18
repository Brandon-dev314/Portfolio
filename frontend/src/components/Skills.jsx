import { SKILLS, TECH_GROUPS } from '../data/profile';
import { useReveal } from '../hooks/useReveal';

const LEVEL_CONFIG = {
  advanced: { label: 'Advanced', color: 'var(--accent)', dots: 3 },
  intermediate: { label: 'Intermediate', color: 'var(--accent)', dots: 2 },
  basic: { label: 'Basic', color: 'var(--accent)', dots: 1 },
};

function SkillItem({ label, level, delay, visible }) {
  const config = LEVEL_CONFIG[level];

  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.6s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '10px 0',
      borderBottom: '1px solid var(--subtle)',
    }}>
      <span style={{
        fontSize: 13, fontWeight: 400, color: 'var(--fg)', opacity: 0.8,
      }}>{label}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {/* Dots indicator */}
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3].map((dot) => (
            <div key={dot} style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: dot <= config.dots ? config.color : 'var(--subtle)',
              opacity: dot <= config.dots ? 0.8 : 1,
              transition: `background 0.4s ${delay + dot * 0.1}s`,
            }} />
          ))}
        </div>

        {/* Label */}
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 10,
          color: 'var(--muted)',
          letterSpacing: 1,
          textTransform: 'uppercase',
          minWidth: 85,
          textAlign: 'right',
        }}>{config.label}</span>
      </div>
    </div>
  );
}

function TechGroup({ title, items, delay, visible }) {
  return (
    <div style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(16px)',
      transition: `opacity 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.7s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
    }}>
      <h4 style={{
        fontFamily: 'var(--font-mono)', fontSize: 10,
        color: 'var(--accent)', letterSpacing: 2,
        textTransform: 'uppercase', marginBottom: 14, fontWeight: 500,
      }}>{title}</h4>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {items.map((item) => (
          <span key={item} style={{
            fontSize: 12, fontWeight: 300,
            color: 'var(--muted)', padding: '5px 12px', borderRadius: 4,
            background: 'var(--card-bg)', border: '1px solid var(--card-border)',
            transition: 'all 0.3s', cursor: 'default',
          }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = 'var(--accent)';
              e.target.style.color = 'var(--fg)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = 'var(--card-border)';
              e.target.style.color = 'var(--muted)';
            }}
          >{item}</span>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useReveal(0.1);

  const r = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section ref={ref} id="skills" style={{
      padding: '120px var(--pad-x)',
      borderTop: '1px solid var(--subtle)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          ...r(0.1),
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--accent)', letterSpacing: 3,
          textTransform: 'uppercase', display: 'block', marginBottom: 16,
        }}>Skills</span>

        <h2 style={{
          ...r(0.2),
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontFamily: 'var(--font-body)', fontWeight: 200,
          lineHeight: 1.3, color: 'var(--fg)', marginBottom: 56,
        }}>Tools & <span style={{ fontWeight: 600 }}>technologies</span></h2>

        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px 80px',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {SKILLS.map((skill, i) => (
              <SkillItem key={skill.label} label={skill.label}
                level={skill.level} delay={0.1 + i * 0.04} visible={visible} />
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {TECH_GROUPS.map((group, i) => (
              <TechGroup key={group.title} title={group.title}
                items={group.items} delay={0.2 + i * 0.1} visible={visible} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}