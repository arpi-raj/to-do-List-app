import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
    localStorage.removeItem("token");
    setClick(false);
  };

  const showButton = () => {
    setClick(window.innerWidth > 960);
  };

  useEffect(() => {
    showButton();
    window.addEventListener("resize", showButton);
    return () => {
      window.removeEventListener("resize", showButton);
    };
  }, []);

  return (
    <nav className="bg-primary h-20 flex justify-between items-center text-xl sticky top-0 z-50 px-4">
      <div className="ml-4">
        <Link
          to="/"
          className="text-text text-2xl font-bold flex items-center hover:no-underline"
        >
          ToDo
          <i className="fab fa-typo3 text-2xl ml-2" />
        </Link>
      </div>
      <div className="md:hidden flex items-center" onClick={handleClick}>
        <i
          className={
            click
              ? "fas fa-times text-text text-2xl"
              : "fas fa-bars text-text text-2xl"
          }
        />
      </div>
      <div className="mr-4">
        <ul
          className={
            click
              ? "flex flex-col items-center bg-primary w-full py-4"
              : "hidden md:flex md:flex-row md:items-center md:bg-transparent"
          }
        >
          <li className="py-2 md:py-0">
            <Link
              to="/"
              className="text-text px-4 font-bold hover:no-underline md:px-2"
              onClick={closeMobileMenu}
            >
              Log Out
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
