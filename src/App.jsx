import React, { useState, useEffect } from 'react';
import { Timer, Award, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from './data/questions';
import ProgressBar from './components/ProgressBar';
import QuizResults from './components/QuizResults';
import Leaderboard from './components/Leaderboard';
import DifficultyBadge from './components/DifficultyBadge';
import LandingPage from './components/LandingPage';

const QUESTION_TIMER = 30;

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIMER);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState(null);
  const [quizStarted, setQuizStarted] = useState(false);

  useEffect(() => {
    if (quizStarted && timeLeft > 0 && !showResults && selectedAnswer === null) {
      const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showResults && selectedAnswer === null && quizStarted) {
      handleNextQuestion();
    }
  }, [timeLeft, showResults, selectedAnswer, quizStarted]);

  useEffect(() => {
    if (selectedAnswer !== null) {
      playSound(isAnswerCorrect ? 'correct' : 'incorrect');
    }
  }, [selectedAnswer]);

  const handleAnswerClick = (answer) => {
    if (selectedAnswer !== null) return;
    const correct = answer === questions[currentQuestion].correctAnswer;
    setSelectedAnswer(answer);
    setIsAnswerCorrect(correct);
    if (correct) setScore(prev => prev + 1);

    setTimeout(handleNextQuestion, 1500);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimeLeft(QUESTION_TIMER);
    } else {
      setShowResults(true);
      saveScore();
    }
  };

  const playSound = (type) => {
    const audio = new Audio(
      type === 'correct'
        ? './public/clap-sound.mp3'
        : './public/hard-slap-46388.mp3'
    );
    audio.play().catch(() => {});
  };

  const saveScore = () => {
    const percentage = Math.round((score / questions.length) * 100);
    const leaderboard = JSON.parse(localStorage.getItem('quizLeaderboard') || '[]');
    leaderboard.push({ name: 'Player', score: percentage, date: new Date().toISOString() });
    localStorage.setItem('quizLeaderboard', JSON.stringify(leaderboard));
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResults(false);
    setTimeLeft(QUESTION_TIMER);
    setSelectedAnswer(null);
    setIsAnswerCorrect(null);
  };

  const startQuiz = () => setQuizStarted(true);

  if (!quizStarted) return <LandingPage onStartQuiz={startQuiz} />;

  if (showResults) {
    return (
      <div className="min-h-screen bg-gray-100 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <QuizResults score={score} totalQuestions={questions.length} onRestart={restartQuiz} />
            <Leaderboard />
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div className="bg-white rounded-lg shadow-lg p-6" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3 }}>
          <ProgressBar current={currentQuestion + 1} total={questions.length} timeLeft={timeLeft} maxTime={QUESTION_TIMER} />
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <motion.h2 className="text-2xl font-bold" key={currentQuestion} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
                {questions[currentQuestion].question}
              </motion.h2>
              <DifficultyBadge difficulty={questions[currentQuestion].difficulty} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AnimatePresence mode="wait">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.button
                    key={`${currentQuestion}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => handleAnswerClick(option)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left rounded-lg transition-all duration-300 transform hover:scale-102 border-2 ${selectedAnswer === option ? (isAnswerCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500') : 'bg-gray-50 hover:bg-gray-100 border-gray-200'}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    aria-label={`Answer option: ${option}`}
                  >
                    {option}
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <motion.div className="flex items-center" animate={{ scale: timeLeft <= 5 ? [1, 1.1, 1] : 1, color: timeLeft <= 5 ? '#EF4444' : '#4B5563' }} transition={{ duration: 0.5, repeat: timeLeft <= 5 ? Infinity : 0 }} role="alert">
              <Timer className="w-4 h-4 mr-1" />
              <span>{timeLeft}s remaining</span>
            </motion.div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-1" />
              <span>Score: {score}/{questions.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
