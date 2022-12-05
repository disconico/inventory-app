import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const DeleteMaterial = () => {
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/materials/${id}`)
      .then((res) => {
        console.log(res.data);
        setMaterialData(res.data);
      })
      .catch((error) => {
        setError(error);
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
      <p>Product : {materialData.product}</p>
      <p>Do you really want to delete this material?</p>
      <button onClick={handleDelete}>Delete Material</button>
    </div>
  );
};

export default DeleteMaterial;
