'use client';

import { useGame } from '@/components/GameProvider';
import XPCounter from '@/components/XPCounter';

export default function Navigation() {
  const { state, dispatch } = useGame();

  const handleHome = () => {
    dispatch({ type: 'NEXT_PHASE', phase: 'menu' });
  };

  return (
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-dark-950/80 border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <span className="text-2xl">🎓</span>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Claude Skills Academy</h1>
              <p className="text-xs text-dark-400 leading-tight hidden sm:block">Master Claude AI</p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <XPCounter xp={state.totalXP} />
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-dark-800/80 rounded-lg border border-dark-700/50">
              <span className="text-sm text-dark-400">Level</span>
              <span className="text-sm font-bold text-primary-400">{state.currentLevel}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-dark-800/80 rounded-lg border border-dark-700/50">
              <span className="text-sm">🏆</span>
              <span className="text-sm font-bold text-amber-400">{state.unlockedAchievements.length}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}