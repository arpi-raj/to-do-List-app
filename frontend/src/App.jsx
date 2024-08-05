import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [signupData, setSignupData] = useState({ username: '', email: '', password: '' });
  const [signinData, setSigninData] = useState({ email: '', password: '' });
  const [showOTP, setShowOTP] = useState(false);
  const [token,setToken] = useState('')
  const [otp, setOTP] = useState('');
  const [activeForm, setActiveForm] = useState('');

  const handleSignupChange = async (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signup', {}, {
        headers: {
          'Content-Type': 'application/json',
          'username': signupData.username,
          'email': signupData.email,
          'password': signupData.password,
        }
      });
      console.log(response);
      if (response.status === 200) {
        setShowOTP(true); // Show OTP input if signup is successful
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSigninChange = (e) => {
    setSigninData({ ...signinData, [e.target.name]: e.target.value });
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/signin', {},{
        headers: {
          email:signinData.email,
          password:signinData.password
        }
      });
      if (response.status === 200) {
        // Handle successful signin (e.g., redirect to a dashboard)
        console.log("response"+response.data)
        setToken(response.data.token)
        console.log(token)
        //now land to the main page
      }else if(response.status===401){
        console.log(response.data.msg)
      }
    } catch (error) {
      console.error('Signin error:', error);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/user/verifyotp', { otp },{
        headers: {
          email:signupData.email,
          otp:otp
        }
      });
      if (response.status === 200) {
        // Handle successful OTP verification (e.g., show a success message)
        // to do further land to the main page after doing the signin call
        console.log(response.data.message)
      }
      if (response.status === 401) {
        console.log(response.data.message)
      }
    } catch (error) {
      console.error('OTP verification error:', error);
    }
  };

  const handleFocus = (formType) => {
    setActiveForm(formType);
  };

  const handleBlur = () => {
    setActiveForm('');
  };

  return (
    <div className={`container ${activeForm}`}>
      <div
        className={`App signup ${activeForm === 'signup-active' ? 'active' : ''}`}
        onMouseEnter={() => setActiveForm('signup-active')}
        onMouseLeave={() => setActiveForm('')}
      >
        <h2>Signup</h2>
        <form onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={signupData.username}
            onChange={handleSignupChange}
            onFocus={() => handleFocus('signup-active')}
            onBlur={handleBlur}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            onFocus={() => handleFocus('signup-active')}
            onBlur={handleBlur}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            onFocus={() => handleFocus('signup-active')}
            onBlur={handleBlur}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
        {showOTP && (
          <form onSubmit={handleOTPSubmit}>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOTP(e.target.value)}
              onFocus={() => handleFocus('signup-active')}
              onBlur={handleBlur}
              required
            />
            <button type="submit">Verify OTP</button>
          </form>
        )}
      </div>
      <div
        className={`App signin ${activeForm === 'signin-active' ? 'active' : ''}`}
        onMouseEnter={() => setActiveForm('signin-active')}
        onMouseLeave={() => setActiveForm('')}
      >
        <h2>Signin</h2>
        <form onSubmit={handleSigninSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signinData.email}
            onChange={handleSigninChange}
            onFocus={() => handleFocus('signin-active')}
            onBlur={handleBlur}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signinData.password}
            onChange={handleSigninChange}
            onFocus={() => handleFocus('signin-active')}
            onBlur={handleBlur}
            required
          />
          <button type="submit">Sign In</button>
        </form>
      </div>
    </div>
  );
}

export default App;
