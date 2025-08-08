'use client';

export default function Page() {
  const PLAY_URL =
    process.env.NEXT_PUBLIC_PLAY_URL ??
    "https://baltarum-988f-48znio7gf-hendras-projects-8f2c3b3b.vercel.app/";

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "40px",
        background: `
          radial-gradient(600px circle at 10% 10%, rgba(16,185,129,.15), transparent 60%),
          radial-gradient(600px circle at 90% 10%, rgba(59,130,246,.12), transparent 60%)
        `,
      }}
    >
      <div style={{ maxWidth: "640px", textAlign: "center" }}>
        <h1 style={{ fontSize: "2.8rem", marginBottom: 12, color: "#fff", letterSpacing: 2 }}>
          BALTARUM
        </h1>
        <p style={{ color: "#cfcfcf", marginBottom: 28 }}>
          Rogue Cards • Real Stakes • Browser Demo
        </p>

        <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="btn-cta">
          <span className="btn-inner">Play Demo</span>
        </a>
      </div>

      <style jsx>{`
        .btn-cta {
          position: relative;
          display: inline-block;
          padding: 14px 28px;
          border-radius: 14px;
          text-decoration: none;
          font-weight: 800;
          letter-spacing: 0.5px;
          color: #0b0f14;
          background: linear-gradient(90deg, #10b981, #22c55e);
          box-shadow: 0 8px 26px rgba(16, 185, 129, 0.35);
          transition: transform 180ms ease, box-shadow 220ms ease, filter 220ms ease;
          will-change: transform, box-shadow, filter;
          overflow: hidden;
        }
        .btn-cta::before {
          content: "";
          position: absolute;
          inset: -2px;
          border-radius: 16px;
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
        .btn-inner {
          position: relative;
          z-index: 1;
          color: #041014;
          text-shadow: 0 1px 0 rgba(255, 255, 255, 0.25);
        }
        .btn-cta:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 16px 36px rgba(16, 185, 129, 0.45);
          filter: saturate(1.06);
        }
        .btn-cta:active {
          transform: translateY(0) scale(0.99);
          box-shadow: 0 10px 22px rgba(16, 185, 129, 0.35);
        }
        .btn-cta:hover::before {
          opacity: 1;
          animation: sweep 1.2s linear infinite;
        }
        @keyframes sweep {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </main>
  );
}
