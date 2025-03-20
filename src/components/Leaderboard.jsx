import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy } from 'lucide-react';

function Leaderboard() {
  const [leaderboard, setLeaderboard] = React.useState([]);

  React.useEffect(() => {
    const storedLeaderboard = localStorage.getItem('quizLeaderboard');
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  return (
    <motion.div
      className="mt-8 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <div className="flex items-center mb-4">
        <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
        <h3 className="text-xl font-bold">Leaderboard</h3>
      </div>
      <AnimatePresence mode="wait">
        {leaderboard.length > 0 ? (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {leaderboard
              .sort((a, b) => b.score - a.score)
              .slice(0, 5)
              .map((entry, index) => (
                <motion.div
                  key={index}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">#{index + 1}</span>
                    <span>{entry.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-bold text-blue-600">{entry.score}%</span>
                    <span className="text-sm text-gray-500 ml-4">
                      {new Date(entry.date).toLocaleDateString()}
                    </span>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        ) : (
          <motion.p
            className="text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No scores yet!
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Leaderboard;
