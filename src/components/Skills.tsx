import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Check, Code } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  return (
    <section id="skills" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#F4F3F0] dark:bg-[#121315] relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                02 / TECHNICAL SKILLS
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">
              Skills I’m Learning
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#6B6D70] dark:text-[#A0A2A5] max-w-md leading-relaxed font-normal">
            I’m continuously learning and improving these technologies through practice, experimentation, and hands-on projects.
          </p>
        </motion.div>

        {/* 4 Skill Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILL_CATEGORIES.map((cat, index) => (
            <motion.div
              key={cat.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-[#FAFAF8] dark:bg-[#1C1D21] p-8 rounded-2xl border border-[#202124]/10 dark:border-white/10 hover:border-emerald-500/30 dark:hover:border-emerald-500/30 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between shadow-2xs relative overflow-hidden"
            >
              {/* Card Top */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-xs font-mono font-bold text-[#6B6D70] dark:text-[#A0A2A5] bg-[#E9E8E4] dark:bg-[#2C2E33] px-3 py-1 rounded-md">
                    {cat.number}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] group-hover:bg-emerald-500 group-hover:text-white dark:group-hover:bg-emerald-500 dark:group-hover:text-white text-[#202124] dark:text-[#FAFAF8] flex items-center justify-center transition-colors">
                    <Code className="w-4 h-4" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-2xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight mb-3 font-display">
                  {cat.category}
                </h3>

                {/* Category Description */}
                <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed mb-6 font-normal">
                  {cat.description}
                </p>
              </div>

              {/* Skills Itemized List */}
              <div className="pt-6 border-t border-[#202124]/10 dark:border-white/10 space-y-3">
                <div className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#6B6D70] dark:text-[#A0A2A5]">
                  FOCUS AREAS
                </div>
                <div className="space-y-3">
                  {cat.skills.map((s, idx) => (
                    <div key={idx} className="bg-[#F4F3F0] dark:bg-[#121315] p-3 rounded-xl border border-[#202124]/5 dark:border-white/5 hover:border-emerald-500/20 transition-colors">
                      <div className="flex items-center gap-2 text-xs font-bold text-[#202124] dark:text-[#FAFAF8] mb-1">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{s.name}</span>
                      </div>
                      <p className="text-[11px] text-[#6B6D70] dark:text-[#A0A2A5] pl-5 leading-normal">
                        {s.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Subtle Bottom Accent Bar */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
