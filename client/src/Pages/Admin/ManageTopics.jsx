import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const ManageTopic = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newTopicName, setNewTopicName] = useState('');

  const navigate = useNavigate();

  const fetchTopics = async () => {
    try {
      const res = await axiosInstance.get('/admin/topics');
      setTopics(res.data);
    } catch (err) {
      console.error("Error fetching topics:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  const handleDelete = async (topic) => {
    if (!window.confirm(`Are you sure you want to delete '${topic}' from both Quiz and FlashCards?`)) return;

    try {
      await axiosInstance.delete(`/admin/topic/${topic}`);
      alert(`Deleted topic '${topic}'`);
      setTopics(prev => prev.filter(t => t !== topic));
    } catch (err) {
      console.error('Delete topic error:', err);
      alert('Failed to delete topic.');
    }
  };

  const handleAddTopic = () => {
    setSelectedTopic('new');
    setNewTopicName('');
  };

  const handleCreateNewTopic = () => {
    if (!newTopicName.trim()) {
      alert('Topic name cannot be empty.');
      return;
    }
    setSelectedTopic(newTopicName.trim());
  };

  const handleEditClick = (topic) => {
    setSelectedTopic(topic);
  };

  const handleEditChoice = (type) => {
    const encodedTopic = encodeURIComponent(selectedTopic);
    if (type === 'quiz') {
      navigate(`/admin/quizzes/${encodedTopic}`, { state: { topic: selectedTopic } });
    } else if (type === 'flashcards') {
      navigate(`/admin/flashcards/${encodedTopic}`, { state: { topic: selectedTopic } });
    }
  };

  return (
    <div className="admin-topic-list">
      <h2>Manage Topics</h2>

      {!selectedTopic && (
        <>
          <button onClick={handleAddTopic} className="admin-add-topic-btn">
            ➕ Add New Topic
          </button>

          {loading ? (
            <p>Loading topics...</p>
          ) : topics.length === 0 ? (
            <p>No topics found.</p>
          ) : (
            <ul>
              {topics.map((topic, index) => (
                <li key={index} className="admin-topic-item">
                  <span>{topic}</span>
                  <div className="admin-topic-actions">
                    <button onClick={() => handleEditClick(topic)}>Edit</button>
                    <button className='delete' onClick={() => handleDelete(topic)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </>
      )}

      {selectedTopic === 'new' && (
        <div className="admin-create-topic">
          <h3>Create New Topic</h3>
          <input
            type="text"
            placeholder="Enter topic name"
            value={newTopicName}
            onChange={(e) => setNewTopicName(e.target.value)}
          />
          <div className="admin-create-topic-buttons">
            <button onClick={handleCreateNewTopic}>Create Topic</button>
            <button onClick={() => { setSelectedTopic(null); setNewTopicName(''); }}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {selectedTopic && selectedTopic !== 'new' && (
        <div>
          <h3>Topic: {selectedTopic}</h3>
          <p>What do you want to edit for this topic?</p>
          <div className="admin-edit-choice">
            <div className="quiz" onClick={() => handleEditChoice('quiz')}>
              Quiz
            </div>
            <div className="flashCards" onClick={() => handleEditChoice('flashcards')}>
              Flashcards
            </div>
          </div>
          <button className="admin-back-btn" onClick={() => setSelectedTopic(null)}>
            Back to Topics
          </button>
        </div>
      )}
    </div>
  );
};

export default ManageTopic;
