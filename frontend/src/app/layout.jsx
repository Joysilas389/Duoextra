import '@/styles/globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'DuoExtra — German Exam Prep & Language Learning',
  description: 'Master German for Goethe & telc exams. Listening, Reading, Writing, Speaking — with AI feedback, mock exams, and real-life conversation training.',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--brand-bg)] text-[var(--brand-text)]">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
