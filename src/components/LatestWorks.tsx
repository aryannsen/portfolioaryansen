import React from 'react';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { Project } from '../types';
import { PROJECTS } from '../data/portfolioData';

interface LatestWorksProps {
  onSelectProject: (p: Project) => void;
}

export const LatestWorks: React.FC<LatestWorksProps> = ({ onSelectProject }) => {
  const latestProjects = PROJECTS.slice(0, 3);

  return (
    <section className="py-24 bg-[#E9E8E4]/30 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#202124]" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70]">
                RECENT SHOWCASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] tracking-tight font-display">
              Recent Project Highlights
            </h2>
          </div>

          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#202124] hover:text-[#8B8D88] transition-colors"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {latestProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#FAFAF8] rounded-2xl border border-[#202124]/10 overflow-hidden cursor-pointer hover:border-[#202124]/30 hover:-translate-y-1 transition-all duration-300 shadow-2xs flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] bg-[#E9E8E4] overflow-hidden border-b border-[#202124]/10">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#202124] text-[#FAFAF8] flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <div className="p-6">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#6B6D70] mb-1 font-semibold">
                    {project.category}
                  </div>
                  <h3 className="text-lg font-bold text-[#202124] group-hover:text-[#8B8D88] transition-colors font-display">
                    {project.title}
                  </h3>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2 border-t border-[#202124]/5 flex items-center justify-between text-xs text-[#6B6D70]">
                <span className="font-medium text-[#202124]">{project.status}</span>
                <span className="font-mono text-[10px]">{project.year}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
