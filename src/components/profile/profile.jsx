import React, { useEffect } from 'react';
import store from '../../reducers/store';
import { Provider } from 'react-redux';
import { redirectIfNotLoggedIn } from '../../utils/loggedInUtil';

import PersonalInfo from './personalInfo';
import ProfileReviews from './profileReviews';

export default function Profile() {
  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [])
  
  const profileUser = {
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    role: 'reader',
    bio: 'I am a test user. What is up',
  }
  
  
  return (
    <Provider store={store}>
      <div className='md:flex h-full'>
        <div className='md:w-1/2 bg-pink-300 flex justify-center'>
          <PersonalInfo  />
        </div>
        <div className='md:w-1/2 h-full bg-purple-300 flex justify-center'>
          <ProfileReviews profileUser={profileUser} />
        </div>
      </div>
    </Provider>
  );
};