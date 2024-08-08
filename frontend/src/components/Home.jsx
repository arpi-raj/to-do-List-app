import React, { useState } from 'react';
import {taken7} from "./Signin";
const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const handleAddTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, newTask]);
      setNewTask('');
    }
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="min-h-screen bg-gray-800 text-white flex flex-col items-center p-4">
      <header className="text-3xl font-bold my-6">My To-Do List</header>
      <h1>{taken7}</h1>

      <div className="flex flex-col items-center w-full max-w-lg">
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-3 w-full bg-gray-700 text-white rounded-lg mb-4 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddTask}
          className="p-3 bg-blue-600 text-white rounded-lg w-full hover:bg-blue-500 transition duration-300"
        >
          Add Task
        </button>
      </div>

      <ul className="mt-6 w-full max-w-lg">
        {tasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center p-4 bg-gray-700 rounded-lg mb-2 border border-gray-600"
          >
            {task}
            <button
              onClick={() => handleDeleteTask(index)}
              className="text-red-500 hover:text-red-700 transition duration-300"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <footer className="mt-6 text-gray-400">
        © 2024 My To-Do List App
      </footer>
    </div>
  );
};

export default Home;
