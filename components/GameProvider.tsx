'use client';

import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import type { GameState, GameAction, GamePhase } from '@/types';
import { checkAchievements } from '@/lib/game-data';

const STORAGE_KEY = 'claude-skills-academy-state';

const initialState: GameState = {
  currentLevel: 1,
  currentLessonIndex: 0,
  totalXP: 0,
  completedLessons: [],
  completedQuizzes: [],
  completedChallenges: [],
  unlockedAchievements: [],
  gamePhase: 'menu',
  showLevelComplete: false,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return { ...state, gamePhase: 'menu' };

    case 'SELECT_LEVEL':
      return { ...state, currentLevel: action.level, currentLessonIndex: 0, gamePhase: 'lesson' };

    case 'START_LESSON':
      return { ...state, gamePhase: 'lesson' };

    case 'COMPLETE_LESSON': {
      const newCompleted = state.completedLessons.includes(action.lessonId)
        ? state.completedLessons
        : [...state.completedLessons, action.lessonId];
      const xpToAdd = state.completedLessons.includes(action.lessonId) ? 0 : action.xp;
      return {
        ...state,
        completedLessons: newCompleted,
        totalXP: state.totalXP + xpToAdd,
      };
    }

    case 'COMPLETE_QUIZ': {
      const newCompleted = state.completedQuizzes.includes(action.quizId)
        ? state.completedQuizzes
        : [...state.completedQuizzes, action.quizId];
      const xpToAdd = state.completedQuizzes.includes(action.quizId) ? 0 : action.xp;
      return {
        ...state,
        completedQuizzes: newCompleted,
        totalXP: state.totalXP + xpToAdd,
      };
    }

    case 'COMPLETE_CHALLENGE': {
      const newCompleted = state.completedChallenges.includes(action.challengeId)
        ? state.completedChallenges
        : [...state.completedChallenges, action.challengeId];
      const xpToAdd = state.completedChallenges.includes(action.challengeId) ? 0 : action.xp;
      return {
        ...state,
        completedChallenges: newCompleted,
        totalXP: state.totalXP + xpToAdd,
      };
    }

    case 'UNLOCK_ACHIEVEMENT':
      if (state.unlockedAchievements.includes(action.achievementId)) return state;
      return {
        ...state,
        unlockedAchievements: [...state.unlockedAchievements, action.achievementId],
      };

    case 'NEXT_PHASE':
      return { ...state, gamePhase: action.phase };

    case 'LEVEL_COMPLETE':
      return { ...state, showLevelComplete: true };

    case 'DISMISS_LEVEL_COMPLETE':
      return { ...state, showLevelComplete: false, gamePhase: 'menu' };

    case 'GAME_COMPLETE':
      return { ...state, gamePhase: 'game-complete' };

    case 'RESET_GAME':
      return { ...initialState };

    default:
      return state;
  }
}

interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
  completeLesson: (lessonId: string, xp: number) => void;
  completeQuiz: (quizId: string, xp: number) => void;
  completeChallenge: (challengeId: string, xp: number) => void;
  setPhase: (phase: GamePhase) => void;
}

const GameContext = createContext<GameContextValue | null>(null);

export function useGame(): GameContextValue {
  const ctx = useContext(GameContext);
  if (!ctx) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return ctx;
}

function loadState(): GameState {
  if (typeof window === 'undefined') return initialState;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<GameState>;
      return { ...initialState, ...parsed, gamePhase: 'menu', showLevelComplete: false };
    }
  } catch {
    // ignore
  }
  return initialState;
}

function saveState(state: GameState) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export default function GameProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState, loadState);

  useEffect(() => {
    saveState(state);
  }, [state]);

  // Check achievements whenever state changes
  useEffect(() => {
    const newAchievements = checkAchievements({
      totalXP: state.totalXP,
      completedLessons: state.completedLessons,
      completedQuizzes: state.completedQuizzes,
      completedChallenges: state.completedChallenges,
      currentLevel: state.currentLevel,
      unlockedAchievements: state.unlockedAchievements,
    });

    for (const achId of newAchievements) {
      dispatch({ type: 'UNLOCK_ACHIEVEMENT', achievementId: achId });
    }
  }, [state.totalXP, state.completedLessons, state.completedQuizzes, state.completedChallenges, state.currentLevel, state.unlockedAchievements]);

  const completeLesson = useCallback((lessonId: string, xp: number) => {
    dispatch({ type: 'COMPLETE_LESSON', lessonId, xp });
  }, []);

  const completeQuiz = useCallback((quizId: string, xp: number) => {
    dispatch({ type: 'COMPLETE_QUIZ', quizId, xp });
  }, []);

  const completeChallenge = useCallback((challengeId: string, xp: number) => {
    dispatch({ type: 'COMPLETE_CHALLENGE', challengeId, xp });
  }, []);

  const setPhase = useCallback((phase: GamePhase) => {
    dispatch({ type: 'NEXT_PHASE', phase });
  }, []);

  return (
    <GameContext.Provider value={{ state, dispatch, completeLesson, completeQuiz, completeChallenge, setPhase }}>
      {children}
    </GameContext.Provider>
  );
}