import React, { useState, useEffect } from 'react';
import { taken7 } from "./Signin";
import axios from 'axios';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/user/todos', {
          headers: {
            authorization: `Bearer ${taken7}`,
          },
        });
        if(response.status==200){
          console.log(response.data.todos)
          setTodos(response.data.todos); // Update todos state with the fetched data
        }
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []); // Empty dependency array to run only on mount

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

      {/* Pass todos as a prop to RenderTodos */}
      <ul className="mb-6">
        <RenderTodos todos={todos} />
      </ul>

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

function RenderTodos({ todos }) {
  return (
    todos.map((todo, index) => (
      <li key={index} className="mb-2">
        <h2>{todo.title}</h2>
        <p>{todo.description}</p>
        <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
        <p>Date: {todo.date}</p>
      </li>
    ))
  );
}

export default Home;
