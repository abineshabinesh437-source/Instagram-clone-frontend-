import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // to navigate programmatically
import { Link } from 'react-router-dom';

function Register() {
  const [fullName, setName] = useState('');
  const [userName, setUsername] = useState('');
  const [phonenumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    // Basic validation
    if (
      !fullName.trim() ||
      !userName.trim() ||
      !phonenumber.trim() ||
      !email.trim() ||
      !password.trim()
    ) {
      alert('All fields are required');
      return;
    }

    // Prepare payload
    const userData = {
     userName, 
       email,  
       password,
        phonenumber,
          fullName
    };

    try {
      const response = await fetch('http://localhost:2002/Auth_log/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const result = await response.text();
      if (response.ok) {
       
        localStorage.setItem('email',result)
        // On success, navigate to OTP page
        navigate('/otp');
      } 
     
      else {
        const error = await response.json();
        alert('Registration failed: ' + (error.message || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert(`Error connecting to server${err}`);
    }
  };

  return (
    <div className="height">
      <h2>Register</h2>

      <input
        type="text"
        value={fullName}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className={`inputBox form-control ${fullName.trim() !== '' ? 'not-empty' : ''}`}
      />

      <input
        type="text"
        value={userName}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        className={`inputBox form-control ${userName.trim() !== '' ? 'not-empty' : ''}`}
      />

      <input
        type="number"
        value={phonenumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
        placeholder="Phone Number"
        className={`inputBox form-control ${phonenumber.trim() !== '' ? 'not-empty' : ''}`}
      />

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className={`inputBox form-control ${email.trim() !== '' ? 'not-empty' : ''}`}
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className={`inputBox form-control ${password.trim() !== '' ? 'not-empty' : ''}`}
      />

      <button className="click btn btn-primary" onClick={handleRegister}>
        Register
      </button>

      <Link className="link" to="/">
        Login
      </Link>
    </div>
  );
}

export default Register;
