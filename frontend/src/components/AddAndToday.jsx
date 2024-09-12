import React, { useState, useEffect } from 'react';
import AddTodos from './AddTodos';
import TodoList from './TodoList';
import { useSetRecoilState } from 'recoil';
import { todoState } from "../../store/atoms/states";

const AddAndTodayTodos = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const setTodos = useSetRecoilState(todoState);

  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setSelectedDate(today);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleToggle = () => {
    setShowForm((prevState) => !prevState);
  };

  const fetchTodos = async () => {
    try {
      const response = await fetch('http://localhost:3000/user/todos', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      console.error('Error fetching todos:', error.message);
    }
  };

  return (
    <div className="relative w-full md:w-2/4 text-left mt-4 md:mt-5 p-3 md:p-5 mx-auto md:ml-32 bg-background border-none rounded-lg shadow-lg">
      <button
        onClick={handleToggle}
        className={`${
          isMobile ? 'fixed bottom-4 right-4 z-30' : 'absolute top-0 right-0 mt-3 mr-3'
        } flex items-center justify-center px-4 py-2 bg-primary text-white rounded-full shadow-md transition duration-300 hover:bg-blue-500`}
        aria-expanded={showForm}
      >
        <span className="text-xl mr-2">+</span>
        <span className="font-medium">New Task</span>
      </button>

      {showForm && (
        <div
          className={`${
            isMobile ? 'fixed inset-0 z-40 overflow-y-auto bg-black bg-opacity-70' : 'absolute inset-0 z-40 bg-black bg-opacity-70'
          } flex items-center justify-center`}
          onClick={() => setShowForm(false)}
        >
          <div
            className="bg-background p-4 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <AddTodos onClose={() => {
              setShowForm(false);
              fetchTodos(); 
            }} />
          </div>
        </div>
      )}

      <div className="max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-16rem)]">
        <h2 className="text-xl font-bold text-text mb-4">Task For Today</h2>
        <div className="overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-16rem)]">
          <TodoList filterDate={selectedDate} />
        </div>
      </div>
    </div>
  );
};

export default AddAndTodayTodos;
