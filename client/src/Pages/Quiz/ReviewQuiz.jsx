import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';


function ReviewQuiz() {
  const { topic } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state || !state.reviewItems) {
    return <p>No review data found.</p>;
  }

  const { reviewItems, from } = state;

  const handleBack = () => {
  if (from === 'review-list') {
    navigate('/report');
  } else if (from === 'admin-reports') {
    navigate('/admin/reports');  
  } else {
    navigate('/topics');    
  }
};

  return (
    <div className="review-container">
      <div className="review-header">
  <h2>Review {topic} Quiz</h2>
  <p className="review-score">Score: {reviewItems.filter(item => item.selected === item.correct).length} / {reviewItems.length}</p>
</div>

      {reviewItems.map((item, idx) => (
        <div key={idx} className="review-question">
          <p className="question-text">{item.question}</p>
          <ul className="options-list">
            {item.options.map((opt, i) => {
              const isCorrect = opt === item.correct;
              const isSelected = opt === item.selected;
              return (
                <li
                  key={i}
                  className={`option ${isSelected ? 'selected' : ''} ${isCorrect ? 'correct' : ''}`}
                >
                  <input type="radio" checked={isSelected} readOnly />
                  <span>{String.fromCharCode(97 + i)}. {opt}</span>
                  {isCorrect && <span className="checkmark">✔</span>}
                </li>
              );
            })}
          </ul>
          {item.selected !== item.correct && (
            <div className="correct-answer">The correct answer is: {item.correct}</div>
          )}
        </div>
      ))}
      <button onClick={handleBack}>
  {from === 'review-list'
    ? 'Back '
    : from === 'admin-reports'
      ? 'Back' 
      : 'Home'
  }
</button>
    </div>
  );
}

export default ReviewQuiz;
