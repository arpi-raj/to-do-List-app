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
    console.log(inputs); // This will log the current state of the inputs
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
        
        // Fetch updated todos and update state
        const fetchTodos = async () => {
          try {
            const response = await axios.get('http://localhost:3000/user/todos', {
              headers: {
                Authorization: `Bearer ${tokenHere}`, // Correct token usage
              },
            });
            if (response.status === 200) {
              setTodos(response.data.todos);
            }
          } catch (error) {
            console.error('Error fetching todos:', error.response?.data?.message || error.message);
          }
        };

        fetchTodos(); // Refetch todos after adding new one
      }
    } catch (e) {
      console.error("Error during form submission:", e.message);
    }
  };

  return (
    <div className="add-todos">
      <input
        name="title"
        value={inputs.title}
        onChange={handleInputChange}
        placeholder="Title"
        className="form-input"
      />
      <input
        name="description"
        value={inputs.description}
        onChange={handleInputChange}
        placeholder="Description"
        className="form-input"
      />
      <input
        type="date"
        name="date"
        value={inputs.date}
        onChange={handleInputChange}
        placeholder="Date"
        className="form-input"
      />
      <button onClick={handleSubmit} className="form-button">Submit</button>
    </div>
  );
};

export default AddTodos;
