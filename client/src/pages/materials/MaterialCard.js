import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';

const MaterialCard = ({ material, owner, category }) => {
  const { product, description, price, quantity, _id } = material;
  const navigate = useNavigate();

  return (
    <div className='min-h-[200px] w-72 shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
      <div className='flex flex-col gap-2 min-h-full'>
        <p className='font-bold text-lg'>{product}</p>
        {category ? <p>Category : {category.name}</p> : ''}
        <p>Owned by {owner.first_name}</p>
        <p>{description}</p>
        <p className='mb-2'>
          {price}$ - {quantity} units available
        </p>
        <button
          onClick={() => navigate(`/materials/${_id}`)}
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] py-1.5 text-center self-center justify-self-end mt-auto'
        >
          Product detail
        </button>
      </div>
    </div>
  );
};

MaterialCard.propTypes = {
  material: PropTypes.object,
  owner: PropTypes.object,
  category: PropTypes.object,
};

export default MaterialCard;
