import React from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, BookOpen, Sparkles, GraduationCap } from 'lucide-react';
import { PORTRAIT_IMAGE, PERSONAL_INFO } from '../data/portfolioData';

export const About: React.FC = () => {
  return (
    <section id="about" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#E9E8E4]/50 dark:bg-[#18191B]/50 border-y border-[#202124]/10 dark:border-white/10 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-12"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
            01 / ABOUT ME
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col justify-center"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight mb-6 font-display">
              Learning by Building
            </h2>
            
            <p className="text-base sm:text-lg text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed mb-4 font-normal">
              Hi, I’m <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">Aryan</span>, a second-year B.Tech Information Technology student at <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">Gujarat Technological University</span>. I am currently learning web development and exploring how modern technologies and AI tools can turn ideas into useful digital experiences.
            </p>

            <p className="text-sm sm:text-base text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed mb-4">
              I believe the best way to learn is by building. Through hands-on projects, I am improving my understanding of web technologies, responsive design, development workflows, and problem-solving.
            </p>

            <p className="text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed mb-8">
              This portfolio is a growing record of my journey. I will continue adding new skills, projects, certificates, achievements, and experiences as I learn and improve.
            </p>

            {/* Approach Pills */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-[#202124]/10 dark:border-white/10">
              {['Learning', 'Building', 'Growing', 'Web Development'].map((pill) => (
                <span
                  key={pill}
                  className="px-3.5 py-1.5 bg-[#FAFAF8] dark:bg-[#1C1D21] text-[#202124] dark:text-[#FAFAF8] rounded-md text-xs font-semibold border border-[#202124]/10 dark:border-white/10 shadow-2xs hover:border-emerald-500/30 hover:shadow-sm transition-all"
                >
                  {pill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Editorial Visual Composition (7 Cols) */}
          <div className="lg:col-span-7 relative">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
              
              {/* Stat/Education Card (MD: 6 Cols) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="md:col-span-6 bg-[#FAFAF8] dark:bg-[#1C1D21] p-6 sm:p-8 rounded-2xl border border-[#202124]/10 dark:border-white/10 flex flex-col justify-between shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden group"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#E9E8E4] dark:bg-[#2C2E33] flex items-center justify-center text-[#202124] dark:text-[#FAFAF8]">
                    <GraduationCap className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                    ACADEMIC STATUS
                  </span>
                </div>

                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display mb-2 group-hover:scale-102 transition-transform origin-left">
                    2nd Year B.Tech IT
                  </div>
                  <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-snug font-medium">
                    Gujarat Technological University (GTU)
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-[#202124]/10 dark:border-white/10 text-[11px] font-semibold text-[#202124] dark:text-[#FAFAF8] flex items-center justify-between">
                  <span>Degree Program</span>
                  <span className="font-mono text-[#6B6D70] dark:text-[#A0A2A5]">2025 — 2029</span>
                </div>
              </motion.div>

              {/* Small Portrait & Quick Info Card (MD: 6 Cols) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="md:col-span-6 bg-[#FAFAF8] dark:bg-[#1C1D21] p-6 rounded-2xl border border-[#202124]/10 dark:border-white/10 shadow-xs hover:shadow-md hover:-translate-y-1 hover:border-emerald-500/30 transition-all duration-300 flex flex-col items-center justify-center text-center relative overflow-hidden"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#E9E8E4] dark:border-[#2C2E33] mb-3 shadow-inner relative group">
                  <img
                    src={PORTRAIT_IMAGE}
                    alt="Aryan Student Portrait"
                    loading="lazy"
                    decoding="async"
                    width={112}
                    height={112}
                    className="w-full h-full object-cover object-[center_80%] grayscale group-hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="text-sm font-bold text-[#202124] dark:text-[#FAFAF8] font-display">{PERSONAL_INFO.name}</div>
                <div className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] mb-3">GTU Student (B.Tech IT)</div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-[#202124] dark:text-[#FAFAF8] bg-[#E9E8E4] dark:bg-[#2C2E33] px-3 py-1 rounded-full">
                  <Sparkles className="w-3 h-3 text-emerald-500" />
                  <span>Learning & Building</span>
                </div>
              </motion.div>

              {/* Core Philosophy Box (MD: 12 Cols) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="md:col-span-12 bg-[#FAFAF8] dark:bg-[#1C1D21] p-6 sm:p-8 rounded-2xl border border-[#202124]/10 dark:border-white/10 shadow-xs hover:shadow-md hover:border-emerald-500/30 transition-all duration-300"
              >
                <div className="text-xs font-semibold uppercase tracking-wider text-[#6B6D70] dark:text-[#A0A2A5] mb-4">
                  CORE LEARNING PHILOSOPHY
                </div>

                <div className="space-y-4">
                  {[
                    'Building practical, real-world web projects to gain hands-on experience.',
                    'Exploring modern frontend development, UI/UX principles, and AI workflows.',
                    'Constantly learning new concepts and documenting my progress over time.'
                  ].map((statement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] text-[#202124] dark:text-[#FAFAF8] flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <p className="text-xs sm:text-sm text-[#202124] dark:text-[#FAFAF8] font-medium leading-relaxed">
                        {statement}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
