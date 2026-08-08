'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Send, Zap } from 'lucide-react';
import { getProfile } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { Profile, ContactFormData, SubmitStatus } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(portfolioData.profile);
  const [formData, setFormData] = useState<ContactFormData>({ name: '', email: '', subject: '', message: '' });
  const [requestType, setRequestType] = useState('Resume request');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((previous) => ({ ...previous, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!endpoint) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...formData, requestType }),
      });
      if (!response.ok) throw new Error('Request failed');
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>
        <p className="eyebrow mb-3">Contact</p>
        <h2 className="font-display text-3xl sm:text-4xl text-[var(--text)] mb-4">Start a conversation</h2>
        <p className="text-[var(--text-muted)] max-w-lg mb-10">
          Request a resume or share a role, project, or technical problem worth exploring.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-5 gap-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="md:col-span-2 space-y-5">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            
          </p>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary w-fit">
            LinkedIn <ExternalLink size={15} />
          </a>
        </motion.div>

        <motion.form initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} onSubmit={handleSubmit} className="md:col-span-3 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-xs text-[var(--text-faint)]">Name
              <input name="name" type="text" required value={formData.name} onChange={handleChange} className="form-field mt-2" placeholder="Your name" />
            </label>
            <label className="block text-xs text-[var(--text-faint)]">Reply email
              <input name="email" type="email" required value={formData.email} onChange={handleChange} className="form-field mt-2" placeholder="you@example.com" />
            </label>
          </div>
          <label className="block text-xs text-[var(--text-faint)]">Request type
            <select value={requestType} onChange={(event) => setRequestType(event.target.value)} className="form-field mt-2">
              <option>Resume request</option>
              <option>Hiring conversation</option>
              <option>Project discussion</option>
            </select>
          </label>
          <label className="block text-xs text-[var(--text-faint)]">Message
            <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} className="form-field mt-2 resize-none" placeholder="A little context helps me reply well" />
          </label>
          <input type="hidden" name="subject" value={requestType} />
          <button type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
            <Send size={16} /> {status === 'submitting' ? 'Sending...' : 'Send request'}
          </button>
          {status === 'success' && <p role="status" className="text-sm text-[var(--accent)]">Request sent. I&apos;ll follow up soon.</p>}
          {status === 'error' && <p role="alert" className="text-sm text-red-300">The form is not configured or could not send. Please use LinkedIn instead.</p>}
        </motion.form>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative max-w-sm w-full card p-8 text-center border-[var(--accent)] shadow-2xl shadow-[var(--accent-soft)] overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.8, 0.2, 1, 0] }}
                transition={{ duration: 0.8, times: [0, 0.2, 0.4, 0.6, 1] }}
                className="absolute inset-0 bg-[var(--accent)]/10 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0, rotate: -30 }}
                  animate={{ scale: [0, 1.3, 1], rotate: [0, -10, 0] }}
                  transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                  className="w-16 h-16 rounded-full bg-[var(--accent-soft)] flex items-center justify-center text-[var(--accent)] mb-6 border border-[var(--accent)]/30 relative"
                >
                  <div className="absolute inset-0 rounded-full bg-[var(--accent)] opacity-20 blur-md animate-pulse" />
                  <Zap size={32} className="fill-[var(--accent)]" />
                </motion.div>

                <h3 className="font-display text-2xl text-[var(--text)] mb-2 tracking-tight">Transmission Sent</h3>
                <p className="font-signal text-xs text-[var(--accent)] mb-4 tracking-wider">SECURE CONNECTION ESTABLISHED</p>
                <p className="text-sm text-[var(--text-muted)] leading-relaxed mb-6">
                  Thank you for reaching out. Your message has bypassed the noise and landed in my inbox. I will follow up shortly.
                </p>

                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="btn-primary w-full py-2.5 font-medium text-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Acknowledge
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="divider mt-24 mb-8" />
      <p className="text-xs text-[var(--text-faint)] text-center">Guneet Sura. Built with ❤️ using Next.js, Tailwind, and Framer Motion.</p>
    </section>
  );
};

export default Contact;
