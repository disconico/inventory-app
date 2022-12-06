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
    <div className='materialDetail'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
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
        </>
      )}
    </div>
  );
};

export default MaterialDetail;
