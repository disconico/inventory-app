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
        setUser((prev) => ({
          ...prev,
          id: res.data.user_find._id ? res.data.user_find._id : '',
          first_name: res.data.user_find.first_name
            ? res.data.user_find.first_name
            : '',
          family_name: res.data.user_find.family_name
            ? res.data.user_find.family_name
            : '',
          date_of_birth: res.data.user_find.date_of_birth
            ? new Date(res.data.user_find.date_of_birth)
                .toISOString()
                .substring(0, 10)
            : '',
          is_friendly: res.data.user_find.is_friendly === true,
        }));
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

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/users/${id}/update`, user)
      .then((res) => {
        console.log(res);
        navigate(`/users/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!user) return 'No user!';

  return (
    <div className='userForm'>
      <form onSubmit={handleSubmit}>
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
      <button type='submit'>Update</button>
    </div>
  );
};

export default UpdateUser;
