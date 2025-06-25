import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


export const Signup = () => {
  const navigate = useNavigate();

  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo((prev) => ({ ...prev, [name]: value }));
    console.log(name,value)
  };


  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, email, password } = signupInfo;

    try {
      const response = await axios.post('http://localhost:5000/user/signup', {
        name,
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        setMessage('Signup successful! Redirecting to login...');
        setError('');
        setSignupInfo({ name: '', email: '', password: '' });

        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Signup error:', err);
      setMessage('');
      if (err.response && err.response.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Signup failed. Please check your input or try again later.');
      }
    }
  };

  return (
    <div className='container'>
      <h2>Sign up</h2>

      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSignup}>
        <div>
          <label htmlFor='name'>Name</label>
          <input
            onChange={handleChange}
            type='text'
            name='name'
            placeholder='Enter Your Full Name'
            autoFocus
            value={signupInfo.name}
          />
        </div>

        <div>
          <label htmlFor='email'>Email</label>
          <input
            onChange={handleChange}
            type='email'
            name='email'
            placeholder='xyz@gmail.com'
            value={signupInfo.email}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            onChange={handleChange}
            type='password'
            name='password'
            placeholder='*********'
            value={signupInfo.password}
          />
        </div>

        <button type='submit'>Sign Up</button>
        <span>
          Already have an account? <Link to='/login'>Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Signup;
