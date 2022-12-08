import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/categories', category)
      .then((res) => {
        console.log(res.data);
        navigate(`/categories/${res.data._id}`);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  return (
    <div className='materialForm'>
      <form onSubmit={handleSubmit}>
        <label htmlFor='name'>Category name :</label>
        <input
          type='text'
          placeholder='Category Name'
          required
          onChange={handleChange}
          name='name'
          id='name'
          value={category.name}
        />
        <label htmlFor='description'>Description :</label>
        <input
          type='text'
          placeholder='Category Description'
          onChange={handleChange}
          name='description'
          id='description'
          value={category.description}
        />
        <br />
        <br />

        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default CreateCategory;
