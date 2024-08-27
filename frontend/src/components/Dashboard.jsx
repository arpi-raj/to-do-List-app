import React, { useState } from 'react';
import Signup from './Signup';
import Signin from './Signin';
import ResetPassword from './ResetPassword';
import { CSSTransition } from 'react-transition-group';
import '../styles/Dashboard.css'; 

function Dashboard() {
  const [showOTP, setShowOTP] = useState(false);
  const [signupData, setSignupData] = useState({});
  const [token, setToken] = useState('');
  const [currentView, setCurrentView] = useState('signin'); 

  const switchToSignin = () => setCurrentView('signin');
  const switchToSignup = () => setCurrentView('signup');
  const switchToResetPassword = () => setCurrentView('resetPassword');

  return (
    <div className='dashboard-container flex justify-center items-center h-screen w-screen bg-white text-white'>
      <CSSTransition
        in={currentView === 'signup'}
        timeout={500}
        classNames="form"
        unmountOnExit
      >
        <div className='transition-wrapper flex flex-col p-10 rounded-lg shadow-lg'>
          <Signup 
            setShowOTP={setShowOTP} 
            setSignupData={setSignupData} 
            showOTP={showOTP} 
            switchToSignin={switchToSignin}
          />
        </div>
      </CSSTransition>
      <CSSTransition
        in={currentView === 'signin'}
        timeout={500}
        classNames="form"
        unmountOnExit
      >
        <div className='transition-wrapper flex flex-col p-10 rounded-lg shadow-lg'>
          <Signin switchToSignup={switchToSignup} switchToResetPassword={switchToResetPassword} />
        </div>
      </CSSTransition>
      <CSSTransition
        in={currentView === 'resetPassword'}
        timeout={500}
        classNames="form"
        unmountOnExit
      >
        <div className='transition-wrapper flex flex-col p-10 rounded-lg shadow-lg'>
          <ResetPassword switchToSignin={switchToSignin} />
        </div>
      </CSSTransition>
    </div>
  );
}

export default Dashboard;
