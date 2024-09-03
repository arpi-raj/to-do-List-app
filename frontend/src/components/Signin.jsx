import React, { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { token } from '../../store/atoms/states';
import CryptoJS from 'crypto-js';

const Signin = ({ switchToSignup, switchToResetPassword }) => {
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false); // State for toggling password visibility
  const navigate = useNavigate();
  const setToken = useSetRecoilState(token);

  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = hashPassword(signinData.password);

      const response = await axios.post('http://localhost:3000/user/signin', {
        email: signinData.email,
        password: hashedPassword
      });

      if (response.status === 200) {
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
        navigate("/home");
      } else {
        setErrorMessage(response.data.msg || 'Signin failed. Please try again.');
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.msg || 'Signin error. Please try again.');
    }
  };

  return (
    <div className='flex flex-col items-center bg-white p-10 rounded-lg shadow-lg w-full max-w-md'>
      <h2 className="mb-6 text-black text-3xl font-semibold">Sign in</h2>
      <form onSubmit={handleSigninSubmit} className="w-full flex flex-col">
      <input
          type="email"
          name="email"
          placeholder="Email"
          value={signinData.email}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Email"
        />
        <div>
          <svg 
            className="relative -mt-9 left-80 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-800 cursor-pointer hover:scale-105" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 48 48"
          >
            <path stroke="currentColor" strokeWidth="2" d="M45,7H3a3,3,0,0,0-3,3V38a3,3,0,0,0,3,3H45a3,3,0,0,0,3-3V10A3,3,0,0,0,45,7Zm-.64,2L24,24.74,3.64,9ZM2,37.59V10.26L17.41,22.17ZM3.41,39,19,23.41l4.38,3.39a1,1,0,0,0,1.22,0L29,23.41,44.59,39ZM46,37.59,30.59,22.17,46,10.26Z"/>
          </svg>
        </div>

        <input
          type={showPassword ? "text" : "password"}  // Toggle input type based on showPassword state
          name="password"
          placeholder="Password"
          value={signinData.password}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-black rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Password"
        />
        <div>
          {showPassword ? (
            <svg
              onClick={() => setShowPassword(false)}
              className="relative -mt-9 left-80 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-800 cursor-pointer hover:scale-105"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <line x1="1" y1="1" x2="23" y2="23" stroke="currentColor" strokeWidth="2" />
            </svg>
          ) : (
            <svg
              onClick={() => setShowPassword(true)}
              className="relative -mt-9 left-80 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-800 cursor-pointer hover:scale-105"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path stroke="currentColor" strokeWidth="2" d="M21 12c0 1.2-4.03 6-9 6s-9-4.8-9-6c0-1.2 4.03-6 9-6s9 4.8 9 6Z" />
              <path stroke="currentColor" strokeWidth="2" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          )}
        </div>

        <button
          type="button"
          className="bg-transparent text-blue-500 p-2 ml-auto mt-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
          onClick={switchToResetPassword}
        >
          Forgot Password?
        </button>
        <button
          type="submit"
          className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        >
          Login
        </button>
        {errorMessage && (
          <p className="mt-4 text-red-500 text-center">{errorMessage}</p>
        )}
      </form>
      <p className="mt-4 text-gray-900 text-center">
        Don't have an account?{' '}
        <button 
          className="bg-transparent text-blue-500 p-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
          onClick={switchToSignup} 
        >
          Sign up
        </button>
      </p>
    </div>
  );
};

export default Signin;
