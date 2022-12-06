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
    <div className='deleteMaterial'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <p>Product : {materialData.product}</p>
          <p>Do you really want to delete this material?</p>
          <button onClick={handleDelete}>Delete Material</button>
        </>
      )}
    </div>
  );
};

export default DeleteMaterial;
