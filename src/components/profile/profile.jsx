import React from 'react';
import { Link } from 'react-router-dom';
import personal_info from './personal_info';
import liked_reviews_reader from './liked_reviews_reader';

export default function Profile() {
  return (
    <div className='w-full ms-2'>
      <h1>Profile</h1>
      <ul className="flex" 
        role="tablist"
        data-te-nav-ref>
        <li className="mr-3" role="presentation">
          <Link class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" 
            to={personal_info}>
            Personal Info
          </Link>
        </li>
        <li className="mr-3" role="presentation">
          <Link class="inline-block border border-blue-500 rounded py-1 px-3 bg-blue-500 text-white" 
            to={liked_reviews_reader}>
            Liked Reviews
          </Link>
        </li>
      </ul>

    </div>
  )
}