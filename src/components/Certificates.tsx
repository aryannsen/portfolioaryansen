import React from 'react';
import { motion } from 'motion/react';
import { Award, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { CERTIFICATES } from '../data/portfolioData';

export const Certificates: React.FC = () => {
  return (
    <section id="certificates" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#E9E8E4]/40 dark:bg-[#18191B]/40 border-y border-[#202124]/10 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                05 / CERTIFICATES & ACHIEVEMENTS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display mb-4">
              Certificates & Achievements
            </h2>
            <p className="text-sm sm:text-base text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
              This section will grow as I complete courses, participate in technical events, build projects, and achieve new milestones.
            </p>
          </div>
        </motion.div>

        {/* Certificates Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-[#FAFAF8] dark:bg-[#1C1D21] p-8 rounded-2xl border border-[#202124]/10 dark:border-white/10 hover:border-emerald-500/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 shadow-2xs flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#E9E8E4] dark:bg-[#2C2E33] group-hover:bg-emerald-500 group-hover:text-white transition-colors flex items-center justify-center text-[#202124] dark:text-[#FAFAF8]">
                    <Award className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] bg-[#E9E8E4] dark:bg-[#2C2E33] px-3 py-1 rounded-full border border-transparent group-hover:border-emerald-500/20">
                    {cert.status}
                  </span>
                </div>

                <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5] mb-1 font-semibold">
                  {cert.category} · {cert.issuer}
                </div>

                <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display mb-3 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {cert.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
                  {cert.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#202124]/10 dark:border-white/10 flex items-center justify-between text-xs font-semibold text-[#202124] dark:text-[#FAFAF8]">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Learning Milestone
                </span>
                <span className="text-[10px] text-[#6B6D70] dark:text-[#A0A2A5] font-mono">Verified Progress</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
