import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import store from '../../reducers/store';
import { Provider } from 'react-redux';
import { redirectIfNotLoggedIn } from '../../utils/loggedInUtil';
import PersonalInfo from './personalInfo';
import ProfileReviews from './profileReviews';

export default function Profile() {
  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [])
  const myReduxState = useSelector(state => state);
  console.log(myReduxState);
  const currentUser = {
    firstName: 'test',
    lastName: 'user',
    email: 'test@test.com',
    role: 'admin',
    bio: 'I am a test user. What is up',
  }
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
          <PersonalInfo currentUser={currentUser} profileUser={profileUser}/>
        </div>
        <div className='md:w-1/2 h-full bg-purple-300 flex justify-center'>
          <ProfileReviews currentUser={currentUser} profileUser={profileUser}/>
        </div>
      </div>
    </Provider>
  );
};