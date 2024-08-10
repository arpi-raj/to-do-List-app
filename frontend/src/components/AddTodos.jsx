import { useState } from 'react';
import axios from 'axios';

import { taken7 } from './Signin';

const AddTodos = () => {
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
    // You can add code here to handle form submission, like sending the data to an API
    try {
      const response = await axios.post('http://localhost:3000/user/add', {
        title: inputs.title,
        description: inputs.description,
        date: inputs.date
      }, {
        headers: {
          authorization: `Bearer ${taken7}`
        }
      });
      console.log(response.data.msg);
      if (response.status === 200) {
        console.log("Form submitted successfully");
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
