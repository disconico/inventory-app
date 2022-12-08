import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    categories.map((category, index) => {
      return (
        <div key={index}>
          <Link to={category._id}>{category.name}</Link>
          <p>{category.description}</p>
        </div>
      );
    })
  ) : (
    <p>No category !</p>
  );

  if (error) return `Error: ${error.message}`;
  if (!categories) return 'No category!';

  const handleNewCategoryClick = () => {
    navigate('/categories/create');
  };

  return (
    <div className=''>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <div>{categoryList}</div>
          <button onClick={handleNewCategoryClick}>New Category</button>
        </>
      )}
    </div>
  );
};

export default Categories;
