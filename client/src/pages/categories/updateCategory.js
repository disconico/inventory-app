import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateCategory = () => {
  const [category, setCategory] = useState({
    name: '',
    description: '',
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/categories/${id}`)
      .then((res) => {
        setCategory((prev) => ({
          ...prev,
          name: res.data.category_find.name,
          description: res.data.category_find.description,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/categories/${id}/update`, category)
      .then((res) => {
        console.log(res);
        navigate(`/categories/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!category) return 'No category!';

  return (
    <div className=''>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <form onSubmit={handleSubmit}>
          <label htmlFor='name'>Category name :</label>
          <input
            type='text'
            placeholder='Category Name'
            required
            onChange={handleChange}
            name='name'
            id='name'
            value={category.name}
          />
          <label htmlFor='description'>Description :</label>
          <input
            type='text'
            placeholder='Category Description'
            onChange={handleChange}
            name='description'
            id='description'
            value={category.description}
          />
          <br />
          <br />

          <button type='submit'>Update category</button>
        </form>
      )}
    </div>
  );
};

export default UpdateCategory;
