'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Trophy } from 'lucide-react';
import { getProjects } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { ProjectItem } from '@/lib/types';

const Github: React.FC<{ size?: number }> = ({ size = 20 }) => <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" /><path d="M9 18c-4.51 2-5-2-7-2" /></svg>;
const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

type Filter = 'all' | 'featured' | 'supporting';

const Projects: React.FC = () => {
  const [projects, setProjects] = useState<ProjectItem[]>(portfolioData.projects);
  const [filter, setFilter] = useState<Filter>('all');
  useEffect(() => { getProjects().then(setProjects).catch(() => {}); }, []);
  const visibleProjects = projects.filter((project) => filter === 'all' || (filter === 'featured' ? project.featured : !project.featured));

  return <section id="projects" className="section">
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
      <p className="eyebrow mb-3">Projects</p>
      <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-8">Selected production work</h2>
    </motion.div>
    <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter projects">
      {(['all', 'featured', 'supporting'] as Filter[]).map((value) => <button key={value} type="button" onClick={() => setFilter(value)} aria-pressed={filter === value} className={`filter-pill ${filter === value ? 'filter-pill-active' : ''}`}>{value[0].toUpperCase() + value.slice(1)}</button>)}
    </div>
    <div className="grid sm:grid-cols-2 gap-6">
      {visibleProjects.map((project, index) => <motion.article key={project.id} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.06 }} className={`card p-6 flex flex-col ${project.id === 'saas-growth-marketing' ? 'sm:col-span-2 border-[var(--accent)]/50' : ''}`}>
        {project.award && <div className="flex items-center gap-1.5 text-xs text-[var(--accent)] mb-3"><Trophy size={14} /><span>{project.award}</span></div>}
        <h3 className="text-lg font-medium text-[var(--text)] mb-2">{project.title}</h3>
        <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-5 flex-grow">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">{project.technologies.map((tech) => <span key={tech} className="chip">{tech}</span>)}</div>
        <div className="flex gap-5 mt-auto pt-4 border-t border-[var(--border)]">
          {project.github && project.github !== '#' ? <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-faint)] hover:text-[var(--text)]"><Github size={16} />Code</a> : null}
          {project.live && project.live !== '#' ? <a href={project.live} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-faint)] hover:text-[var(--text)]"><ExternalLink size={16} />View live site</a> : <span className="text-sm text-[var(--text-faint)]">Link coming soon</span>}
        </div>
      </motion.article>)}
    </div>
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mt-10"><a href="https://github.com/guneetsura" target="_blank" rel="noopener noreferrer" className="link-underline text-sm text-[var(--text-muted)]">See more on GitHub ?</a></motion.div>
  </section>;
};

export default Projects;
