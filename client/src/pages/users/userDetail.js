import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserDetail = () => {
  const [userData, setUserData] = useState(null);
  const [userMaterials, setUserMaterials] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`/users/${id}`)
      .then((res) => {
        setUserData(res.data.user_find);
        setUserMaterials(res.data.materials_find);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const materialList = userMaterials.length ? (
    userMaterials.map((material, index) => {
      return (
        <Link key={index} to={`/materials/${material._id}`}>
          <p>
            {' '}
            {material.product} : {material.quantity}
          </p>
        </Link>
      );
    })
  ) : (
    <p>This user has no material</p>
  );

  if (error) return `Error: ${error.message}`;
  if (!userData) return 'No user!';

  return (
    <div className='p-4 flex flex-col gap-4'>
      {loading && <h1>Loading.....</h1>}
      {!loading && (
        <>
          {' '}
          {userData._id && (
            <p className='font-bold text-xl'>User id : {userData._id}</p>
          )}
          {userData.first_name && <p>First name : {userData.first_name}</p>}
          {userData.family_name && <p>Family name : {userData.family_name}</p>}
          {userData.date_of_birth && (
            <p>
              Birthday :{' '}
              {new Date(userData.date_of_birth).toISOString().substring(0, 10)}
            </p>
          )}
          {userData.is_friendly && (
            <p>{`${userData.first_name} is friendly!`}</p>
          )}
          <p className='text-xl'>
            Current products owned by {userData.first_name}:{' '}
          </p>
          {materialList}
          <div className='flex gap-4 '>
            <button
              onClick={() => navigate(`/users/${id}/update`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Update user
            </button>
            <button
              onClick={() => navigate(`/users/${id}/delete`)}
              className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[200px] my-4 py-2 text-center self-center'
            >
              Delete user
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default UserDetail;
