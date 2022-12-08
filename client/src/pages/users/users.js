import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    users &&
    users.map((user, index) => {
      return (
        <div key={index}>
          <Link to={user._id}>{user.first_name}</Link>
        </div>
      );
    });
  if (error) return `Error: ${error.message}`;
  if (!users) return 'No user!';

  const handleNewUserClick = () => {
    navigate('/users/create');
  };

  return (
    <div className='users'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          <div>{userList}</div>
          <button onClick={handleNewUserClick}>New User</button>
        </>
      )}
    </div>
  );
};

export default Users;
