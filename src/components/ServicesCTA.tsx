import React from 'react';
import { ArrowUpRight, Sparkles, CheckCircle, MessageSquare } from 'lucide-react';

interface ServicesCTAProps {
  onScrollToContact: () => void;
}

export const ServicesCTA: React.FC<ServicesCTAProps> = ({ onScrollToContact }) => {
  return (
    <section className="py-24 bg-[#1D1E20] text-[#FAFAF8] relative overflow-hidden bg-grid-pattern-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="bg-[#202124]/90 p-8 sm:p-12 lg:p-16 rounded-3xl border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          
          {/* Left Text Column */}
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-[11px] font-mono text-emerald-400 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OPEN TO LEARNING & COLLABORATION</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF8] font-display leading-[1.15]">
              Learning, Building & Collaborating
            </h2>

            <p className="text-base sm:text-lg text-[#A0A2A5] leading-relaxed font-normal">
              Interested in discussing web development projects, student collaborations, or learning opportunities? Let’s get in touch.
            </p>

            {/* Student Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10 text-xs text-[#E9E8E4]">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>B.Tech IT Student</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>GTU University</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Practical Projects</span>
              </div>
            </div>
          </div>

          {/* Right Button Callout */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-4 shrink-0">
            <button
              onClick={onScrollToContact}
              className="group inline-flex items-center justify-center gap-3 bg-[#FAFAF8] text-[#1D1E20] hover:bg-[#E9E8E4] px-8 py-4 rounded-full text-sm font-bold transition-all shadow-lg cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Connect With Me</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
