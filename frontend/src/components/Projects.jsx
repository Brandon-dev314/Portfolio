import { useState } from 'react';
import { PROJECTS } from '../data/profile';
import { useReveal } from '../hooks/useReveal';

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false);
  const [ref, visible] = useReveal(0.1);

  const r = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <div ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...r(index * 0.1),
        padding: 32, borderRadius: 12,
        border: `1px solid ${hovered ? project.accent + '30' : 'var(--card-border)'}`,
        background: hovered ? 'var(--card-bg)' : 'transparent',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        cursor: 'default', position: 'relative', overflow: 'hidden',
      }}
    >
      <div style={{
        position: 'absolute', top: -60, right: -60,
        width: 200, height: 200, borderRadius: '50%',
        background: `radial-gradient(circle, ${project.accent}08 0%, transparent 70%)`,
        opacity: hovered ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 20, color: project.accent }}>{project.icon}</span>
              <h3 style={{
                fontSize: 20, fontFamily: 'var(--font-body)',
                fontWeight: 600, color: 'var(--fg)', margin: 0,
              }}>{project.title}</h3>
            </div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: 11,
              color: project.accent, letterSpacing: 1.5,
              textTransform: 'uppercase', opacity: 0.8,
            }}>{project.subtitle}</span>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--muted)', letterSpacing: 1, textTransform: 'uppercase',
              padding: '6px 12px', borderRadius: 4,
              border: '1px solid var(--card-border)', transition: 'all 0.3s',
            }}
              onMouseEnter={(e) => { e.target.style.borderColor = project.accent + '40'; e.target.style.color = project.accent; }}
              onMouseLeave={(e) => { e.target.style.borderColor = 'var(--card-border)'; e.target.style.color = 'var(--muted)'; }}
            >GitHub →</a>
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noopener noreferrer" style={{
                fontFamily: 'var(--font-mono)', fontSize: 10,
                color: project.accent, letterSpacing: 1, textTransform: 'uppercase',
                padding: '6px 12px', borderRadius: 4,
                border: `1px solid ${project.accent}30`, transition: 'all 0.3s',
                background: project.accent + '10',
              }}
                onMouseEnter={(e) => { e.target.style.background = project.accent + '20'; e.target.style.borderColor = project.accent + '60'; }}
                onMouseLeave={(e) => { e.target.style.background = project.accent + '10'; e.target.style.borderColor = project.accent + '30'; }}
              >Demo ↗</a>
            )}
          </div>
        </div>

        <p style={{
          fontSize: 14, lineHeight: 1.75, fontWeight: 300,
          color: 'var(--muted)', marginBottom: 20, maxWidth: 540,
        }}>{project.description}</p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {project.tech.map((t) => (
            <span key={t} style={{
              fontFamily: 'var(--font-mono)', fontSize: 10,
              color: 'var(--muted)', letterSpacing: 0.5,
              padding: '4px 10px', borderRadius: 4,
              background: 'var(--card-bg)',
              border: '1px solid var(--card-border)',
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, visible] = useReveal(0.1);

  const r = (delay) => ({
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.8s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  return (
    <section ref={ref} id="projects" style={{
      padding: '120px var(--pad-x)',
      borderTop: '1px solid var(--subtle)',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <span style={{
          ...r(0.1),
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--accent)', letterSpacing: 3,
          textTransform: 'uppercase', display: 'block', marginBottom: 16,
        }}>Projects</span>

        <h2 style={{
          ...r(0.2),
          fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)',
          fontFamily: 'var(--font-body)', fontWeight: 200,
          lineHeight: 1.3, color: 'var(--fg)', marginBottom: 48,
        }}>Things I've <span style={{ fontWeight: 600 }}>built</span></h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
          gap: 20,
        }}>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}