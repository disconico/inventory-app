import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const DeleteUser = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const handleDelete = () => {
    axios
      .delete(`/users/${id}/delete`)
      .then(() => {
        alert('User deleted');
        navigate('/users');
      })
      .catch((error) => {
        setError(error);
      });
  };

  if (error) return `Error: ${error.message}`;
  if (!userData) return 'No user!';
  console.log(userData);

  return (
    <div className='deleteUser'>
      <p>User : {userData.first_name}</p>
      <p>Do you really want to delete this User?</p>
      <button onClick={handleDelete}>Delete User</button>
    </div>
  );
};

export default DeleteUser;
