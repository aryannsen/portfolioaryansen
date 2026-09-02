import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { JOURNEY_ITEMS } from '../data/portfolioData';
import { Sparkles } from 'lucide-react';

export const Experience: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 20%'],
  });

  const scaleYProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section id="journey" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#F4F3F0] dark:bg-[#121315] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#202124] dark:bg-[#FAFAF8]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                04 / MY JOURNEY
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display mb-4">
              My Journey
            </h2>
            <p className="text-sm sm:text-base text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
              Every experience shaped who I am today.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#FAFAF8] dark:bg-[#1C1D21] px-4 py-2 rounded-full border border-[#202124]/10 dark:border-white/10 text-xs font-semibold text-[#202124] dark:text-[#FAFAF8] shadow-2xs">
            <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 animate-pulse" />
            <span>Milestones & Growth</span>
          </div>
        </div>

        {/* Timeline Container */}
        <div ref={containerRef} className="relative mt-8">
          
          {/* Background Vertical Line Track */}
          <div className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 w-1 -translate-x-1/2 bg-[#202124]/10 dark:bg-white/10 rounded-full" />

          {/* Animated Glowing Vertical Line Fill */}
          <motion.div
            style={{ scaleY: scaleYProgress, originY: 0 }}
            className="absolute top-0 bottom-0 left-6 sm:left-8 md:left-1/2 w-1 -translate-x-1/2 bg-gradient-to-b from-emerald-500 via-[#383A3E] to-emerald-500 dark:from-emerald-400 dark:via-[#FAFAF8] dark:to-emerald-400 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)] z-0"
          />

          {/* Timeline Cards List */}
          <div className="space-y-12 sm:space-y-16">
            {JOURNEY_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id}
                  className="relative flex flex-col md:flex-row items-center group"
                >
                  {/* Timeline Dot */}
                  <div className="absolute top-6 left-6 sm:left-8 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#FAFAF8] dark:bg-[#1C1D21] border-2 border-[#202124] dark:border-[#FAFAF8] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                        <div className="w-3 h-3 rounded-full bg-emerald-500 group-hover:bg-amber-500 transition-colors duration-300" />
                      </div>
                    </div>
                  </div>

                  {/* Card wrapper with clean reveal animation */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.08, 0.3), ease: 'easeOut' }}
                    className={`w-full pl-14 sm:pl-20 md:pl-0 md:w-1/2 ${
                      isEven ? 'md:pr-12 md:text-right md:mr-auto' : 'md:pl-12 md:text-left md:ml-auto'
                    }`}
                  >
                    <div className="bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md border border-[#202124]/10 dark:border-white/10 hover:border-[#202124]/30 dark:hover:border-white/30 shadow-xs hover:shadow-xl transition-all duration-300 rounded-2xl p-6 sm:p-8 relative group/card hover:-translate-y-1 overflow-hidden">
                      
                      {/* Subtle hover gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-[#202124]/5 dark:from-white/5 via-transparent to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 pointer-events-none" />

                      {/* Header Row inside card */}
                      <div
                        className={`flex flex-wrap items-center gap-3 mb-4 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        {/* Icon Badge */}
                        <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#202124] to-[#383A3E] dark:from-[#FAFAF8] dark:to-[#E9E8E4] text-white dark:text-[#202124] flex items-center justify-center text-xl shadow-md border border-[#FAFAF8] dark:border-[#202124] group-hover/card:scale-110 group-hover/card:rotate-3 transition-transform duration-300 shrink-0">
                          <span>{item.icon}</span>
                        </div>

                        {/* Year Badge */}
                        <span className="inline-flex items-center px-3.5 py-1 rounded-full bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] text-xs font-mono font-bold tracking-wider shadow-2xs">
                          {item.year}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl sm:text-2xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display mb-2 tracking-tight transition-colors">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed font-normal">
                        {item.description}
                      </p>

                      {/* Pointer Indicator */}
                      <div
                        className={`hidden md:block absolute top-8 w-3 h-3 bg-[#FAFAF8] dark:bg-[#1C1D21] border-t border-r border-[#202124]/10 dark:border-white/10 group-hover/card:border-[#202124]/30 dark:group-hover/card:border-white/30 transition-colors ${
                          isEven
                            ? '-right-1.5 rotate-45 border-l-0 border-b-0'
                            : '-left-1.5 -rotate-135 border-l-0 border-b-0'
                        }`}
                      />
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
