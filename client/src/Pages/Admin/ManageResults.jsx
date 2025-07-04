import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';

const ManageResults = () => {
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const fetchResults = async () => {
    try {
      const res = await axiosInstance.get('/admin/results');
      setResults(res.data);
    } catch (err) {
      console.error('Fetch results error:', err);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);

  const handleReviewClick = (result) => {
    navigate(`/quiz/${result.topic}/review`, {
      state: {
        reviewItems: result.reviewItems,
        from: 'admin-reports'
      }
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this result?')) {
      return;
    }

    try {
      await axiosInstance.delete(`/admin/results/${id}`);
      // Refresh list after delete
      setResults(results.filter((result) => result._id !== id));
    } catch (err) {
      console.error('Delete result error:', err);
    }
  };

  return (
    <div className="container">
      <h2>Quiz Results</h2>
      <ul>
        {results.map((result) => (
          <div
            key={result._id}         
          >
            <div onClick={() => handleReviewClick(result)}>
              <strong>{result.userId?.name} ({result.userId?.email})</strong>
              <br />
              Topic: {result.topic} <br />
              Score: {result.score}/{result.total} <br />
              Date: {new Date(result.createdAt).toLocaleString()}
            </div>
            <button className='delete' onClick={() => handleDelete(result._id)}>
              Delete Result
            </button>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default ManageResults;
