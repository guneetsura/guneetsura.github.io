import { Inter, Space_Grotesk } from 'next/font/google';
import './globals.css';
import type { Metadata } from 'next';

const siteUrl = 'https://guneetsura.github.io';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display' });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Guneet Sura | Frontend Software Engineer',
    template: '%s | Guneet Sura',
  },
  description:
    'Portfolio of Guneet Sura, a frontend-focused software engineer building production web applications with React, Next.js, TypeScript, and modern web technologies.',
  keywords: [
    'Guneet Sura',
    'Frontend Software Engineer',
    'React Developer',
    'Next.js Developer',
    'TypeScript Engineer',
    'Mumbai Software Engineer',
    'Web Developer Portfolio',
  ],
  authors: [{ name: 'Guneet Sura', url: siteUrl }],
  creator: 'Guneet Sura',
  publisher: 'Guneet Sura',
  alternates: { canonical: siteUrl },
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'Guneet Sura',
    title: 'Guneet Sura | Frontend Software Engineer',
    description: 'Production web applications, interfaces, and engineering work by Guneet Sura.',
  },
  twitter: {
    card: 'summary',
    title: 'Guneet Sura | Frontend Software Engineer',
    description: 'Production web applications, interfaces, and engineering work by Guneet Sura.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
