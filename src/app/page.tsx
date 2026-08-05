import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import BackToTop from '@/components/BackToTop';
import { portfolioData } from '@/lib/data';

const siteUrl = 'https://guneetsura.github.io';

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: portfolioData.profile.name,
  url: siteUrl,
  jobTitle: portfolioData.profile.title,
  description: portfolioData.profile.tagline,
  address: { '@type': 'PostalAddress', addressLocality: portfolioData.profile.location, addressCountry: 'IN' },
  sameAs: [portfolioData.profile.github, portfolioData.profile.linkedin],
  worksFor: { '@type': 'Organization', name: portfolioData.profile.currentlyAt },
  knowsAbout: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'Tailwind CSS', 'PostgreSQL', 'Python'],
};

const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Guneet Sura',
  url: siteUrl,
  description: 'Portfolio of Guneet Sura, a frontend-focused software engineer.',
};

export default function Home() {
  return (
    <main id="main-content" className="relative">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Contact />
      <BackToTop />
    </main>
  );
}
