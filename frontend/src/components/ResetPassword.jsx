import React, { useState } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';

const ResetPassword = ({ switchToSignin }) => {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reenterPassword, setReenterPassword] = useState('');
  const [showOTP, setShowOTP] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [successMessage, setSuccessMessage] = useState(''); 
  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleOTPChange = (e) => {
    setOTP(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleReenterPasswordChange = (e) => {
    setReenterPassword(e.target.value);
  };

  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  // Submit email for OTP
  const handleSendOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/forgotpass', {
        email: email,
      });
      if (response.status === 200) {
        setShowOTP(true); 
        console.log('OTP sent successfully');
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  // Verify OTP
  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/verifyotp', {
        email: email,
        otp: otp,
      });
      if (response.status === 200) {
        setShowPasswordFields(true); 
        console.log('OTP verified successfully');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };

  // Submit new password
  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== reenterPassword) {
      console.log('Passwords do not match');
      return;
    }

    try {
      const hashedNewPassword = hashPassword(newPassword);
      const response = await axios.post('http://localhost:3000/user/reset-password', {
        email: email,
        otp: otp,
        newPassword: hashedNewPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Password reset successfully! Redirecting to sign in...');
        setTimeout(() => {
          switchToSignin();
        }, 2000); 
      }
    } catch (error) {
      console.error('Error resetting password:', error);
    }
  };

  return (
    <div className='flex flex-col items-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
      <h2 className='mb-5 text-black text-center text-3xl font-semibold'>
        Reset Password
      </h2>

      {/* Enter email */}
      {!showOTP && (
        <form onSubmit={handleSendOTP} className='w-full flex flex-col'>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          />

          <button
            type="submit"
            className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Send OTP
          </button>
        </form>
      )}

      {/* Enter OTP */}
      {showOTP && !showPasswordFields && (
        <form onSubmit={handleOTPSubmit} className='w-full flex flex-col'>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOTPChange}
            required
            className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          />

          <button
            type="submit"
            className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Verify OTP
          </button>
        </form>
      )}

      {/* Reset Password */}
      {showPasswordFields && (
        <form onSubmit={handleResetPasswordSubmit} className='w-full flex flex-col'>
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            required
            className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          />

          <input
            type="password"
            placeholder="Re-enter New Password"
            value={reenterPassword}
            onChange={handleReenterPasswordChange}
            required
            className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          />

          <button
            type="submit"
            className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          >
            Reset Password
          </button>
        </form>
      )}
      <p className="mt-4 text-gray-900 text-center">
        Remembered your password?{' '}
        <button 
          className="bg-transparent text-blue-500 p-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
          onClick={switchToSignin} 
        >
          Sign in
        </button>
      </p>

      {successMessage && <p className="mt-4 text-green-600">{successMessage}</p>}
    </div>
  );
};

export default ResetPassword;
