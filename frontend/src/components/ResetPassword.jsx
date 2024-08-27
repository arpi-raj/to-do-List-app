import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = ({ switchToSignin }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleResetSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/reset-password', {
        email: email,
      });

      if (response.status === 200) {
        setMessage('Password reset link sent! Please check your email.');
        setErrorMessage('');
      } else {
        setErrorMessage(response.data.msg || 'Failed to send reset link. Please try again.');
        setMessage('');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'An error occurred. Please try again.');
      setMessage('');
    }
  };

  return (
    <div className='flex flex-col items-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
      <h2 className="mb-6 text-black text-3xl font-semibold">Reset Password</h2>
      <form onSubmit={handleResetSubmit} className="w-full flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          required
          className="p-4 my-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Email"
        />
        <button
          type="submit"
          className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Send Reset Link
        </button>
        {message && (
          <p className="mt-4 text-green-500 text-center">{message}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
      <p className="mt-4 text-gray-900 text-center">
        Remembered your password?{' '}
        <button 
          className="bg-transparent text-blue-500 p-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
          onClick={switchToSignin} 
        >
          Sign in
        </button>
      </p>
    </div>
  );
};

export default ResetPassword;
