// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Quiz from './components/Quiz';
import Results from './components/Results';
import './App.css';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await axios.get('https://opentdb.com/api.php?amount=10&type=multiple');
      setQuestions(response.data.results);
    };
    fetchQuestions();
  }, []);

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(score + 1);
    const nextQuestionIndex = currentQuestionIndex + 1;
    if (nextQuestionIndex < questions.length) {
      setCurrentQuestionIndex(nextQuestionIndex);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResults(false);
    setShowQuiz(false); // Reset to hide questions
    fetchQuestions();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const startQuiz = () => {
    setShowQuiz(true);
  };

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <header className="app-header">
        <h1>Quiz App by MohitTiwariDev</h1>
      </header>

      {!showQuiz && (
        <footer className="app-menu">
          <button className="menu-button" onClick={startQuiz}>Play</button>
          <button className="menu-button" onClick={toggleDarkMode}>Settings</button>
          <button className="menu-button">Credits</button>
        </footer>
      )}

      {showQuiz && (
        <div className="app-content">
          <div className="status-bar">
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            {!showResults && (
              <button className="restart-button" onClick={handleRestart}>Restart Game</button>
            )}
          </div>

          {showResults ? (
            <Results
              score={score}
              totalQuestions={questions.length}
              onRestart={handleRestart}
            />
          ) : (
            questions.length > 0 && (
              <Quiz data={questions[currentQuestionIndex]} onAnswer={handleAnswer} />
            )
          )}
        </div>
      )}
    </div>
  );
};

export default App;
