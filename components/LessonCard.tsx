'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Lesson } from '@/types';
import { useGame } from '@/components/GameProvider';

interface LessonCardProps {
  lesson: Lesson;
  onComplete: () => void;
}

export default function LessonCard({ lesson, onComplete }: LessonCardProps) {
  const { state, completeLesson } = useGame();
  const [showTakeaways, setShowTakeaways] = useState(false);
  const isCompleted = state.completedLessons.includes(lesson.id);

  const handleComplete = () => {
    completeLesson(lesson.id, lesson.xpReward);
    setShowTakeaways(true);
  };

  const handleContinue = () => {
    onComplete();
  };

  // Parse content for code blocks and formatting
  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      // Code block
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).trim();
        return (
          // Changed: Warm code block styling
          <pre
            key={index}
            className="bg-anthro-100 border border-anthro-200 rounded-lg p-4 my-4 overflow-x-auto font-mono text-sm text-dark-800"
          >
            <code>{code}</code>
          </pre>
        );
      }

      // Regular text with markdown-like formatting
      const lines = part.split('\n');
      return (
        <div key={index}>
          {lines.map((line, lineIdx) => {
            // Bold text - Changed: warm dark styling
            const formattedLine = line.replace(
              /\*\*(.*?)\*\*/g,
              '<strong class="text-dark-900 font-semibold">$1</strong>'
            );

            // Inline code - Changed: warm bg
            const withCode = formattedLine.replace(
              /`([^`]+)`/g,
              '<code class="bg-anthro-100 text-primary-700 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
            );

            // Bullet points
            if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
              return (
                <p
                  key={lineIdx}
                  className="text-dark-600 leading-relaxed pl-4 my-1"
                  dangerouslySetInnerHTML={{ __html: withCode }}
                />
              );
            }

            // Numbered list
            if (/^\d+\./.test(line.trim())) {
              return (
                <p
                  key={lineIdx}
                  className="text-dark-600 leading-relaxed pl-4 my-1"
                  dangerouslySetInnerHTML={{ __html: withCode }}
                />
              );
            }

            // Empty lines
            if (line.trim() === '') {
              return <div key={lineIdx} className="h-2" />;
            }

            // Regular paragraph
            return (
              <p
                key={lineIdx}
                className="text-dark-600 leading-relaxed my-1"
                dangerouslySetInnerHTML={{ __html: withCode }}
              />
            );
          })}
        </div>
      );
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto"
    >
      {/* Changed: White card with warm Anthropic borders */}
      <div className="bg-white backdrop-blur-sm border border-anthro-200 rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="bg-anthro-50 p-6 border-b border-anthro-200">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{lesson.icon}</span>
            <div>
              <p className="text-xs text-dark-400 uppercase tracking-wider">
                Level {lesson.level} · {lesson.levelName}
              </p>
              <h2 className="text-xl font-bold text-dark-900">{lesson.title}</h2>
            </div>
          </div>
          <p className="text-dark-500 text-sm mt-2">{lesson.description}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
              +{lesson.xpReward} XP
            </span>
            {isCompleted && (
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                ✓ Completed
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {renderContent(lesson.content)}
        </div>

        {/* Key Takeaways */}
        {showTakeaways && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="px-6 pb-6"
          >
            {/* Changed: Warm green takeaways */}
            <div className="bg-green-50 border border-green-200 rounded-xl p-5">
              <h3 className="text-green-700 font-semibold mb-3 flex items-center gap-2">
                <span>💡</span> Key Takeaways
              </h3>
              <ul className="space-y-2">
                {lesson.keyTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-dark-600 text-sm">
                    <span className="text-green-600 mt-0.5">✓</span>
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <div className="p-6 border-t border-anthro-200 flex items-center justify-between">
          {!showTakeaways && !isCompleted ? (
            // Changed: Anthropic dark button
            <button
              onClick={handleComplete}
              className="bg-dark-900 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-dark-800 transition-all shadow-sm"
            >
              Complete Lesson ✓
            </button>
          ) : (
            <button
              onClick={handleContinue}
              className="bg-primary-500 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-primary-600 transition-all shadow-sm"
            >
              Continue →
            </button>
          )}
          {isCompleted && !showTakeaways && (
            <span className="text-sm text-dark-400">Already completed — review anytime!</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}