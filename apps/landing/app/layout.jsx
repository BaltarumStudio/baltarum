export const metadata = {
  title: 'BALTARUM — Rogue Cards',
  description: 'Roguelike cards. Real stakes. Browser demo.',
  openGraph: {
    title: 'BALTARUM — Rogue Cards',
    description: 'Play the browser demo and join early.',
    images: ['/og.png'], // картинку кладём в /public
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@baltarum', // поменяешь, когда будет хэндл
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: '#0b0f14',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        {children}
      </body>
    </html>
  );
}
