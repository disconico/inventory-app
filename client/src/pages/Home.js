import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Home = () => {
  const [userCount, setUserCount] = useState([]);
  const [materialCount, setMaterialCount] = useState([]);
  const [triggerAxios] = useState(0);

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

  return (
    <div className='p-4'>
      <div>User count : {userCount}</div>
      <div>Material count : {materialCount}</div>
    </div>
  );
};

export default Home;
