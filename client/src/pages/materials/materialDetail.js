import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const MaterialDetail = () => {
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(materialData);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/materials/${id}`)
      .then((res) => {
        setMaterialData(res.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!materialData) return 'No material!';

  return (
    <div className='p-4 flex flex-col gap-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          {materialData._id && (
            <p className='font-bold text-xl'>Product id : {materialData._id}</p>
          )}
          {materialData.product && <p>Name : {materialData.product}</p>}
          {materialData.description && (
            <p>Description : {materialData.description}</p>
          )}
          {materialData.category && (
            <p>Category : {materialData.category.name}</p>
          )}
          {materialData.quantity && <p>Quantity : {materialData.quantity}</p>}
          {materialData.price && <p>Price : {materialData.quantity}</p>}
          {materialData.owner && <p>Owner : {materialData.owner.first_name}</p>}
          <div className='flex gap-4'>
            <button
              onClick={() => navigate(`/materials/${id}/update`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Update product
            </button>
            <button
              onClick={() => navigate(`/materials/${id}/delete`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Delete product
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MaterialDetail;
