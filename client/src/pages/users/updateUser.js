import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateUser = () => {
  const [user, setUser] = useState({
    first_name: '',
    family_name: '',
    date_of_birth: '',
    is_friendly: false,
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setUser((prev) => ({
          ...prev,
          id: res.data.user_find._id ? res.data.user_find._id : '',
          first_name: res.data.user_find.first_name
            ? res.data.user_find.first_name
            : '',
          family_name: res.data.user_find.family_name
            ? res.data.user_find.family_name
            : '',
          date_of_birth: res.data.user_find.date_of_birth
            ? new Date(res.data.user_find.date_of_birth)
                .toISOString()
                .substring(0, 10)
            : '',
          is_friendly: res.data.user_find.is_friendly === true,
        }));
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`/users/${id}/update`, user)
      .then((res) => {
        console.log(res);
        navigate(`/users/${id}`);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!user) return 'No user!';

  return (
    <div>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <div className='p-4 md:max-w-xl'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
            Update user
          </h1>
          <form onSubmit={handleSubmit} autoComplete='off'>
            <div className='grid gap-4 mb-6'>
              <div>
                <label
                  htmlFor='first_name'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  First name :
                </label>
                <input
                  type='text'
                  id='first_name'
                  placeholder='First Name'
                  required
                  onChange={handleChange}
                  name='first_name'
                  value={user.first_name}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='family_name'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Family name :
                </label>
                <input
                  type='text'
                  id='family_name'
                  placeholder='Family Name'
                  onChange={handleChange}
                  name='family_name'
                  value={user.family_name}
                  required
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
              </div>
              <div>
                <label
                  htmlFor='date'
                  className='block mb-2 text-sm font-medium text-gray-900'
                >
                  Date of birth :
                </label>
                <input
                  type='date'
                  id='date'
                  onChange={handleChange}
                  name='date_of_birth'
                  value={user.date_of_birth}
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 '
                />
              </div>
            </div>
            <div className='flex items-start mb-6 gap-4'>
              <div className='flex items-center h-5'>
                <input
                  type='checkbox'
                  id='is_friendly'
                  checked={user.is_friendly}
                  onChange={handleChange}
                  name='is_friendly'
                  className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300'
                />
              </div>
              <label
                htmlFor='is_friendly'
                className='block mb-2 text-sm font-medium text-gray-900'
              >
                Are you <span className='text-blue-600 '>friendly</span> ?
              </label>
            </div>
            <button
              type='submit'
              className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UpdateUser;
