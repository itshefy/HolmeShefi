// src/components/SalesFlow/ClientProfiling.jsx
import React, { useState } from 'react';

const ProfilingQuestions = ({ onComplete }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: 'goal',
      question: 'מה המטרה העיקרית שלך?',
      options: [
        { id: 'health', text: 'בריאות ואנרגיה', emoji: '💪' },
        { id: 'shape', text: 'חיטוב וכוח', emoji: '🎯' },
        { id: 'stress', text: 'הפגת מתחים', emoji: '😌' },
        { id: 'swimming', text: 'שחייה ספורטיבית', emoji: '🏊‍♂️' }
      ]
    },
    {
      id: 'schedule',
      question: 'מתי הכי נוח לך להתאמן?',
      options: [
        { id: 'morning', text: 'בוקר (6:00-12:00)', emoji: '🌅' },
        { id: 'afternoon', text: 'צהריים (12:00-17:00)', emoji: '☀️' },
        { id: 'evening', text: 'ערב (17:00-23:00)', emoji: '🌙' },
        { id: 'flexible', text: 'גמיש', emoji: '🔄' }
      ]
    },
    {
      id: 'experience',
      question: 'מה הניסיון שלך באימונים?',
      options: [
        { id: 'beginner', text: 'מתחיל לגמרי', emoji: '🌱' },
        { id: 'some', text: 'קצת ניסיון', emoji: '🌿' },
        { id: 'experienced', text: 'מתאמן באופן קבוע', emoji: '🌳' }
      ]
    }
  ];

  const handleAnswer = (answer) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: answer };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      onComplete(newAnswers);
    }
  };

  const currentQ = questions[currentQuestion];

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8">
        <div className="text-sm text-blue-600 mb-2">
          שאלה {currentQuestion + 1} מתוך {questions.length}
        </div>
        <h2 className="text-2xl font-bold">
          {currentQ.question}
        </h2>
      </div>

      <div className="space-y-4">
        {currentQ.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 text-right rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition-all flex items-center space-x-3"
          >
            <span className="text-2xl ml-3">{option.emoji}</span>
            <span className="text-lg">{option.text}</span>
          </button>
        ))}
      </div>

      {currentQuestion > 0 && (
        <button
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
          className="mt-6 text-blue-600 hover:underline"
        >
          חזור לשאלה הקודמת
        </button>
      )}
    </div>
  );
};

export default ProfilingQuestions;