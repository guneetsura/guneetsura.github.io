'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Send } from 'lucide-react';
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
            Private contact details are intentionally not published. Use the form or connect through LinkedIn.
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
            <Send size={16} /> {status === 'submitting' ? 'Sending?' : 'Send request'}
          </button>
          {status === 'success' && <p role="status" className="text-sm text-[var(--accent)]">Request sent. I&apos;ll follow up soon.</p>}
          {status === 'error' && <p role="alert" className="text-sm text-red-300">The form is not configured or could not send. Please use LinkedIn instead.</p>}
        </motion.form>
      </div>

      <div className="divider mt-24 mb-8" />
      <p className="text-xs text-[var(--text-faint)] text-center">? {new Date().getFullYear()} Guneet Sura. Built with Next.js, Tailwind, and Framer Motion.</p>
    </section>
  );
};

export default Contact;
