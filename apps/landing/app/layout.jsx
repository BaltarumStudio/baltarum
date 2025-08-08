export const metadata = {
  title: 'BALTARUM',
  description: 'Rogue Cards. Real stakes. On-Chain.',
  openGraph: {
    title: 'BALTARUM',
    description: 'Rogue Cards. Real stakes. On-Chain.',
    url: 'https://baltarum.vercel.app',
    siteName: 'BALTARUM',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'BALTARUM Banner',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@baltarum',
    images: ['/og.png'],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, backgroundColor: '#000', color: '#fff' }}>
        {children}
      </body>
    </html>
  );
}
