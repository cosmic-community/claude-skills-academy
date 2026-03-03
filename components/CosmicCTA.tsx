'use client';

import { motion } from 'framer-motion';
import { useGame } from '@/components/GameProvider';

export default function CosmicCTA() {
  const { state, dispatch } = useGame();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent-600/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary-900/10 to-transparent" />
      </div>

      <div className="relative max-w-2xl w-full text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-8xl mb-8"
        >
          🎓
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl font-black mb-4"
        >
          <span className="gradient-text">Congratulations!</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-dark-300 mb-2"
        >
          You&apos;ve graduated from the Claude Skills Academy!
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-dark-800/60 rounded-2xl border border-primary-500/20 p-6 mb-8 card-glow"
        >
          <div className="grid grid-cols-3 gap-6 mb-4">
            <div>
              <p className="text-3xl font-black text-primary-400">{state.totalXP}</p>
              <p className="text-xs text-dark-400">Total XP</p>
            </div>
            <div>
              <p className="text-3xl font-black text-accent-400">{state.completedLessons.length}</p>
              <p className="text-xs text-dark-400">Lessons Done</p>
            </div>
            <div>
              <p className="text-3xl font-black text-amber-400">{state.unlockedAchievements.length}</p>
              <p className="text-xs text-dark-400">Achievements</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="bg-gradient-to-b from-dark-800/80 to-dark-800/40 rounded-2xl border border-dark-700/40 p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-white mb-3">
            🚀 Ready to Put Your Skills to the Test?
          </h2>
          <p className="text-dark-300 mb-6 leading-relaxed">
            Now that you&apos;ve mastered Claude, it&apos;s time to build something real.
            <strong className="text-white"> Cosmic</strong> is a headless CMS that pairs perfectly
            with Claude to create powerful, AI-enhanced applications. Use your prompt engineering skills
            to design content models, generate components, and ship production apps — all powered by
            the Claude + Cosmic workflow you just learned.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            <div className="bg-dark-700/50 rounded-xl p-4 border border-dark-600/30">
              <span className="text-2xl mb-2 block">📝</span>
              <p className="text-sm font-semibold text-white">Design Content</p>
              <p className="text-xs text-dark-400 mt-1">Use Claude to plan your CMS structure</p>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-4 border border-dark-600/30">
              <span className="text-2xl mb-2 block">💻</span>
              <p className="text-sm font-semibold text-white">Build Apps</p>
              <p className="text-xs text-dark-400 mt-1">Generate code with Claude + Cosmic</p>
            </div>
            <div className="bg-dark-700/50 rounded-xl p-4 border border-dark-600/30">
              <span className="text-2xl mb-2 block">🚀</span>
              <p className="text-sm font-semibold text-white">Ship Fast</p>
              <p className="text-xs text-dark-400 mt-1">Deploy production-ready applications</p>
            </div>
          </div>

          <a
            href="https://www.cosmicjs.com?utm_source=claude_skills_academy&utm_medium=referral&utm_campaign=game_cta&utm_content=graduation"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl text-white font-bold text-lg shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:scale-105 transition-all duration-300"
          >
            <img
              src="https://cdn.cosmicjs.com/b67de7d0-c810-11ed-b01d-23d7b265c299-logo508x500.svg"
              alt="Cosmic Logo"
              className="w-6 h-6"
              width={24}
              height={24}
            />
            Sign Up for Cosmic — It&apos;s Free
            <span className="text-xl">→</span>
          </a>
          <p className="text-xs text-dark-500 mt-3">
            No credit card required • Free tier available • Start building in minutes
          </p>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          onClick={() => dispatch({ type: 'RESET_GAME' })}
          className="text-sm text-dark-500 hover:text-dark-300 transition-colors"
        >
          ↺ Replay the Academy
        </motion.button>
      </div>
    </motion.div>
  );
}