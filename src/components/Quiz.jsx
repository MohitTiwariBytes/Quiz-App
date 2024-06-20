// src/components/Quiz.js
import React from 'react';
import Question from './Question';

const Quiz = ({ data, onAnswer, onRestart }) => {
  const shuffledAnswers = [...data.incorrect_answers, data.correct_answer].sort(() => Math.random() - 0.5);

  return (
    <div className="quiz">
      <Question text={data.question} />
      <div className="answers">
        {shuffledAnswers.map((answer, index) => (
          <button key={index} className="answer-button" onClick={() => onAnswer(answer === data.correct_answer)}>
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
