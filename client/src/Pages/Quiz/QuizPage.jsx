import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

function QuizPage() {
  const navigate = useNavigate();
  const { topic } = useParams();

  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(60); // fallback
  const [timeLeft, setTimeLeft] = useState(60);
  const [current, setCurrent] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(true);

  const [score, setScore] = useState(0);
  const scoreRef = useRef(0);
  const reviewRef = useRef([]);
  const answeredQuestions = useRef(new Set());
  const timerRef = useRef(null);

  const handleAutoSubmit = useRef(null);

  // ✅ Fetch quiz questions & duration
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get(`/quiz/questions/${topic}`);
        setQuestions(response.data.questions);
        const quizDuration = response.data.duration || 60;
        setDuration(quizDuration);
        setTimeLeft(quizDuration);
      } catch (err) {
        console.error('Error fetching questions:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [topic]);

  // ✅ Always use latest auto-submit logic
  useEffect(() => {
    handleAutoSubmit.current = async () => {
      if (selectedAnswer !== null) {
        processCurrentQuestion();
      }
      addUnansweredQuestions();
      await submitQuizResult();
      setShowResult(true);
    };
  }, [selectedAnswer, questions]);

  // ✅ Start countdown timer
  useEffect(() => {
    if (!questions.length || showResult) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          handleAutoSubmit.current();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [questions, showResult]);

  // ✅ Process current question safely
  const processCurrentQuestion = () => {
    const currentQuestion = questions[current];
    if (!currentQuestion) return;

    const questionId = currentQuestion.question; // Use an ID if you have one

    if (!answeredQuestions.current.has(questionId)) {
      reviewRef.current.push({
        question: currentQuestion.question,
        options: currentQuestion.options,
        selected: selectedAnswer,
        correct: currentQuestion.answer,
        imageUrl: currentQuestion.imageUrl || null,
      });

      if (selectedAnswer === currentQuestion.answer) {
        scoreRef.current += 1;
        setScore((prev) => prev + 1);
      }

      answeredQuestions.current.add(questionId);
    }
  };

  // ✅ Add any truly unanswered questions
  const addUnansweredQuestions = () => {
    const processed = new Set(reviewRef.current.map((r) => r.question));
    for (const q of questions) {
      if (!processed.has(q.question)) {
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

  // ✅ Submit final quiz result
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

  // ✅ Handle next button
  const handleNextClick = async () => {
    processCurrentQuestion();

    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      addUnansweredQuestions();
      await submitQuizResult();
      setShowResult(true);
    }
  };

  const handleOptionClick = (option) => {
    setSelectedAnswer(option);
  };

  const handleReview = () => {
    navigate(`/quiz/${topic}/review`, {
      state: { reviewItems: reviewRef.current, from: 'quiz-page' },
    });
  };

  if (loading) return <p>Loading quiz...</p>;
  if (!questions.length || !questions[current]) return <p>No Quiz Yet — Coming Soon!</p>;

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
            <img src={imageUrl} alt="Question related" />
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
