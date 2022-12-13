import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { FcDataConfiguration } from 'react-icons/fc';

const Sidebar = () => {
  const [nav, setNav] = useState(false);
  const links = [
    {
      url: 'home',
      name: 'Homepage',
    },
    { url: 'users', name: 'List of users' },
    { url: 'materials', name: 'List of products' },
    { url: 'categories', name: 'List of categories' },
    { url: 'users/create', name: 'Create new user' },
    { url: 'materials/create', name: 'Create new product' },
    { url: 'categories/create', name: 'Create new category' },
  ];
  const handleNav = () => {
    setNav((prev) => !prev);
  };
  const handleClose = () => {
    setNav(false);
  };

  const linksList = links.map((link, i) => {
    return (
      <Link
        to={`/${link.url}`}
        key={i}
        className='hover:scale-105 hover:text-blue-600 hover:font-semibold'
        onClick={handleClose}
      >
        {link.name}
      </Link>
    );
  });

  return (
    <aside className='flex flex-col mx-auto w-full p-4 text-gray-700'>
      <div className='hidden mx-auto w-full md:flex flex-col gap-2'>
        <div className='flex items-center gap-4 mb-4'>
          <FcDataConfiguration size={40} />
        </div>
        {linksList}
      </div>
      <div className=' md:hidden flex justify-between'>
        <div className='flex items-center justify-between gap-4'>
          <FcDataConfiguration size={40} />
        </div>
        {nav ? (
          <AiOutlineClose onClick={handleNav} size={20} />
        ) : (
          <AiOutlineMenu size={20} onClick={handleNav} />
        )}
      </div>
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[80%] h-full border-r border-r-gray-900 bg-white ease-in duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <div className='mx-auto w-full flex flex-col gap-2 p-4 items-start'>
          <div className='flex items-center gap-4 mb-4'>
            <FcDataConfiguration size={40} />
          </div>
          {linksList}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
