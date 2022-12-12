import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import CategoryCard from './CategoryCard';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // This method fetches the users from the database.
  useEffect(() => {
    setLoading(true);
    axios
      .get('/categories')
      .then((res) => {
        console.log(res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // This method will map out the materials
  const categoryList = categories.length ? (
    categories.map((category, index) => (
      <CategoryCard key={index} category={category} />
    ))
  ) : (
    <p>No category !</p>
  );

  if (error) return `Error: ${error.message}`;
  if (!categories) return 'No category!';

  const handleNewCategoryClick = () => {
    navigate('/categories/create');
  };

  return (
    <div className='p-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
            List of categories
          </h1>
          <div>{categoryList}</div>
          <button
            onClick={handleNewCategoryClick}
            className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
          >
            New Category
          </button>
        </>
      )}
    </div>
  );
};

export default Categories;
