import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function QuizPage() {
  const navigate = useNavigate();
  const { topic } = useParams();

  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(60); // Will come from DB
  const [timeLeft, setTimeLeft] = useState(60);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const reviewRef = useRef([]);
  const timerRef = useRef(null);

  // Fetch quiz questions & duration
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/quiz/questions/${topic}`);
        setQuestions(response.data.questions);
        setDuration(response.data.duration || 60);
        setTimeLeft(response.data.duration || 60);
      } catch (err) {
        console.error('Error fetching questions:', err);
      }finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  // Start countdown timer
  useEffect(() => {
    if (!questions.length || showResult) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions, showResult]);

  const buildFullReview = () => {
  const currentQuestion = questions[current];

  // Only push if not already in review
  if (
    currentQuestion &&
    !reviewRef.current.some(r => r.question === currentQuestion.question)
  ) {
    reviewRef.current.push({
      question: currentQuestion.question,
      options: currentQuestion.options,
      selected: selectedAnswer,
      correct: currentQuestion.answer,
      imageUrl: currentQuestion.imageUrl || null,
    });
    if (selectedAnswer === currentQuestion.answer) {
      scoreRef.current += 1;
      setScore(prev => prev + 1);
    }
  }

  // OW rebuild answered list after pushing current
  const answeredQuestions = reviewRef.current.map(r => r.question);

  // Add any truly unanswered remaining questions
  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];
    if (!answeredQuestions.includes(q.question)) {
      reviewRef.current.push({
        question: q.question,
        options: q.options,
        selected: null,
        correct: q.answer,
        imageUrl: q.imageUrl || null,
      });
    }
  }
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

  const handleAutoSubmit = async () => {
    buildFullReview();
    await submitQuizResult();
    setShowResult(true);
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleNextClick = async () => {
    const currentQuestion = questions[current];
    reviewRef.current.push({
      question: currentQuestion.question,
      options: currentQuestion.options,
      selected: selectedAnswer,
      correct: currentQuestion.answer,
      imageUrl: currentQuestion.imageUrl || null,
    });

    if (selectedAnswer === currentQuestion.answer) {
      setScore(prev => prev + 1);
      scoreRef.current += 1;
    }

    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      setSelectedAnswer(null);
    } else {
      await submitQuizResult();
      setShowResult(true);
    }
  };

  const handleReview = () => {
    navigate(`/quiz/${topic}/review`, {
      state: { reviewItems: reviewRef.current, from: 'quiz-page' },
    });
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2>Quiz Completed!</h2>
        <p>Your Score: {score} / {questions.length}</p>
        <button onClick={() => navigate(`/topics`)}>Home</button>
        <button onClick={handleReview}>Review</button>
      </div>
    );
  }

  if (loading) {
    return <p>Loading quiz...</p>;}
  if (!questions.length || !questions[current]) {
    return <p>No Quiz Yet — Coming Soon!</p>;
  }

  const q = questions[current];
  const imageUrl = q?.imageUrl || null;

  return (
    <div className={`quiz-container ${imageUrl ? 'with-image' : 'no-image'}`}>
      <h2>{topic} Quiz</h2>
      
      <h3>Question {current + 1} of {questions.length}</h3>
      <p className="timer">Time Left: {timeLeft}s</p>
      <p className="question-text">{q.question}</p>
       
          {imageUrl ? (
    <div className="the-setup">
      <div className="quiz-img">
        <img
          src={imageUrl}
          alt="Question related Image"
        />
      </div>

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
    </div>
  ) : (
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
  )}


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
