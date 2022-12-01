import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUser = () => {
  const [user, setUser] = useState({
    first_name: '',
    family_name: '',
    date_of_birth: '',
    is_friendly: false,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log(user);
    const { name, value, type, checked } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const createUser = (e) => {
    e.preventDefault();

    axios
      .post('/users', user)
      .then((res) => {
        console.log(res);
        navigate(`/users/${res.data._id}`);
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
    <div className='userForm'>
      <form action='post'>
        <input
          type='text'
          placeholder='First Name'
          required
          onChange={handleChange}
          name='first_name'
          value={user.first_name}
        />
        <input
          type='text'
          placeholder='Family Name'
          onChange={handleChange}
          name='family_name'
          value={user.family_name}
        />
        <input
          type='date'
          onChange={handleChange}
          name='date_of_birth'
          value={user.date_of_birth}
        />
        <input
          type='checkbox'
          id='is_friendly'
          checked={user.is_friendly}
          onChange={handleChange}
          name='is_friendly'
        />
        <label htmlFor='is_friendly'>Are you friendly?</label>
        <br />
        <br />
      </form>
      <button onClick={createUser} type='submit'>
        Submit
      </button>
    </div>
  );
};

export default CreateUser;