import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';



const FlashCardPage = () => {
  const { topic } = useParams();
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const fetchFlashCards = async () => {
      try {
        const res = await axiosInstance.get(`/flashcards/flashcards/${topic}`);
        setCards(res.data);
      } catch (err) {
        console.error("Error fetching flashcards:", err);
      }
    };

    fetchFlashCards();
  }, [topic]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = () => {
    if (current < cards.length - 1) {
      setCurrent(current + 1);
      setIsFlipped(false);
    } else {
      setIsFinished(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent(current - 1);
      setIsFlipped(false);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setIsFlipped(false);
    setIsFinished(false);
  };

  const handleGoHome = () => {
 navigate('/user/topics');

};


  if (!cards.length) return <p>Loading flashcards...</p>;

  const currentCard = cards[current];

  return (
    <div className="flashcard-container">
      <h2 className="flashcard-title">{topic} Flashcards</h2>

      <div className={`flashcard ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
  <div className="front">
    <strong>Question:</strong>  {currentCard.front}
  </div>
  <div className="back">
    <strong>Answer:</strong> {currentCard.back}
  </div>
</div>

      {!isFinished ? (
        <div className="flashcard-controls">
          <button onClick={handlePrev} disabled={current === 0}>Previous</button>
          <button onClick={handleNext}>
            {current === cards.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      ) : (
        <div className="flashcard-controls">
          <p>You’ve finished! Wanna restart or go to main menu?</p>
          <button onClick={handleRestart}>Restart</button>
          <button onClick={handleGoHome}>Main Menu</button>
        </div>
      )}
    </div>
  );
};

export default FlashCardPage;
