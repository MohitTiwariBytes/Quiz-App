// src/components/Question.js
import React from 'react';

const Question = ({ text }) => {
  return (
    <div className="question">
      <h2 dangerouslySetInnerHTML={{ __html: text }}></h2>
    </div>
  );
};

export default Question;
