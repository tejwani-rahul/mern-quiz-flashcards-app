import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const ManageQuizzes = () => {
  const [topic, setTopic] = useState('');
  const [originalTopic, setOriginalTopic] = useState('');
  const [duration, setDuration] = useState(60);
  const [quizData, setQuizData] = useState(null);
  const [newQuestion, setNewQuestion] = useState({
    question: '',
    options: ['', '', '', ''],
    answer: '',
    imageUrl: ''
  });
  const [activeTab, setActiveTab] = useState('questions');
  const [notFound, setNotFound] = useState(false);

  const location = useLocation();
  const { topic: topicParam } = useParams();

  useEffect(() => {
    const topicFromState = location.state?.topic;
    const topicToUse = topicFromState || topicParam;
    if (topicToUse) {
      setTopic(topicToUse);
      setOriginalTopic(topicToUse);
      handleLoadQuiz(topicToUse);
    }
  }, [location.state, topicParam]);

  const handleLoadQuiz = async (customTopic) => {
    const topicToFetch = customTopic || topic;

    try {
      const res = await axiosInstance.get(`/admin/quiz/${topicToFetch}`);
      setQuizData(res.data);
      setOriginalTopic(res.data.topic);
      setDuration(res.data.duration || 60);
      setActiveTab('questions');
      setNotFound(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setNotFound(true);
      } else {
        console.error('Load Quiz Error:', err);
      }
    }
  };

  const handleCreateQuiz = () => {
    setQuizData({ topic, duration: 60, questions: [] });
    setOriginalTopic(topic);
    setDuration(60);
    setActiveTab('questions');
    setNotFound(false);
  };

  const handleNewQuestionChange = (field, value) => {
    setNewQuestion(prev => ({ ...prev, [field]: value }));
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...newQuestion.options];
    newOptions[index] = value;
    setNewQuestion(prev => ({ ...prev, options: newOptions }));
  };

  const addQuestionToQuiz = () => {
    if (!quizData) return;

    if (
      newQuestion.question.trim() === '' ||
      newQuestion.options.some(opt => opt.trim() === '') ||
      newQuestion.answer.trim() === ''
    ) {
      alert('Please fill in the question, options, and correct answer.');
      return;
    }

    setQuizData(prev => ({
      ...prev,
      questions: [...prev.questions, newQuestion]
    }));

    setNewQuestion({ question: '', options: ['', '', '', ''], answer: '', imageUrl: '' });
  };

  const handleExistingQuestionChange = (index, field, value) => {
    setQuizData(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index][field] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleExistingOptionChange = (qIndex, optIndex, value) => {
    setQuizData(prev => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[qIndex].options[optIndex] = value;
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleDeleteQuestion = (index) => {
    setQuizData(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSaveQuiz = async () => {
    if (!quizData) return;

    const isDraftFilled =
      newQuestion.question.trim() &&
      newQuestion.options.every(opt => opt.trim()) &&
      newQuestion.answer.trim();

    let finalQuestions = quizData.questions;

    if (isDraftFilled) finalQuestions = [...finalQuestions, newQuestion];

    if (!finalQuestions.length) {
      alert("Please add at least one question before saving.");
      return;
    }

    try {
      await axiosInstance.post(`/admin/quiz/${originalTopic}`, {
        topic,
        duration: Number(duration),
        questions: finalQuestions
      });

      alert('Quiz saved!');
      setQuizData(prev => ({
        ...prev,
        topic,
        duration: Number(duration),
        questions: finalQuestions
      }));
      setOriginalTopic(topic);
      setNewQuestion({ question: '', options: ['', '', '', ''], answer: '', imageUrl: '' });
    } catch (err) {
      console.error('Save Quiz Error:', err);
    }
  };

  return (
    <div className="container">
      <h2>Manage Quiz: {topic}</h2>

      {notFound && (
        <div>
          <h3>No quiz found for topic "{topic}".</h3>
          <button onClick={handleCreateQuiz}>Create Quiz</button>
        </div>
      )}

      {quizData && !notFound && (
        <>
          <div className="tabs">
            <button
              className={`tab-btn ${activeTab === 'questions' ? 'active' : ''}`}
              onClick={() => setActiveTab('questions')}
            >
              Questions
            </button>
            <button
              className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
              onClick={() => setActiveTab('settings')}
            >
              Quiz Settings
            </button>
          </div>

          {activeTab === 'questions' && (
            <>
              <h4>Questions</h4>
              {quizData.questions.length === 0 && <p>No questions yet.</p>}
              {quizData.questions.map((q, idx) => (
                <div key={idx} className="question-card">
                  <label>Question: {idx+1}</label>
                  <input
                    value={q.question}
                    onChange={(e) => handleExistingQuestionChange(idx, 'question', e.target.value)}
                  />

                  {q.options.map((opt, i) => (
                    <input
                      key={i}
                      value={opt}
                      onChange={(e) => handleExistingOptionChange(idx, i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                    />
                  ))}

                  <label>Correct Answer:</label>
                  <input
                    value={q.answer}
                    onChange={(e) => handleExistingQuestionChange(idx, 'answer', e.target.value)}
                  />

                  <label>Image URL:</label>
                  <input
                    value={q.imageUrl || ''}
                    placeholder="https://example.com/image.png"
                    onChange={(e) => handleExistingQuestionChange(idx, 'imageUrl', e.target.value)}
                  />

                  <button className="delete" onClick={() => handleDeleteQuestion(idx)}>
                    Delete Question
                  </button>
                </div>
              ))}

              <h4>Add New Question</h4>
              <input
                placeholder="Question"
                value={newQuestion.question}
                onChange={(e) => handleNewQuestionChange('question', e.target.value)}
              />

              {[0, 1, 2, 3].map(i => (
                <input
                  key={i}
                  placeholder={`Option ${i + 1}`}
                  value={newQuestion.options[i]}
                  onChange={(e) => handleOptionChange(i, e.target.value)}
                />
              ))}

              <input
                placeholder="Correct Answer"
                value={newQuestion.answer}
                onChange={(e) => handleNewQuestionChange('answer', e.target.value)}
              />

              <input
                placeholder="Image URL (optional)"
                value={newQuestion.imageUrl}
                onChange={(e) => handleNewQuestionChange('imageUrl', e.target.value)}
              />

              <button onClick={addQuestionToQuiz}>Add New Question</button>
            </>
          )}

          {activeTab === 'settings' && (
            <>
              <h4>Quiz Settings</h4>
              <label>Topic Name:</label>
              <input
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  setQuizData(prev => ({ ...prev, topic: e.target.value }));
                }}
              />

              <label>Duration (seconds):</label>
              <input
                type="number"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                  setQuizData(prev => ({ ...prev, duration: Number(e.target.value) }));
                }}
              />
            </>
          )}

            <button onClick={handleSaveQuiz}>Save Quiz</button>    
        </>
      )}
    </div>
  );
};

export default ManageQuizzes;
