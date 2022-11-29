import React from 'react';
import { useNavigate } from 'react-router';

const Add = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <div className='Add'>
      <h1>Add</h1>
      <button>Add one</button>
      <button onClick={handleBackClick}>Go back</button>
    </div>
  );
};

export default Add;
