import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { DarkModeContext } from '../context/DarkModeContext';

const Home = () => {
  const [userCount, setUserCount] = useState([]);
  const [materialCount, setMaterialCount] = useState([]);
  const [categoryCount, setCategoryCount] = useState([]);
  const { darkMode } = useContext(DarkModeContext);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // This method fetches the users from the database.
  useEffect(() => {
    setLoading(true);
    axios
      .get('/home')
      .then((res) => {
        console.log(res.data);
        setUserCount(res.data.user_count);
        setMaterialCount(res.data.material_count);
        setCategoryCount(res.data.category_count);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (error) return `Error: ${error.message}`;

  return (
    !loading && (
      <div
        className={`p-4 flex flex-col gap-8 ${
          darkMode ? 'dark' : 'notDark'
        } dark:bg-slate-800 dark:text-white`}
      >
        <h1 className='font-bold text-3xl uppercase'>
          Welcome to your Inventory{' '}
        </h1>
        <div>
          <h3 className='text-2xl'>As of today there is in the inventory :</h3>
          <br></br>
          <div>{userCount} registered users</div>
          <div>{materialCount} different products</div>
          <div>{categoryCount} categories</div>
        </div>
      </div>
    )
  );
};

export default Home;
