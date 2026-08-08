'use client';

import { useCallback, useEffect, useRef, useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Check, ChevronDown, ExternalLink, Send, X, Zap } from 'lucide-react';
import { getProfile } from '@/lib/data-provider';
import { portfolioData } from '@/lib/data';
import { Profile, ContactFormData, SubmitStatus } from '@/lib/types';

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const EMPTY_FORM: ContactFormData = { name: '', email: '', subject: '', message: '' };
const SWOOSH_MIN_MS = 600;

type FieldName = 'name' | 'email' | 'message';
type FieldErrors = Partial<Record<FieldName, string>>;
type FieldTouched = Partial<Record<FieldName, boolean>>;

const validateField = (field: FieldName, value: string): string => {
  switch (field) {
    case 'name':
      return value.trim() ? '' : 'Please enter your name';
    case 'email': {
      if (!value.trim()) return 'Please enter your email';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Enter a valid email address';
    }
    case 'message':
      return value.trim().length >= 10 ? '' : 'Message should be at least 10 characters';
    default:
      return '';
  }
};

const Contact: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(portfolioData.profile);
  const [formData, setFormData] = useState<ContactFormData>(EMPTY_FORM);
  const [requestType, setRequestType] = useState('Resume request');
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<FieldTouched>({});
  const [swooshing, setSwooshing] = useState(false);
  const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;

  const dialogRef = useRef<HTMLDivElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const modalOpen = status === 'success' || status === 'error';

  useEffect(() => {
    getProfile().then(setProfile).catch(() => {});
  }, []);

  const isFieldValid = (field: FieldName): boolean =>
    Boolean(touched[field] && !errors[field] && formData[field].trim());

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    const value = event.target.value;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (touched[name]) {
      setErrors((previous) => {
        const message = validateField(name, value);
        const next = { ...previous };
        if (message) next[name] = message;
        else delete next[name];
        return next;
      });
    }
  };

  const handleBlur = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name as FieldName;
    setTouched((previous) => ({ ...previous, [name]: true }));
    setErrors((previous) => {
      const message = validateField(name, event.target.value);
      const next = { ...previous };
      if (message) next[name] = message;
      else delete next[name];
      return next;
    });
  };

  const closeModal = useCallback(() => {
    setStatus('idle');
    setSwooshing(false);
    previouslyFocused.current?.focus();
  }, []);

  useEffect(() => {
    if (!modalOpen) return;
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [modalOpen, closeModal]);

  const submit = useCallback(async () => {
    const nextErrors: FieldErrors = {};
    (['name', 'email', 'message'] as FieldName[]).forEach((field) => {
      const message = validateField(field, formData[field]);
      if (message) nextErrors[field] = message;
    });

    setErrors(nextErrors);
    setTouched({ name: true, email: true, message: true });

    const firstInvalid = (['name', 'email', 'message'] as FieldName[]).find((field) => nextErrors[field]);
    if (firstInvalid) {
      document.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      return;
    }

    if (!endpoint) {
      setStatus('error');
      return;
    }

    setStatus('submitting');
    setSwooshing(true);
    const started = Date.now();

    try {
      const body = new URLSearchParams({
        name: formData.name,
        email: formData.email,
        subject: requestType,
        requestType,
        message: formData.message,
      });
      await fetch(endpoint, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
        body: body.toString(),
      });
      const remaining = Math.max(0, SWOOSH_MIN_MS - (Date.now() - started));
      await new Promise((resolve) => setTimeout(resolve, remaining));
      setSwooshing(false);
      setStatus('success');
      setFormData(EMPTY_FORM);
      setErrors({});
      setTouched({});
    } catch {
      setSwooshing(false);
      setStatus('error');
    }
  }, [endpoint, formData, requestType]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void submit();
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

      {swooshing && (
        <div className="flash-swoosh" aria-hidden="true">
          <div className="flash-swoosh-glow" />
          <div className="flash-swoosh-streak" />
        </div>
      )}

      <div className="grid md:grid-cols-5 gap-12">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} className="md:col-span-2 space-y-5">
          <p className="text-sm text-[var(--text-muted)] leading-relaxed">
            
          </p>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary w-fit">
            LinkedIn <ExternalLink size={15} />
          </a>
        </motion.div>

        <motion.form initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp} onSubmit={handleSubmit} className="md:col-span-3 space-y-4" noValidate>
          <div className="grid sm:grid-cols-2 gap-4">
            <label className="block text-xs text-[var(--text-faint)]">Name
              <span className="relative block mt-2">
                <input name="name" type="text" required value={formData.name} onChange={handleChange} onBlur={handleBlur} className={`form-field ${errors.name ? 'form-field-error' : ''}`} placeholder="Your name" autoComplete="name" />
                {isFieldValid('name') && <Check size={15} aria-hidden="true" className="field-valid-icon" />}
              </span>
              {errors.name && (
                <p role="alert" className="field-error">
                  <AlertTriangle size={12} aria-hidden="true" /> {errors.name}
                </p>
              )}
            </label>
            <label className="block text-xs text-[var(--text-faint)]">Reply email
              <span className="relative block mt-2">
                <input name="email" type="email" required value={formData.email} onChange={handleChange} onBlur={handleBlur} spellCheck={false} className={`form-field ${errors.email ? 'form-field-error' : ''}`} placeholder="you@example.com" autoComplete="email" />
                {isFieldValid('email') && <Check size={15} aria-hidden="true" className="field-valid-icon" />}
              </span>
              {errors.email && (
                <p role="alert" className="field-error">
                  <AlertTriangle size={12} aria-hidden="true" /> {errors.email}
                </p>
              )}
            </label>
          </div>
          <label className="block text-xs text-[var(--text-faint)]">Request type
            <span className="relative mt-2 block">
              <select value={requestType} onChange={(event) => setRequestType(event.target.value)} className="form-field appearance-none cursor-pointer pr-10">
                <option>Resume request</option>
                <option>Hiring conversation</option>
                <option>Project discussion</option>
              </select>
              <ChevronDown size={16} aria-hidden="true" className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] transition-transform duration-200" />
            </span>
          </label>
          <label className="block text-xs text-[var(--text-faint)]">Message
            <span className="relative block mt-2">
              <textarea name="message" required rows={5} value={formData.message} onChange={handleChange} onBlur={handleBlur} className={`form-field resize-none ${errors.message ? 'form-field-error' : ''}`} placeholder="A little context helps me reply well" />
              {isFieldValid('message') && <Check size={15} aria-hidden="true" className="field-valid-icon field-valid-icon--textarea" />}
            </span>
            {errors.message && (
              <p role="alert" className="field-error">
                <AlertTriangle size={12} aria-hidden="true" /> {errors.message}
              </p>
            )}
          </label>
          <input type="hidden" name="subject" value={requestType} />
          <button ref={submitRef} type="submit" disabled={status === 'submitting'} className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed">
            <Send size={16} /> {status === 'submitting' ? 'Sending…' : 'Send request'}
          </button>
        </motion.form>
      </div>

      {modalOpen && (
        <>
          <div className="electric-flash" aria-hidden="true" />
          <div className="modal-backdrop" onMouseDown={closeModal}>
            <div
              ref={dialogRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-dialog-title"
              tabIndex={-1}
              onMouseDown={(event) => event.stopPropagation()}
              className={`modal ${status === 'success' ? 'modal--success' : 'modal--error'}`}
            >
              <div className="modal-speedlines" aria-hidden="true" />
              <button type="button" onClick={closeModal} aria-label="Close dialog" className="modal-close">
                <X size={16} aria-hidden="true" />
              </button>
              <div className="modal-lightning" aria-hidden="true">
                <Zap size={44} />
              </div>
              <p className="modal-eyebrow">{status === 'success' ? 'Signal locked' : 'Signal lost'}</p>
              <h3 id="contact-dialog-title" className="modal-title">
                {status === 'success' ? 'Request received!' : 'Something went wrong'}
              </h3>
              <p className="modal-text">
                {status === 'success'
                  ? "Guneet will reply soon. Expect a response within a couple of days."
                  : "The request didn't go through. Try again, or message Guneet on LinkedIn."}
              </p>
              <div className="modal-actions">
                {status === 'error' && (
                  <button type="button" onClick={() => void submit()} className="btn-primary">
                    <Send size={15} /> Try again
                  </button>
                )}
                <button type="button" onClick={closeModal} className={status === 'success' ? 'btn-primary' : 'btn-secondary'}>
                  {status === 'success' ? 'Done' : 'Close'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      <div className="divider mt-24 mb-8" />
      <p className="text-xs text-[var(--text-faint)] text-center">Guneet Sura. Built with ❤️ using Next.js, Tailwind, and Framer Motion.</p>
    </section>
  );
};

export default Contact;
