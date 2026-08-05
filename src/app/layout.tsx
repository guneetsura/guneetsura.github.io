import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  title: 'Guneet Sura — Software Engineer',
  description:
    'Frontend-focused Software Engineer building production web apps with React, Next.js, and TypeScript.',
  keywords: ['Guneet Sura', 'Software Engineer', 'React', 'Next.js', 'Portfolio'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
