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

  const navigate = useNavigate();

  // Get Users and handle errors
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
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

  const createMaterial = (e) => {
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

  return (
    <div className='materialForm'>
      <form action='post'>
        <input
          type='text'
          placeholder='Product Name'
          required
          onChange={handleChange}
          name='product'
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

        <button onClick={createMaterial} type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateMaterial;
