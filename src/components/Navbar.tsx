'use client';

import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import GSMark from './GSMark';

const NAV_ITEMS = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? (window.scrollY / height) * 100 : 0);
    };
    const sections = ['home', ...NAV_ITEMS.map((item) => item.href.slice(1))]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -60% 0px', threshold: [0.1, 0.3, 0.6] });
    sections.forEach((section) => observer.observe(section));
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll); };
  }, []);

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${scrolled ? 'bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/[0.08]' : 'bg-transparent'}`}>
      <div className="h-0.5 bg-[var(--surface-2)]"><div className="h-full bg-[var(--accent)] transition-[width] duration-150" style={{ width: `${progress}%` }} /></div>
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#home" onClick={closeMenu} className="flex items-center gap-3 font-display text-lg tracking-tight text-[var(--text)]"><GSMark className="h-8 w-8" /><span>Guneet Sura</span></a>
          <div className="hidden md:flex items-center gap-7">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              return <a key={item.name} href={item.href} aria-current={isActive ? 'location' : undefined} className={`link-underline text-sm transition-colors ${isActive ? 'text-[var(--text)]' : 'text-[var(--text-muted)] hover:text-[var(--text)]'}`}>{item.name}</a>;
            })}
            <a href="#contact" className="btn-primary !py-2">Contact</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-[var(--text)] p-2" aria-label={mobileOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileOpen}>
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {mobileOpen && <div className="md:hidden bg-[#0B0C10] border-t border-white/[0.08]"><div className="px-6 py-4 space-y-1">
        {NAV_ITEMS.map((item) => <a key={item.name} href={item.href} onClick={closeMenu} aria-current={activeSection === item.href.slice(1) ? 'location' : undefined} className="block py-3 text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">{item.name}</a>)}
        <a href="#contact" onClick={closeMenu} className="block btn-primary text-center mt-2">Contact</a>
      </div></div>}
    </nav>
  );
};

export default Navbar;
