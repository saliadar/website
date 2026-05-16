'use client';

import { useState, FormEvent } from 'react';

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  businessName: string;
  message: string;
}

const initialForm: FormData = { fullName: '', email: '', phone: '', businessName: '', message: '' };

export default function ContactForm() {
  const [form, setForm] = useState<FormData>(initialForm);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus('success');
        setForm(initialForm);
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please check your connection and try again.');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-lg bg-white border border-grey-5 text-ink placeholder-grey-4 text-sm focus:outline-none focus:border-ink transition-colors duration-200';

  return (
    <section id="contact" className="py-24 lg:py-32 bg-ink border-t border-grey-5">
      <div className="max-w-6xl mx-auto px-6 lg:px-10 grid lg:grid-cols-2 gap-16 items-start">
        {/* Left — copy */}
        <div>
          <p className="text-xs font-semibold tracking-widest2 text-grey-4 uppercase mb-6">Contact</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-6">
            Ready to grow your business?
          </h2>
          <p className="text-grey-4 text-base leading-relaxed mb-10">
            Tell me about your business and your goals. I&apos;ll come back to you within 24 hours
            with honest thoughts on how I can help.
          </p>
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-3 text-grey-3">
              <div className="w-1 h-1 rounded-full bg-grey-3" />
              <span>No obligation. Just a conversation.</span>
            </div>
            <div className="flex items-center gap-3 text-grey-3">
              <div className="w-1 h-1 rounded-full bg-grey-3" />
              <span>Response within 24 hours.</span>
            </div>
            <div className="flex items-center gap-3 text-grey-3">
              <div className="w-1 h-1 rounded-full bg-grey-3" />
              <span>Based in Australia, working globally.</span>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div>
          {status === 'success' ? (
            <div className="p-10 rounded-2xl bg-grey-6 text-center">
              <div className="w-12 h-12 rounded-full bg-ink flex items-center justify-center mx-auto mb-5">
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-ink mb-2">Message received.</h3>
              <p className="text-grey-2 text-sm mb-6">I&apos;ll be in touch within 24 hours.</p>
              <button
                onClick={() => setStatus('idle')}
                className="text-sm text-grey-3 underline underline-offset-4 hover:text-ink transition-colors"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="fullName" className="text-xs font-medium text-grey-4 uppercase tracking-wider">
                    Full Name <span className="text-white">*</span>
                  </label>
                  <input id="fullName" name="fullName" type="text" required placeholder="Jane Smith"
                    value={form.fullName} onChange={handleChange} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-medium text-grey-4 uppercase tracking-wider">
                    Email <span className="text-white">*</span>
                  </label>
                  <input id="email" name="email" type="email" required placeholder="jane@company.com"
                    value={form.email} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-medium text-grey-4 uppercase tracking-wider">
                    Phone <span className="text-grey-4 font-normal normal-case">(optional)</span>
                  </label>
                  <input id="phone" name="phone" type="tel" placeholder="+61 4xx xxx xxx"
                    value={form.phone} onChange={handleChange} className={inputClass} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="businessName" className="text-xs font-medium text-grey-4 uppercase tracking-wider">
                    Business <span className="text-white">*</span>
                  </label>
                  <input id="businessName" name="businessName" type="text" required placeholder="Your company"
                    value={form.businessName} onChange={handleChange} className={inputClass} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-medium text-grey-4 uppercase tracking-wider">
                  Message <span className="text-white">*</span>
                </label>
                <textarea id="message" name="message" required rows={5}
                  placeholder="Tell me about your business and what you're looking to achieve..."
                  value={form.message} onChange={handleChange}
                  className={`${inputClass} resize-none`} />
              </div>

              {status === 'error' && (
                <p className="text-sm text-red-400 bg-red-950/30 border border-red-900/40 rounded-lg px-4 py-3">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full py-3.5 bg-white text-ink text-sm font-medium rounded-full hover:bg-grey-6 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Sending…
                  </>
                ) : (
                  'Send message'
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
