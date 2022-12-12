import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const DeleteMaterial = () => {
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/materials/${id}`)
      .then((res) => {
        console.log(res.data);
        setMaterialData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`/materials/${id}/delete`)
      .then(() => {
        alert('Material deleted');
        navigate('/materials');
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!materialData) return 'No material!';
  console.log(materialData);

  return (
    <div className='p-4 flex flex-col gap-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <p className='font-bold text-xl'>Product : {materialData.product}</p>
          <p>Do you really want to delete this product?</p>
          <button
            onClick={handleDelete}
            className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-start'
          >
            Delete Product
          </button>
        </>
      )}
    </div>
  );
};

export default DeleteMaterial;
