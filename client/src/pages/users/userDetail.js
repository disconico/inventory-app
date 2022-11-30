import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';

const UserDetail = () => {
  const [userData, setUserData] = useState({
    id: '',
    first_name: '',
    family_name: '',
    date_of_birth: '',
    is_friendly: '',
  });
  const [getErrors, setGetErrors] = useState();

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    axios
      .get(`/users/${id}`)
      .then((res) => {
        console.log(res.data);
        setUserData((prev) => ({
          ...prev,
          id: res.data._id ? res.data._id : '',
          first_name: res.data.first_name ? res.data.first_name : '',
          family_name: res.data.family_name ? res.data.family_name : '',
          date_of_birth: res.data.date_of_birth ? res.data.date_of_birth : '',
          is_friendly: res.data.is_friendly ? res.data.is_friendly : '',
        }));
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response);
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
  }, []);

  return (
    <div className='userDetail'>
      {userData.id && <p>{userData.id}</p>}
      {userData.first_name && <p>{userData.first_name}</p>}
      {userData.family_name && <p>{userData.family_name}</p>}
      {userData.date_of_birth && <p>{userData.date_of_birth}</p>}
    </div>
  );
};

export default UserDetail;
