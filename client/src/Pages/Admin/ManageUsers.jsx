import React, { useEffect, useState } from 'react';
import axiosInstance from '../../api/axiosInstance';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      const res = await axiosInstance.get('/admin/users');
      setUsers(res.data);
    } catch (err) {
      console.error('Fetch Users Error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axiosInstance.delete(`/admin/users/${id}`);
        fetchUsers();
      } catch (err) {
        console.error('Delete user error:', err);
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container">
      <h2>All Registered Users</h2>
      
      <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
          <tbody>
            {users
            .slice() // make a shallow copy so we don’t mutate state
            .sort((a, b) => {
              if (a.role === 'admin' && b.role !== 'admin') return 1;
              if (a.role !== 'admin' && b.role === 'admin') return -1;
              return 0;
            }).map(user => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role }</td>
                  <td>
                      {user.role !== 'admin' && (
                      <button onClick={() => handleDelete(user._id)}>Delete</button>)}
                  </td>
              </tr>
            ))}
          </tbody>
      </table>
      </div>
    </div>
  );
};

export default ManageUsers;
