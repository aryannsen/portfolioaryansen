import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, Sparkles, FolderPlus, Eye } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface FeaturedProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onSelectProject }) => {
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const categories = ['All', 'Web Development', 'Frontend UI', 'API Learning', 'AI Tools'];

  const filteredProjects = PROJECTS.filter((p) => {
    if (activeFilter === 'All') return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase()) || p.subCategory.toLowerCase().includes(activeFilter.toLowerCase());
  });

  return (
    <section id="projects" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#E9E8E4]/40 dark:bg-[#18191B]/40 border-y border-[#202124]/10 dark:border-white/10 relative transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header & Sublabel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                03 / MY WORK
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display">
              Projects I’m Building
            </h2>
            <p className="text-sm text-[#6B6D70] dark:text-[#A0A2A5] mt-2 max-w-xl">
              Hands-on projects that help me learn, experiment, solve problems, and improve as a web developer.
            </p>
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2 bg-[#FAFAF8] dark:bg-[#1C1D21] p-1.5 rounded-full border border-[#202124]/10 dark:border-white/10 shadow-2xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeFilter === cat
                    ? 'bg-[#202124] text-[#FAFAF8] dark:bg-[#FAFAF8] dark:text-[#202124] shadow-xs'
                    : 'text-[#6B6D70] dark:text-[#A0A2A5] hover:text-[#202124] dark:hover:text-[#FAFAF8] hover:bg-[#E9E8E4]/60 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Featured Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                onClick={() => onSelectProject(project)}
                className="group bg-[#FAFAF8] dark:bg-[#1C1D21] rounded-2xl border border-[#202124]/10 dark:border-white/10 overflow-hidden cursor-pointer hover:border-emerald-500/40 dark:hover:border-emerald-500/40 hover:-translate-y-2 hover:shadow-[0_12px_30px_-10px_rgba(16,185,129,0.18)] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Project Thumbnail Image Box */}
                  <div className="relative aspect-[4/3] bg-[#E9E8E4] dark:bg-[#2C2E33] overflow-hidden border-b border-[#202124]/10 dark:border-white/10">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient Overlay on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/80 via-[#202124]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FAFAF8] text-[#202124] text-xs font-bold shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5 text-emerald-600" />
                        <span>View Project</span>
                      </span>
                    </div>
                    
                    {/* Status Badge */}
                    <div className="absolute top-4 left-4 bg-[#FAFAF8]/95 dark:bg-[#1C1D21]/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono font-bold text-[#202124] dark:text-[#FAFAF8] border border-[#202124]/10 dark:border-white/10">
                      {project.status}
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4 bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] px-2.5 py-1 rounded-md text-[10px] font-mono font-semibold">
                      {project.year}
                    </div>

                    {/* Circular Hover Arrow Badge */}
                    <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:scale-100 scale-75 transition-all duration-300 shadow-md">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Card Text Content */}
                  <div className="p-6">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-[#6B6D70] dark:text-[#A0A2A5] mb-1 font-semibold">
                      {project.category} · {project.subCategory}
                    </div>
                    <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors font-display mb-2">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] line-clamp-2 leading-relaxed mb-4">
                      {project.summary}
                    </p>

                    {/* Tools / Tech Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-[#202124]/5 dark:border-white/5">
                      {project.tools.map((t) => (
                        <span key={t} className="text-[10px] font-mono bg-[#E9E8E4] dark:bg-[#2C2E33] px-2 py-0.5 rounded-md text-[#202124] dark:text-[#FAFAF8] font-medium group-hover:border-emerald-500/20 border border-transparent transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Bar */}
                <div className="px-6 pb-6 pt-2 flex items-center justify-between text-xs font-bold text-[#202124] dark:text-[#FAFAF8]">
                  <span className="group-hover:translate-x-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-all inline-flex items-center gap-1">
                    View Project Details ↗
                  </span>
                  <span className="text-[10px] text-[#6B6D70] dark:text-[#A0A2A5] uppercase font-mono font-medium">{project.status}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Final Card: More Projects Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#FAFAF8]/60 dark:bg-[#1C1D21]/60 rounded-2xl border-2 border-dashed border-[#202124]/20 dark:border-white/20 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:border-emerald-500/40 transition-colors"
          >
            <div className="w-12 h-12 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] flex items-center justify-center text-[#202124] dark:text-[#FAFAF8]">
              <FolderPlus className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display mb-2">
                More Projects Coming Soon
              </h3>
              <p className="text-xs sm:text-sm text-[#6B6D70] dark:text-[#A0A2A5] max-w-xs leading-relaxed">
                This portfolio will continue growing with new projects, code experiments, and learning milestones as I build and improve.
              </p>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#202124] dark:text-[#FAFAF8] bg-[#E9E8E4] dark:bg-[#2C2E33] px-3 py-1 rounded-full font-semibold">
              Continuous Learning
            </span>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
