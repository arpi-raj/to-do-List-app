import React from 'react';
import TodoList from './TodoList';

const AllTodos = () => {
  return (
    <div className="relative w-full sm:w-2/3 md:w-1/2 lg:w-1/3 mx-auto mt-4 sm:mt-8 md:mt-12 lg:mt-5 p-3 sm:p-4 md:p-5 bg-white rounded-lg shadow-lg">
      <div className="sticky top-0 bg-white z-10 ">
        <h2 className="text-xl text-left font-bold mb-2 ml-2">
          All Todos
        </h2>

      </div>

      <div className="overflow-y-auto max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-8rem)] md:max-h-[calc(100vh-12rem)] lg:max-h-[calc(100vh-16rem)]">
        <TodoList filterDate={null} />
      </div>
    </div>
  );
};

export default AllTodos;
