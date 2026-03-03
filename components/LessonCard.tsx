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
    const parts = content.split(/(