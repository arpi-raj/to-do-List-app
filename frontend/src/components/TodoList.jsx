import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { token, todoState } from '../../store/atoms/states';
import { CheckCircle, Circle, Calendar, Clock, Edit, Trash2 } from 'lucide-react';

const TodoList = ({ filterDate }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const tokenHere = useRecoilValue(token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      if (!tokenHere) {
        setError('Authentication token is missing. Please login.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:3000/user/todos', {
          headers: { Authorization: `Bearer ${tokenHere}` },
        });
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      } catch (error) {
        setError('Failed to fetch todos. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [setTodos, tokenHere]);

  const filterTodos = () => {
    if (filterDate) {
      const filterDateISO = new Date(filterDate).toISOString().split('T')[0];
      return todos.filter(todo => {
        const todoDateISO = new Date(todo.date).toISOString().split('T')[0];
        return todoDateISO === filterDateISO;
      });
    }
    return todos;
  };

  const filteredTodos = filterTodos();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-ellipsis">
      
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-800 to-gray-900 text-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col w-full max-w-[400px] mx-auto"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold truncate">{todo.title}</h2>
              {todo.completed ? (
                <CheckCircle className="text-green-400 h-5 w-5" />
              ) : (
                <Circle className="text-yellow-400 h-5 w-5" />
              )}
            </div>
            <p className="text-gray-300 mb-2 flex-grow text-sm">{todo.description}</p>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{new Date(todo.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-xs text-gray-400 mt-1">
              <Clock className="h-4 w-4 mr-1" />
              <span>{todo.completed ? 'Completed' : 'Pending'}</span>
            </div>
            <div className="flex justify-between mt-4">
              <button className="flex items-center px-2 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded">
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </button>
              <button className="flex items-center px-2 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded">
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </button>
              <button className="flex items-center px-2 py-1 text-sm bg-green-500 hover:bg-green-600 text-white rounded">
                <CheckCircle className="h-4 w-4 mr-1" />
                {todo.completed ? 'Unmark' : 'Complete'}
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-600" />
          <p className="text-xl">
            {filterDate ? "No todos for the selected date." : "No todos available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
