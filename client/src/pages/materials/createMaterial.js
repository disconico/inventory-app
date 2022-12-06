import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMaterial = () => {
  const [material, setMaterial] = useState({
    product: '',
    quantity: '',
    owner: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get Users and handle errors
  useEffect(() => {
    setLoading(true);
    axios
      .get('/users')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/materials', material)
      .then((res) => {
        console.log(res.data);
        navigate(`/materials/${res.data._id}`);
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

  if (error) return `Error: ${error.message}`;

  return (
    <div className='materialForm'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='product'>Product name :</label>
          <input
            type='text'
            placeholder='Product Name'
            required
            onChange={handleChange}
            name='product'
            id='product'
            value={material.product}
          />
          <input
            type='number'
            placeholder='Quantity'
            onChange={handleChange}
            min={0}
            required
            name='quantity'
            value={material.quantity}
          />
          <select
            id='owner'
            value={material.owner}
            onChange={handleChange}
            name='owner'
            required
          >
            <option value={''} disabled hidden>
              Select owner
            </option>
            {users &&
              users.map((user, index) => {
                return (
                  <option key={index} value={user._id}>
                    {user.first_name}
                  </option>
                );
              })}
          </select>
          <br />
          <br />

          <button type='submit'>Submit</button>
        </form>
      )}
    </div>
  );
};

export default CreateMaterial;
