import React, { useEffect } from 'react';
import { motion } from 'motion/react';

interface LoadingScreenProps {
  onFinish: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 1200);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#F4F3F0] dark:bg-[#121315] text-[#202124] dark:text-[#FAFAF8] select-none"
    >
      <div className="relative flex flex-col items-center gap-4">
        {/* Minimal Animated Logo Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative w-16 h-16 rounded-2xl bg-[#202124] dark:bg-[#FAFAF8] text-[#FAFAF8] dark:text-[#202124] flex items-center justify-center font-bold font-display text-2xl shadow-xl overflow-hidden"
        >
          <span>A</span>
          {/* Subtle Green Accent Corner Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
            className="absolute bottom-0 left-0 h-1 bg-emerald-500"
          />
        </motion.div>

        {/* Brand Name with Subtle Status Dot */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-2 font-display font-bold text-lg tracking-tight"
        >
          <span>Aryan</span>
          <span className="font-normal text-[#6B6D70] dark:text-[#A0A2A5]">Portfolio</span>
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping ml-0.5" />
        </motion.div>

        {/* Minimal Progress Line */}
        <div className="w-36 h-1 bg-[#202124]/10 dark:bg-white/10 rounded-full overflow-hidden mt-1">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '0%' }}
            transition={{ duration: 1, ease: 'easeInOut' }}
            className="w-full h-full bg-emerald-500 rounded-full"
          />
        </div>
      </div>
    </motion.div>
  );
};
