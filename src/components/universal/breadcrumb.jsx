import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathSegments = location.pathname.split('/').filter(segment => segment !== '');

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  // If there are no path segments (i.e., at the homepage), return an empty div
  if (pathSegments.length === 0) {
    return <div className="flex space-x-2 mt-[85px]"></div>;
  }

  return (
      <ul className="flex space-x-2 mt-[85px]">
        <li>
          <Link className='hover:text-blue-500' to="/">Home</Link>
        </li>
        {pathSegments.map((segment, index) => (
            <li key={index}>
              <span className="mx-2">{'>'}</span>
              <Link
                  className='hover:text-blue-500'
                  to={`/${pathSegments.slice(0, index + 1).join('/')}`}
              >
                {capitalizeFirstLetter(segment)}
              </Link>
            </li>
        ))}
      </ul>
  );
};

export default Breadcrumb;
