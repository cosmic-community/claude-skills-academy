'use client';

import { motion } from 'framer-motion';
import type { Achievement } from '@/types';

interface AchievementBadgeProps {
  achievement: Achievement;
  unlocked: boolean;
  index?: number;
}

export default function AchievementBadge({ achievement, unlocked, index = 0 }: AchievementBadgeProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`
        relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
        ${unlocked
          ? 'bg-gradient-to-b from-primary-900/40 to-dark-800/80 border-primary-600/30 card-glow'
          : 'bg-dark-800/40 border-dark-700/30 opacity-50 grayscale'
        }
      `}
    >
      <span className="text-3xl">{achievement.icon}</span>
      <div className="text-center">
        <p className="text-xs font-semibold text-white">{achievement.title}</p>
        <p className="text-[10px] text-dark-400 mt-0.5">{achievement.description}</p>
      </div>
      {unlocked && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center"
        >
          <span className="text-white text-xs">✓</span>
        </motion.div>
      )}
    </motion.div>
  );
}