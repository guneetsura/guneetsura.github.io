'use client';

import { motion } from 'framer-motion';
import { GraduationCap, Trophy } from 'lucide-react';
import { portfolioData } from '@/lib/data';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const About: React.FC = () => {
  const { education, awards } = portfolioData;

  return (
    <section id="about" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="eyebrow mb-3">About</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-12">
          A little more context
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="md:col-span-2 space-y-5 text-[var(--text-muted)] leading-relaxed"
        >
          <p>
            I&apos;m a frontend-focused engineer who enjoys the part of the job where a product
            actually starts feeling good to use — the loading states, the transitions, the small
            details most people won&apos;t consciously notice but will feel.
          </p>
          <p>
            Most recently at <span className="text-[var(--text)]">Ad2connect</span>, I&apos;ve
            shipped client sites and a production HRMS end-to-end — from a Next.js frontend down
            to Python services syncing biometric attendance on Oracle Cloud. Before that, I won a
            national hackathon (KAVACH 2023) building a dark web threat-intelligence platform.
          </p>
          <p>
            Outside of work, I&apos;m usually deep in a car spec sheet, catching up on Star Wars,
            or rewatching Flash episodes for the tenth time — turns out an obsession with speed
            translates surprisingly well into caring about page load times.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="space-y-4"
        >
          {education.map((edu) => (
            <div key={edu.institution} className="card p-5">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-[var(--text)] font-medium">{edu.institution}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{edu.degree}</p>
                  <p className="text-xs text-[var(--text-faint)] mt-2">
                    {edu.period} {edu.detail ? `· ${edu.detail}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {awards.map((award) => (
            <div key={award.title} className="card p-5">
              <div className="flex items-start gap-3">
                <Trophy size={18} className="text-[var(--accent)] mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm text-[var(--text)] font-medium">{award.title}</p>
                  <p className="text-sm text-[var(--text-muted)] mt-1">{award.issuer}</p>
                  <p className="text-xs text-[var(--text-faint)] mt-2">
                    {award.date} {award.detail ? `· ${award.detail}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default About;
