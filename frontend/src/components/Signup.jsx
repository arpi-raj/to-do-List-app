import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setShowOTP, setSignupData, showOTP, switchToSignin }) => {
  const [localSignupData, setLocalSignupData] = useState({ username: '', email: '', password: '' });
  const [otp, setOTP] = useState('');

  const handleSignupChange = (e) => {
    setLocalSignupData({ ...localSignupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {
          'Content-Type': 'application/json',
          'username': localSignupData.username,
          'email': localSignupData.email,
          'password': localSignupData.password,
        }
      );
      if (response.status === 200) {
        setShowOTP(true); // Show OTP input if signup is successful
        setSignupData(localSignupData);
        console.log(response.data.msg)
      }
    } catch (error) {
      console.error('Signup error:', error);
      console.log(error.response.data.msg)
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/verifyotp',{
          email: localSignupData.email,
          otp: otp
      });
      if (response.status === 200) {
        console.log(response.data.message);
      } else if (response.status === 401) {
        console.log(response.data.message);
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  return (
    <div className='flex flex-col items-center bg-gray-800 p-10 rounded-lg shadow-lg w-full max-w-md'>
      <h2 className='mb-5 text-white text-center text-2xl'>Sign up</h2>
      <form onSubmit={handleSignupSubmit} className='w-full flex flex-col'>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={localSignupData.username}
          onChange={handleSignupChange}
          required
          className='p-3 my-2 border border-gray-700 rounded bg-gray-700 text-white focus:bg-gray-600 focus:outline-none focus:transform focus:scale-105 transition'
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={localSignupData.email}
          onChange={handleSignupChange}
          required
          className='p-3 my-2 border border-gray-700 rounded bg-gray-700 text-white focus:bg-gray-600 focus:outline-none focus:transform focus:scale-105 transition'
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={localSignupData.password}
          onChange={handleSignupChange}
          required
          className='p-3 my-2 border border-gray-700 rounded bg-gray-700 text-white focus:bg-gray-600 focus:outline-none focus:transform focus:scale-105 transition'
        />
        <button 
          type="submit" 
          className='p-3 mt-3 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500 focus:outline-none focus:transform focus:scale-105 transition'
        >
          Sign Up
        </button>
      </form>
      <h3 className='mt-4 text-white'>
        Already have an Account? 
        <button 
          className="bg-transparent text-blue-500 p-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
          onClick={switchToSignin}
        >
          Log in
        </button>
      </h3>
      {showOTP && (
        <form onSubmit={handleOTPSubmit} className='w-full flex flex-col mt-4'>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            required
            className='p-3 my-2 border border-gray-700 rounded bg-gray-700 text-white focus:bg-gray-600 focus:outline-none focus:transform focus:scale-105 transition'
          />
          <button 
            type="submit" 
            className='p-3 mt-3 bg-green-600 text-white rounded cursor-pointer hover:bg-green-500 focus:outline-none focus:transform focus:scale-105 transition'
          >
            Verify OTP
          </button>
        </form>
      )}
    </div>
  );
};

export default Signup;