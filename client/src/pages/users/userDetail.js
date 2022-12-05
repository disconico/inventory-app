import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [userMaterials, setUserMaterials] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setUserData(res.data.user_find);
        setUserMaterials(res.data.materials_find);
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  const materialList = userMaterials.length ? (
    userMaterials.map((material, index) => {
      return (
        <p key={index}>
          {' '}
          {material.product} : {material.quantity}
        </p>
      );
    })
  ) : (
    <p>This user has no material</p>
  );
  console.log(userMaterials);
  if (error) return `Error: ${error.message}`;
  if (!userData) return 'No user!';

  return (
    <div className='userDetail'>
      {userData.id && <p>{userData.id}</p>}
      {userData.first_name && <p>{userData.first_name}</p>}
      {userData.family_name && <p>{userData.family_name}</p>}
      {userData.date_of_birth && (
        <p>{new Date(userData.date_of_birth).toISOString().substring(0, 10)}</p>
      )}
      {userData.is_friendly && <p>{`${userData.first_name} is friendly!`}</p>}
      <p>Currents products owned : </p>
      {materialList}
      <button onClick={() => navigate(`/users/${id}/update`)}>
        Update user
      </button>
      <button onClick={() => navigate(`/users/${id}/delete`)}>
        Delete user
      </button>
    </div>
  );
};

export default UserDetail;
