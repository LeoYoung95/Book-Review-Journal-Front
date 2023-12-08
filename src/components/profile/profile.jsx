import React, { useState, useEffect } from 'react';
import store from '../../reducers/store';
import { Provider } from 'react-redux';
import { redirectIfNotLoggedIn } from '../../utils/loggedInUtil';
import { useSelector } from 'react-redux';

import PersonalInfo from './personalInfo';
import ProfileReviews from './profileReviews';

export default function Profile() {
  const currentUserSlice = useSelector(state => state.currentUser);
  
  const [showProfileReviews, setShowProfileReviews] = useState(false);
  
  const isAdmin = currentUserSlice.role === 'Admin';

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [])
  
  useEffect(() => {
    if (!isAdmin) {
      setShowProfileReviews(true);
    }
  }, [currentUserSlice.role])
  
  return (
    <Provider store={store}>
      <div className='md:flex h-full px-16 bg-gray-200'>
        <div className={`${isAdmin ? 'w-full' : 'md:w-1/2'} flex justify-center`}>
          <PersonalInfo  />
        </div>
        {
          showProfileReviews ?
            <div className='md:w-1/2 h-full flex justify-center'>
              <ProfileReviews  />
            </div> : 
            null
        }
      </div>
    </Provider>
  );
};