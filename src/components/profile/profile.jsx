import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Profile() {
  const {pathname} = useLocation();
  return (
    <div className='w-full ms-2'>
      <h1>Profile</h1>
      {pathname}
      <nav className="nav nav-pills mt-2">
        
        <Link className={`nav-link ${pathname.includes("a3") ? "active" : ""}`} 
              to="/profile/personal_info">A3</Link>
        <Link className={`nav-link ${pathname.includes("a4") ? "active" : ""}`} 
              to="/Labs/a4">A4</Link>

      </nav>
      

    </div>
  )
}