import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { FeaturedProjects } from './components/FeaturedProjects';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Insights } from './components/Insights';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';
import { BookingModal } from './components/BookingModal';
import { AryanAI } from './components/AryanAI';
import { Project } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [bookingOpen, setBookingOpen] = useState<boolean>(false);

  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'journey', 'certificates', 'insights', 'contact'];
    
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          const mostVisible = visibleEntries.reduce((prev, curr) =>
            curr.intersectionRatio > prev.intersectionRatio ? curr : prev
          );
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        rootMargin: '-15% 0px -45% 0px',
        threshold: [0.1, 0.3, 0.6],
      }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F3F0] dark:bg-[#121315] text-[#202124] dark:text-[#FAFAF8] selection:bg-[#202124] selection:text-[#FAFAF8] dark:selection:bg-[#FAFAF8] dark:selection:text-[#202124] transition-colors duration-300 antialiased">
      {/* Sticky Top Header Navigation */}
      <Navbar
        activeSection={activeSection}
      />

      {/* Main Long-form Editorial Scroll View */}
      <main className="relative">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects onSelectProject={(p) => setSelectedProject(p)} />
        <Experience />
        <Certificates />
        <Insights />
        <Contact />
      </main>

      {/* Premium Footer */}
      <Footer />

      {/* Interactive Project Case Study Detail Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Interactive Booking / Connect Discussion Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
      />

      {/* Aryan AI Portfolio Floating Assistant */}
      <AryanAI />
    </div>
  );
}
