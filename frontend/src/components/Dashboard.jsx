import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import { CSSTransition } from 'react-transition-group';
import './Dashboard.css'; // Ensure you have CSS for transitions

function Dashboard() {
  const [showOTP, setShowOTP] = useState(false);
  const [signupData, setSignupData] = useState({});
  const [token, setToken] = useState('');
  const [showSignin, setShowSignin] = useState(false); // State to toggle Signin page

  const switchToSignin = () => {
    setShowSignin(true);
  };

  const switchToSignup = () => {
    setShowSignin(false);
  };


  return (
    <div className='flex justify-center items-center h-screen w-screen bg-gray-800 text-white'>
      <CSSTransition
        in={!showSignin}
        timeout={500}
        classNames="form"
        unmountOnExit
      >
        <div className='flex flex-col p-10 bg-gray-900 rounded-lg shadow-lg'>
          <Signup 
            setShowOTP={setShowOTP} 
            setSignupData={setSignupData} 
            showOTP={showOTP} 
            switchToSignin={switchToSignin}
          />
        </div>
      </CSSTransition>
      <CSSTransition
        in={showSignin}
        timeout={500}
        classNames="form"
        unmountOnExit
      >
        <div className='flex flex-col p-10 bg-gray-900 rounded-lg shadow-lg'>
          <Signin setToken={setToken} />
          <p className="mt-4 text-white text-center">
            Don't have an account?{' '}
            <button 
              className="bg-transparent text-blue-500 p-2 border-0 border-transparent hover:border-blue-500 hover:text-blue-700 transition-colors duration-300"
              onClick={switchToSignup}
            >
              Sign up
            </button>
          </p>
        </div>
      </CSSTransition>
    </div>
  );
}

export default Dashboard;
