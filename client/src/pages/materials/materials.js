import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState();
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
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [triggerAxios]);

  // This method will map out the materials
  const materialList =
    materials &&
    materials.map((material, index) => {
      return (
        <div key={index}>
          <Link to={material._id}>
            {material.product} : {material.quantity}
          </Link>
          <p>Owner : {material.owner.first_name}</p>
        </div>
      );
    });

  if (error) return `Error: ${error.message}`;
  if (!materials) return 'No material!';

  const handleNewMaterialClick = () => {
    navigate('/materials/create');
  };

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <div>{materialList}</div>
      <button onClick={handleNewMaterialClick}>New Material</button>
    </div>
  );
};

export default Users;
