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
      <div className='md:flex h-full'>
        <div className={`${isAdmin ? 'w-full' : 'md:w-1/2'} bg-pink-300 flex justify-center`}>
          <PersonalInfo  />
        </div>
        {
          showProfileReviews ?
            <div className='md:w-1/2 h-full bg-purple-300 flex justify-center'>
              <ProfileReviews  />
            </div> : 
            null
        }
      </div>
    </Provider>
  );
};