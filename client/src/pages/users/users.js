import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [getErrors, setGetErrors] = useState();
  const [triggerAxios, setTriggerAxios] = useState(0);
  const navigate = useNavigate();

  // Get Users and handle errors
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        setUsers(res.data);
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('Error', error.message);
        }
        console.log(error.config);
        setGetErrors(
          'Error getting the data, try again by refreshing the page'
        );
      });
  }, [triggerAxios]);

  // This method will map out the users
  const userList = users ? (
    users.map((user, index) => {
      return (
        <div key={index}>
          <Link to={user._id}>{user.first_name}</Link>
        </div>
      );
    })
  ) : (
    <p>No user</p>
  );

  // Add new User & handle errors

  const handleAddClick = () => {
    axios
      .post('/users', {
        first_name: '  test ',
        family_name: 'dsd',
        // date_of_birth: 'miam',
      })
      .then((res) => {
        console.log(res);
        setErrors([]);
        setTriggerAxios((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
        setErrors(err.response.data.errors);
        console.log(errors);
      });
  };

  const errorList =
    errors &&
    errors.map((error, index) => {
      return <div key={index}>{error.msg}</div>;
    });

  const handleNewUserClick = () => {
    navigate('/users/create');
  };

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <div>{userList}</div>
      <button onClick={handleNewUserClick}>New User</button>
      <button onClick={handleAddClick}>Add one</button>
      <div>{errorList}</div>
      <div>{getErrors}</div>
    </div>
  );
};

export default Users;
