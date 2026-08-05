'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getSkills } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { SkillGroup } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<SkillGroup[]>(portfolioData.skills);
  const [active, setActive] = useState<string>(portfolioData.skills[0]?.category ?? '');

  useEffect(() => {
    getSkills().then((data) => {
      setSkills(data);
      if (data.length && !data.find((g) => g.category === active)) {
        setActive(data[0].category);
      }
    }).catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const activeGroup = skills.find((g) => g.category === active) ?? skills[0];

  return (
    <section id="skills" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="eyebrow mb-3">Skills</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-12">
          What I work with
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
        className="flex flex-wrap gap-2 mb-10"
      >
        {skills.map((group) => (
          <button
            key={group.category}
            onClick={() => setActive(group.category)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              active === group.category
                ? 'bg-[var(--accent)] text-[#14100A]'
                : 'text-[var(--text-muted)] border border-[var(--border)] hover:border-[var(--border-strong)]'
            }`}
          >
            {group.category}
          </button>
        ))}
      </motion.div>

      <AnimatePresence mode="wait">
        {activeGroup && (
          <motion.div
            key={activeGroup.category}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            {activeGroup.items.map((item) => (
              <span
                key={item}
                className="px-4 py-2 rounded-lg text-sm text-[var(--text)] bg-[var(--surface)] border border-[var(--border)]"
              >
                {item}
              </span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Skills;
