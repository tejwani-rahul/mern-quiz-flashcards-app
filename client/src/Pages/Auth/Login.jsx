// src/Pages/Login.jsx
import axios from 'axios';
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext'; // ✅ import context

export const Login = () => {
  const navigate = useNavigate();
  const { checkToken } = useContext(AuthContext); // ✅ access checkToken

  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
  e.preventDefault();
  const { email, password } = loginInfo;

  try {
    const response = await axios.post('http://localhost:5000/user/login', {
      email,
      password,
    });

    if (response.status === 200 || response.status === 201) {
      const token = response.data.token;
      localStorage.setItem('token', token); // ✅ Save token

      await checkToken(); // ✅ wait for context update

      setMessage('Login Successful!');
      setError('');
      setLoginInfo({ email: '', password: '' });

      navigate('/user/topics'); // ✅ Navigate after state is updated
    } else {
      setMessage('Something went wrong. Try again.');
    }
  } catch (err) {
    console.error('Login Error:', err);
    setMessage('');
    if (err.response && err.response.data?.message) {
      setError(err.response.data.message);
    } else {
      setError('Login failed. Please try again.');
    }
  }
};

  return (
    <div className='container'>
      <h2>Log In</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='xyz@gmail.com'
            autoFocus
            value={loginInfo.email}
            required
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='******'
            value={loginInfo.password}
            required
          />
        </div>

        <button type='submit'>Login</button>
        <span>
          Create new account? <Link to='/signup'>Signup</Link>
        </span>
      </form>
    </div>
  );
};

export default Login;
