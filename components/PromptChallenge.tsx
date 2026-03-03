'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Changed: Use Challenge type directly instead of non-existent PromptChallengeData
import type { Challenge } from '@/types';
import { useGame } from '@/components/GameProvider';

interface PromptChallengeProps {
  challenge: Challenge;
  onComplete: () => void;
}

export default function PromptChallenge({ challenge, onComplete }: PromptChallengeProps) {
  const { completeChallenge, state } = useGame();
  const [userPrompt, setUserPrompt] = useState('');
  const [showHints, setShowHints] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [showEvaluation, setShowEvaluation] = useState(false);
  const [criteriaChecked, setCriteriaChecked] = useState<boolean[]>(challenge.evaluationCriteria.map(() => false));

  const isAlreadyCompleted = state.completedChallenges.includes(challenge.id);

  const handleEvaluate = () => {
    if (userPrompt.trim().length < 20) return;
    setShowEvaluation(true);
  };

  const handleToggleCriteria = (index: number) => {
    setCriteriaChecked(prev => {
      const newChecked = [...prev];
      newChecked[index] = !newChecked[index];
      return newChecked;
    });
  };

  const handleComplete = () => {
    const metCriteria = criteriaChecked.filter(Boolean).length;
    const totalCriteria = challenge.evaluationCriteria.length;
    const passedPercentage = (metCriteria / totalCriteria) * 100;

    if (passedPercentage >= 50) {
      const xpMultiplier = passedPercentage / 100;
      const xpEarned = Math.round(challenge.xpReward * xpMultiplier);
      completeChallenge(challenge.id, xpEarned);
    }

    onComplete();
  };

  const passedCount = criteriaChecked.filter(Boolean).length;
  const totalCount = challenge.evaluationCriteria.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      {/* Changed: White card with warm Anthropic styling */}
      <div className="bg-white rounded-2xl border border-anthro-200 overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 border-b border-anthro-200 bg-amber-50/50">
          <span className="text-xs font-medium text-amber-700 uppercase tracking-wide">✍️ Prompt Challenge</span>
          <h2 className="text-2xl font-bold text-dark-900 mt-1">{challenge.title}</h2>
          <p className="text-dark-500 mt-2">{challenge.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-700 rounded-md">⚡ Up to {challenge.xpReward} XP</span>
            {isAlreadyCompleted && (
              <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-md">✓ Previously Completed</span>
            )}
          </div>
        </div>

        {/* Scenario */}
        <div className="p-6 border-b border-anthro-200">
          <h4 className="text-sm font-semibold text-primary-700 uppercase tracking-wide mb-2">📋 Scenario</h4>
          <p className="text-dark-600 bg-anthro-50 p-4 rounded-xl border border-anthro-200">{challenge.scenario}</p>
        </div>

        {/* User Input */}
        <div className="p-6">
          <label className="block text-sm font-semibold text-dark-900 mb-2">Your Prompt:</label>
          {/* Changed: Warm input styling */}
          <textarea
            value={userPrompt}
            onChange={(e) => setUserPrompt(e.target.value)}
            placeholder="Write your prompt here..."
            rows={6}
            className="w-full bg-anthro-50 border border-anthro-200 rounded-xl p-4 text-dark-700 placeholder-dark-400 focus:outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-200 resize-none font-mono text-sm"
          />
          <p className="text-xs text-dark-400 mt-1">{userPrompt.length} characters</p>

          {/* Helpers */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-xs px-3 py-1.5 bg-anthro-50 border border-anthro-200 rounded-lg text-dark-500 hover:text-dark-900 hover:border-primary-300 transition-colors"
            >
              {showHints ? 'Hide Hints' : '💡 Show Hints'}
            </button>
            <button
              onClick={() => setShowExamples(!showExamples)}
              className="text-xs px-3 py-1.5 bg-anthro-50 border border-anthro-200 rounded-lg text-dark-500 hover:text-dark-900 hover:border-primary-300 transition-colors"
            >
              {showExamples ? 'Hide Examples' : '📝 Show Examples'}
            </button>
          </div>

          {/* Hints */}
          <AnimatePresence>
            {showHints && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-blue-700 mb-2">💡 Hints:</h4>
                  <ul className="space-y-1">
                    {challenge.hints.map((hint, idx) => (
                      <li key={idx} className="text-sm text-dark-600 flex items-start gap-2">
                        <span className="text-blue-500 mt-0.5">•</span>{hint}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Examples */}
          <AnimatePresence>
            {showExamples && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 space-y-3"
              >
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-green-700 mb-2">✅ Good Example:</h4>
                  <pre className="text-sm text-dark-600 whitespace-pre-wrap font-mono">{challenge.exampleGoodPrompt}</pre>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <h4 className="text-sm font-semibold text-red-700 mb-2">❌ Bad Example:</h4>
                  <pre className="text-sm text-dark-600 whitespace-pre-wrap font-mono">{challenge.exampleBadPrompt}</pre>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Evaluation */}
        <div className="p-6 border-t border-anthro-200">
          {!showEvaluation ? (
            <button
              onClick={handleEvaluate}
              disabled={userPrompt.trim().length < 20}
              className={`w-full py-3 rounded-xl font-semibold transition-all duration-300 ${
                userPrompt.trim().length >= 20
                  ? 'bg-dark-900 text-white hover:bg-dark-800'
                  : 'bg-anthro-100 text-dark-400 cursor-not-allowed'
              }`}
            >
              {userPrompt.trim().length < 20 ? `Write at least 20 characters (${userPrompt.trim().length}/20)` : 'Self-Evaluate My Prompt'}
            </button>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4 className="text-sm font-semibold text-dark-900 mb-3">📊 Self-Evaluation — Check the criteria your prompt meets:</h4>
              <div className="space-y-2 mb-4">
                {challenge.evaluationCriteria.map((criteria, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleToggleCriteria(idx)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      criteriaChecked[idx]
                        ? 'bg-green-50 border-green-300 text-green-800'
                        : 'bg-anthro-50 border-anthro-200 text-dark-500 hover:border-anthro-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                        criteriaChecked[idx] ? 'bg-green-500 text-white' : 'bg-anthro-200'
                      }`}>
                        {criteriaChecked[idx] ? '✓' : ''}
                      </span>
                      <span className="text-sm">{criteria}</span>
                    </div>
                  </button>
                ))}
              </div>

              <div className="text-center mb-4">
                <p className="text-sm text-dark-500">
                  {passedCount}/{totalCount} criteria met
                  {passedCount >= Math.ceil(totalCount / 2)
                    ? ` — 🎉 Earning ${Math.round(challenge.xpReward * (passedCount / totalCount))} XP!`
                    : ' — Try to meet at least half to earn XP'}
                </p>
              </div>

              <button
                onClick={handleComplete}
                className="w-full py-3 bg-dark-900 rounded-xl text-white font-semibold hover:bg-dark-800 transition-all duration-300"
              >
                Complete Challenge →
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}