import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';

const Home = () => {
  const [userCount, setUserCount] = useState([]);
  const [materialCount, setMaterialCount] = useState([]);
  const [triggerAxios, setTriggerAxios] = useState(0);
  const navigate = useNavigate();

  // This method fetches the users from the database.
  useEffect(() => {
    axios
      .get('/home')
      .then((res) => {
        console.log(res.data);
        setUserCount(res.data.user_count);
        setMaterialCount(res.data.material_count);
      })
      .catch((err) => console.log(err));
  }, [triggerAxios]);

  const handleAddClick = () => {
    axios
      .post('/users', {
        first_name: '  miaou ',
        family_name: 'dsd',
        // date_of_birth: 'miam',
      })
      .then((res) => {
        console.log(res);
        setTriggerAxios((prev) => prev + 1);
      })
      .catch((err) => {
        console.log(err.response.data.errors);
      });
  };

  return (
    <div className='Home'>
      <h1>Hello</h1>
      <div>User count : {userCount}</div>
      <div>Material count : {materialCount}</div>
      <button onClick={handleAddClick}>Add one</button>
    </div>
  );
};

export default Home;
