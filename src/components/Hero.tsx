'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from 'framer-motion';
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

/* Full-body speedster silhouette — a hand-drawn, athletic running figure (facing right).
   Filled amber energy silhouette with a helmeted head, chest lightning emblem and suit seams.
   No external/copyrighted artwork. */
const FlashFigure: React.FC = () => (
  <svg className="flash-runner" viewBox="0 0 160 160" aria-hidden="true">
    <defs>
      <filter id="flash-glow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.5" result="b" />
        <feMerge>
          <feMergeNode in="b" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Soft energy aura behind the runner */}
    <ellipse cx="80" cy="80" rx="62" ry="74" fill="var(--accent)" opacity="0.16" />

    <g transform="rotate(-5 80 80)">
      <g filter="url(#flash-glow)">
        <g fill="var(--accent)">
          {/* Trailing arm (bent back) */}
          <path d="M 66 56 C 57 58 49 62 43 70 L 43 78 C 52 70 61 66 68 64 Z" />
          {/* Leading arm (extended forward) */}
          <path d="M 84 58 C 97 58 111 60 122 66 L 122 74 C 110 69 97 67 86 66 Z" />
          {/* Trailing leg (bent back, heel raised) */}
          <path d="M 68 92 C 60 104 56 114 60 128 L 53 132 C 48 118 52 106 62 94 Z" />
          {/* Leading leg (forward stride) */}
          <path d="M 78 92 C 90 100 103 106 116 120 L 121 115 C 108 101 95 94 83 87 Z" />
          {/* Torso — athletic, leaning forward with chest leading */}
          <path d="M 76 48 C 90 52 98 62 98 74 C 98 84 91 92 83 95 L 66 96 C 57 96 53 89 55 80 C 57 66 65 55 76 48 Z" />
          {/* Helmeted head with backward fin */}
          <path d="M 82 16 C 95 16 102 24 102 34 C 102 43 94 50 82 50 L 62 50 C 55 50 52 46 52 40 C 51 29 64 21 73 28 C 77 22 80 18 82 16 Z" />
        </g>

        {/* Suit seams — darker definition lines */}
        <g fill="none" stroke="rgba(11,12,16,0.5)" strokeWidth="2" strokeLinecap="round">
          <path d="M 74 56 L 76 66" />
          <path d="M 92 74 L 86 88" />
          <path d="M 76 92 L 88 99" />
        </g>

        {/* Chest lightning emblem */}
        <path
          d="M 81 68 L 74 82 L 83 78 L 76 94"
          fill="none"
          stroke="rgba(11,12,16,0.62)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Leading-edge rim light for a cinematic read */}
        <g fill="none" stroke="rgba(255, 255, 255, 0.45)" strokeWidth="2" strokeLinecap="round">
          <path d="M 100 34 C 100 27 95 21 87 19" />
          <path d="M 96 66 C 98 70 98 74 96 78" />
        </g>
      </g>
    </g>
  </svg>
);

/* Tiny electrical discharge used around the idle speedster. */
const LightningArc: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={`flash-arc ${className ?? ''}`} viewBox="0 0 20 20" aria-hidden="true">
    <polyline
      points="11,1 4,11 9,10 6,19 15,8 9,9"
      fill="none"
      stroke="var(--accent)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Hero: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(portfolioData.profile);
  const reducedMotion = useReducedMotion();
  const reduced = Boolean(reducedMotion);

  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const springProgress = useSpring(scrollYProgress, { stiffness: 260, damping: 28, mass: 0.4 });
  const activeProgress = reduced ? scrollYProgress : springProgress;
  const scrollOffset = useTransform(activeProgress, [0, 1], ['0vw', '12vw']);

  useEffect(() => { getProfile().then(setProfile).catch(() => {}); }, []);

  const reveal = (delay: number) => ({ delay, reduced });

  return <section id="home" ref={heroRef} className="hero-shell relative min-h-screen flex items-center overflow-hidden">
    {/* Electrical ignition + running speedster composition */}
    <div className="flash-stage" aria-hidden="true">
      {!reduced && (
        <svg className="hero-lightning" viewBox="0 0 60 160">
          <motion.path
            d="M30 0 L18 52 L29 50 L15 104 L27 99 L13 160"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="0.45"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 0.9, 0.4, 0] }}
            transition={{ duration: 1.3, times: [0, 0.18, 0.45, 1], ease: 'easeInOut' }}
          />
          <motion.path
            d="M30 0 L18 52 L29 50 L15 104 L27 99 L13 160"
            fill="none"
            stroke="var(--text)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: [0, 1, 0.5, 0] }}
            transition={{ duration: 1.3, times: [0, 0.18, 0.45, 1], ease: 'easeInOut' }}
          />
        </svg>
      )}

      <motion.div className="flash-scroll" style={{ x: scrollOffset }}>
        <motion.div
          className="flash-run"
          initial={{ x: reduced ? '0vw' : '-48vw' }}
          animate={{ x: reduced ? '0vw' : '0vw' }}
          transition={{ duration: reduced ? 0 : 1.15, delay: reduced ? 0 : 0.42, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flash-figure">
            <span className="flash-trail" />
            <motion.div
              className="flash-pulse"
              animate={reduced ? { scale: 1 } : { scale: [1, 1.035, 1] }}
              transition={{ duration: 2.6, repeat: reduced ? 0 : Infinity, ease: 'easeInOut' }}
            >
              <FlashFigure />
            </motion.div>
            {!reduced && (
              <div className="flash-electric">
                <LightningArc className="flash-arc-1" />
                <LightningArc className="flash-arc-2" />
                <LightningArc className="flash-arc-3" />
                <LightningArc className="flash-arc-4" />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>

    {!reduced && <div className="hero-ignition" aria-hidden="true" />}

    <div className="hero-grid relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 section !py-0">
      <div className="hero-content max-w-xl">
        <motion.p custom={reveal(0)} initial="hidden" animate="visible" variants={fadeUp} className="eyebrow mb-4 font-signal text-xs tracking-[0.18em]">
          {profile.currentlyAt ? `Currently building @ ${profile.currentlyAt}` : 'Available for work'}
        </motion.p>
        <motion.h1 custom={reveal(0.1)} initial="hidden" animate="visible" variants={fadeUp} className="font-display text-4xl sm:text-6xl leading-[1.1] tracking-tight text-[var(--text)]">{profile.name}</motion.h1>
        <motion.h2 custom={reveal(0.2)} initial="hidden" animate="visible" variants={fadeUp} className="mt-4 text-xl sm:text-2xl text-[var(--text-muted)] font-light">{profile.title}</motion.h2>
        <motion.p custom={reveal(0.3)} initial="hidden" animate="visible" variants={fadeUp} className="mt-6 text-base sm:text-lg text-[var(--text-faint)] leading-relaxed">{profile.tagline}</motion.p>
        <motion.div custom={reveal(0.4)} initial="hidden" animate="visible" variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
          <a href="#projects" className="btn-primary">View my work</a>
          <a href="#contact" className="btn-secondary">Get in touch</a>
        </motion.div>
        <motion.div custom={reveal(0.5)} initial="hidden" animate="visible" variants={fadeUp} className="mt-12 flex items-center gap-5">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="GitHub"><Github size={20} /></a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-[var(--text-faint)] hover:text-[var(--text)] transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
        </motion.div>
      </div>
      <div className="hero-visual" aria-hidden="true" />
    </div>
    <motion.a href="#about" initial={{ opacity: 0, y: reducedMotion ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reducedMotion ? 0 : 1.1, duration: reducedMotion ? 0.01 : 0.6 }} className="hero-scroll-cue absolute bottom-10 left-1/2 -translate-x-1/2 text-[var(--text-faint)]" aria-label="Scroll to About">
      <span className="font-signal text-[10px] tracking-[0.2em]">SCROLL</span><ArrowDown size={18} className={reducedMotion ? '' : 'animate-bounce'} />
    </motion.a>
    <div className="hero-bridge" aria-hidden="true" />
  </section>;
};

export default Hero;
