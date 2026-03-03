'use client';

import { motion } from 'framer-motion';
import { GAME_LEVELS, getAvailableLevels } from '@/lib/game-data';
import { useGame } from '@/components/GameProvider';
import ProgressBar from '@/components/ProgressBar';

export default function LevelMap() {
  const { state, dispatch } = useGame();
  const availableLevels = getAvailableLevels(state.totalXP);

  const handleSelectLevel = (levelId: number) => {
    if (!availableLevels.includes(levelId)) return;
    dispatch({ type: 'SELECT_LEVEL', level: levelId });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Choose Your Level</h2>
        <p className="text-dark-400">Complete lessons, quizzes, and challenges to earn XP and unlock new levels</p>
      </div>

      <div className="space-y-4">
        {GAME_LEVELS.map((level, index) => {
          const isUnlocked = availableLevels.includes(level.id);
          const isCurrentLevel = state.currentLevel === level.id;

          const totalItems = level.lessons.length + level.quizzes.length + level.challenges.length;
          const completedItems =
            level.lessons.filter(l => state.completedLessons.includes(l.id)).length +
            level.quizzes.filter(q => state.completedQuizzes.includes(q.id)).length +
            level.challenges.filter(c => state.completedChallenges.includes(c.id)).length;
          const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0;

          return (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
            >
              <button
                onClick={() => handleSelectLevel(level.id)}
                disabled={!isUnlocked}
                className={`
                  w-full text-left p-6 rounded-2xl border transition-all duration-300
                  ${isUnlocked
                    ? isCurrentLevel
                      ? 'bg-gradient-to-r from-primary-900/50 to-dark-800 border-primary-500/40 card-glow'
                      : 'bg-dark-800/60 border-dark-700/40 hover:border-primary-600/30 hover:bg-dark-800/80'
                    : 'bg-dark-900/40 border-dark-800/30 opacity-50 cursor-not-allowed'
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <div className={`
                    flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-2xl
                    ${isUnlocked
                      ? `bg-gradient-to-br ${level.color} shadow-lg`
                      : 'bg-dark-700'
                    }
                  `}>
                    {isUnlocked ? level.icon : '🔒'}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-bold text-white">
                        Level {level.id}: {level.name}
                      </h3>
                      {progress === 100 && (
                        <span className="px-2 py-0.5 text-xs font-semibold bg-green-500/20 text-green-400 rounded-full">
                          ✓ Complete
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-dark-400 mb-3">{level.description}</p>

                    <div className="flex items-center gap-6 mb-3">
                      <span className="text-xs text-dark-400">📚 {level.lessons.length} lessons</span>
                      <span className="text-xs text-dark-400">❓ {level.quizzes.length} quizzes</span>
                      <span className="text-xs text-dark-400">✍️ {level.challenges.length} challenge</span>
                      {!isUnlocked && (
                        <span className="text-xs text-amber-400">🔒 Requires {level.requiredXP} XP</span>
                      )}
                    </div>

                    {isUnlocked && (
                      <ProgressBar
                        progress={progress}
                        color={`${level.color.replace('from-', 'from-').replace('to-', 'to-')}`}
                        showLabel
                        label="Progress"
                      />
                    )}
                  </div>

                  {isUnlocked && (
                    <div className="flex-shrink-0 self-center">
                      <span className="text-dark-400 text-xl">→</span>
                    </div>
                  )}
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}