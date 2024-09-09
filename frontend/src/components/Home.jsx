import React from 'react';
import Navbar from './Navbar';
import AllTodos from './All';
import AddAndTodayTodos from './AddandToday';
import MiniCalendar from './Mini';


const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="w-screen  h-full #d096e4 text-black flex flex-col items-center p-5">
        <div className="flex w-full max-w-full">
          <AllTodos/>
          <AddAndTodayTodos />
          <MiniCalendar />
        </div>
      </div>
    </div>
  );
};

export default Home;
