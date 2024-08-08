import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signin = ({ setToken }) => {
  const [signinData, setSigninData] = useState({ email: '', password: '' });

  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signin', {
          email: signinData.email,
          password: signinData.password
      });
      if (response.status === 200) {
        setToken(response.data.token);
        console.log(response.data.token)
        handleSigninClick
      } else if (response.status === 401) {
        console.log(response.data.msg);
      }
    } catch (error) {
      if (error.response) {
        console.error('Signin error:', error.response.data.msg);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up request:', error.message);
      }
    }
  };

  const [showHome, setShowHome] = useState(false); 
  const navigate = useNavigate();

  const handleSigninClick = () => {
    setShowHome(true);
    navigate("/home"); 
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 p-1 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="mb-6 text-white text-3xl font-semibold">Sign In</h2>
      <form onSubmit={handleSigninSubmit} className="w-full flex flex-col">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={signinData.email}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={signinData.password}
          onChange={handleSigninChange}
          required
          className="p-4 my-2 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
        />
        <button
          type="submit"
          className="p-4 mt-4 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
          onClick={handleSigninSubmit}
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default Signin;
