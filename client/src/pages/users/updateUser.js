import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const [user, setUser] = useState({
    first_name: '',
    family_name: '',
    date_of_birth: '',
    is_friendly: false,
  });
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUser((prev) => ({
          ...prev,
          id: res.data._id ? res.data._id : '',
          first_name: res.data.first_name ? res.data.first_name : '',
          family_name: res.data.family_name ? res.data.family_name : '',
          date_of_birth: res.data.date_of_birth
            ? new Date(res.data.date_of_birth).toISOString().substring(0, 10)
            : '',
          is_friendly: res.data.is_friendly === true,
        }));
        console.log(user);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const updateUser = () => {};

  if (error) return `Error: ${error.message}`;
  if (!user) return 'No user!';
  console.log(user);

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
      <button onClick={updateUser} type='submit'>
        Submit
      </button>
    </div>
  );
};

export default UpdateUser;
