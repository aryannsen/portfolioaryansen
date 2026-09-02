import React, { useEffect } from 'react';
import { X, Clock, Calendar, ArrowLeft, Share2 } from 'lucide-react';
import { Article } from '../types';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({ article, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (article) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [article, onClose]);

  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#1D1E20]/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#FAFAF8] rounded-2xl border border-[#202124]/10 shadow-2xl overflow-y-auto flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-md px-6 py-4 border-b border-[#202124]/10 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-semibold text-[#202124] hover:text-[#6B6D70] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Notes</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-[#202124] text-[#FAFAF8] hover:bg-[#383A3E] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-10 space-y-8 max-w-3xl mx-auto w-full">
          
          {/* Category & Read Time */}
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="bg-[#E9E8E4] text-[#202124] px-3 py-1 rounded-full font-semibold">
              {article.category}
            </span>
            <span className="text-[#6B6D70] flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {article.readTime}
            </span>
            <span className="text-[#6B6D70] flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {article.date}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[#202124] tracking-tight font-display leading-tight">
            {article.title}
          </h1>

          {/* Excerpt */}
          <p className="text-base sm:text-lg text-[#6B6D70] italic border-l-2 border-[#202124] pl-4 py-1">
            "{article.excerpt}"
          </p>

          {/* Cover Image */}
          <div className="rounded-xl overflow-hidden border border-[#202124]/10 aspect-[16/9]">
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content Sections */}
          <div className="space-y-8 pt-4">
            {article.content.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h2 className="text-2xl font-bold text-[#202124] font-display">
                  {sec.heading}
                </h2>
                {sec.paragraphs.map((para, pIdx) => (
                  <p key={pIdx} className="text-sm sm:text-base text-[#6B6D70] leading-relaxed">
                    {para}
                  </p>
                ))}
                {sec.quote && (
                  <div className="bg-[#E9E8E4]/60 p-6 rounded-xl border-l-4 border-[#202124] my-6">
                    <p className="text-sm font-semibold text-[#202124] italic">
                      "{sec.quote}"
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Author Footer */}
          <div className="pt-8 border-t border-[#202124]/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1D1E20] text-[#FAFAF8] flex items-center justify-center font-bold text-xs">
                A
              </div>
              <div>
                <div className="text-xs font-semibold text-[#202124]">Written by {PERSONAL_INFO.name}</div>
                <div className="text-[10px] text-[#6B6D70]">B.Tech IT Student · GTU</div>
              </div>
            </div>

            <button
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: article.title, url: window.location.href });
                } else {
                  navigator.clipboard.writeText(window.location.href);
                  alert('Note link copied to clipboard!');
                }
              }}
              className="flex items-center gap-1.5 text-xs font-semibold text-[#202124] bg-[#E9E8E4] px-4 py-2 rounded-full hover:bg-[#202124] hover:text-[#FAFAF8] transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share Note</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
