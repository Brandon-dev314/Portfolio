import { useEffect, useRef } from 'react';
import { PROFILE } from '../data/profile';

function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouseX = 0;
    let mouseY = 0;

    const nodes = Array.from({ length: 25 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2.5 + 1,
    }));

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const handleMouse = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const style = getComputedStyle(document.documentElement);
      const accent = style.getPropertyValue('--accent').trim() || '#64ffda';

      nodes.forEach((node) => {
        node.x += node.vx * 0.002;
        node.y += node.vy * 0.002;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
        node.x = Math.max(0, Math.min(1, node.x));
        node.y = Math.max(0, Math.min(1, node.y));
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const ax = nodes[i].x * canvas.width;
          const ay = nodes[i].y * canvas.height;
          const bx = nodes[j].x * canvas.width;
          const by = nodes[j].y * canvas.height;
          const dist = Math.hypot(ax - bx, ay - by);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.15;
            ctx.beginPath();
            ctx.moveTo(ax, ay);
            ctx.lineTo(bx, by);
            ctx.strokeStyle = accent;
            ctx.globalAlpha = opacity;
            ctx.lineWidth = 0.8;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      // Draw nodes
      nodes.forEach((node) => {
        const px = node.x * canvas.width;
        const py = node.y * canvas.height;
        const mouseDist = Math.hypot(px - mouseX, py - mouseY);
        const glow = mouseDist < 120 ? (1 - mouseDist / 120) * 0.6 : 0;

        ctx.beginPath();
        ctx.arc(px, py, node.radius + glow * 3, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.3 + glow;
        ctx.fill();
        ctx.globalAlpha = 1;

        if (glow > 0.1) {
          ctx.beginPath();
          ctx.arc(px, py, node.radius + glow * 8, 0, Math.PI * 2);
          ctx.fillStyle = accent;
          ctx.globalAlpha = glow * 0.15;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      });

      // Mouse connections
      nodes.forEach((node) => {
        const px = node.x * canvas.width;
        const py = node.y * canvas.height;
        const dist = Math.hypot(px - mouseX, py - mouseY);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(mouseX, mouseY);
          ctx.lineTo(px, py);
          ctx.strokeStyle = accent;
          ctx.globalAlpha = (1 - dist / 120) * 0.25;
          ctx.lineWidth = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouse);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouse);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas ref={canvasRef} style={{
      position: 'absolute', top: 0, left: 0,
      width: '100%', height: '100%', pointerEvents: 'auto',
    }} />
  );
}

export default function Hero({ loaded }) {
  const r = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? 'translateY(0)' : 'translateY(24px)',
    transition: `opacity 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s, transform 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  const btnPrimary = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 28px',
    borderRadius: 6,
    background: 'var(--accent)',
    color: 'var(--bg)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    fontWeight: 600,
    letterSpacing: 1,
    textTransform: 'uppercase',
    transition: 'transform 0.3s, box-shadow 0.3s',
    boxShadow: '0 0 20px var(--accent-glow)',
  };

  const btnSecondary = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: '12px 28px',
    borderRadius: 6,
    background: 'transparent',
    border: '1px solid var(--subtle)',
    color: 'var(--muted)',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: 1,
    textTransform: 'uppercase',
    transition: 'all 0.3s',
  };

  return (
    <section id="top" style={{
      minHeight: '100vh', display: 'flex', flexDirection: 'column',
      justifyContent: 'center', padding: '0 var(--pad-x)',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Dot grid */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.025,
        backgroundImage: 'radial-gradient(var(--fg) 2.5px, transparent 2.5px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Canvas animation — right side */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '50%', height: '100%',
        opacity: loaded ? 0.8 : 0,
        transition: 'opacity 1.5s ease 0.5s',
      }}>
        <HeroCanvas />
      </div>

      <div style={{ position: 'relative', maxWidth: 680, zIndex: 2 }}>
        <div style={{ ...r(0.15), display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
          <div style={{
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--accent)', boxShadow: '0 0 12px var(--accent-glow)',
          }} />
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: 12,
            color: 'var(--accent)', letterSpacing: 3, textTransform: 'uppercase',
          }}>{PROFILE.role}</span>
        </div>

        <h1 style={{
          ...r(0.3), margin: 0, fontSize: 'clamp(3rem, 8vw, 5.5rem)',
          fontFamily: 'var(--font-body)', fontWeight: 200,
          lineHeight: 1.05, letterSpacing: '-0.04em', color: 'var(--fg)',
        }}>
          Brandon<br />
          <span style={{ fontWeight: 700 }}>Eroza</span>
        </h1>

        <p style={{
          ...r(0.5), fontSize: 'clamp(1rem, 2.2vw, 1.2rem)',
          fontWeight: 300, color: 'var(--muted)', lineHeight: 1.75,
          marginTop: 28, maxWidth: 520,
        }}>{PROFILE.tagline}</p>

        <div style={{ ...r(0.65), display: 'flex', gap: 14, marginTop: 44, flexWrap: 'wrap' }}>
          <a href="#projects" style={btnPrimary}
            onMouseEnter={(e) => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 4px 24px var(--accent-glow)'; }}
            onMouseLeave={(e) => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 0 20px var(--accent-glow)'; }}
          >Projects ↓</a>
          <a href="#contact" style={btnSecondary}
            onMouseEnter={(e) => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.target.style.borderColor = 'var(--subtle)'; e.target.style.color = 'var(--muted)'; }}
          >Contact</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        ...r(1.1), position: 'absolute', bottom: 40, left: '50%',
        transform: 'translateX(-50%)', display: 'flex',
        flexDirection: 'column', alignItems: 'center', gap: 8, zIndex: 2,
      }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 10,
          color: 'var(--muted)', letterSpacing: 2, opacity: 0.5,
        }}>SCROLL</span>
        <div style={{
          width: 1, height: 32,
          background: 'linear-gradient(to bottom, var(--accent), transparent)',
          opacity: 0.4, animation: 'pulse 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  );
}