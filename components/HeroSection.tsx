'use client';

import { motion } from 'framer-motion';

interface HeroSectionProps {
  totalXP: number;
  completedLessons: number;
  totalLessons: number;
  onStartGame: () => void;
}

export default function HeroSection({ totalXP, completedLessons, totalLessons, onStartGame }: HeroSectionProps) {
  const isReturning = completedLessons > 0;

  return (
    <section className="relative py-16 sm:py-24 overflow-hidden">
      {/* Changed: Warm Anthropic background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-accent-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Changed: Anthropic-style minimal icon */}
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-dark-900 flex items-center justify-center shadow-lg">
            <span className="text-4xl">✦</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-black mb-4 tracking-tight">
            {/* Changed: Warm gradient text */}
            <span className="gradient-text">Claude Skills</span>
            <br />
            <span className="text-dark-900">Academy</span>
          </h1>
          <p className="text-lg sm:text-xl text-dark-500 max-w-2xl mx-auto mb-8">
            Master Claude AI through interactive lessons, hands-on challenges, and real-world exercises.
            {isReturning ? ' Welcome back! Pick up where you left off.' : ' From beginner to expert in 4 levels.'}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {/* Changed: Warm Anthropic pill badges */}
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-anthro-200 shadow-sm">
            <span>📚</span>
            <span className="text-sm text-dark-600">{totalLessons} Lessons</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-anthro-200 shadow-sm">
            <span>⚡</span>
            <span className="text-sm text-dark-600">4 Levels</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-anthro-200 shadow-sm">
            <span>🏆</span>
            <span className="text-sm text-dark-600">12 Achievements</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          {/* Changed: Anthropic dark CTA button */}
          <button
            onClick={onStartGame}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-dark-900 rounded-2xl text-white font-bold text-lg shadow-lg hover:bg-dark-800 hover:scale-105 transition-all duration-300"
          >
            <span>{isReturning ? 'Continue Learning' : 'Start Academy'}</span>
            <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
          </button>
          {isReturning && (
            <p className="mt-4 text-sm text-dark-400">
              {completedLessons}/{totalLessons} lessons completed • {totalXP} XP earned
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}