import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [triggerAxios, setTriggerAxios] = useState(0);
  const navigate = useNavigate();

  // This method fetches the users from the database.
  useEffect(() => {
    axios
      .get('/users')
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => console.log(err));
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

  const errorList = errors ? (
    errors.map((error, index) => {
      return <div key={index}>{error.msg}</div>;
    })
  ) : (
    <p>No user</p>
  );

  const handleClick = () => {
    navigate('/add');
  };

  const handleAddClick = () => {
    axios
      .post('/users', {
        first_name: '  miaou ',
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
      });
  };

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <div>{userList}</div>
      <button onClick={handleClick}>Go next</button>
      <button onClick={handleAddClick}>Add one</button>
      <div>{errorList}</div>
    </div>
  );
};

export default Users;
