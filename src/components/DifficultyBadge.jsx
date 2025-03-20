import React from 'react';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';

const difficultyConfig = {
  beginner: {
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: 1,
  },
  intermediate: {
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: 2,
  },
  advanced: {
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: 3,
  },
};

export default function DifficultyBadge({ difficulty }) {
  const config = difficultyConfig[difficulty];
  
  return (
    <motion.div
      className={`flex items-center px-3 py-1 rounded-full border ${config.color}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div className="flex space-x-1">
        {[...Array(config.icon)].map((_, i) => (
          <Brain key={i} className="w-4 h-4" />
        ))}
      </div>
      <span className="ml-2 font-medium capitalize">{difficulty}</span>
    </motion.div>
  );
}
