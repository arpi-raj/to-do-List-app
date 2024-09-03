import React, { useState, useEffect } from 'react';
import Header from './Header';
import TodoList from './TodoList';
import AddTodos from './AddTodos';
import Navbar from './Navbar';

const Home = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0]; 
    setSelectedDate(today);
  }, []);

  const handleToggle = () => {
    setShowForm(prevState => !prevState);
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <Navbar />
      <div className="w-screen h-full bg-gray-900 text-white flex flex-col items-center p-5">
        <Header />
        <div className="w-full max-w-full p-5 bg-gray-700 rounded-lg shadow-lg mb-5">
          <button
            onClick={handleToggle}
            className="px-4 py-3 bg-blue-500 text-white rounded-lg w-full mb-5 transition duration-300 hover:bg-blue-600"
            aria-expanded={showForm}
          >
            {showForm ? 'Hide Form' : 'Add Todo'}
          </button>
          {showForm && <AddTodos />}
          {/* <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg w-full mb-5"
          /> */}
        </div>
        <div className="flex w-full max-w-full">
          <div className="w-1/3 p-5 bg-gray-800 rounded-lg shadow-lg mr-5">
            <h2 className="text-xl font-bold mb-4">All Todos</h2>
            <TodoList filterDate={null} /> 
          </div>

          <div className="w-2/3 p-5 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">
              Task For Today
            </h2>
            <TodoList filterDate={selectedDate} /> 
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
