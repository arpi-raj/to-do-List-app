import React from 'react';
import TodoList from './TodoList';

const AllTodos = () => {
  return (
    <div className="w-1/3 mt-20 p-5  bg-white rounded-lg shadow-lg mr-5 overflow-y-auto max-h-[calc(100vh-16rem)]">
    <h2 className="text-xl text-black text-left font-bold mb-4 ml-4">All Todos</h2>
    <TodoList filterDate={null} />
  </div>
  
  );
};

export default AllTodos;
