import React, { useEffect } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { token, todoState } from '../../store/atoms/states';

const TodoList = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const tokenHere = useRecoilValue(token);

  useEffect(() => {
    const fetchTodos = async () => {
      if (!tokenHere) {
        console.error('Token is not available');
        return;
      }

      try {
        const response = await axios.get('http://localhost:3000/user/todos', {
          headers: {
            Authorization: `Bearer ${tokenHere}`, // Correct token usage
          },
        });
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      } catch (error) {
        console.error('Error fetching todos:', error.response?.data?.message || error.message);
      }
    };

    fetchTodos();
  }, [setTodos, tokenHere]);


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
