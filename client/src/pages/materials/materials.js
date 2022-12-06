import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This method fetches the users from the database.
  useEffect(() => {
    setLoading(true);
    axios
      .get('/materials')
      .then((res) => {
        console.log(res.data);
        setMaterials(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // This method will map out the materials
  const materialList = materials.length ? (
    materials.map((material, index) => {
      return (
        <div key={index}>
          <Link to={material._id}>
            {material.product} : {material.quantity}
          </Link>
          <p>Owner : {material.owner.first_name}</p>
        </div>
      );
    })
  ) : (
    <p>No material !</p>
  );

  if (error) return `Error: ${error.message}`;
  if (!materials) return 'No material!';

  const handleNewMaterialClick = () => {
    navigate('/materials/create');
  };

  return (
    <div className='materials'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <div>{materialList}</div>
          <button onClick={handleNewMaterialClick}>New Material</button>
        </>
      )}
    </div>
  );
};

export default Users;
