import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'DuoExtra — German Exam Prep',
  description: 'Master German for Goethe & telc exams. Free.',
  manifest: '/manifest.json',
  themeColor: '#0c85f2',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
  appleWebApp: { capable: true, statusBarStyle: 'black-translucent', title: 'DuoExtra' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"><head>
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="mobile-web-app-capable" content="yes" />
      <link rel="apple-touch-icon" href="/icon-192.png" />
    </head>
      <body className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)] overscroll-none">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
