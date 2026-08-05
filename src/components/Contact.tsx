'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { getProfile } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { Profile, ContactFormData, SubmitStatus } from '@/lib/types';

const Github: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin: React.FC<{ size?: number; className?: string }> = ({ size = 20, className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(portfolioData.profile);
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<SubmitStatus>('idle');

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');

    // TODO: wire this up to a real backend — a Firestore write, an
    // email API route, or a form service. Kept as a simulated success
    // for now so the UI is fully functional out of the box.
    setTimeout(() => {
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    }, 1200);
  };

  const contactRows = [
    { icon: <Mail size={18} />, label: profile.email, href: `mailto:${profile.email}` },
    { icon: <Phone size={18} />, label: profile.phone, href: `tel:${profile.phone.replace(/[^+\d]/g, '')}` },
    { icon: <MapPin size={18} />, label: profile.location, href: null },
  ];

  return (
    <section id="contact" className="section">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">
          Let&apos;s talk
        </h2>
        <p className="text-[var(--text-muted)] max-w-lg mb-16">
          Have a role, project, or just want to compare notes on the best Batmobile? My inbox is open.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="md:col-span-2 space-y-6"
        >
          <div className="space-y-4">
            {contactRows.map((row) => (
              <div key={row.label} className="flex items-center gap-3 text-sm">
                <span className="text-[var(--accent)]">{row.icon}</span>
                {row.href ? (
                  <a href={row.href} className="text-[var(--text-muted)] hover:text-[var(--text)] transition-colors">
                    {row.label}
                  </a>
                ) : (
                  <span className="text-[var(--text-muted)]">{row.label}</span>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-4 pt-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-3"
              aria-label="GitHub"
            >
              <Github size={18} className="text-[var(--text-muted)]" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="card p-3"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} className="text-[var(--text-muted)]" />
            </a>
          </div>
        </motion.div>

        <motion.form
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          onSubmit={handleSubmit}
          className="md:col-span-3 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-xs text-[var(--text-faint)] mb-2">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-xs text-[var(--text-faint)] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs text-[var(--text-faint)] mb-2">
              Subject
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors"
              placeholder="What's this about?"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-xs text-[var(--text-faint)] mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-[var(--text)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors resize-none"
              placeholder="Tell me a bit about it"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              'Sending…'
            ) : (
              <>
                <Send size={16} />
                Send message
              </>
            )}
          </button>

          {status === 'success' && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-[var(--accent)]"
            >
              Thanks — I&apos;ll get back to you soon.
            </motion.p>
          )}
        </motion.form>
      </div>

      <div className="divider mt-24 mb-8" />
      <p className="text-xs text-[var(--text-faint)] text-center">
        © {new Date().getFullYear()} Guneet Sura. Built with Next.js, Tailwind, and Framer Motion.
      </p>
    </section>
  );
};

export default Contact;
