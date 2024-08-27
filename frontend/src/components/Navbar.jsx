import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    setClick(window.innerWidth > 960);
  };

  useEffect(() => {
    showButton();
    window.addEventListener('resize', showButton);
    return () => {
      window.removeEventListener('resize', showButton);
    };
  }, []);

  return (
    <nav className='bg-gradient-to-r from-gray-800 to-gray-900 h-20 flex justify-between items-center text-xl sticky top-0 z-50 gap-10'>
      <div className='ml-[5vw]'>
        <Link to='/' className='text-white text-2xl font-bold flex items-center'>
          ToDo
          <i className='fab fa-typo3 text-2xl ml-2' />
        </Link>
      </div>
      <div className='md:hidden' onClick={handleClick}>
        <i className={click ? 'fas fa-times text-white text-2xl' : 'fas fa-bars text-white text-2xl'} />
      </div>
      <div className='mr-[5vw]'>
        <ul className={click ? 'flex flex-col items-center bg-gray-900 w-full py-4' : 'hidden md:flex md:flex-row md:items-center md:bg-transparent'}>
          <li className='py-2 md:py-0'>
            <Link to='/' className='text-white px-4 md:px-2' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          {/* <li>
            <Link to='/agentlogin' className='text-white px-4 md:px-2' onClick={closeMobileMenu}>
              Commission
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
