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
    <div className='p-4 flex flex-col gap-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <p className='font-bold text-xl'>Category : {category.name}</p>
          {materials.length > 0 && (
            <div>
              <h3 className='mb-4'>
                Please delete those materials before proceeding :
              </h3>
              <div className='flex flex-col gap-4'>{materialList}</div>
            </div>
          )}
          {!materials.length && (
            <div>
              <p>Do you really want to delete this category?</p>
              <button
                onClick={handleDelete}
                className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
              >
                Delete Category
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default DeleteCategory;
