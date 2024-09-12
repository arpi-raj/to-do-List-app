import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import AllTodos from "./AllTodos";
import AddAndTodayTodos from "./AddAndToday";
import MiniCalendar from "./Mini";

const MobileView = () => {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex justify-around mb-4">
        <button
          className={`px-4 py-2 ${activeTab === "all" ? "bg-purple-500 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setActiveTab("all")}
        >
          All Todos
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "today" ? "bg-purple-500 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setActiveTab("today")}
        >
          Today's Todos
        </button>
        <button
          className={`px-4 py-2 ${activeTab === "calendar" ? "bg-purple-500 text-white" : "bg-gray-200"} rounded`}
          onClick={() => setActiveTab("calendar")}
        >
          Calendar
        </button>
      </div>
      <div className="flex-grow overflow-y-hidden">
        {activeTab === "all" && <AllTodos />}
        {activeTab === "today" && <AddAndTodayTodos />}
        {activeTab === "calendar" && <MiniCalendar />}
      </div>
    </div>
  );
};

const Home = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 950); // Adjust this breakpoint as needed
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="min-h-screen ">
      <Navbar />
      <div className="w-screen h-[calc(100vh-64px)] text-black p-5">
        {isMobile ? (
          <MobileView />
        ) : (
          <div className="flex w-full h-full space-x-4">
            <AllTodos />
            <AddAndTodayTodos />
            <MiniCalendar />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
