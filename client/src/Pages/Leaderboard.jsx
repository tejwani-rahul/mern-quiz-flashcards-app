import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [topics, setTopics] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('topic'); // 'topic' or 'global'
  const [selectedTopic, setSelectedTopic] = useState('all');

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const res = await axiosInstance.get('/topics/topics'); 
        setTopics(res.data);
      } catch (err) {
        console.error('Failed to fetch topics:', err);
      }
    };
    fetchTopics();
  }, []);

  // Fetch leaderboard whenever view mode or topic changes
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);

        let url = `/leaderboard/leaderboard?view=${viewMode}`;
        if (viewMode === 'topic' && selectedTopic !== 'all') {
          url += `&topic=${selectedTopic}`;
        }

        const res = await axiosInstance.get(url);
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
        setError('Could not load leaderboard.');
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, [viewMode, selectedTopic]);

  const getRankIcon = (rank) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  return (
    <div className="leaderboard-container">
      <h2>🏆 Quiz Leaderboard</h2>

      <div className="leaderboard-controls">
        {/* View toggle */}
        <button
          onClick={() => setViewMode('topic')}
          className={viewMode === 'topic' ? 'active' : ''}
        >
          📚 By Topic
        </button>
        <button
          onClick={() => setViewMode('global')}
          className={viewMode === 'global' ? 'active' : ''}
        >
          🌍 Global
        </button>

        {/* Topic selector */}
        {viewMode === 'topic' && (
          <select
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
          >
            <option value="all">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        )}
      </div>

      {loading ? (
        <p>Loading leaderboard...</p>
      ) : error ? (
        <p>{error}</p>
      ) : entries.length === 0 ? (
        <p>No leaderboard data available.</p>
      ) : (
        <div className="table-wrapper">
        <table className="leaderboard-table">
         <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              {viewMode === 'topic' && selectedTopic === 'all' && <th>Topic</th>}
              {viewMode === 'global' && <th>Topics</th>}
              <th>Score</th>
              {viewMode === 'topic' && <th>Attempts</th>}
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={index}>
              <td>{getRankIcon(index + 1)}</td>
              <td>{entry.username}</td>
              {viewMode === 'topic' && selectedTopic === 'all' && (
                <td>{entry.topic}</td>
              )}
              {viewMode === 'global' && (
                <td>{entry.topicCount} topics</td>
              )}
              <td>
                {viewMode === 'global'
                  ? `${entry.totalScore} / ${entry.totalQuestions}`
                  : `${entry.score} / ${entry.total}`}
              </td>
              {viewMode === 'topic' && (
                <td>{entry.attempts}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      )}
    </div>
  );
};

export default Leaderboard;
