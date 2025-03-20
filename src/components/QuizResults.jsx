import React from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function QuizResults({ score, totalQuestions, onRestart }) {
  const percentage = Math.round((score / totalQuestions) * 100);
  const [windowSize, setWindowSize] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <motion.div
      className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {percentage >= 70 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={200}
        />
      )}
      <motion.h2
        className="text-3xl font-bold mb-6"
        initial={{ scale: 0.5 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Quiz Complete!
      </motion.h2>
      <div className="mb-8">
        <motion.div
          className="text-6xl font-bold mb-2"
          style={{ color: percentage >= 70 ? '#10B981' : percentage >= 40 ? '#F59E0B' : '#EF4444' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {percentage}%
        </motion.div>
        <motion.p
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          You got {score} out of {totalQuestions} questions correct
        </motion.p>
      </div>
      <motion.button
        onClick={onRestart}
        className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold
                 hover:bg-blue-700 transition-colors duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
      >
        Try Again
      </motion.button>
    </motion.div>
  );
}
