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
      // Changed: Warm Anthropic card styling
      className={`
        relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
        ${unlocked
          ? 'bg-white border-primary-300 shadow-sm card-glow'
          : 'bg-anthro-100/50 border-anthro-200/50 opacity-50 grayscale'
        }
      `}
    >
      <span className="text-3xl">{achievement.icon}</span>
      <div className="text-center">
        <p className="text-xs font-semibold text-dark-900">{achievement.title}</p>
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