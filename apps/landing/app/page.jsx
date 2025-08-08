'use client';

const PLAY_URL =
  process.env.NEXT_PUBLIC_PLAY_URL ??
  'https://baltarum-988f-48znio7gf-hendras-projects-8f2c3b3b.vercel.app/';

export default function Page() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        background:
          'radial-gradient(600px circle at 10% 10%, rgba(16,185,129,.12), transparent 60%), radial-gradient(600px circle at 90% 10%, rgba(59,130,246,.10), transparent 60%)'
      }}
    >
      {/* NAV */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          borderBottom: '1px solid rgba(255,255,255,.08)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src="/baltarum-mark.svg" alt="Baltarum" width={28} height={28} />
          <strong style={{ letterSpacing: 1 }}>BALTARUM</strong>
        </div>

        <nav style={{ display: 'flex', gap: 14 }}>
          <a href="/quests" style={linkStyle}>Quests</a>
          <a href={PLAY_URL} target="_blank" rel="noreferrer" className="btn-cta">
            <span className="btn-inner">Play Demo</span>
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section style={{ display: 'grid', placeItems: 'center', padding: '56px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: 720 }}>
          <h1 style={{ fontSize: 44, margin: '0 0 12px' }}>Roguelike Cards. Real Stakes.</h1>
          <p style={{ color: '#cbd5e1', marginBottom: 28 }}>
            Community-driven Web3 card roguelike. Play the browser demo and join early.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <a href={PLAY_URL} target="_blank" rel="noreferrer" className="btn-cta">
              <span className="btn-inner">Play Demo</span>
            </a>
            <a href="/quests" style={ghostBtn}>Quests (soon)</a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          padding: '18px 20px',
          borderTop: '1px solid rgba(255,255,255,.08)',
          color: '#a3a3a3',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 14,
        }}
      >
        <span>© {new Date().getFullYear()} Baltarum</span>
        <span>Powered by Vercel</span>
      </footer>

      {/* локальные стили для кнопки */}
      <style jsx>{`
        .btn-cta {
          position: relative;
          display: inline-block;
          padding: 12px 22px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #0b0f14;
          background: linear-gradient(90deg, #10b981, #22c55e);
          box-shadow: 0 8px 26px rgba(16, 185, 129, 0.35);
          transition: transform 180ms ease, box-shadow 220ms ease, filter 220ms ease;
          overflow: hidden;
        }
        .btn-cta::before {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 14px;
          background: conic-gradient(
            from 180deg at 50% 50%,
            rgba(16, 185, 129, 0.25),
            rgba(59, 130, 246, 0.25),
            rgba(250, 204, 21, 0.25),
            rgba(16, 185, 129, 0.25)
          );
          filter: blur(14px);
          opacity: 0;
          transition: opacity 220ms ease;
          z-index: -1;
        }
        .btn-inner { position: relative; z-index: 1; color: #041014; }
        .btn-cta:hover { transform: translateY(-2px) scale(1.02); box-shadow: 0 16px 36px rgba(16,185,129,.45); }
        .btn-cta:active { transform: translateY(0) scale(.99); box-shadow: 0 10px 22px rgba(16,185,129,.35); }
        .btn-cta:hover::before { opacity: 1; animation: sweep 1.2s linear infinite; }
        @keyframes sweep { 0% { transform: rotate(0deg);} 100% { transform: rotate(360deg);} }
      `}</style>
    </main>
  );
}

const linkStyle = { color: '#e2e8f0', textDecoration: 'none', opacity: 0.9 };
const ghostBtn = {
  padding: '12px 22px',
  borderRadius: 12,
  textDecoration: 'none',
  border: '1px solid rgba(255,255,255,.18)',
  color: '#e2e8f0',
  background: 'rgba(255,255,255,.04)',
};
