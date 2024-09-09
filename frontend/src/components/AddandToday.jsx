import React, { useState, useEffect } from 'react';
import AddTodos from './AddTodos';
import TodoList from './TodoList';

const AddAndTodayTodos = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);
  }, []);

  const handleToggle = () => {
    setShowForm((prevState) => !prevState);
  };

  return (
    <div className="relative w-2/4 text-left  mt-20 p-5 ml-32 bg-white border-none rounded-lg shadow-lg overflow-y-auto max-h-[calc(100vh-16rem)]">
      <button
        onClick={handleToggle}
        className="absolute top-0 right-0 flex items-center justify-center px-4 py-2 mt-3 mr-3 bg-blue-100 text-blue-500 rounded-full shadow-md transition duration-300 hover:bg-blue-200"
        aria-expanded={showForm}
      >
        <span className="text-xl mr-2">+</span>
        <span className="font-medium">New task</span>
      </button>

      {showForm && <AddTodos />}
      
      <h2 className="text-xl font-bold mb-4">Task For Today</h2>
      <TodoList filterDate={selectedDate} />
    </div>
  );
};

export default AddAndTodayTodos;
