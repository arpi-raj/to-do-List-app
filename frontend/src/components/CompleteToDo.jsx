import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilState } from "recoil";
import { todoState } from "../../store/atoms/states";
import { CheckSquare, Trash2, Edit, Save, X, Calendar } from "lucide-react";

const CompletedTodos = () => {
  const [todos, setTodos] = useRecoilState(todoState);
  const tokenHere = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTodos = async () => {
      if (!tokenHere) {
        setError("Authentication token is missing. Please login.");
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get("http://localhost:3000/user/todos", {
          headers: { Authorization: `Bearer ${tokenHere}` },
        });
        if (response.status === 200) {
          setTodos(response.data.todos);
        }
      } catch (error) {
        setError("Failed to fetch todos. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, [setTodos, tokenHere]);

  // Filter to only show completed todos
  const completedTodos = todos.filter((todo) => todo.completed);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="space-y-2 max-w-md mx-auto bg-background">
      {completedTodos.length > 0 ? (
        completedTodos.map((todo) => (
          <div
            key={todo._id}
            className="flex items-start justify-between p-3 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-150"
          >
            <div className="flex items-end text-left space-x-3 flex-grow">
              <button className="focus:outline-none bg-transparent mt-1 border-none">
                <CheckSquare className="text-emerald-500 h-5 w-5" />
              </button>

              <div className="min-w-0 flex-grow flex flex-col justify-start">
                <h3 className="text-sm font-medium text-text">
                  {todo.title}
                </h3>
                <p className="text-xs text-gray-600">{todo.description}</p>
              </div>
            </div>

            <div className="flex flex-col items-center space-y-2 ml-2">
              <div className="flex items-center space-x-2">
                <Calendar className="text-gray-400 h-4 w-4" />
                <span className="text-xs text-gray-500 whitespace-nowrap">
                  {new Date(todo.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
              <button
                onClick={() => handleDelete(todo._id)}
                className="text-red-500 hover:text-red-600 bg-transparent focus:outline-none border-none"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-400 py-10">
          <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p className="text-xl">No Completed Tasks.</p>
        </div>
      )}
    </div>
  );
};

export default CompletedTodos;
