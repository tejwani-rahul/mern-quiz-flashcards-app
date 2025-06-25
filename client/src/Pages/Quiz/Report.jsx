import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Report = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = localStorage.getItem('token');
        const { userId } = jwtDecode(token);

        const res = await axios.get(`http://localhost:5000/report/results/${userId}`);
        setResults(res.data);
      } catch (err) {
        console.error("Fetch results error:", err);
      }
    };

    fetchResults();
  }, []);

  const handleReview = (topic, reviewItems) => {
    navigate(`/quiz/${topic}/review`, { state: { reviewItems,from: 'review-list' } });
  };

  return (
    <div className="review-history-container">
      <h2>Past Quiz Results</h2>
      {results.length === 0 ? (
        <p>No past quizzes found.</p>
      ) : (
        <ul className="quiz-result-list">
          {results.map((r, i) => (
            <li key={i} className="quiz-result-card">
              <p><strong>Topic:</strong> {r.topic}</p>
              <p><strong>Score:</strong> {r.score} / {r.total}</p>
              <p><strong>Date:</strong> {new Date(r.createdAt).toLocaleString()}</p>
              <button onClick={() => handleReview(r.topic, r.reviewItems)}>Review</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Report;
