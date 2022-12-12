import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserCard from './UserCard';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Get Users and handle errors
  useEffect(() => {
    setLoading(true);
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
        setLoading(false);
      });
  }, []);

  // This method will map out the users
  const userList =
    users && users.map((item, index) => <UserCard key={index} user={item} />);

  if (error) return `Error: ${error.message}`;
  if (!users) return 'No user!';

  const handleNewUserClick = () => {
    navigate('/users/create');
  };

  return (
    <div className='p-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <h1 className='text-2xl font-bold text-gray-900 mb-4 uppercase'>
            List of users
          </h1>
          <div className='flex gap-4 flex-wrap'>{userList}</div>
          <button
            onClick={handleNewUserClick}
            className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
          >
            New User
          </button>
        </>
      )}
    </div>
  );
};

export default Users;
