import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState();
  const [triggerAxios, setTriggerAxios] = useState(0);
  const navigate = useNavigate();

  // Get Users and handle errors
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  }, [triggerAxios]);

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
    <div className='Home'>
      <h1>Hello</h1>
      <div>{userList}</div>
      <button onClick={handleNewUserClick}>New User</button>
    </div>
  );
};

export default Users;
