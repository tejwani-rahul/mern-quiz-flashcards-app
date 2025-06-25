
import React from 'react';

import { useNavigate, useParams } from 'react-router-dom';

const SelectMode = () => {
  const {topic } =useParams()
    const navigate = useNavigate()

    const handelQuizSelection =()=>{
        setTimeout(()=>{
            navigate(`/quiz/${topic}`)
        }) 
    }

    const handelFlashCardsSelection =()=>{
        setTimeout(()=>{
            navigate(`/flashcards/${topic}`)
        }) 
    }

  return <div className='mode-container'>
    <h2>{topic}</h2>
    <div className="select-mode">
    <div className='quiz' onClick={handelQuizSelection}>Quiz</div>
    <div className='flashCards' onClick={handelFlashCardsSelection}>FlashCards</div>
    </div>
  </div>;
};

export default SelectMode;