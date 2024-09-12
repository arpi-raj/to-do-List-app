import { useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { token, todoState } from "../../store/atoms/states";
import { FaCalendarAlt } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css'; 

const AddTodos = ({ onClose }) => { 
  const tokenHere = useRecoilValue(token);
  const setTodos = useSetRecoilState(todoState);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    date: null, 
  });
  const [showDatePicker, setShowDatePicker] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setInputs((prevInputs) => ({
      ...prevInputs,
      date,
    }));
    setShowDatePicker(false); 
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/user/add', {
        title: inputs.title,
        description: inputs.description,
        date: inputs.date ? format(inputs.date, 'yyyy-MM-dd') : '', 
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (response.status === 200) {
        const fetchTodos = async () => {
          try {
            const response = await axios.get('http://localhost:3000/user/todos', {
              headers: {
                Authorization: `Bearer ${tokenHere}`,
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
        onClose(); 
      }
    } catch (e) {
      console.error('Error during form submission:', e.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-black p-4 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4 w-full max-w-sm mx-auto mt-8">
      <div className="flex gap-2">
        <input
          name="title"
          value={inputs.title}
          onChange={handleInputChange}
          placeholder="Title"
          className="flex-1 bg-white text-black placeholder:text-gray-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
        <textarea
          name="description"
          value={inputs.description}
          onChange={handleInputChange}
          placeholder="Description"
          className="flex-1 bg-white text-black placeholder:text-gray-600 rounded-lg py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div className="relative flex items-center mt-4">
        <button
          className="bg-white text-blue-500 rounded-full p-2 shadow focus:outline-none"
          onClick={() => setShowDatePicker(!showDatePicker)} 
        >
          <FaCalendarAlt className="text-xl" />
        </button>

        {showDatePicker && (
          <div className="absolute top-0 left-20 bg-white shadow-lg p-4 rounded-lg z-10">
            <DatePicker
              selected={inputs.date}
              onChange={handleDateChange}
              inline 
            />
          </div>
        )}
      </div>

      <button 
        onClick={handleSubmit} 
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 mt-4"
      >
        Submit
      </button>
    </div>
  );
};

export default AddTodos;
