import { useState } from 'react';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { token, todoState } from "../../store/atoms/states";

const AddTodos = () => {
  const tokenHere = useRecoilValue(token);
  const setTodos = useSetRecoilState(todoState);
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    date: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value
    }));
  };

  const handleSubmit = async () => {
    console.log(inputs); 
    try {
      const response = await axios.post('http://localhost:3000/user/add', {
        title: inputs.title,
        description: inputs.description,
        date: inputs.date
      }, {
        headers: {
          authorization: `Bearer ${tokenHere}`
        }
      });

      if (response.status === 200) {
        console.log("Form submitted successfully");
        
        
        const fetchTodos = async () => {
          try {
            const response = await axios.get('http://localhost:3000/user/todos', {
              headers: {
                Authorization: `Bearer ${tokenHere}`,
              },
            });
            if (response.status === 200) {
              setTodos(response.data.todos);  // Updates Recoil state
            }
          } catch (error) {
            console.error('Error fetching todos:', error.response?.data?.message || error.message);
          }
        };
        fetchTodos(); 
      }
    } catch (e) {
      console.error("Error during form submission:", e.message);
    }
  };

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 text-black p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col gap-4 w-full max-w-md mx-auto mt-8">
  <h2 className="text-2xl font-bold mb-4 text-center">Add New Todo</h2>
  <input
    name="title"
    value={inputs.title}
    onChange={handleInputChange}
    placeholder="Title"
    className="bg-white text-black placeholder:text-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <textarea
    name="description"
    value={inputs.description}
    onChange={handleInputChange}
    placeholder="Description"
    className="bg-white text-black placeholder:text-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
  <input
    type="date"
    name="date"
    value={inputs.date}
    onChange={handleInputChange}
    className="bg-white text-black placeholder:text-gray-600 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
  />
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
