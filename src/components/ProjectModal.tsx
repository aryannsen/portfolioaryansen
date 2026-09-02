import React, { useEffect } from 'react';
import { X, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  onSelectProject: (p: Project) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  onClose,
  onSelectProject,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#1D1E20]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-5xl max-h-[90vh] bg-[#FAFAF8] dark:bg-[#1C1D21] rounded-2xl border border-[#202124]/10 dark:border-white/10 shadow-2xl overflow-y-auto flex flex-col transition-colors duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md px-6 py-4 border-b border-[#202124]/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold px-2.5 py-1 bg-[#E9E8E4] dark:bg-[#2C2E33] rounded-md text-[#202124] dark:text-[#FAFAF8]">
              {project.status}
            </span>
            <span className="text-xs text-[#6B6D70] dark:text-[#A0A2A5] font-medium hidden sm:inline-block">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onSelectProject(prevProject)}
              className="p-2 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] text-[#202124] dark:text-[#FAFAF8] hover:bg-[#202124] hover:text-[#FAFAF8] dark:hover:bg-[#FAFAF8] dark:hover:text-[#202124] transition-colors cursor-pointer"
              title="Previous Project"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => onSelectProject(nextProject)}
              className="p-2 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] text-[#202124] dark:text-[#FAFAF8] hover:bg-[#202124] hover:text-[#FAFAF8] dark:hover:bg-[#FAFAF8] dark:hover:text-[#202124] transition-colors cursor-pointer"
              title="Next Project"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="ml-2 p-2 rounded-full bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] hover:bg-[#383A3E] dark:hover:bg-[#E9E8E4] transition-colors cursor-pointer"
              title="Close Details"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-10 space-y-10">
          
          {/* Banner & Title */}
          <div className="space-y-4">
            <div className="text-xs font-mono uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
              STUDENT PROJECT / {project.year}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-[#6B6D70] dark:text-[#A0A2A5] max-w-3xl leading-relaxed font-normal">
              {project.summary}
            </p>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-[#202124]/10 dark:border-white/10 text-xs">
              <div>
                <span className="text-[#6B6D70] dark:text-[#A0A2A5] block font-mono uppercase text-[10px]">PROJECT TYPE</span>
                <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{project.client}</span>
              </div>
              <div>
                <span className="text-[#6B6D70] dark:text-[#A0A2A5] block font-mono uppercase text-[10px]">ROLE</span>
                <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{project.role}</span>
              </div>
              <div>
                <span className="text-[#6B6D70] dark:text-[#A0A2A5] block font-mono uppercase text-[10px]">STATUS</span>
                <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{project.status}</span>
              </div>
              <div>
                <span className="text-[#6B6D70] dark:text-[#A0A2A5] block font-mono uppercase text-[10px]">CATEGORY</span>
                <span className="font-semibold text-[#202124] dark:text-[#FAFAF8]">{project.subCategory}</span>
              </div>
            </div>
          </div>

          {/* Learning Focus Highlight Box */}
          <div className="bg-[#E9E8E4]/60 dark:bg-[#25272B] p-6 rounded-xl border border-[#202124]/10 dark:border-white/10">
            <div className="text-xs font-bold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] mb-2 font-mono">
              LEARNING FOCUS & GOALS
            </div>
            <p className="text-sm text-[#202124] dark:text-[#FAFAF8] font-medium leading-relaxed">
              {project.learningFocus}
            </p>
          </div>

          {/* Large Cover Image */}
          <div className="rounded-2xl overflow-hidden border border-[#202124]/10 dark:border-white/10 bg-[#E9E8E4] dark:bg-[#2C2E33] aspect-[16/9]">
            <img
              src={project.coverImage}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Three-Column Breakdown */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#F4F3F0] dark:bg-[#121315] p-6 rounded-xl border border-[#202124]/5 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] mb-3 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 bg-[#202124] dark:bg-[#FAFAF8] rounded-full" />
                01. The Problem / Goal
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
                {project.challenge}
              </p>
            </div>

            <div className="bg-[#F4F3F0] dark:bg-[#121315] p-6 rounded-xl border border-[#202124]/5 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] mb-3 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 bg-[#202124] dark:bg-[#FAFAF8] rounded-full" />
                02. Design Approach
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
                {project.approach}
              </p>
            </div>

            <div className="bg-[#F4F3F0] dark:bg-[#121315] p-6 rounded-xl border border-[#202124]/5 dark:border-white/5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#202124] dark:text-[#FAFAF8] mb-3 flex items-center gap-2 font-mono">
                <span className="w-1.5 h-1.5 bg-[#202124] dark:bg-[#FAFAF8] rounded-full" />
                03. The Implementation
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>

          {/* Outcomes */}
          <div className="bg-[#1D1E20] dark:bg-[#25272B] text-[#FAFAF8] p-8 rounded-2xl space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-[#8B8D88] dark:text-[#A0A2A5] font-bold">
              KEY LEARNING OUTCOMES & ACCOMPLISHMENTS
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.outcomes.map((outcome, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs sm:text-sm text-[#E9E8E4] leading-snug">
                    {outcome}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Tech Stack */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider text-[#6B6D70] dark:text-[#A0A2A5] mb-3 font-mono">
              TECHNOLOGIES & TOOLS USED
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-3 py-1 bg-[#E9E8E4] dark:bg-[#2C2E33] text-[#202124] dark:text-[#FAFAF8] rounded-full text-xs font-semibold border border-[#202124]/10 dark:border-white/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-8 border-t border-[#202124]/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onSelectProject(prevProject)}
                className="text-xs font-semibold text-[#202124] dark:text-[#FAFAF8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                ← Prev: {prevProject.title}
              </button>
              <span className="text-[#6B6D70] dark:text-[#A0A2A5]">|</span>
              <button
                onClick={() => onSelectProject(nextProject)}
                className="text-xs font-semibold text-[#202124] dark:text-[#FAFAF8] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Next: {nextProject.title} →
              </button>
            </div>

            <button
              onClick={onClose}
              className="bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] px-6 py-2.5 rounded-full text-xs font-semibold hover:bg-[#383A3E] dark:hover:bg-[#E9E8E4] transition-colors cursor-pointer"
            >
              Close Details
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
