import React, { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance'; // ✅ use your instance

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axiosInstance.get('/leaderboard/leaderboard'); // ✅ consistent
        setEntries(res.data);
      } catch (err) {
        console.error('Failed to fetch leaderboard:', err);
      }
    };
    fetchLeaderboard();
  }, []);

  return (
    <div className="leaderboard-container">
      <h2>Leaderboard</h2>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Topic</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, i) => (
            <tr key={i}>
              <td>{entry.username}</td>
              <td>{entry.topic}</td>
              <td>{entry.score} / {entry.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
