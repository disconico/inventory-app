import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import { Link } from 'react-router-dom';

const DeleteUser = () => {
  const [userData, setUserData] = useState(null);
  const [userMaterials, setUserMaterials] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserData(res.data.user_find);
        setUserMaterials(res.data.materials_find);
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

  const materialList = userMaterials.length
    ? userMaterials.map((material, index) => {
        return (
          <Link to={`/materials/${material._id}`} key={index}>
            {material.product}
          </Link>
        );
      })
    : '';

  if (error) return `Error: ${error.message}`;
  if (!userData) return 'No user!';
  console.log(userData);

  return (
    <div className='deleteUser'>
      <p>User : {userData.first_name}</p>
      {userMaterials.length > 0 && (
        <div>
          <h3>Please delete those materials before proceeding :</h3>
          <div>{materialList}</div>
        </div>
      )}
      {!userMaterials.length > 0 && (
        <div>
          <p>Do you really want to delete this User?</p>
          <button onClick={handleDelete}>Delete User</button>
        </div>
      )}
    </div>
  );
};

export default DeleteUser;
