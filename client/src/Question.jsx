/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */


import React, { useState } from 'react';

const optionStyles = {
  option: {
    cursor: 'pointer',
    padding: '10px',
    margin: '5px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    transition: 'background 0.2s',
  },
  selectedOption: {
    background: '#4CAF50',
    color: 'white',
  },
  emoji: {
    marginLeft: '10px',
    fontSize: '20px',
  },
};

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function Question({ question, onAnswerSelected }) {
  if (!question) {
    // Handle the case when the question data is missing
    return <div>No question data available.</div>;
  }

  const { question: questionText, options } = question;

  // Shuffle the options randomly
  const shuffledOptions = shuffleArray(options);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    onAnswerSelected(answer);
  };

  return (
    <div>
      <h2 className='mb-4'>{questionText}</h2>
      <ul>
        {shuffledOptions &&
          shuffledOptions.map((option, index) => (
            <li
              key={index}
              onClick={() => handleAnswerClick(option)}
              style={{
                ...optionStyles.option,
                ...(selectedAnswer === option ? optionStyles.selectedOption : {}),
                
              }}
              className="cursor-pointer hover:bg-green-400 hover:text-white p-4 rounded-lg z-10 bg-white"
            >
              {option}
              
            </li>
          ))}
      </ul>
      
    </div>
  );
}

export default Question;







