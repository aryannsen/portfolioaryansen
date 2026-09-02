import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Phone, Instagram, Linkedin, GraduationCap, CheckCircle2, Send, MessageSquare, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ContactFormData } from '../types';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: 'Web Development / Collaboration',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const subjects = [
    'Web Development',
    'Student Collaboration',
    'Project Discussion',
    'General Inquiry'
  ];

  const validateEmail = (emailStr: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailStr.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatusMessage({
        type: 'error',
        text: 'Please fill out all required fields.'
      });
      return;
    }

    if (!validateEmail(formData.email)) {
      setStatusMessage({
        type: 'error',
        text: 'Please enter a valid email address.'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'e12d5511-cc03-4951-8f89-0827e0eeb301',
          name: formData.name.trim(),
          email: formData.email.trim(),
          subject: `Portfolio Contact: ${formData.subject}`,
          message: formData.message.trim(),
          from_name: formData.name.trim(),
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: 'Thank you! Your message has been sent successfully.',
        });
        setFormData({
          name: '',
          email: '',
          subject: 'Web Development / Collaboration',
          message: '',
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: 'Something went wrong. Please try again.',
        });
      }
    } catch (err) {
      setStatusMessage({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#E9E8E4]/50 dark:bg-[#18191B]/50 border-t border-[#202124]/10 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      {/* Background Static Ambient Glow (No continuous frame-by-frame JS blurs) */}
      <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                07 / GET IN TOUCH
              </span>
            </span>

            {/* Requirement #9: Availability Status Indicator */}
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Open to learning, collaboration & opportunities</span>
            </span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display mb-4 leading-tight">
            Let’s Connect
          </h2>
          <p className="text-base sm:text-lg text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
            I’m always open to connecting with fellow students, developers, learners, and anyone interested in technology and web development.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Direct Contact Info (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-8"
          >
            
            {/* Phone Quick Call Card */}
            <div className="bg-[#1D1E20] dark:bg-[#25272B] text-[#FAFAF8] p-8 rounded-2xl border border-[#202124]/20 dark:border-white/10 shadow-lg space-y-6 hover:border-emerald-500/40 transition-all">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#8B8D88] dark:text-[#A0A2A5]">
                  DIRECT PHONE
                </span>
                <Phone className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display text-[#FAFAF8] mb-2">
                  {PERSONAL_INFO.phoneFormatted}
                </h3>
                <p className="text-xs text-[#A0A2A5] leading-relaxed">
                  Feel free to call or reach out directly on phone for quick discussions or queries.
                </p>
              </div>
              <a
                href={PERSONAL_INFO.phoneUrl}
                className="group w-full flex items-center justify-center gap-2 bg-[#FAFAF8] text-[#1D1E20] hover:bg-[#E9E8E4] active:scale-95 px-6 py-3 rounded-full text-xs font-bold transition-all cursor-pointer shadow-xs"
              >
                <span>Call Phone Dialer</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>

            {/* Direct Social Channels Box */}
            <div className="bg-[#FAFAF8] dark:bg-[#1C1D21] p-8 rounded-2xl border border-[#202124]/10 dark:border-white/10 space-y-6 shadow-xs hover:border-emerald-500/30 transition-colors">
              <div>
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5] mb-3">
                  EDUCATION
                </div>
                <div className="text-sm font-semibold text-[#202124] dark:text-[#FAFAF8] flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>{PERSONAL_INFO.university}</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-[#202124]/10 dark:border-white/10">
                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5] mb-3">
                  SOCIAL MEDIA DIRECTORY
                </div>
                <div className="space-y-3">
                  {/* Instagram */}
                  <a
                    href={PERSONAL_INFO.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-[#202124] dark:text-[#FAFAF8] transition-all text-xs font-semibold group border border-[#202124]/5 dark:border-white/5 active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <Instagram className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                      <span>Instagram ({PERSONAL_INFO.instagram})</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={PERSONAL_INFO.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-[#202124] dark:text-[#FAFAF8] transition-all text-xs font-semibold group border border-[#202124]/5 dark:border-white/5 active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                      <span>LinkedIn Profile</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>

                  {/* Phone Dialer Link */}
                  <a
                    href={PERSONAL_INFO.phoneUrl}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-600 dark:hover:text-white text-[#202124] dark:text-[#FAFAF8] transition-all text-xs font-semibold group border border-[#202124]/5 dark:border-white/5 active:scale-98"
                  >
                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 group-hover:text-white transition-colors" />
                      <span>Phone: {PERSONAL_INFO.phone}</span>
                    </div>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Contact Form (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 bg-[#FAFAF8] dark:bg-[#1C1D21] p-8 sm:p-10 rounded-2xl border border-[#202124]/10 dark:border-white/10 shadow-sm hover:border-emerald-500/30 transition-all"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#202124]/10 dark:border-white/10">
                <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  <span>Send a Message</span>
                </h3>
                <span className="text-[10px] font-mono text-[#6B6D70] dark:text-[#A0A2A5] uppercase font-semibold">
                  STUDENT PORTFOLIO INQUIRY
                </span>
              </div>

              {statusMessage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`p-4 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-all ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-200 shadow-sm'
                      : 'bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-800/40 text-red-700 dark:text-red-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 animate-bounce" />
                  ) : null}
                  <span className="font-semibold">{statusMessage.text}</span>
                </motion.div>
              )}

              {/* Name & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block">
                    YOUR NAME *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 text-sm text-[#202124] dark:text-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block">
                    YOUR EMAIL *
                  </label>
                  <input
                    type="email"
                    placeholder="e.g. alex@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 text-sm text-[#202124] dark:text-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
                    required
                  />
                </div>
              </div>

              {/* Subject Select */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block">
                  PURPOSE / SUBJECT
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {subjects.map((subj) => (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => setFormData({ ...formData, subject: subj })}
                      className={`px-3 py-2.5 rounded-xl text-xs font-semibold border transition-all text-center cursor-pointer active:scale-95 ${
                        formData.subject === subj
                          ? 'bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] border-[#202124] dark:border-[#FAFAF8] shadow-xs'
                          : 'bg-[#F4F3F0] dark:bg-[#121315] text-[#6B6D70] dark:text-[#A0A2A5] border-[#202124]/10 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30'
                      }`}
                    >
                      {subj}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] uppercase tracking-wider block">
                  YOUR MESSAGE *
                </label>
                <textarea
                  rows={4}
                  placeholder="Write your message, project idea, or inquiry here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-[#F4F3F0] dark:bg-[#121315] border border-[#202124]/10 dark:border-white/10 text-sm text-[#202124] dark:text-[#FAFAF8] focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all resize-none"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] hover:bg-[#383A3E] dark:hover:bg-[#E9E8E4] py-4 rounded-xl text-sm font-bold transition-all cursor-pointer shadow-md hover:shadow-xl active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

