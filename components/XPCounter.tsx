'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';

interface XPCounterProps {
  xp: number;
}

export default function XPCounter({ xp }: XPCounterProps) {
  const [displayXP, setDisplayXP] = useState(xp);
  const [showPulse, setShowPulse] = useState(false);
  const prevXP = useRef(xp);

  useEffect(() => {
    if (xp !== prevXP.current) {
      setShowPulse(true);
      const start = prevXP.current;
      const diff = xp - start;
      const duration = 600;
      const startTime = Date.now();

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplayXP(Math.round(start + diff * eased));

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      requestAnimationFrame(animate);
      prevXP.current = xp;

      const timer = setTimeout(() => setShowPulse(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [xp]);

  return (
    <div className="relative">
      <AnimatePresence>
        {showPulse && (
          <motion.div
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 rounded-lg bg-primary-500"
          />
        )}
      </AnimatePresence>
      <motion.div
        animate={showPulse ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-primary-900/50 to-accent-900/50 rounded-lg border border-primary-700/30"
      >
        <span className="text-sm">⚡</span>
        <span className="text-sm font-bold text-primary-300">{displayXP} XP</span>
      </motion.div>
    </div>
  );
}