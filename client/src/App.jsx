/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './App.css';
import Question from './Question';


function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Function to handle user's answer selection
  const handleAnswerSelection = (selectedAnswer) => {
    const currentQuestion = questions[currentQuestionIndex];

    if (selectedAnswer === currentQuestion.correctAnswer) {
      // User's answer is correct
      setScore(score + 1);
    }

    // Move to the next question or show the result
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  // Function to reset the game
  const resetGame = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowResult(false);
  };

  // fetch data from the server
  useEffect(() => {
    fetch('http://localhost:5000/mcq')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); 
      })
      .then((data) => {
        setQuestions(data); 
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);


  return (
    <div className="App">
      {showResult ? (
        <div>
          <h2>Your Score: {score} / {questions.length}</h2>
          <button onClick={resetGame} className='bg-green-400 py-2 px-4 rounded mt-3 text-white'>Restart</button>
        </div>
      ) : (
        <Question
          question={questions[currentQuestionIndex]}
          onAnswerSelected={handleAnswerSelection}
          
        />
      )}
    </div>
  );
}

export default App;
