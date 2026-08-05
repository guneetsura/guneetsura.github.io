'use client';

import { useEffect, useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { getExperiences } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { ExperienceItem } from '@/lib/types';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

const Experience: React.FC = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>(portfolioData.experiences);
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(portfolioData.experiences.map((experience) => experience.id)));

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
    <div className="relative">
      <div className="absolute left-[7px] top-2 bottom-2 w-px bg-[var(--border)]" />
      <div className="space-y-6">
        {experiences.map((exp, index) => {
          const isExpanded = expanded.has(exp.id);
          return <motion.article key={exp.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} transition={{ delay: index * 0.05 }} className="relative pl-10">
            <span className={exp.current ? 'absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 bg-[var(--accent)] border-[var(--accent)]' : 'absolute left-0 top-1.5 w-[15px] h-[15px] rounded-full border-2 bg-[var(--bg)] border-[var(--border-strong)]'} />
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="text-lg font-medium text-[var(--text)]">{exp.role} <span className="text-[var(--text-faint)] font-normal">· {exp.company}</span></h3>
                  <span className="text-sm text-[var(--text-faint)] font-mono">{exp.period}</span>
                </div>
              </div>
              <button type="button" onClick={() => toggleExperience(exp.id)} aria-expanded={isExpanded} aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${exp.company} experience`} className="shrink-0 mt-0.5 rounded-md p-1 text-[var(--accent)] hover:bg-[var(--accent-soft)]">
                {isExpanded ? <Minus size={17} aria-hidden="true" /> : <Plus size={17} aria-hidden="true" />}
              </button>
            </div>
            {isExpanded && <div className="mt-3"><ul className="space-y-2 mb-4">{exp.description.map((line, i) => <li key={i} className="text-sm text-[var(--text-muted)] leading-relaxed flex gap-2"><span className="text-[var(--accent)] shrink-0">—</span><span>{line}</span></li>)}</ul><div className="flex flex-wrap gap-2">{exp.technologies.map((tech) => <span key={tech} className="chip">{tech}</span>)}</div></div>}
          </motion.article>;
        })}
      </div>
    </div>
  </section>;
};

export default Experience;
