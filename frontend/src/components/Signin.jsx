import React, { useState } from 'react';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { token } from '../../store/atoms/states';
import CryptoJS from 'crypto-js';

const Signin = ({ switchToSignup, switchToResetPassword }) => {
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
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
      <h2 className="mb-6 text-black text-3xl font-semibold">Sign In</h2>
      <form onSubmit={handleSigninSubmit} className="w-full flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signinData.email}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Email"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signinData.password}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-gray-600 rounded-lg bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          aria-label="Password"
        />
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
