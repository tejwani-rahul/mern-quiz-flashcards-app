import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const ManageFlashcards = () => {
  const [topic, setTopic] = useState('');
  const [originalTopic, setOriginalTopic] = useState('');
  const [flashcardsData, setFlashcardsData] = useState(null);
  const [newCard, setNewCard] = useState({ front: '', back: '' });
  const [activeTab, setActiveTab] = useState('cards');
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();
  const { topic: topicParam } = useParams();

  useEffect(() => {
    const topicFromState = location.state?.topic;
    const topicToUse = topicFromState || topicParam;
    if (topicToUse) {
      setTopic(topicToUse);
      setOriginalTopic(topicToUse);
      handleLoadFlashcards(topicToUse);
    }
  }, [location.state, topicParam]);

  const handleLoadFlashcards = async (customTopic) => {
    const topicToFetch = customTopic || topic;

    try {
      const res = await axiosInstance.get(`/admin/flashcards/${topicToFetch}`);
      setFlashcardsData(res.data);
      setOriginalTopic(topicToFetch);
      setNotFound(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
      } else {
        console.error('Load Flashcards Error:', err);
      }
    }
  };

  const handleCreateFlashcards = () => {
    setFlashcardsData({ topic, cards: [] });
    setOriginalTopic(topic);
    setNotFound(false);
  };

  const handleNewCardChange = (field, value) => {
    setNewCard(prev => ({ ...prev, [field]: value }));
  };

  const addCardToFlashcards = () => {
    if (!flashcardsData) return;

    if (newCard.front.trim() === '' || newCard.back.trim() === '') {
      alert('Please fill in both front and back of the card.');
      return;
    }

    setFlashcardsData(prev => ({
      ...prev,
      cards: [...prev.cards, newCard]
    }));

    setNewCard({ front: '', back: '' });
  };

  const handleExistingCardChange = (index, field, value) => {
    setFlashcardsData(prev => {
      const updatedCards = [...prev.cards];
      updatedCards[index][field] = value;
      return { ...prev, cards: updatedCards };
    });
  };

  const handleDeleteCard = (index) => {
    setFlashcardsData(prev => ({
      ...prev,
      cards: prev.cards.filter((_, i) => i !== index)
    }));
  };

  const handleSubmitFlashcards = async () => {
    if (!flashcardsData) return;

    const isDraftFilled = newCard.front.trim() && newCard.back.trim();
    let finalCards = flashcardsData.cards;

    if (isDraftFilled) finalCards = [...finalCards, newCard];

    if (!finalCards.length) {
      alert("Please add at least one card before saving.");
      return;
    }

    try {
      await axiosInstance.post(`/admin/flashcards/${originalTopic}`, {
        topic,
        cards: finalCards
      });

      alert('Flashcards saved!');
      setFlashcardsData(prev => ({ ...prev, topic, cards: finalCards }));
      setOriginalTopic(topic);
      setNewCard({ front: '', back: '' });
    } catch (err) {
      console.error('Save Flashcards Error:', err);
    }
  };

  return (
    <div className="container">
      <h2>Manage Flashcards: {topic}</h2>

      {notFound && (
        <div>
          <h3>No flashcards found for topic "{topic}".</h3>
          <button onClick={handleCreateFlashcards}>Create Flashcards</button>
        </div>
      )}

      {flashcardsData && !notFound && (
        <>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'cards' ? 'active' : ''}`}
              onClick={() => setActiveTab('cards')}
            >
              Cards
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Flashcards Settings
            </button>
          </div>

          {activeTab === 'cards' && (
            <>
              <h4>Cards</h4>
              {flashcardsData.cards.length === 0 && <p>No cards yet.</p>}
              {flashcardsData.cards.map((c, idx) => (
                <div key={idx} className="question-card">
                  <label>Flashcard: {idx+1}</label>
                  <label>Front:</label>
                  <input
                    value={c.front}
                    onChange={(e) => handleExistingCardChange(idx, 'front', e.target.value)}
                  />

                  <label>Back:</label>
                  <input
                    value={c.back}
                    onChange={(e) => handleExistingCardChange(idx, 'back', e.target.value)}
                  />

                  <button className="delete" onClick={() => handleDeleteCard(idx)}>Delete Card</button>
                </div>
              ))}

              <h4>Add New Card</h4>
              <input
                placeholder="Front"
                value={newCard.front}
                onChange={(e) => handleNewCardChange('front', e.target.value)}
              />
              <input
                placeholder="Back"
                value={newCard.back}
                onChange={(e) => handleNewCardChange('back', e.target.value)}
              />
              <button onClick={addCardToFlashcards}>Add New Card</button>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h4>Flashcards Settings</h4>
              <label>Topic Name:</label>
              <input
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setFlashcardsData(prev => ({ ...prev, topic: e.target.value }));
                }}
              />
            </>
          )}

            <button onClick={handleSubmitFlashcards}>Save Flashcards</button>
        </>
      )}
    </div>
  );
};

export default ManageFlashcards;
