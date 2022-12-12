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
    <div className='p-4 md:max-w-xl'>
      <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
        Create a new category
      </h1>
      <form onSubmit={handleSubmit}>
        <div className='grid gap-4 mb-6'>
          <div>
            <label
              htmlFor='name'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Category name :
            </label>
            <input
              type='text'
              placeholder='Category Name'
              required
              onChange={handleChange}
              name='name'
              id='name'
              value={category.name}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            />
          </div>
          <div>
            <label
              htmlFor='description'
              className='block mb-2 text-sm font-medium text-gray-900'
            >
              Description :
            </label>
            <input
              type='text'
              placeholder='Category Description'
              onChange={handleChange}
              name='description'
              id='description'
              value={category.description}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
            />
          </div>
        </div>

        <button
          type='submit'
          className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateCategory;
