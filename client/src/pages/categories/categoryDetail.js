import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const CategoryDetail = () => {
  const [category, setCategory] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  console.log(category);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        console.log(res);
        setCategory(res.data.category_find);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) return `Error: ${error.message}`;
  if (!category) return 'No category!';

  return (
    <div className='p-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          {category._id && <p>{category._id}</p>}
          {category.name && <p>{category.name}</p>}
          {category.description && <p>{category.description}</p>}
          <button onClick={() => navigate(`/categories/${id}/update`)}>
            Update category
          </button>
          <button onClick={() => navigate(`/categories/${id}/delete`)}>
            Delete category
          </button>
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
