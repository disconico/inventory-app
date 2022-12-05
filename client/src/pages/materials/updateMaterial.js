import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateMaterial = () => {
  const [material, setMaterial] = useState({
    product: '',
    quantity: '',
    owner: '',
  });
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

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

  useEffect(() => {
    axios
      .get(`/materials/${id}`)
      .then((res) => {
        setMaterial((prev) => ({
          ...prev,
          product: res.data.product,
          quantity: res.data.quantity,
          owner: res.data.owner._id,
        }));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMaterial((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const updateMaterial = (e) => {
    e.preventDefault();

    axios
      .put(`/materials/${id}/update`, material)
      .then((res) => {
        console.log(res);
        navigate(`/materials/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!material) return 'No material!';

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
        <button onClick={updateMaterial} type='submit'>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateMaterial;
