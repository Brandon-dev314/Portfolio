import { NAV_LINKS } from '../data/profile';

export default function Nav({ scrolled, theme, toggleTheme }) {
  const navBg = theme === 'dark'
    ? 'rgba(8,8,12,0.88)'
    : 'rgba(245,245,240,0.88)';

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    padding: '0 var(--pad-x)',
    height: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    background: scrolled ? navBg : 'transparent',
    backdropFilter: scrolled ? 'blur(20px)' : 'none',
    borderBottom: scrolled
      ? '1px solid var(--subtle)'
      : '1px solid transparent',
    transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
  };

  const logoStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 15,
    color: 'var(--accent)',
    letterSpacing: 3,
    fontWeight: 500,
  };

  const linkStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 11,
    color: 'var(--muted)',
    textTransform: 'uppercase',
    letterSpacing: 2,
    transition: 'color 0.3s',
  };

  const toggleStyle = {
    width: 36,
    height: 36,
    borderRadius: '50%',
    border: '1px solid var(--subtle)',
    background: 'transparent',
    color: 'var(--muted)',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    transition: 'all 0.3s',
  };

  return (
    <nav style={navStyle}>
      <a href="#top" style={logoStyle}>BE.</a>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_LINKS.map((link) => (
          <a key={link} href={`#${link}`} style={linkStyle}
            onMouseEnter={(e) => (e.target.style.color = 'var(--accent)')}
            onMouseLeave={(e) => (e.target.style.color = 'var(--muted)')}
          >{link}</a>
        ))}
        <button onClick={toggleTheme} style={toggleStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--accent)';
            e.currentTarget.style.color = 'var(--accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--subtle)';
            e.currentTarget.style.color = 'var(--muted)';
          }}
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>
    </nav>
  );
}