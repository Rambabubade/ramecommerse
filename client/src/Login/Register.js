import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate

const Register = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/user/register', user)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('accesstoken', res.data.accesstoken);
        localStorage.setItem('refreshtoken', res.data.refreshtoken);
        navigate('/'); // Redirect to home page after successful registration
      })
      .catch(err => console.error(err));
    setUser({ name: '', email: '', password: '' });
  };

  return (
    <div className='register-page'>
      <form className='reg' onSubmit={registerSubmit}> {/* Add onSubmit handler */}
        <img className='regimg' src='img1.jpg'/>
        <input
          type='text'
          name='name'
          placeholder='Name'
          value={user.name}
          onChange={onChangeInput}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={user.email}
          onChange={onChangeInput}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
          value={user.password}
          onChange={onChangeInput}
        />
        <button type='submit'>Register</button>
        <Link className='Link' to='/login'>Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Register;
