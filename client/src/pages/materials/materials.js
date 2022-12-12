import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import MaterialCard from './MaterialCard';

const Materials = () => {
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
    materials.map((material, index) => (
      <MaterialCard
        key={index}
        material={material}
        owner={material.owner}
        category={material.category}
      />
    ))
  ) : (
    <p>No material !</p>
  );

  if (error) return `Error: ${error.message}`;
  if (!materials) return 'No material!';

  const handleNewMaterialClick = () => {
    navigate('/materials/create');
  };

  return (
    <div className='p-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
            List of products
          </h1>
          <div className='flex gap-4 flex-wrap'>{materialList}</div>
          <button
            onClick={handleNewMaterialClick}
            className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
          >
            New Material
          </button>
        </>
      )}
    </div>
  );
};

export default Materials;
