import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { taken7 } from './Signin';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    // Log the token when the component mounts
    console.log('Token on mount:', taken7);

    // Set the token state
    setToken(taken7);
  }, []);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!token) {
        console.error('Token is not available');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/user/todos', {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchTodos();
    }
  }, [token]); // Fetch todos when the token is set

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <ul className="todo-list">
      {todos.length > 0 ? (
        todos.map((todo, index) => (
          <li key={index} className="todo-item">
            <h2>{todo.title}</h2>
            <p>{todo.description}</p>
            <p>Completed: {todo.completed ? 'Yes' : 'No'}</p>
            <p>Date: {todo.date}</p>
          </li>
        ))
      ) : (
        <p>No todos available</p>
      )}
    </ul>
  );
};

export default TodoList;
