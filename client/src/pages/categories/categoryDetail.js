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
    <div className='p-4 flex flex-col gap-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          {category._id && (
            <p className='font-bold text-xl'>Category id : {category._id}</p>
          )}
          {category.name && <p>Category : {category.name}</p>}
          {category.description && <p>Description : {category.description}</p>}
          <div className='flex gap-4'>
            <button
              onClick={() => navigate(`/categories/${id}/update`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Update category
            </button>
            <button
              onClick={() => navigate(`/categories/${id}/delete`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Delete category
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryDetail;
