'use client';

import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.7);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  };

  return <button type="button" onClick={scrollToTop} aria-label="Back to top" title="Back to top" className={`fixed bottom-6 right-6 z-40 card p-3 text-[var(--accent)] shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:border-[var(--accent)] ${visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-3 opacity-0'}`}>
    <ArrowUp size={18} aria-hidden="true" />
  </button>;
};

export default BackToTop;
