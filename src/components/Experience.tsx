'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useReducedMotion, MotionValue, transform } from 'framer-motion';
import { getExperiences } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { ExperienceItem } from '@/lib/types';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

const ExperienceItemCard = ({ 
  exp, 
  index, 
  isExpanded, 
  toggleExperience, 
  threshold,
  scrollYProgress,
  reducedMotion,
  setCardRef
}: { 
  exp: ExperienceItem; 
  index: number; 
  isExpanded: boolean; 
  toggleExperience: (id: string) => void;
  threshold: number;
  scrollYProgress: MotionValue<number>;
  reducedMotion: boolean | null;
  setCardRef: (el: HTMLElement | null, idx: number) => void;
}) => {
  // Marker styling animation - uses inline transform so that it adapts dynamically to changing threshold
  const markerBg = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], [exp.current ? 'var(--accent)' : 'var(--bg)', 'var(--text)', 'var(--accent)'], { clamp: true })
  );
  const markerBorder = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], [exp.current ? 'var(--accent)' : 'var(--border-strong)', 'var(--accent)', 'var(--accent)'], { clamp: true })
  );
  const markerShadow = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], [
      '0 0 0px transparent', 
      reducedMotion ? '0 0 0px transparent' : '0 0 14px 4px color-mix(in srgb, var(--accent) 70%, transparent)', 
      reducedMotion ? '0 0 0px transparent' : '0 0 6px 1px color-mix(in srgb, var(--accent) 30%, transparent)'
    ], { clamp: true })
  );
  const markerScale = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], [1, 1.25, 1], { clamp: true })
  );

  // Card border & background styling animation
  const cardBorder = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], ['var(--border)', 'color-mix(in srgb, var(--accent) 50%, transparent)', 'color-mix(in srgb, var(--accent) 20%, transparent)'], { clamp: true })
  );
  const cardBg = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.03, threshold, threshold + 0.03], ['transparent', 'color-mix(in srgb, var(--accent) 4%, transparent)', 'transparent'], { clamp: true })
  );
  
  // Shimmer effect across the top border
  const shimmerLeft = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.015, threshold + 0.035], ['-20%', '120%'], { clamp: true })
  );
  const shimmerOpacity = useTransform(scrollYProgress, (v) => 
    transform(v, [threshold - 0.015, threshold + 0.01, threshold + 0.035], [0, 1, 0], { clamp: true })
  );

  return (
    <motion.article 
      ref={(el) => setCardRef(el, index)}
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.3 }} 
      variants={fadeUp} 
      transition={{ delay: index * 0.05 }} 
      className="relative pl-10"
    >
      <motion.span 
        className="absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 z-20"
        style={{ 
          background: markerBg, 
          borderColor: markerBorder, 
          boxShadow: markerShadow,
          scale: reducedMotion ? 1 : markerScale 
        }}
      />
      <motion.div 
        className="relative rounded-xl p-4 -ml-4 overflow-hidden border transition-colors"
        style={{ borderColor: cardBorder, backgroundColor: cardBg }}
      >
        {!reducedMotion && (
          <motion.div 
            className="absolute top-0 w-1/3 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent z-10"
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
  const cardElementsRef = useRef<(HTMLElement | null)[]>([]);

  const [containerHeight, setContainerHeight] = useState<number>(0);
  const [markerPositions, setMarkerPositions] = useState<number[]>([]);
  const [jaggedPath, setJaggedPath] = useState<string>('');
  const [thresholds, setThresholds] = useState<number[]>([]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const reducedMotion = useReducedMotion();

  // Dynamically map scroll progress so that [0, 1] maps the viewport center from the first marker to the last marker
  const scaleY = useTransform(scrollYProgress, (rawVal) => {
    if (containerHeight === 0 || markerPositions.length < 2) return 0;
    const y0 = markerPositions[0];
    const yLast = markerPositions[markerPositions.length - 1];
    
    // Relative start and end positions of the markers within the container
    const startPct = y0 / containerHeight;
    const endPct = yLast / containerHeight;
    const pctSpan = endPct - startPct;
    
    if (pctSpan <= 0) return 0;

    // Map raw scroll progress [0, 1] onto the relative active span of the markers [startPct, endPct]
    // Clamping ensures that we strictly start at the first marker and end at the last marker
    const mapped = (rawVal - startPct) / pctSpan;
    const clamped = Math.max(0, Math.min(1, mapped));
    return clamped;
  });

  const springProgress = useSpring(scaleY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const animatedScaleY = reducedMotion ? scaleY : springProgress;

  const setCardRef = useCallback((el: HTMLElement | null, idx: number) => {
    cardElementsRef.current[idx] = el;
  }, []);

  useEffect(() => {
    const containerEl = containerRef.current;
    const cardEls = cardElementsRef.current;

    const measure = () => {
      if (!containerEl) return;
      
      setContainerHeight(containerEl.offsetHeight);

      const elements = cardEls.filter(Boolean) as HTMLElement[];
      if (elements.length === 0) return;

      // Marker center is top-1.5 (0.375rem = 6px) + half circle (7.5px) = 13.5px relative to card element top
      const positions = elements.map((el) => el.offsetTop + 13.5);
      setMarkerPositions(positions);

      const y0 = positions[0];
      const yLast = positions[positions.length - 1];
      const totalSpan = yLast - y0;

      // Calculate relative thresholds for each marker
      if (totalSpan > 0) {
        setThresholds(positions.map((y) => (y - y0) / totalSpan));
      } else {
        setThresholds(positions.map(() => 0));
      }

      // Build jagged electrical SVG path
      let pathStr = `M 7.5,${y0}`;
      for (let i = 0; i < positions.length - 1; i++) {
        const startY = positions[i];
        const endY = positions[i + 1];
        const deltaY = endY - startY;
        const steps = Math.max(3, Math.floor(deltaY / 18));
        const stepH = deltaY / steps;

        for (let s = 1; s < steps; s++) {
          const currentY = startY + s * stepH;
          // Alternate subtle technical zigzag (±1.8px) tapering near endpoints
          const isNearEdge = s === 1 || s === steps - 1;
          const offset = isNearEdge ? (s % 2 === 1 ? 1 : -1) : (s % 2 === 1 ? 1.8 : -1.8);
          pathStr += ` L ${7.5 + offset},${currentY.toFixed(1)}`;
        }
        pathStr += ` L 7.5,${endY}`;
      }
      setJaggedPath(pathStr);
    };

    measure();
    
    const observer = new ResizeObserver(() => {
      measure();
    });

    if (containerEl) {
      observer.observe(containerEl);
    }
    cardEls.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [experiences, expanded]);

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

  const firstY = markerPositions[0] ?? 13.5;
  const lastY = markerPositions[markerPositions.length - 1] ?? 13.5;
  const tipY = useTransform(animatedScaleY, [0, 1], [firstY, lastY], { clamp: true });
  const tipOpacity = useTransform(animatedScaleY, [0, 0.01, 0.99, 1], [0, 1, 1, 1], { clamp: true });

  return (
    <section id="experience" className="section">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
        <p className="eyebrow mb-3">Experience</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-16">Where I&apos;ve worked</h2>
      </motion.div>
      <div className="relative" ref={containerRef}>
        {/* Static background timeline */}
        <div 
          className="absolute left-[7px] w-px bg-[var(--border)]" 
          style={{ top: `${firstY}px`, bottom: `${containerHeight > 0 ? containerHeight - lastY : 8}px` }}
        />
        
        {/* SVG Electrical Current Layer */}
        <svg 
          className="absolute top-0 left-0 w-6 h-full pointer-events-none z-10 overflow-visible"
          aria-hidden="true"
        >
          <defs>
            <filter id="lightning-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer glow path */}
          {!reducedMotion && jaggedPath && (
            <motion.path
              d={jaggedPath}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="3.5"
              strokeOpacity="0.4"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: animatedScaleY }}
              filter="url(#lightning-glow)"
            />
          )}

          {/* Core bright lightning path */}
          {jaggedPath && (
            <motion.path
              d={jaggedPath}
              fill="none"
              stroke={reducedMotion ? "var(--accent)" : "var(--text)"}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ pathLength: reducedMotion ? 1 : animatedScaleY }}
            />
          )}

          {/* Leading ignition spark point */}
          {!reducedMotion && markerPositions.length > 0 && (
            <motion.circle
              cx={7.5}
              cy={tipY}
              r={3}
              fill="var(--text)"
              style={{
                filter: 'drop-shadow(0 0 6px var(--accent))',
                opacity: tipOpacity
              }}
            />
          )}
        </svg>
        
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <ExperienceItemCard 
              key={exp.id} 
              exp={exp} 
              index={index} 
              isExpanded={expanded.has(exp.id)} 
              toggleExperience={toggleExperience} 
              threshold={thresholds[index] ?? (index / Math.max(1, experiences.length - 1))}
              scrollYProgress={animatedScaleY}
              reducedMotion={reducedMotion}
              setCardRef={setCardRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;

