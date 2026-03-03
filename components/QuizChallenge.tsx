'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { QuizQuestion } from '@/types';
import { useGame } from '@/components/GameProvider';

interface QuizChallengeProps {
  quizzes: QuizQuestion[];
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
        <button onClick={onComplete} className="mt-4 px-6 py-3 bg-primary-600 rounded-xl text-white font-semibold">
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
      <div className="bg-dark-800/60 rounded-2xl border border-dark-700/40 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-dark-700/40">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-primary-400 uppercase tracking-wide">
              🧠 Quiz — Question {currentIndex + 1} of {quizzes.length}
            </span>
            <span className="text-xs text-dark-400">
              {correctCount}/{currentIndex + (selectedAnswer !== null ? 1 : 0)} correct
            </span>
          </div>
          <div className="w-full h-1.5 bg-dark-700 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((currentIndex + 1) / quizzes.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
            />
          </div>
        </div>

        {/* Question */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-white mb-6">{currentQuiz.question}</h3>

          <div className="space-y-3">
            {currentQuiz.options.map((option, idx) => {
              let optionStyle = 'bg-dark-700/50 border-dark-600/40 hover:border-primary-500/40 hover:bg-dark-700';

              if (selectedAnswer !== null) {
                if (idx === currentQuiz.correctAnswer) {
                  optionStyle = 'bg-green-900/30 border-green-500/40';
                } else if (idx === selectedAnswer && !isCorrect) {
                  optionStyle = 'bg-red-900/30 border-red-500/40';
                } else {
                  optionStyle = 'bg-dark-700/30 border-dark-600/20 opacity-50';
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
                          : 'bg-dark-600 text-dark-300'
                      }
                    `}>
                      {selectedAnswer !== null && idx === currentQuiz.correctAnswer
                        ? '✓'
                        : selectedAnswer === idx && !isCorrect
                          ? '✗'
                          : String.fromCharCode(65 + idx)
                      }
                    </span>
                    <span className="text-sm text-dark-200">{option}</span>
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
              <div className={`p-4 rounded-xl ${isCorrect ? 'bg-green-900/20 border border-green-500/20' : 'bg-amber-900/20 border border-amber-500/20'}`}>
                <p className={`text-sm font-semibold mb-1 ${isCorrect ? 'text-green-400' : 'text-amber-400'}`}>
                  {isCorrect ? '🎉 Correct!' : '💡 Not quite — here\'s why:'}
                  {isCorrect && ` +${currentQuiz.xpReward} XP`}
                </p>
                <p className="text-sm text-dark-300">{currentQuiz.explanation}</p>
              </div>

              <button
                onClick={handleNext}
                className="w-full mt-4 py-3 bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-primary-500/25 transition-all duration-300"
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