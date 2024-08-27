import React, { useState } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import AddTodos from './AddTodos';
import Navbar from './Navbar';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div>
      <Navbar />
      <div className="w-screen h-screen bg-gray-900 text-white flex flex-col items-center p-5">
        <Header />
        <div className="w-full max-w-full p-5 bg-gray-700 rounded-lg shadow-lg">
          <button
            onClick={handleToggle}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg w-full mb-5 transition duration-300 hover:bg-blue-600"
          >
            {showForm ? 'Hide Form' : 'Add Todo'}
          </button>
          {showForm && <AddTodos />}
        </div>
        <TodoList />
      </div>
    </div>
  );
};

export default Home;
