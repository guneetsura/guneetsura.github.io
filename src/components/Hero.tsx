'use client';

import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { getProfile } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { Profile } from '@/lib/types';

const Github: React.FC<{ size?: number }> = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
const Linkedin: React.FC<{ size?: number }> = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>;

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (custom: { delay: number; reduced: boolean }) => ({
    opacity: 1,
    y: 0,
    transition: { duration: custom.reduced ? 0.01 : 0.7, delay: custom.reduced ? 0 : custom.delay, ease: 'easeOut' as const },
  }),
};

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(portfolioData.profile);
  const reducedMotion = useReducedMotion();

  useEffect(() => { getProfile().then(setProfile).catch(() => {}); }, []);

  const reveal = (delay: number) => ({ delay, reduced: Boolean(reducedMotion) });

  return <section id="home" className="hero-shell relative min-h-screen flex items-center overflow-hidden">
    <div className="hero-grid" aria-hidden="true" />
    <div className="hero-telemetry" aria-hidden="true"><span className="font-signal">GS // 001</span><span className="hero-telemetry-line" /><span className="font-signal">VELOCITY / ONLINE</span></div>
    <div className="section !py-0 w-full relative z-10">
      <motion.p custom={reveal(0)} initial="hidden" animate="visible" variants={fadeUp} className="eyebrow mb-4 font-signal text-xs tracking-[0.18em]">
        {profile.currentlyAt ? `Currently building @ ${profile.currentlyAt}` : 'Available for work'}
      </motion.p>
      <motion.h1 custom={reveal(0.1)} initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl sm:text-6xl leading-[1.1] tracking-tight text-[var(--text)] max-w-3xl">{profile.name}</motion.h1>
      <motion.h2 custom={reveal(0.2)} initial="hidden" animate="visible" variants={fadeUp} className="mt-4 text-xl sm:text-2xl text-[var(--text-muted)] font-light max-w-2xl">{profile.title}</motion.h2>
      <motion.p custom={reveal(0.3)} initial="hidden" animate="visible" variants={fadeUp} className="mt-6 text-base sm:text-lg text-[var(--text-faint)] max-w-xl leading-relaxed">{profile.tagline}</motion.p>
      <motion.div custom={reveal(0.4)} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
        <a href="#projects" className="btn-primary">View my work</a>
        <a href="#contact" className="btn-secondary">Get in touch</a>
      </motion.div>
      <motion.div custom={reveal(0.5)} initial="hidden" animate="visible" variants={fadeUp} className="mt-12 flex items-center gap-5">
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="GitHub"><Github size={20} /></a>
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
      </motion.div>
    </div>
    <motion.a href="#about" initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.1, duration: reducedMotion ? 0.01 : 0.6 }} className="hero-scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-faint)]" aria-label="Scroll to About">
      <span className="font-signal text-[10px] tracking-[0.2em]">SCROLL</span><ArrowDown size={18} className={reducedMotion ? '' : 'animate-bounce'} />
    </motion.a>
    <div className="hero-bridge" aria-hidden="true" />
  </section>;
};

export default Hero;
