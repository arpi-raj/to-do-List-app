import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { todoState } from '../../store/atoms/states';
import { CheckSquare, Square, Calendar, Edit, Trash2, Save, X } from 'lucide-react';

const TodoList = ({ filterDate }) => {
  const [todos, setTodos] = useRecoilState(todoState);
  const tokenHere = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedDescription, setEditedDescription] = useState('');

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

  const handleComplete = async (id) => {
    try {
      const updatedTodo = todos.find(todo => todo._id === id);
      const response = await axios.put(`http://localhost:3000/user/todos/${id}`,
        { ...updatedTodo, completed: !updatedTodo.completed },
        { headers: { Authorization: `Bearer ${tokenHere}` } }
      );
      if (response.status === 200) {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, completed: !todo.completed } : todo));
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/user/todos/${id}`,
        { headers: { Authorization: `Bearer ${tokenHere}` } }
      );
      if (response.status === 200) {
        setTodos(todos.filter(todo => todo._id !== id));
      }
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

  const handleEdit = (todo) => {
    setEditingId(todo._id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedTitle('');
    setEditedDescription('');
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/user/todos/${id}`,
        { title: editedTitle, description: editedDescription },
        { headers: { Authorization: `Bearer ${tokenHere}` } }
      );
      if (response.status === 200) {
        setTodos(todos.map(todo => todo._id === id ? { ...todo, title: editedTitle, description: editedDescription } : todo));
        setEditingId(null);
      }
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-gray-100">
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
    <div className="space-y-2 max-w-md mx-auto bg-gray-50">
      {filteredTodos.length > 0 ? (
        filteredTodos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-150"
          >
            <div className="flex items-end text-left space-x-3 flex-grow">
              <button
                onClick={() => handleComplete(todo._id)}
                className="focus:outline-none bg-transparent mt-1 border-none"
              >
                {todo.completed ? (
                  <CheckSquare className="text-green-500 h-5 w-5" />
                ) : (
                  <Square className="text-gray-400 h-5 w-5" />
                )}
              </button>

              <div className="min-w-0 flex-grow flex flex-col justify-start">
                {editingId === todo._id ? (
                  <>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full text-sm font-medium text-gray-900 mb-1 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 bg-gray-50"
                    />
                    <textarea
                      value={editedDescription}
                      onChange={(e) => setEditedDescription(e.target.value)}
                      className="w-full text-xs text-gray-600 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400 bg-gray-50"
                      rows="3"
                    />
                  </>
                ) : (
                  <>
                    <h3 className="text-sm font-medium text-gray-900">{todo.title}</h3>
                    <p className="text-xs text-gray-600">{todo.description}</p>
                  </>
                )}
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 ml-2">
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400 h-4 w-4" />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(todo.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div className="flex space-x-1">
                {editingId === todo._id ? (
                  <>
                    <button
                      onClick={() => handleSave(todo._id)}
                      className="text-green-500 hover:text-green-600 bg-transparent focus:outline-none border-none"
                    >
                      <Save className="h-4 w-4" />
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="text-red-500 hover:text-red-600 bg-transparent focus:outline-none border-none"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleEdit(todo)}
                    className="text-blue-500 hover:text-blue-600 bg-transparent focus:outline-none border-none"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => handleDelete(todo._id)}
                  className="text-red-500 bg-transparent hover:text-red-600 focus:outline-none border-none"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-xl">
            {filterDate ? "No todos for the selected date." : "No todos available."}
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoList;
