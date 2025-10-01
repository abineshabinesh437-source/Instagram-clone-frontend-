import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      alert('Please enter both email and password');
      return;
    }

    try {
     const formBody = new URLSearchParams({ email, password });

const response = await fetch('http://localhost:2002/Auth_log/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: formBody.toString(),
});

      if (response.ok) {
        const data = await response.json();

        // Optional: Store token or user info
         localStorage.setItem('token', data.Token);
         localStorage.setItem('id', data.id);
         localStorage.setItem('role', data.role);
         const give = localStorage.getItem('token')
          console.log(give)
        navigate('/home'); // go to home page
      } else {
        const err = await response.json();
        alert(err.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className='login'>
      <h2>Login</h2>

      <input
        type='email'
        placeholder='Email'
        className='inputBox form-control'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type='password'
        placeholder='Password'
        className='inputBox form-control'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className='click btn btn-primary mt-3' onClick={handleLogin}>
        Login
      </button>

      <Link className='link d-block mt-2' to='/register'>
        Register
      </Link>
    </div>
  );
}

export default Login;
