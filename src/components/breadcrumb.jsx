import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');
  
  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  

  return (
    <ul className="flex space-x-2 mt-[70px]">
      <li>
        <Link to="/">Home</Link>
      </li>
      {pathSegments.map((segment, index) => (
        <li key={index}>
          <span className="mx-2">{'>'}</span>
          <Link to={`/${pathSegments.slice(0, index + 1).join('/')}`}>
            {capitalizeFirstLetter(segment)}
          </Link>
        </li>
      ))}
    </ul>

  );
};

export default Breadcrumb;
