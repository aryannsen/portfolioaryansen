import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import {
  Code2,
  Terminal,
  Rocket,
  BarChart3,
  Sparkles,
  GitBranch,
  Github,
  Laptop,
  Layout,
  Palette,
  FileCode,
  CheckCircle2,
  FolderGit2,
  Award,
  Trophy,
  Zap,
} from 'lucide-react';

// Count-Up Component for Quick Stats
const CountUp: React.FC<{ end: number; duration?: number; suffix?: string }> = ({
  end,
  duration = 1.8,
  suffix = '',
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easedProgress * end));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isInView, end, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

// Terminal Typewriter Loop Component
interface TerminalLine {
  type: 'command' | 'output' | 'blank';
  text: string;
}

const TERMINAL_CONTENT: TerminalLine[] = [
  { type: 'command', text: '> whoami' },
  { type: 'output', text: 'Aryan Sen' },
  { type: 'output', text: 'B.Tech IT Student' },
  { type: 'output', text: 'Web Developer' },
  { type: 'output', text: 'AI Enthusiast' },
  { type: 'blank', text: '' },
  { type: 'command', text: '> current_status' },
  { type: 'output', text: 'Building Projects...' },
  { type: 'output', text: 'Learning DSA...' },
  { type: 'output', text: 'Exploring AI...' },
  { type: 'output', text: 'Open to Internship Opportunities' },
];

const TerminalWindow: React.FC = () => {
  const [displayedLines, setDisplayedLines] = useState<{ type: string; text: string }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isWaitingReset, setIsWaitingReset] = useState(false);

  useEffect(() => {
    if (isWaitingReset) {
      const resetTimer = setTimeout(() => {
        setDisplayedLines([]);
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
        setIsWaitingReset(false);
      }, 3500); // Wait 3.5s before looping terminal
      return () => clearTimeout(resetTimer);
    }

    if (currentLineIndex >= TERMINAL_CONTENT.length) {
      setIsWaitingReset(true);
      return;
    }

    const currentLine = TERMINAL_CONTENT[currentLineIndex];

    if (currentLine.type === 'blank') {
      setDisplayedLines((prev) => [...prev, { type: 'blank', text: '' }]);
      setCurrentLineIndex((prev) => prev + 1);
      setCurrentCharIndex(0);
      return;
    }

    const typingSpeed = currentLine.type === 'command' ? 60 : 30;

    const timer = setTimeout(() => {
      if (currentCharIndex < currentLine.text.length) {
        const nextChar = currentLine.text[currentCharIndex];
        setDisplayedLines((prev) => {
          const newLines = [...prev];
          if (!newLines[currentLineIndex]) {
            newLines[currentLineIndex] = { type: currentLine.type, text: nextChar };
          } else {
            newLines[currentLineIndex] = {
              ...newLines[currentLineIndex],
              text: newLines[currentLineIndex].text + nextChar,
            };
          }
          return newLines;
        });
        setCurrentCharIndex((prev) => prev + 1);
      } else {
        // Line complete, jump to next line
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentLineIndex, currentCharIndex, isWaitingReset]);

  return (
    <div className="bg-[#1D1E20] text-[#FAFAF8] rounded-xl overflow-hidden shadow-md font-mono text-xs sm:text-sm border border-[#202124]/20 flex flex-col h-full min-h-[300px]">
      {/* Terminal Top Bar */}
      <div className="bg-[#2B2C30] px-4 py-3 flex items-center justify-between border-b border-[#383A3E]">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
        </div>
        <div className="text-[11px] text-[#9A9C9E] font-medium tracking-wide">
          aryan@dev-terminal:~
        </div>
        <div className="flex items-center gap-1.5 text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-full border border-emerald-800/40">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>LIVE</span>
        </div>
      </div>

      {/* Terminal Screen Output */}
      <div className="p-5 flex-1 space-y-1.5 overflow-y-auto font-mono text-[#E4E3E0]">
        {displayedLines.map((line, idx) => {
          if (line.type === 'blank') {
            return <div key={idx} className="h-3" />;
          }
          if (line.type === 'command') {
            return (
              <div key={idx} className="text-emerald-400 font-bold flex items-center gap-1">
                <span>{line.text}</span>
              </div>
            );
          }
          return (
            <div key={idx} className="text-[#CFCECA] pl-4 border-l-2 border-[#383A3E]">
              {line.text}
            </div>
          );
        })}

        {/* Blinking Cursor */}
        {!isWaitingReset && (
          <span className="inline-block w-2 h-4 bg-emerald-400 ml-1 translate-y-0.5 animate-pulse" />
        )}
      </div>
    </div>
  );
};

export const Insights: React.FC = () => {
  const techStack = [
    { name: 'HTML', icon: FileCode, bg: 'bg-orange-500/10 text-orange-600 border-orange-200 dark:border-orange-900/50 dark:text-orange-400' },
    { name: 'CSS', icon: Palette, bg: 'bg-blue-500/10 text-blue-600 border-blue-200 dark:border-blue-900/50 dark:text-blue-400' },
    { name: 'JavaScript', icon: Code2, bg: 'bg-amber-500/10 text-amber-600 border-amber-200 dark:border-amber-900/50 dark:text-amber-400' },
    { name: 'Python', icon: Terminal, bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900/50 dark:text-emerald-400' },
    { name: 'Git', icon: GitBranch, bg: 'bg-red-500/10 text-red-600 border-red-200 dark:border-red-900/50 dark:text-red-400' },
    { name: 'GitHub', icon: Github, bg: 'bg-zinc-800/10 text-zinc-800 border-zinc-300 dark:border-zinc-700 dark:text-zinc-200' },
    { name: 'VS Code', icon: Laptop, bg: 'bg-sky-500/10 text-sky-600 border-sky-200 dark:border-sky-900/50 dark:text-sky-400' },
    { name: 'Figma', icon: Layout, bg: 'bg-purple-500/10 text-purple-600 border-purple-200 dark:border-purple-900/50 dark:text-purple-400' },
    { name: 'AI Tools', icon: Sparkles, bg: 'bg-violet-500/10 text-violet-600 border-violet-200 dark:border-violet-900/50 dark:text-violet-400' },
  ];

  const workingOnTasks = [
    { title: 'Learning Data Structures', progress: 85, color: 'bg-emerald-600' },
    { title: 'Building Full Responsive Websites', progress: 95, color: 'bg-[#202124] dark:bg-[#FAFAF8]' },
    { title: 'Exploring AI Development', progress: 80, color: 'bg-violet-600' },
    { title: 'Improving Problem Solving', progress: 90, color: 'bg-blue-600' },
    { title: 'Preparing for Internship Opportunities', progress: 100, color: 'bg-amber-600' },
  ];

  const stats = [
    { label: 'Projects Built', value: 8, suffix: '+', icon: FolderGit2 },
    { label: 'Certificates', value: 5, suffix: '+', icon: Award },
    { label: 'Techfest CA Points', value: 200, suffix: '+', icon: Trophy },
    { label: 'GitHub Repositories', value: 10, suffix: '+', icon: Zap },
  ];

  return (
    <section id="insights" className="scroll-mt-20 sm:scroll-mt-24 py-24 bg-[#F4F3F0] dark:bg-[#121315] relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-xs font-semibold uppercase tracking-widest text-[#6B6D70] dark:text-[#A0A2A5]">
                06 / DEVELOPER HUB
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#202124] dark:text-[#FAFAF8] tracking-tight font-display mb-3">
              Developer Hub
            </h2>
            <p className="text-sm sm:text-base text-[#6B6D70] dark:text-[#A0A2A5] leading-relaxed">
              A quick overview of what I'm building, learning, and exploring.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-2 bg-[#FAFAF8] dark:bg-[#1C1D21] px-4 py-2 rounded-full border border-[#202124]/10 dark:border-white/10 text-xs font-semibold text-[#202124] dark:text-[#FAFAF8] shadow-2xs">
            <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 animate-pulse" />
            <span>Interactive Developer Dashboard</span>
          </div>
        </motion.div>

        {/* 2x2 Grid of Premium Glassmorphism Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Card 1: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5 }}
            className="bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md rounded-2xl border border-[#202124]/10 dark:border-white/10 p-6 sm:p-8 shadow-xs hover:border-[#202124]/30 dark:hover:border-white/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#202124]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display">
                      Tech Stack
                    </h3>
                    <p className="text-xs text-[#6B6D70] dark:text-[#A0A2A5]">Tools & Technologies I use</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F4F3F0] dark:bg-[#2C2E33] text-[#6B6D70] dark:text-[#A0A2A5] border border-[#202124]/10 dark:border-white/10">
                  9 Core Tools
                </span>
              </div>

              {/* Badges Grid */}
              <div className="flex flex-wrap gap-3">
                {techStack.map((tech) => {
                  const IconComp = tech.icon;
                  return (
                    <motion.div
                      key={tech.name}
                      whileHover={{ scale: 1.06, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border ${tech.bg} shadow-2xs cursor-pointer transition-all duration-200`}
                    >
                      <IconComp className="w-4 h-4" />
                      <span>{tech.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#202124]/5 dark:border-white/5 flex items-center justify-between text-xs text-[#6B6D70] dark:text-[#A0A2A5]">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                Continuously Expanding Stack
              </span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B8D88] dark:text-[#A0A2A5]">
                SKILLS & TOOLS
              </span>
            </div>
          </motion.div>

          {/* Card 2: Currently Working On */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md rounded-2xl border border-[#202124]/10 dark:border-white/10 p-6 sm:p-8 shadow-xs hover:border-[#202124]/30 dark:hover:border-white/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#202124]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Rocket className="w-5 h-5 text-amber-400 dark:text-amber-500" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display">
                      Currently Working On
                    </h3>
                    <p className="text-xs text-[#6B6D70] dark:text-[#A0A2A5]">Active goals & learning path</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  IN PROGRESS
                </span>
              </div>

              {/* Tasks with Progress Bars */}
              <div className="space-y-4">
                {workingOnTasks.map((task, idx) => (
                  <div key={task.title} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold text-[#202124] dark:text-[#FAFAF8]">
                      <span className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#202124] dark:bg-[#FAFAF8]" />
                        {task.title}
                      </span>
                      <span className="font-mono text-[11px] text-[#6B6D70] dark:text-[#A0A2A5]">{task.progress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E9E8E4] dark:bg-[#2C2E33] overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${task.progress}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.1 * idx, ease: 'easeOut' }}
                        className={`h-full rounded-full ${task.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#202124]/5 dark:border-white/5 flex items-center justify-between text-xs text-[#6B6D70] dark:text-[#A0A2A5]">
              <span>Active Daily Dedication</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B8D88] dark:text-[#A0A2A5]">
                ROADMAP 2026
              </span>
            </div>
          </motion.div>

          {/* Card 3: Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md rounded-2xl border border-[#202124]/10 dark:border-white/10 p-6 sm:p-8 shadow-xs hover:border-[#202124]/30 dark:hover:border-white/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#202124]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <BarChart3 className="w-5 h-5 text-sky-400 dark:text-sky-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display">
                      Quick Stats
                    </h3>
                    <p className="text-xs text-[#6B6D70] dark:text-[#A0A2A5]">Key achievements at a glance</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F4F3F0] dark:bg-[#2C2E33] text-[#6B6D70] dark:text-[#A0A2A5] border border-[#202124]/10 dark:border-white/10">
                  REAL NUMBERS
                </span>
              </div>

              {/* Stats Grid 2x2 */}
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat) => {
                  const StatIcon = stat.icon;
                  return (
                    <div
                      key={stat.label}
                      className="bg-[#F4F3F0] dark:bg-[#121315] p-4 sm:p-5 rounded-xl border border-[#202124]/5 dark:border-white/5 hover:border-[#202124]/20 dark:hover:border-white/20 transition-all duration-200 relative overflow-hidden group/stat"
                    >
                      <div className="flex items-center justify-between text-[#6B6D70] dark:text-[#A0A2A5] mb-2">
                        <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
                          {stat.label}
                        </span>
                        <StatIcon className="w-4 h-4 text-[#202124] dark:text-[#FAFAF8] group-hover/stat:scale-110 transition-transform" />
                      </div>
                      <div className="text-2xl sm:text-3xl font-extrabold text-[#202124] dark:text-[#FAFAF8] font-display tracking-tight">
                        <CountUp end={stat.value} suffix={stat.suffix} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#202124]/5 dark:border-white/5 flex items-center justify-between text-xs text-[#6B6D70] dark:text-[#A0A2A5]">
              <span>Verified Experience Data</span>
              <span className="font-mono text-[10px] uppercase tracking-wider text-[#8B8D88] dark:text-[#A0A2A5]">
                METRICS
              </span>
            </div>
          </motion.div>

          {/* Card 4: Developer Terminal */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-[#FAFAF8]/90 dark:bg-[#1C1D21]/90 backdrop-blur-md rounded-2xl border border-[#202124]/10 dark:border-white/10 p-6 sm:p-8 shadow-xs hover:border-[#202124]/30 dark:hover:border-white/30 hover:shadow-lg transition-all duration-300 flex flex-col justify-between group"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#202124]/10 dark:border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
                    <Terminal className="w-5 h-5 text-emerald-400 dark:text-emerald-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#202124] dark:text-[#FAFAF8] font-display">
                      Developer Terminal
                    </h3>
                    <p className="text-xs text-[#6B6D70] dark:text-[#A0A2A5]">Live CLI typewriter animation</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full bg-[#F4F3F0] dark:bg-[#2C2E33] text-[#6B6D70] dark:text-[#A0A2A5] border border-[#202124]/10 dark:border-white/10">
                  SHELL SESSION
                </span>
              </div>

              {/* Realistic Animated Terminal */}
              <div className="flex-1 min-h-[280px]">
                <TerminalWindow />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
