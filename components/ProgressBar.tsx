'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  progress: number; // 0 to 100
  color?: string;
  height?: string;
  showLabel?: boolean;
  label?: string;
}

export default function ProgressBar({
  progress,
  color = 'from-primary-500 to-accent-500',
  height = 'h-2',
  showLabel = false,
  label,
}: ProgressBarProps) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1">
          <span className="text-xs text-dark-400">{label}</span>
          <span className="text-xs font-medium text-dark-300">{Math.round(clampedProgress)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-dark-800 rounded-full overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedProgress}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${color} rounded-full relative`}
        >
          {clampedProgress > 0 && (
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/20 blur-sm" />
          )}
        </motion.div>
      </div>
    </div>
  );
}