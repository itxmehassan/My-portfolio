import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Send, CheckCircle2, AlertCircle, Github, MessageCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Contact() {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Form submission handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) return;

    setSubmitting(true);
    setSubmitStatus('idle');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, company: '', subject, message }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitStatus('success');
        // Reset form
        setName('');
        setEmail('');
        setSubject('');
        setMessage('');
      } else {
        setSubmitStatus('error');
      }
    } catch (err) {
      console.error('Contact Form Submit Error:', err);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-neutral-950 border-t border-neutral-900 overflow-hidden select-text">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        
        {/* Section Header with nice styling as shown in the image */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-sans font-extrabold text-white tracking-tight leading-tight">
            Let's build something{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">
              great together.
            </span>
          </h2>
          <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl mx-auto">
            Have a project in mind or want to collaborate? I'd love to hear from you — drop me a message.
          </p>
        </div>

        {/* Master Card Box as in the image */}
        <div className="bg-neutral-900/20 border border-neutral-850/60 rounded-3xl p-6 md:p-10 max-w-5xl mx-auto shadow-2xl backdrop-blur-sm">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left Column - Direct Channels vertical cards list */}
            <div className="lg:col-span-5 space-y-4">
              
              {/* Email Card */}
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="group flex items-center space-x-4 p-5 rounded-2xl bg-neutral-950/40 hover:bg-neutral-900/50 border border-neutral-850/50 hover:border-indigo-500/30 transition-all duration-300"
              >
                <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">Email</p>
                  <p className="text-xs md:text-sm font-semibold font-mono text-neutral-200 group-hover:text-white transition-colors">
                    {PERSONAL_INFO.email}
                  </p>
                </div>
              </a>

              {/* GitHub Card */}
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-4 p-5 rounded-2xl bg-neutral-950/40 hover:bg-neutral-900/50 border border-neutral-850/50 hover:border-purple-500/30 transition-all duration-300"
              >
                <div className="p-3 bg-purple-500/10 border border-purple-500/20 text-purple-400 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <Github className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">GitHub</p>
                  <p className="text-xs md:text-sm font-semibold font-mono text-neutral-200 group-hover:text-white transition-colors">
                    github.com/hassanmehdi
                  </p>
                </div>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/923121478698"
                target="_blank"
                rel="noreferrer"
                className="group flex items-center space-x-4 p-5 rounded-2xl bg-neutral-950/40 hover:bg-neutral-900/50 border border-neutral-850/50 hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl transition-transform duration-300 group-hover:scale-105">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">WhatsApp / Call</p>
                  <p className="text-xs md:text-sm font-semibold font-mono text-neutral-200 group-hover:text-white transition-colors">
                    0312 1478698
                  </p>
                </div>
              </a>

            </div>

            {/* Right Column - Form / Admin Dashboard */}
            <div className="lg:col-span-7 h-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key="contactForm"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Your name"
                          className="w-full bg-neutral-950/60 border border-neutral-850/60 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-all duration-300"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                          Email
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          className="w-full bg-neutral-950/60 border border-neutral-850/60 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-all duration-300"
                        />
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        Subject
                      </label>
                      <div className="relative">
                        <select
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full bg-neutral-950/60 border border-neutral-850/60 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-all duration-300 appearance-none cursor-pointer text-left"
                        >
                          <option value="" disabled className="bg-neutral-950">
                            Select a topic...
                          </option>
                          <option value="Full-Time Position" className="bg-neutral-950 text-neutral-300">
                            Full-Time Position
                          </option>
                          <option value="Contract / Freelance Work" className="bg-neutral-950 text-neutral-300">
                            Contract / Freelance Work
                          </option>
                          <option value="General Collaboration" className="bg-neutral-950 text-neutral-300">
                            General Collaboration
                          </option>
                          <option value="Inquiry / Chat" className="bg-neutral-950 text-neutral-300">
                            Inquiry / Chat
                          </option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-500">
                          <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono text-neutral-400 uppercase tracking-wider">
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tell me about your project or idea..."
                        className="w-full bg-neutral-950/60 border border-neutral-850/60 focus:border-indigo-500/60 focus:ring-1 focus:ring-indigo-500/20 rounded-xl px-4 py-3 text-xs text-white placeholder-neutral-600 focus:outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* Alerts */}
                    <AnimatePresence>
                      {submitStatus === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs rounded-xl flex items-center space-x-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                          <span>Message delivered successfully! It has been written to the database logs. Thank you.</span>
                        </motion.div>
                      )}
                      {submitStatus === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs rounded-xl flex items-center space-x-2"
                        >
                          <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
                          <span>Error submitting message. Please check connection and try again.</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                      <button
                        type="submit"
                        disabled={submitting}
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-neutral-800 text-white font-semibold text-xs rounded-xl flex items-center justify-center space-x-2 hover:shadow-lg hover:shadow-indigo-600/15 active:scale-95 transition-all cursor-pointer"
                      >
                        <Send className="w-4 h-4" />
                        <span>{submitting ? 'Sending...' : 'Send message'}</span>
                      </button>
                      <span className="text-xs text-neutral-500 font-sans">
                        I usually reply within 24h
                      </span>
                    </div>
                  </form>
                </motion.div>
              </AnimatePresence>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
