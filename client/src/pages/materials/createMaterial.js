import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMaterial = () => {
  const [material, setMaterial] = useState({
    product: '',
    description: '',
    category: '',
    price: '',
    quantity: '',
    owner: '',
  });
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Get Users , Categories and handle errors
  useEffect(() => {
    setLoading(true);
    axios
      .all([axios.get('/users'), axios.get('/categories')])
      .then(
        axios.spread((...res) => {
          setUsers(res[0].data);
          setCategories(res[1].data);
          setLoading(false);
        })
      )
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaterial((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('/materials', material)
      .then((res) => {
        console.log(res.data);
        navigate(`/materials/${res.data._id}`);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data.errors);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  };

  if (error) return `Error: ${error.message}`;

  return (
    <div className='p-4 md:max-w-xl'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
            Create a new product
          </h1>
          <form onSubmit={handleSubmit} className='' autoComplete='off'>
            <div className='grid gap-4 mb-6'>
              <div>
                <label
                  htmlFor='product'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Product name :
                </label>
                <input
                  type='text'
                  required
                  onChange={handleChange}
                  name='product'
                  id='product'
                  value={material.product}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='description'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Description :
                </label>
                <input
                  type='text'
                  required
                  onChange={handleChange}
                  name='description'
                  id='description'
                  value={material.description}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                />
              </div>
              <div>
                <label
                  htmlFor='quantity'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Quantity :
                </label>
                <input
                  type='number'
                  onChange={handleChange}
                  min={0}
                  required
                  name='quantity'
                  id='quantity'
                  value={material.quantity}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                />
              </div>
              <div>
                <label
                  htmlFor='price'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Price :
                </label>
                <input
                  type='number'
                  onChange={handleChange}
                  min={0}
                  required
                  name='price'
                  id='price'
                  value={material.price}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                />
              </div>
              <div>
                <label
                  htmlFor='owner'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Product owner :
                </label>

                <select
                  id='owner'
                  value={material.owner}
                  onChange={handleChange}
                  name='owner'
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                >
                  <option value={''} disabled hidden>
                    Select owner
                  </option>
                  {users &&
                    users.map((user, index) => {
                      return (
                        <option key={index} value={user._id}>
                          {user.first_name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div>
                <label
                  htmlFor='category'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Category :
                </label>
                <select
                  id='category'
                  value={material.category}
                  onChange={handleChange}
                  name='category'
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                >
                  <option value={''} disabled hidden>
                    Select Category
                  </option>
                  {categories &&
                    categories.map((category, index) => {
                      return (
                        <option key={index} value={category._id}>
                          {category.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center '
            >
              Submit
            </button>
          </form>
        </>
      )}
    </div>
  );
};

export default CreateMaterial;
