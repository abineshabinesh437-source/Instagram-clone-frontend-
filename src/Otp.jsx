import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Otp() {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const handleOtpSubmit = async () => {
    if (!otp.trim()) {
      alert('Please enter the OTP');
      return;
    }
       const email = localStorage.getItem('email');
    try {
      const response = await fetch(`http://localhost:2002/Auth_log/otp?email=${email}&otp=${otp}`, {
        method: 'POST'
       
      });

      if (response.ok) {
        // OTP verified successfully
        navigate('/'); //go to login
      } else {
        const error = await response.json();
        alert(error.message || 'Invalid OTP');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      alert('Server error. Try again later.');
    }
  };

  return (
    <div className='login'>
      <h2>OTP</h2>

      <input
        className='inputBox form-control'
        type='text'
        placeholder='Enter OTP'
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <button className='btn btn-primary m-3' onClick={handleOtpSubmit}>
        Submit
      </button>

      <Link className='link' to='/register'>
        Register Page
      </Link>
    </div>
  );
}

export default Otp;
