import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const MaterialDetail = () => {
  const [materialData, setMaterialData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(materialData);

  useEffect(() => {
    axios
      .get(`/materials/${id}`)
      .then((res) => {
        setMaterialData(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!materialData) return 'No material!';

  return (
    <div className='materialDetail'>
      {materialData._id && <p>{materialData._id}</p>}
      {materialData.product && <p>{materialData.product}</p>}
      {materialData.quantity && <p>{materialData.quantity}</p>}
      {materialData.owner && <p>{materialData.owner.first_name}</p>}
      <button onClick={() => navigate(`/materials/${id}/update`)}>
        Update material
      </button>
      <button onClick={() => navigate(`/materials/${id}/delete`)}>
        Delete material
      </button>
    </div>
  );
};

export default MaterialDetail;
