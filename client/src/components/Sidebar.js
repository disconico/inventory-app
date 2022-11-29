import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const links = ['Home', 'Users', 'Materials'];

  const displayLinks = links.map((link, index) => {
    return (
      <Link key={index} to={`/${link}`}>
        {link}
      </Link>
    );
  });

  return <aside>{displayLinks}</aside>;
};

export default Sidebar;
