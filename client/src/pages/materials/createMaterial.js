import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMaterial = () => {
  const [material, setMaterial] = useState({
    product: '',
    quantity: '',
  });

  const navigate = useNavigate();

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
          onChange={handleChange}
          //   min={0}
          required
          name='quantity'
          value={material.quantity}
        />
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
