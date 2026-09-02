import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Sun, Moon, MessageSquare } from 'lucide-react';
import {
  getProfileImagePublicUrl,
  getProfileImageSignedUrl,
  isSupabaseConfigured,
} from '../lib/supabase';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileImgUrl, setProfileImgUrl] = useState<string | null>(null);
  const [isImgLoaded, setIsImgLoaded] = useState(false);
  const [triedSignedFallback, setTriedSignedFallback] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // First attempt: try public URL
    const publicUrl = getProfileImagePublicUrl();
    if (publicUrl) {
      setProfileImgUrl(publicUrl);
    } else {
      // If public URL could not be retrieved, attempt signed URL directly
      getProfileImageSignedUrl().then((signedUrl) => {
        if (signedUrl) {
          setProfileImgUrl(signedUrl);
        } else {
          setImgError(true);
        }
      });
    }
  }, []);

  const handleImageError = () => {
    // If public URL fails to load (e.g. private bucket), attempt signed URL once
    if (!triedSignedFallback && isSupabaseConfigured) {
      setTriedSignedFallback(true);
      getProfileImageSignedUrl()
        .then((signedUrl) => {
          if (signedUrl) {
            setProfileImgUrl(signedUrl);
            setIsImgLoaded(false);
          } else {
            setImgError(true);
          }
        })
        .catch(() => {
          setImgError(true);
        });
    } else {
      setImgError(true);
    }
  };

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme === 'dark';
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navItems = [
    { label: 'Home', href: '#home', id: 'home' },
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  // Map sub-sections (journey, certificates, insights) to main nav tabs
  const getActiveTab = () => {
    if (['projects', 'journey', 'certificates', 'insights'].includes(activeSection)) {
      return 'projects';
    }
    return activeSection || 'home';
  };

  const currentActiveTab = getActiveTab();

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;

      window.scrollTo({
        top: offsetPosition < 0 ? 0 : offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    scrollToSection(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F3F0]/90 dark:bg-[#121315]/90 backdrop-blur-md border-b border-[#202124]/10 dark:border-white/10 py-3 shadow-xs'
          : 'bg-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between gap-4">
        
        {/* Left Side: Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group cursor-pointer select-none"
        >
          <div className="w-8 h-8 rounded-xl bg-[#202124] text-[#FAFAF8] dark:bg-[#FAFAF8] dark:text-[#202124] flex items-center justify-center font-bold font-display text-sm shadow-xs group-hover:scale-105 transition-transform overflow-hidden relative">
            {profileImgUrl && !imgError && (
              <img
                src={profileImgUrl}
                alt="Aryan profile photo"
                loading="eager"
                decoding="async"
                className={`w-full h-full object-cover transition-opacity duration-200 ${
                  isImgLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setIsImgLoaded(true)}
                onError={handleImageError}
              />
            )}
            {(!profileImgUrl || !isImgLoaded || imgError) && (
              <span className={profileImgUrl && !imgError ? 'absolute inset-0 flex items-center justify-center pointer-events-none' : ''}>
                A
              </span>
            )}
          </div>
          <span className="font-bold font-display tracking-tight text-sm text-[#202124] dark:text-[#FAFAF8]">
            Aryan <span className="font-normal text-[#6B6D70] dark:text-[#A0A2A5]">Portfolio</span>
          </span>
        </a>

        {/* Center: Navigation Links Container */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-1 bg-[#E9E8E4]/80 dark:bg-[#1C1D21]/80 backdrop-blur-md px-2 py-1 rounded-full border border-[#202124]/10 dark:border-white/10 shadow-2xs"
        >
          {navItems.map((item) => {
            const isActive = currentActiveTab === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 text-xs font-semibold rounded-full transition-colors duration-200 select-none ${
                  isActive
                    ? 'text-[#FAFAF8] dark:text-[#202124]'
                    : 'text-[#6B6D70] hover:text-[#202124] dark:text-[#A0A2A5] dark:hover:text-[#FAFAF8]'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    className="absolute inset-0 bg-[#202124] dark:bg-[#FAFAF8] rounded-full -z-10 shadow-2xs"
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right Side: Get in Touch Button & Theme Toggle */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Get in Touch Button */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="group flex items-center gap-1.5 bg-[#FAFAF8] dark:bg-[#1C1D21] text-[#202124] dark:text-[#FAFAF8] hover:bg-[#202124] hover:text-[#FAFAF8] dark:hover:bg-[#FAFAF8] dark:hover:text-[#202124] px-4 py-2 rounded-xl text-xs font-semibold border border-[#202124]/15 dark:border-white/15 transition-all shadow-2xs cursor-pointer active:scale-95"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Get in Touch</span>
            <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>

          {/* Accessible Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-xl bg-[#FAFAF8] dark:bg-[#1C1D21] text-[#202124] dark:text-[#FAFAF8] border border-[#202124]/15 dark:border-white/15 hover:border-[#202124]/30 dark:hover:border-white/30 transition-all cursor-pointer shadow-2xs active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-[#202124]" />
            )}
          </button>
        </div>

        {/* Mobile Menu Trigger & Theme Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <button
            type="button"
            onClick={toggleTheme}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-xl bg-[#FAFAF8] dark:bg-[#1C1D21] text-[#202124] dark:text-[#FAFAF8] border border-[#202124]/15 dark:border-white/15 cursor-pointer active:scale-95"
          >
            {isDarkMode ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-xl text-[#202124] dark:text-[#FAFAF8] bg-[#E9E8E4] dark:bg-[#1C1D21] border border-[#202124]/10 dark:border-white/10 transition-colors active:scale-95"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="md:hidden fixed inset-0 top-[60px] bg-black/40 backdrop-blur-xs z-30"
            />

            {/* Slide Down Menu Content */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="md:hidden fixed inset-x-0 top-[60px] z-40 bg-[#FAFAF8] dark:bg-[#121315] border-b border-[#202124]/10 dark:border-white/10 p-5 shadow-2xl"
            >
              <div className="flex flex-col gap-1.5">
                {navItems.map((item) => {
                  const isActive = currentActiveTab === item.id;
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className={`min-h-[44px] px-4 rounded-xl text-sm font-semibold flex items-center justify-between transition-colors ${
                        isActive
                          ? 'bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124]'
                          : 'text-[#202124] dark:text-[#FAFAF8] hover:bg-[#E9E8E4] dark:hover:bg-[#1C1D21]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <ArrowUpRight className="w-4 h-4 opacity-60" />
                    </a>
                  );
                })}
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="mt-3 min-h-[44px] flex items-center justify-center gap-2 bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] px-4 py-3 rounded-xl text-xs font-bold shadow-xs cursor-pointer active:scale-98"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Get in Touch</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

