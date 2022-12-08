import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

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
        className='hover:scale-105 hover:text-yellow-500'
        onClick={handleClose}
      >
        {link.name}
      </Link>
    );
  });

  return (
    <aside className='flex flex-col mx-auto w-full items-end p-4 text-lg'>
      <div className='hidden mx-auto w-full md:flex flex-col'>{linksList}</div>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          nav
            ? 'fixed left-0 top-0 w-[80%] h-full border-r border-r-gray-900 bg-[#000300] ease-in duration-500'
            : 'fixed left-[-100%]'
        }
      >
        <div className='mx-auto w-full flex flex-col p-4 items-start'>
          {linksList}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
