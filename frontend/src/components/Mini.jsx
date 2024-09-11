import React from 'react';
import { Calendar } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import '../styles/calender.css';
import Profile from './Profile';
import CompletedTodos from './CompleteToDo';
const MiniCalendar = () => {
  return (
    <div className="w-full max-w-sm mx-auto sm:w-96 sm:ml-16 mt-4 sm:mt-5 p-4 sm:p-5 bg-background rounded-lg shadow-lg border border-gray-200">
      <Profile />
      <div className="calendar-container mt-4">
        <Calendar
          compact
          bordered
          className="custom-calendar"
          style={{ border: '1px solid var(--border)', borderRadius: '0.5rem' }}
        />
      </div>
      {/* <CompletedTodos/> */}
    </div>
  );
};

export default MiniCalendar;
