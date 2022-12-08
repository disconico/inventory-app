import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeleteCategory = () => {
  const [category, setCategory] = useState(null);
  const [materials, setMaterials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        console.log(res.data);
        setCategory(res.data.category_find);
        setMaterials(res.data.materials_find);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`/categories/${id}/delete`)
      .then(() => {
        alert('Category deleted');
        navigate('/categories');
      })
      .catch((error) => {
        setError(error);
      });
  };

  const materialList = materials.length
    ? materials.map((material, index) => {
        return (
          <Link to={`/materials/${material._id}`} key={index}>
            {material.product}
          </Link>
        );
      })
    : '';

  if (error) return `Error: ${error.message}`;
  if (!category) return 'No category!';

  return (
    <div className=''>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          {materials.length > 0 && (
            <div>
              <h3>Please delete those materials before proceeding :</h3>
              <div>{materialList}</div>
            </div>
          )}
          {!materials.length && (
            <div>
              <p>Category : {category.name}</p>
              <p>Do you really want to delete this category?</p>
              <button onClick={handleDelete}>Delete Category</button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteCategory;
