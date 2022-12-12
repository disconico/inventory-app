import React from 'react';
import PropTypes from 'prop-types';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { useNavigate } from 'react-router';

const UserCard = ({ user }) => {
  const {
    first_name: firstName,
    family_name: familyName,
    date_of_birth: dateOfBirth,
    _id,
    is_friendly: isFriendly,
  } = user;
  const navigate = useNavigate();

  return (
    <div className='h-auto w-52 shadow-xl flex flex-col p-4 my-4 rounded-lg hover:scale-105 duration-300'>
      <div className='flex flex-col gap-2'>
        <p className='font-bold text-lg'>
          {firstName} {familyName}
        </p>
        <p>{new Date(dateOfBirth).toISOString().substring(0, 10)}</p>
        <div className='flex justify-start items-center gap-2'>
          {isFriendly ? <FcApproval /> : <FcCancel />}
          <p>
            {isFriendly
              ? `${firstName} is friendly !`
              : `${firstName} is not friendly !`}
          </p>
        </div>
        <button
          onClick={() => navigate(`/users/${_id}`)}
          className='text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-[50%] py-1.5 text-center self-center'
        >
          Profile
        </button>
      </div>
    </div>
  );
};

UserCard.propTypes = {
  user: PropTypes.object,
};

export default UserCard;
