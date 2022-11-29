import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Users = () => {
  const [materials, setMaterials] = useState([]);
  const [errors, setErrors] = useState([]);
  const [triggerAxios, setTriggerAxios] = useState(0);
  const navigate = useNavigate();

  // This method fetches the users from the database.
  useEffect(() => {
    axios
      .get('/materials')
      .then((res) => {
        console.log(res.data);
        setMaterials(res.data);
      })
      .catch((err) => console.log(err));
  }, [triggerAxios]);

  // This method will map out the users
  const materialList = materials ? (
    materials.map((material, index) => {
      return (
        <div key={index}>
          {material.product} : {material.quantity}
        </div>
      );
    })
  ) : (
    <p>No material</p>
  );

  const errorList = errors ? (
    errors.map((error, index) => {
      return <div key={index}>{error.msg}</div>;
    })
  ) : (
    <p>No material</p>
  );

  const handleClick = () => {
    navigate('/add');
  };

  const handleAddClick = () => {
    axios
      .post('/materials', {
        product: 'scissors',
        quantity: '12',
      })
      .then((res) => {
        console.log(res);
        setErrors([]);
        setTriggerAxios((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <div>{materialList}</div>
      <button onClick={handleClick}>Go next</button>
      <button onClick={handleAddClick}>Add one</button>
      <div>{errorList}</div>
    </div>
  );
};

export default Users;
