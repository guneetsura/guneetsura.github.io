'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { getWriting } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { WritingItem } from '@/lib/types';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } } };

const Writing: React.FC = () => {
  const [writing, setWriting] = useState<WritingItem[]>(portfolioData.writing);

  useEffect(() => {
    getWriting().then(setWriting).catch(() => {});
  }, []);

  return (
    <section id="writing" className="section">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="mb-12">
        <p className="eyebrow mb-3">Writing</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">Thoughts & Perspectives</h2>
      </motion.div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {writing.map((item, index) => (
          <motion.article 
            key={item.id} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.3 }} 
            variants={fadeUp} 
            transition={{ delay: index * 0.1 }}
            className="card p-6 flex flex-col group h-full"
          >
            <h3 className="text-xl font-medium text-[var(--text)] mb-3 group-hover:text-[var(--accent)] transition-colors line-clamp-2">
              {item.title}
            </h3>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6 flex-grow">
              {item.excerpt}
            </p>
            <a 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center gap-2 text-sm text-[var(--accent)] hover:text-[var(--text)] transition-colors mt-auto w-fit"
            >
              Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.article>
        ))}
      </div>
      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.3 }} 
        variants={fadeUp} 
        className="flex justify-center"
      >
        <a 
          href="https://guneetsura.substack.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="btn-secondary"
        >
          Read more on Substack →
        </a>
      </motion.div>
    </section>
  );
};

export default Writing;
