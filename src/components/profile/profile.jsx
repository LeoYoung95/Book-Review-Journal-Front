import React, { useState, useEffect } from 'react';
import store from '../../reducers/store';
import { Provider } from 'react-redux';
import { redirectIfNotLoggedIn } from '../../utils/loggedInUtil';
import { useParams } from 'react-router-dom';
import PersonalInfo from './personalInfo';
import ProfileReviews from './profileReviews';
import { useSelector } from 'react-redux';
import { findUserById } from '../../clients/user_client';

export default function Profile() {
  const currentUserSlice = useSelector(state => state.currentUser);
  const { id }= useParams();
  
  const [profileUser, setProfileUser] = useState(null);
  const [isCurrentUser, setIsCurrentUser] = useState(false);

  const fetchUser = async (id) => {
    const userResponse = await findUserById(id);
    setProfileUser(userResponse);
  }

  useEffect(() => {
    redirectIfNotLoggedIn();
  }, [])
  
  useEffect(() => {
    if (currentUserSlice.userId) {
      if (id) {
        fetchUser(id);
        if (currentUserSlice.userId === id) {
          setIsCurrentUser(true);
        }
      } else {
        fetchUser(currentUserSlice.userId);
        setIsCurrentUser(true);
      }
    }
  }, [currentUserSlice.userId])

  return (
    <Provider store={store}>
      <div className='md:flex px-16 bg-[#f0f8ff]'>
        <div className='md:w-1/2 md:border-r-4 md:border-white flex justify-center'>
          <PersonalInfo 
            profileId={id} 
            profileUser={profileUser} 
            isCurrentUser={isCurrentUser}
            fetchUser={fetchUser}  
          />
        </div>
        <div className='md:w-1/2  flex justify-center'>
          <ProfileReviews 
            profileId={id}
            profileUser={profileUser}
            isCurrentUser={isCurrentUser}
          />
        </div>
      </div>
       
    </Provider>
  );
};