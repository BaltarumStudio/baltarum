export default function QuestsPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: 40,
        background:
          'radial-gradient(600px circle at 10% 10%, rgba(16,185,129,.12), transparent 60%), radial-gradient(600px circle at 90% 10%, rgba(59,130,246,.10), transparent 60%)'
      }}
    >
      <div style={{ textAlign: 'center', maxWidth: 640 }}>
        <h1 style={{ marginBottom: 10 }}>Quests (soon)</h1>
        <p style={{ color: '#cbd5e1' }}>
          Social & on-chain quests are coming soon. Follow us on X to get early updates.
        </p>
        <p style={{ marginTop: 16 }}>
          <a href="https://x.com/baltarum" target="_blank" rel="noreferrer" style={{ color: '#22c55e', textDecoration: 'none' }}>
            @baltarum
          </a>
        </p>
      </div>
    </main>
  );
}
