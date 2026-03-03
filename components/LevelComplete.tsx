'use client';

import { motion } from 'framer-motion';
import type { GameLevel } from '@/types';
import { useGame } from '@/components/GameProvider';
import { GAME_LEVELS } from '@/lib/game-data';

interface LevelCompleteProps {
  level: GameLevel;
}

export default function LevelComplete({ level }: LevelCompleteProps) {
  const { state, dispatch } = useGame();

  const nextLevel = GAME_LEVELS.find(l => l.id === level.id + 1);
  const canAccessNext = nextLevel ? state.totalXP >= nextLevel.requiredXP : false;
  const isLastLevel = level.id === GAME_LEVELS.length;

  const handleContinue = () => {
    if (isLastLevel) {
      dispatch({ type: 'GAME_COMPLETE' });
    } else {
      dispatch({ type: 'DISMISS_LEVEL_COMPLETE' });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-dark-950/90 backdrop-blur-lg p-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="max-w-md w-full bg-dark-800 rounded-2xl border border-primary-500/30 overflow-hidden card-glow"
      >
        <div className="p-8 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 300 }}
            className="text-7xl mb-4"
          >
            🎉
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl font-bold text-white mb-2"
          >
            Level {level.id} Complete!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-dark-400 mb-6"
          >
            You&apos;ve mastered <strong className="text-primary-400">{level.name}</strong>!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-dark-700/50 rounded-xl p-4 mb-6"
          >
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-2xl font-bold text-primary-400">{level.lessons.length}</p>
                <p className="text-xs text-dark-400">Lessons</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent-400">{level.quizzes.length}</p>
                <p className="text-xs text-dark-400">Quizzes</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-orange-400">{level.challenges.length}</p>
                <p className="text-xs text-dark-400">Challenges</p>
              </div>
            </div>
          </motion.div>

          {nextLevel && !canAccessNext && (
            <p className="text-xs text-amber-400 mb-4">
              🔒 You need {nextLevel.requiredXP} XP to unlock Level {nextLevel.id}. Keep completing challenges!
            </p>
          )}

          <button
            onClick={handleContinue}
            className="w-full py-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white font-bold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
          >
            {isLastLevel ? '🎓 Graduate from the Academy!' : 'Continue →'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}