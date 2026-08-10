'use client';

import { useEffect, useState, useRef } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, MotionValue } from 'framer-motion';
import { getExperiences } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { ExperienceItem } from '@/lib/types';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

const ExperienceItemCard = ({ 
  exp, 
  index, 
  isExpanded, 
  toggleExperience, 
  containerRef, 
  scrollYProgress,
  reducedMotion
}: { 
  exp: ExperienceItem; 
  index: number; 
  isExpanded: boolean; 
  toggleExperience: (id: string) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean | null;
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const [threshold, setThreshold] = useState(1);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current || !cardRef.current) return;
      const containerHeight = containerRef.current.offsetHeight;
      const topOffset = cardRef.current.offsetTop;
      setThreshold((topOffset + 6) / containerHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (containerRef.current) observer.observe(containerRef.current);
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [isExpanded, containerRef]);

  // Map scroll progress around the threshold
  const activationRange = [threshold - 0.02, threshold, threshold + 0.02];
  
  // Marker styling
  const markerBg = useTransform(scrollYProgress, activationRange, [exp.current ? 'var(--accent)' : 'var(--bg)', 'var(--accent)', 'var(--accent)']);
  const markerBorder = useTransform(scrollYProgress, activationRange, [exp.current ? 'var(--accent)' : 'var(--border-strong)', 'var(--accent)', 'var(--accent)']);
  const markerShadow = useTransform(scrollYProgress, activationRange, ['0 0 0px rgba(226, 169, 69, 0)', reducedMotion ? '0 0 0px rgba(226, 169, 69, 0)' : '0 0 10px 2px rgba(226, 169, 69, 0.4)', reducedMotion ? '0 0 0px rgba(226, 169, 69, 0)' : '0 0 10px 2px rgba(226, 169, 69, 0.4)']);

  // Card border styling
  const cardBorder = useTransform(scrollYProgress, activationRange, ['transparent', 'rgba(226, 169, 69, 0.3)', 'rgba(226, 169, 69, 0.15)']);
  const cardBg = useTransform(scrollYProgress, activationRange, ['transparent', 'rgba(226, 169, 69, 0.03)', 'transparent']);
  
  // Shimmer effect
  const shimmerLeft = useTransform(scrollYProgress, [threshold, threshold + 0.05], ['-20%', '120%']);
  const shimmerOpacity = useTransform(scrollYProgress, [threshold, threshold + 0.02, threshold + 0.05], [0, 1, 0]);

  return (
    <motion.article 
      ref={cardRef}
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.3 }} 
      variants={fadeUp} 
      transition={{ delay: index * 0.05 }} 
      className="relative pl-10"
    >
      <motion.span 
        className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 z-10"
        style={{ background: markerBg, borderColor: markerBorder, boxShadow: markerShadow }}
      />
      <motion.div 
        className="relative rounded-xl p-4 -ml-4 overflow-hidden border transition-colors"
        style={{ borderColor: cardBorder, backgroundColor: cardBg }}
      >
        {!reducedMotion && (
          <motion.div 
            className="absolute top-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent"
            style={{ left: shimmerLeft, opacity: shimmerOpacity }}
          />
        )}
        <div className="flex items-start gap-3 relative z-10">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="text-lg font-medium text-[var(--text)]">{exp.role} <span className="text-[var(--text-faint)] font-normal">· {exp.company}</span></h3>
              <span className="text-sm text-[var(--text-faint)] font-mono">{exp.period}</span>
            </div>
          </div>
          <button type="button" onClick={() => toggleExperience(exp.id)} aria-expanded={isExpanded} aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${exp.company} experience`} className="shrink-0 mt-0.5 rounded-md p-1 text-[var(--accent)] hover:bg-[var(--accent-soft)] transition-colors">
            {isExpanded ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
          </button>
        </div>
        {isExpanded && (
          <div className="mt-3 relative z-10">
            <ul className="space-y-2 mb-4">
              {exp.description.map((line, i) => (
                <li key={i} className="text-sm text-[var(--text-muted)] leading-relaxed flex gap-2">
                  <span className="text-[var(--accent)] shrink-0">—</span><span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span key={tech} className="chip">{tech}</span>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </motion.article>
  );
};

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(portfolioData.experiences);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(portfolioData.experiences.map((experience) => experience.id)));

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });
  
  const reducedMotion = useReducedMotion();
  const springProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const scaleY = reducedMotion ? scrollYProgress : springProgress;

  useEffect(() => {
    getExperiences().then((data) => {
      setExperiences(data);
      setExpanded(new Set(data.map((experience) => experience.id)));
    }).catch(() => {});
  }, []);

  const toggleExperience = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return <section id="experience" className="section">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
      <p className="eyebrow mb-3">Experience</p>
      <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-16">Where I&apos;ve worked</h2>
    </motion.div>
    <div className="relative" ref={containerRef}>
      {/* Static background timeline */}
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />
      
      {/* Scroll-driven lightning core */}
      <motion.div 
        className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--accent)] origin-top z-0"
        style={{ 
          scaleY,
          boxShadow: reducedMotion ? 'none' : '0 0 8px 1px rgba(226, 169, 69, 0.4), 0 0 4px 1px rgba(255, 255, 255, 0.4)'
        }}
      />
      
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <ExperienceItemCard 
            key={exp.id} 
            exp={exp} 
            index={index} 
            isExpanded={expanded.has(exp.id)} 
            toggleExperience={toggleExperience} 
            containerRef={containerRef}
            scrollYProgress={scaleY}
            reducedMotion={reducedMotion}
          />
        ))}
      </div>
    </div>
  </section>;
};

export default Experience;
