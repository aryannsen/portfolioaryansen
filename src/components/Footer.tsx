import React from 'react';
import { ArrowUpRight, Phone, Instagram, Linkedin } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Footer: React.FC = () => {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1D1E20] text-[#FAFAF8] pt-20 pb-12 relative overflow-hidden border-t border-white/10 bg-grid-pattern-dark">
      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Monogram */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-[#1D1E20] flex items-center justify-center font-bold text-sm shadow-xs">
                A
              </div>
              <div>
                <span className="font-bold text-xl tracking-tight text-[#FAFAF8] font-display block">
                  {PERSONAL_INFO.name.toUpperCase()}
                </span>
                <span className="text-xs text-[#A0A2A5]">
                  B.Tech IT Student · GTU
                </span>
              </div>
            </div>
            <p className="text-xs text-[#A0A2A5] max-w-sm leading-relaxed">
              Learning web development, building practical projects, and exploring modern technology at Gujarat Technological University (GTU).
            </p>
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B8D88] mb-2 font-semibold">
              NAVIGATION
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-medium">
              {[
                { label: 'Home', href: '#home' },
                { label: 'About', href: '#about' },
                { label: 'Skills', href: '#skills' },
                { label: 'Projects', href: '#projects' },
                { label: 'Journey', href: '#journey' },
                { label: 'Certificates', href: '#certificates' },
                { label: 'Contact', href: '#contact' },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className="text-[#E9E8E4] hover:text-white transition-colors py-0.5"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Direct Social / Contact Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B8D88] mb-2 font-semibold">
              CONNECT DIRECTLY
            </div>
            <div className="space-y-2 text-xs">
              {/* Phone */}
              <a
                href={PERSONAL_INFO.phoneUrl}
                className="flex items-center justify-between text-[#E9E8E4] hover:text-white transition-colors py-1.5 border-b border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Phone: {PERSONAL_INFO.phone}</span>
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#8B8D88]" />
              </a>

              {/* Instagram */}
              <a
                href={PERSONAL_INFO.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#E9E8E4] hover:text-white transition-colors py-1.5 border-b border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Instagram className="w-3.5 h-3.5 text-[#8B8D88]" />
                  <span>Instagram ({PERSONAL_INFO.instagram})</span>
                </span>
                <ArrowUpRight className="w-3 h-3 text-[#8B8D88]" />
              </a>

              {/* LinkedIn */}
              <a
                href={PERSONAL_INFO.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between text-[#E9E8E4] hover:text-white transition-colors py-1.5 border-b border-white/10"
              >
                <span className="flex items-center gap-2">
                  <Linkedin className="w-3.5 h-3.5 text-[#8B8D88]" />
                  <span>LinkedIn</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Banner Tagline */}
        <div className="py-10 border-b border-white/10 text-center">
          <div className="text-[10px] font-mono uppercase tracking-widest text-[#8B8D88] mb-2">
            STUDENT PHILOSOPHY
          </div>
          <div className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#FAFAF8] font-display">
            Learning • Building • Growing
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8B8D88]">
          <div>
            © 2026 Aryan. All rights reserved. Gujarat Technological University (GTU).
          </div>
          <div className="flex items-center gap-4">
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="hover:text-white transition-colors font-medium">
              Back to Top ↑
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
