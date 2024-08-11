import React, { useState } from 'react';
import Header from './header';
//import TaskList from './TaskList';
import TodoList from './TodoList';
import AddTodos from './AddTodos';
import '../styles/Home.css';

const Home = () => {
  const [showForm, setShowForm] = useState(false);

  const handleToggle = () => {
    setShowForm(!showForm);
  };

  return (
    <div className="home-container">
      <Header />
      <div className="form-toggle">
        <button onClick={handleToggle}>
          {showForm ? 'Hide Form' : 'Add Todo'}
        </button>
        {showForm && <AddTodos />}
      </div>
      <TodoList></TodoList>
    </div>
  );
};

export default Home;
