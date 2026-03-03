'use client';

import { useState, useMemo } from 'react';
import GameProvider, { useGame } from '@/components/GameProvider';
import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import LevelMap from '@/components/LevelMap';
import LessonCard from '@/components/LessonCard';
import QuizChallenge from '@/components/QuizChallenge';
import PromptChallenge from '@/components/PromptChallenge';
import LevelComplete from '@/components/LevelComplete';
import CosmicCTA from '@/components/CosmicCTA';
import AchievementBadge from '@/components/AchievementBadge';
import { GAME_LEVELS, ACHIEVEMENTS, getCurrentLevelData } from '@/lib/game-data';

function GameContent() {
  const { state, dispatch, setPhase } = useGame();
  const [lessonIndex, setLessonIndex] = useState(0);
  const [showMenu, setShowMenu] = useState(true);
  const [showAchievements, setShowAchievements] = useState(false);

  const currentLevelData = useMemo(() => getCurrentLevelData(state.currentLevel), [state.currentLevel]);
  const totalLessons = GAME_LEVELS.reduce((acc, l) => acc + l.lessons.length, 0);

  // Game complete screen
  if (state.gamePhase === 'game-complete') {
    return <CosmicCTA />;
  }

  // Level complete celebration
  if (state.showLevelComplete && currentLevelData) {
    return <LevelComplete level={currentLevelData} />;
  }

  // Check if current level is fully completed
  const checkLevelComplete = () => {
    if (!currentLevelData) return;

    const allLessonsComplete = currentLevelData.lessons.every(l =>
      state.completedLessons.includes(l.id)
    );
    const allQuizzesComplete = currentLevelData.quizzes.every(q =>
      state.completedQuizzes.includes(q.id)
    );
    const allChallengesComplete = currentLevelData.challenges.every(c =>
      state.completedChallenges.includes(c.id)
    );

    if (allLessonsComplete && allQuizzesComplete && allChallengesComplete) {
      if (state.currentLevel === GAME_LEVELS.length) {
        dispatch({ type: 'GAME_COMPLETE' });
      } else {
        dispatch({ type: 'LEVEL_COMPLETE' });
      }
    }
  };

  // Handle lesson completion and move to next phase
  const handleLessonComplete = () => {
    if (!currentLevelData) return;

    if (lessonIndex < currentLevelData.lessons.length - 1) {
      setLessonIndex(prev => prev + 1);
    } else {
      // Move to quiz phase
      if (currentLevelData.quizzes.length > 0) {
        setPhase('quiz');
      } else if (currentLevelData.challenges.length > 0) {
        setPhase('challenge');
      } else {
        checkLevelComplete();
        setShowMenu(true);
        setPhase('menu');
      }
    }
  };

  const handleQuizComplete = () => {
    if (!currentLevelData) return;

    if (currentLevelData.challenges.length > 0) {
      setPhase('challenge');
    } else {
      checkLevelComplete();
      setShowMenu(true);
      setPhase('menu');
    }
  };

  const handleChallengeComplete = () => {
    checkLevelComplete();
    setShowMenu(true);
    setPhase('menu');
  };

  // When selecting a level from the map
  if (state.gamePhase === 'lesson' && currentLevelData && !showMenu) {
    const currentLesson = currentLevelData.lessons[lessonIndex];
    if (currentLesson) {
      return (
        <div className="min-h-screen bg-dark-950">
          <Navigation />
          <div className="py-8 px-4">
            <button
              onClick={() => {
                setShowMenu(true);
                setPhase('menu');
              }}
              className="mb-6 ml-4 text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1 max-w-7xl mx-auto"
            >
              ← Back to Levels
            </button>
            <LessonCard lesson={currentLesson} onComplete={handleLessonComplete} />
          </div>
        </div>
      );
    }
  }

  if (state.gamePhase === 'quiz' && currentLevelData) {
    return (
      <div className="min-h-screen bg-dark-950">
        <Navigation />
        <div className="py-8 px-4">
          <button
            onClick={() => {
              setShowMenu(true);
              setPhase('menu');
            }}
            className="mb-6 ml-4 text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1 max-w-7xl mx-auto"
          >
            ← Back to Levels
          </button>
          <QuizChallenge quizzes={currentLevelData.quizzes} onComplete={handleQuizComplete} />
        </div>
      </div>
    );
  }

  if (state.gamePhase === 'challenge' && currentLevelData) {
    const challenge = currentLevelData.challenges[0];
    if (challenge) {
      return (
        <div className="min-h-screen bg-dark-950">
          <Navigation />
          <div className="py-8 px-4">
            <button
              onClick={() => {
                setShowMenu(true);
                setPhase('menu');
              }}
              className="mb-6 ml-4 text-sm text-dark-400 hover:text-white transition-colors flex items-center gap-1 max-w-7xl mx-auto"
            >
              ← Back to Levels
            </button>
            <PromptChallenge challenge={challenge} onComplete={handleChallengeComplete} />
          </div>
        </div>
      );
    }
  }

  // Main menu / level map
  return (
    <div className="min-h-screen bg-dark-950">
      <Navigation />

      <HeroSection
        totalXP={state.totalXP}
        completedLessons={state.completedLessons.length}
        totalLessons={totalLessons}
        onStartGame={() => {
          setShowMenu(false);
          setLessonIndex(0);
          setPhase('lesson');
        }}
      />

      <LevelMap />

      {/* Achievements Section */}
      <section className="max-w-5xl mx-auto px-4 py-12">
        <button
          onClick={() => setShowAchievements(!showAchievements)}
          className="w-full flex items-center justify-between mb-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-white">🏆 Achievements</h2>
            <p className="text-sm text-dark-400">
              {state.unlockedAchievements.length}/{ACHIEVEMENTS.length} unlocked
            </p>
          </div>
          <span className="text-dark-400 text-xl">{showAchievements ? '▲' : '▼'}</span>
        </button>

        {showAchievements && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {ACHIEVEMENTS.map((achievement, idx) => (
              <AchievementBadge
                key={achievement.id}
                achievement={achievement}
                unlocked={state.unlockedAchievements.includes(achievement.id)}
                index={idx}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 py-8 border-t border-dark-800/50">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎓</span>
            <span className="text-sm text-dark-400">Claude Skills Academy</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://www.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-dark-500 hover:text-dark-300 transition-colors"
            >
              Powered by Claude
            </a>
            <span className="text-dark-700">•</span>
            <a
              href="https://www.cosmicjs.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-dark-500 hover:text-dark-300 transition-colors"
            >
              Built with Cosmic
            </a>
          </div>
          <button
            onClick={() => {
              if (confirm('This will reset all your progress. Are you sure?')) {
                dispatch({ type: 'RESET_GAME' });
              }
            }}
            className="text-xs text-dark-600 hover:text-red-400 transition-colors"
          >
            Reset Progress
          </button>
        </div>
      </footer>
    </div>
  );
}

export default function GameApp() {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}