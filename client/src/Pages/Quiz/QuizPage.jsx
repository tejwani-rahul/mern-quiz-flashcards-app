import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axiosInstance from '../../api/axiosInstance';

function QuizPage() {
  const navigate = useNavigate();
  const { topic } = useParams();

  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const [score, setScore] = useState(0);        // For UI
  const scoreRef = useRef(0);                  // For DB accuracy
  const reviewRef = useRef([]);                // For review

  useEffect(() => {
    const fetchingQuiz = async () => {
      try {
        const response = await axiosInstance.get(`/quiz/questions/${topic}`);
        setQuestions(response.data);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    };
    fetchingQuiz();
  }, [topic]);

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const submitQuizResult = async () => {
  try {
    await axiosInstance.post("/report/result", {
      topic,
      score: scoreRef.current,
      total: questions.length,
      reviewItems: reviewRef.current,
    });
  } catch (err) {
    console.error("Error saving quiz result:", err);
  }
};

  const handleNextClick = async () => {
    const currentQuestion = questions[current];

    // Track user's answer
    reviewRef.current.push({
      question: currentQuestion.question,
      options: currentQuestion.options,
      selected: selectedAnswer,
      correct: currentQuestion.answer,
    });

    if (selectedAnswer === currentQuestion.answer) {
      setScore((prev) => prev + 1); // UI
      scoreRef.current += 1;        // DB
    }

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      await submitQuizResult(); // ✅ Fix: No argument passed
      setShowResult(true);
    }
  };

  const handleReview = () => {
    navigate(`/quiz/${topic}/review`, {
      state: { reviewItems: reviewRef.current, from: 'quiz' }
    });
  };

  if (!questions.length) return <p>Loading questions...</p>;

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2 className="quiz-title">Quiz Completed!</h2>
        <p className="question-text">Your Score: {score} / {questions.length}</p>
        <button onClick={handleReview}>Review</button>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-container">
      <h2 className="quiz-title">{topic} Quiz</h2>
      <h3>Question {current + 1} of {questions.length}</h3>
      <p className="question-text">{q.question}</p>

      <ul className="options-list">
        {q.options.map((opt, i) => (
          <li key={i}>
            <button
              className={`option-button ${selectedAnswer === opt ? 'selected' : ''}`}
              onClick={() => handleOptionClick(opt)}
            >
              {opt}
            </button>
          </li>
        ))}
      </ul>

      <div className="quiz-footer">
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={!selectedAnswer}
        >
          {current + 1 === questions.length ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
}

export default QuizPage;
