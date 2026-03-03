export type GamePhase = 'menu' | 'lesson' | 'quiz' | 'challenge' | 'game-complete';

export interface GameState {
  currentLevel: number;
  currentLessonIndex: number;
  totalXP: number;
  completedLessons: string[];
  completedQuizzes: string[];
  completedChallenges: string[];
  unlockedAchievements: string[];
  gamePhase: GamePhase;
  showLevelComplete: boolean;
}

export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'SELECT_LEVEL'; level: number }
  | { type: 'START_LESSON' }
  | { type: 'COMPLETE_LESSON'; lessonId: string; xp: number }
  | { type: 'COMPLETE_QUIZ'; quizId: string; xp: number }
  | { type: 'COMPLETE_CHALLENGE'; challengeId: string; xp: number }
  | { type: 'UNLOCK_ACHIEVEMENT'; achievementId: string }
  | { type: 'NEXT_PHASE'; phase: GamePhase }
  | { type: 'LEVEL_COMPLETE' }
  | { type: 'DISMISS_LEVEL_COMPLETE' }
  | { type: 'GAME_COMPLETE' }
  | { type: 'RESET_GAME' };

export interface Lesson {
  id: string;
  title: string;
  slug: string;
  description: string;
  level: number;
  levelName: string;
  order: number;
  content: string;
  keyTakeaways: string[];
  xpReward: number;
  icon: string;
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  xpReward: number;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  scenario: string;
  hints: string[];
  exampleGoodPrompt: string;
  exampleBadPrompt: string;
  evaluationCriteria: string[];
  xpReward: number;
}

export interface GameLevel {
  id: number;
  name: string;
  description: string;
  icon: string;
  color: string;
  requiredXP: number;
  lessons: Lesson[];
  quizzes: Quiz[];
  challenges: Challenge[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

// Changed: Added type aliases for components that import these names
export type QuizQuestion = Quiz;
export type PromptChallengeData = Challenge;