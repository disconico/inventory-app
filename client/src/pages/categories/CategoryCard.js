import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const CategoryCard = ({ category }) => {
  const { name, description, _id } = category;
  const navigate = useNavigate();

  return (
    <div className='h-auto w-52 shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>{name}</p>
        <p>{description}</p>
        <button
          onClick={() => navigate(`/categories/${_id}`)}
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[70%] py-1.5 text-center self-center'
        >
          Cat. Details
        </button>
      </div>
    </div>
  );
};

CategoryCard.propTypes = {
  category: PropTypes.object,
};

export default CategoryCard;
