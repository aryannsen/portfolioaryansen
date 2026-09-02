import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, ArrowDown, GraduationCap, Code2, GitBranch, Braces } from 'lucide-react';
import { PORTRAIT_IMAGE, PERSONAL_INFO } from '../data/portfolioData';

export const Hero: React.FC = () => {
  const handleScrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projects = document.querySelector('#projects');
    if (projects) {
      projects.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToJourney = (e: React.MouseEvent) => {
    e.preventDefault();
    const journey = document.querySelector('#journey');
    if (journey) {
      journey.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="scroll-mt-20 sm:scroll-mt-24 relative pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden bg-grid-pattern min-h-[85vh] flex flex-col justify-center">
      {/* Decorative background overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#F4F3F0]/80 dark:via-[#18191B]/80 to-[#F4F3F0] dark:to-[#18191B] pointer-events-none" />

      {/* Soft Static Low-Opacity Ambient Gradient Glows (No continuous frame-by-frame JS blurs) */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-emerald-500/10 dark:bg-emerald-500/15 rounded-full blur-3xl pointer-events-none transform-gpu" />
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/15 rounded-full blur-3xl pointer-events-none transform-gpu" />

      {/* Subtle Dotted Connecting Paths (Web Dev Theme - Desktop Only) */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none hidden lg:block opacity-25" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M 120 110 Q 240 70 380 120 T 600 90"
          fill="none"
          className="stroke-[#202124] dark:stroke-white/20"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
        <path
          d="M 750 90 Q 950 140 1150 70"
          fill="none"
          stroke="#10B981"
          strokeWidth="1.2"
          strokeDasharray="4 6"
        />
      </svg>

      {/* Floating Developer Theme Elements with CSS Animations */}
      <div className="absolute top-20 left-8 hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#FAFAF8]/90 dark:bg-[#202124]/90 border border-[#202124]/10 dark:border-white/10 shadow-md backdrop-blur-md text-[#202124] dark:text-[#FAFAF8] pointer-events-none z-10 animate-float">
        <Code2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
        <span className="font-mono text-[11px] font-semibold">&lt;Developer /&gt;</span>
      </div>

      <div className="absolute top-16 right-12 hidden xl:flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#FAFAF8]/90 dark:bg-[#202124]/90 border border-[#202124]/10 dark:border-white/10 shadow-md backdrop-blur-md text-[#202124] dark:text-[#FAFAF8] pointer-events-none z-10 animate-float-delayed">
        <Braces className="w-3.5 h-3.5 text-amber-500" />
        <span className="font-mono text-[11px] font-medium text-[#6B6D70] dark:text-[#A0A2A5]">React · TS · GTU</span>
      </div>

      <div className="absolute top-36 right-1/3 hidden 2xl:flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-300 pointer-events-none z-10 animate-float">
        <GitBranch className="w-3 h-3 text-emerald-500" />
        <span className="font-mono text-[10px] font-bold">main*</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center"
        >
          {/* Left Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            
            {/* Status Pill & Sub-header */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E9E8E4] dark:bg-[#202124] border border-[#202124]/10 dark:border-white/15 text-[11px] font-semibold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] shadow-2xs">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                CURRENTLY LEARNING & BUILDING
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5] font-semibold hidden sm:inline-block">
                GUJARAT TECHNOLOGICAL UNIVERSITY (GTU)
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl xl:text-6xl font-bold tracking-tight text-[#202124] dark:text-[#FAFAF8] leading-[1.1] mb-6 font-display">
              Learning web development and turning ideas into{' '}
              <span className="relative inline-block text-[#202124] dark:text-[#FAFAF8]">
                digital experiences
                <span className="absolute bottom-1 left-0 w-full h-[6px] bg-emerald-500/30 dark:bg-emerald-400/30 rounded-full -z-10 transform -rotate-1" />
              </span>
              .
            </h1>

            {/* Short Introduction */}
            <p className="text-base sm:text-lg text-[#6B6D70] dark:text-[#A0A2A5] max-w-2xl leading-relaxed mb-8 font-normal">
              I’m <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">Aryan</span>, a second-year B.Tech Information Technology student at <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">Gujarat Technological University</span>. I’m learning web development, exploring modern technologies and AI-powered tools, and building practical projects to strengthen my technical and problem-solving skills.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-10">
              <a
                href="#projects"
                onClick={handleScrollToProjects}
                className="group inline-flex items-center gap-2 bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] hover:bg-[#383A3E] dark:hover:bg-white px-6 py-3.5 rounded-full text-sm font-bold transition-all shadow-md hover:shadow-xl active:scale-95 cursor-pointer border border-transparent hover:border-emerald-500/30"
              >
                <span>Explore My Projects</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </a>

              <a
                href="#journey"
                onClick={handleScrollToJourney}
                className="group flex items-center gap-2 text-xs font-bold text-[#6B6D70] dark:text-[#A0A2A5] hover:text-[#202124] dark:hover:text-[#FAFAF8] py-2 transition-colors cursor-pointer active:scale-95"
              >
                <span>Follow My Journey</span>
                <ArrowDown className="w-3.5 h-3.5 group-hover:translate-y-1 transition-transform" />
              </a>
            </div>

            {/* Metric / Highlights Callouts Bar */}
            <div className="pt-6 border-t border-[#202124]/10 dark:border-white/10 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">Second-Year</div>
                <div className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] mt-0.5 font-medium">B.Tech IT Student</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">GTU</div>
                <div className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] mt-0.5 font-medium">Gujarat Tech University</div>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">Learning</div>
                <div className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] mt-0.5 font-medium">Web Dev & AI Tools</div>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Portrait Card (5 Cols) */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end mt-4 lg:mt-0">
            <div className="relative w-full max-w-md lg:max-w-none">
              
              {/* Outer Framing Card */}
              <div className="relative bg-[#FAFAF8] dark:bg-[#202124] p-3 sm:p-4 rounded-2xl border border-[#202124]/10 dark:border-white/15 shadow-md overflow-hidden">
                
                {/* Portrait Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-[#E9E8E4] dark:bg-[#2C2E33]">
                  <img
                    src={PORTRAIT_IMAGE}
                    alt="Aryan - B.Tech IT Student"
                    loading="eager"
                    decoding="async"
                    width={400}
                    height={533}
                    className="w-full h-full object-cover object-[center_80%] grayscale contrast-[1.05] hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/50 via-transparent to-transparent opacity-60 pointer-events-none" />
                  
                  {/* Floating overlay tag inside portrait */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 bg-[#FAFAF8]/95 dark:bg-[#202124]/95 backdrop-blur-md p-3 rounded-xl border border-[#202124]/10 dark:border-white/15 flex items-center justify-between shadow-xs">
                    <div>
                      <div className="text-xs font-bold text-[#202124] dark:text-[#FAFAF8] font-display">{PERSONAL_INFO.name}</div>
                      <div className="text-[10px] text-[#6B6D70] dark:text-[#A0A2A5] font-medium">B.Tech IT Student · GTU</div>
                    </div>
                    <GraduationCap className="w-4 h-4 text-[#202124] dark:text-[#FAFAF8]" />
                  </div>
                </div>

                {/* Geometric corner accent marks */}
                <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#202124]/30 dark:border-white/30" />
                <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#202124]/30 dark:border-white/30" />
                <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#202124]/30 dark:border-white/30" />
                <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#202124]/30 dark:border-white/30" />
              </div>

            </div>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
