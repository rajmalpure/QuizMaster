import React from 'react';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

export default function ProgressBar({ current, total, timeLeft, maxTime }) {
  const progress = (current / total) * 100;
  const timeProgress = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full">
      {/* Animated Navbar */}
      <motion.nav
        className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          className="text-xl font-bold tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          PlayQuiz
        </motion.h1>
        
        {/* Home Button */}
        <motion.button
          className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-medium shadow-md hover:bg-gray-100 transition"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.location.href = '/'}
        >
          <Home className="w-5 h-5" />
          Home
        </motion.button>
      </motion.nav>

      {/* Progress Bar */}
      <div className="w-full p-4">
        <motion.div
          className="flex justify-between mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-sm font-medium text-gray-700">
            Question {current} of {total}
          </span>
          <span className="text-sm font-medium text-gray-700">
            Time left: {timeLeft}s
          </span>
        </motion.div>

        {/* Main Progress Bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-2 bg-blue-600 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Timer Bar */}
        <div className="w-full h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
          <motion.div
            className="h-1 bg-red-400 rounded-full"
            initial={{ width: '100%' }}
            animate={{ 
              width: `${timeProgress}%`,
              backgroundColor: timeLeft <= 5 ? '#EF4444' : '#F87171'
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>
    </div>
  );
}
