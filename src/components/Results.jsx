// src/components/Results.js
import React from 'react';

const Results = ({ score, totalQuestions }) => {
  return (
    <div className="results">
      <h2>Results</h2>
      <p>
        You scored {score} out of {totalQuestions}
      </p>
    </div>
  );
};

export default Results;
