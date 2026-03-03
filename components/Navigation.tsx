'use client';

import { useGame } from '@/components/GameProvider';
import XPCounter from '@/components/XPCounter';

export default function Navigation() {
  const { state, dispatch } = useGame();

  const handleHome = () => {
    dispatch({ type: 'NEXT_PHASE', phase: 'menu' });
  };

  return (
    // Changed: Warm Anthropic nav - cream bg with warm border
    <nav className="sticky top-0 z-40 backdrop-blur-xl bg-anthro-50/90 border-b border-anthro-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <button
            onClick={handleHome}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            {/* Changed: Anthropic wordmark style */}
            <div className="w-8 h-8 rounded-lg bg-dark-900 flex items-center justify-center">
              <span className="text-white text-sm font-bold">C</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-dark-900 leading-tight">Claude Skills Academy</h1>
              <p className="text-xs text-dark-500 leading-tight hidden sm:block">by Anthropic</p>
            </div>
          </button>

          <div className="flex items-center gap-4">
            <XPCounter xp={state.totalXP} />
            {/* Changed: Warm pill styles */}
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-anthro-100 rounded-lg border border-anthro-200">
              <span className="text-sm text-dark-500">Level</span>
              <span className="text-sm font-bold text-primary-600">{state.currentLevel}</span>
            </div>
            <div className="flex items-center gap-1 px-3 py-1.5 bg-anthro-100 rounded-lg border border-anthro-200">
              <span className="text-sm">🏆</span>
              <span className="text-sm font-bold text-amber-600">{state.unlockedAchievements.length}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}