'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Changed: Use Quiz type directly instead of non-existent QuizQuestion
import type { Quiz } from '@/types';
import { useGame } from '@/components/GameProvider';

interface QuizChallengeProps {
  quizzes: Quiz[];
  onComplete: () => void;
}

export default function QuizChallenge({ quizzes, onComplete }: QuizChallengeProps) {
  const { completeQuiz } = useGame();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuiz = quizzes[currentIndex];

  if (!currentQuiz) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <p className="text-dark-400">No quiz questions available.</p>
        <button onClick={onComplete} className="mt-4 px-6 py-3 bg-dark-900 rounded-xl text-white font-semibold">
          Continue →
        </button>
      </div>
    );
  }

  const handleSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    const isCorrect = answerIndex === currentQuiz.correctAnswer;
    if (isCorrect) {
      completeQuiz(currentQuiz.id, currentQuiz.xpReward);
      setCorrectCount(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizzes.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      onComplete();
    }
  };

  const isCorrect = selectedAnswer === currentQuiz.correctAnswer;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      {/* Changed: White card with warm Anthropic styling */}
      <div className="bg-white rounded-2xl border border-anthro-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-anthro-200">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary-600 uppercase tracking-wide">
              🧠 Quiz — Question {currentIndex + 1} of {quizzes.length}
            </span>
            <span className="text-xs text-dark-400">
              {correctCount}/{currentIndex + (selectedAnswer !== null ? 1 : 0)} correct
            </span>
          </div>
          <div className="w-full h-1.5 bg-anthro-100 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary-400 to-primary-600 rounded-full"
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-dark-900 mb-6">{currentQuiz.question}</h3>

          <div className="space-y-3">
            {currentQuiz.options.map((option, idx) => {
              // Changed: Warm Anthropic option styles
              let optionStyle = 'bg-anthro-50 border-anthro-200 hover:border-primary-300 hover:bg-anthro-100';

              if (selectedAnswer !== null) {
                if (idx === currentQuiz.correctAnswer) {
                  optionStyle = 'bg-green-50 border-green-300';
                } else if (idx === selectedAnswer && !isCorrect) {
                  optionStyle = 'bg-red-50 border-red-300';
                } else {
                  optionStyle = 'bg-anthro-50/50 border-anthro-200/50 opacity-50';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  disabled={selectedAnswer !== null}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${optionStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`
                      w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold
                      ${selectedAnswer !== null && idx === currentQuiz.correctAnswer
                        ? 'bg-green-500 text-white'
                        : selectedAnswer === idx && !isCorrect
                          ? 'bg-red-500 text-white'
                          : 'bg-anthro-200 text-dark-500'
                      }
                    `}>
                      {selectedAnswer !== null && idx === currentQuiz.correctAnswer
                        ? '✓'
                        : selectedAnswer === idx && !isCorrect
                          ? '✗'
                          : String.fromCharCode(65 + idx)
                      }
                    </span>
                    <span className="text-sm text-dark-700">{option}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-6 pb-6"
            >
              <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-amber-50 border border-amber-200'}`}>
                <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-green-700' : 'text-amber-700'}`}>
                  {isCorrect ? '🎉 Correct!' : '💡 Not quite — here\'s why:'}
                  {isCorrect && ` +${currentQuiz.xpReward} XP`}
                </p>
                <p className="text-sm text-dark-600">{currentQuiz.explanation}</p>
              </div>

              {/* Changed: Anthropic dark CTA */}
              <button
                onClick={handleNext}
                className="w-full mt-4 py-3 bg-dark-900 rounded-xl text-white font-semibold hover:bg-dark-800 transition-all duration-300"
              >
                {currentIndex < quizzes.length - 1 ? 'Next Question →' : 'Finish Quiz →'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}