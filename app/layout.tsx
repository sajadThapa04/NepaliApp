import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from "@vercel/analytics/next";
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Ukhan Tukka - Nepali Proverbs & Wisdom',
  description: 'Discover timeless Nepali Ukhan Tukka (proverbs) and their hidden wisdom. Explore traditional Nepali sayings with meanings and interpretations.',
  keywords: 'Nepali proverbs, Ukhan Tukka, Nepali wisdom, traditional sayings, Nepali culture',
  authors: [{ name: 'Nepali Cultural Hub' }],
  openGraph: {
    title: 'Ukhan Tukka - Nepali Proverbs & Wisdom',
    description: 'Discover timeless Nepali proverbs and their hidden wisdom',
    type: 'website',
    locale: 'ne_NP',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ne" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (theme === 'dark' || (!theme && systemPreference)) {
                  document.documentElement.classList.add('dark');
                } else {
                  document.documentElement.classList.remove('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200`}>
        <main>
          {children}
        </main>
        <Analytics />
      </body>
    </html>
  );
}