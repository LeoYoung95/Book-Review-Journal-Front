import React from 'react';
import { Routes, Route, Navigate }from "react-router";
import { useSelector } from 'react-redux';
import PersonalInfo from './personal_info';
import LikedReviews from './liked_reviews';
import store from '../../reducers/store';
import { Provider } from 'react-redux';
import NavBarProfile from './nav_bar_profile';

export default function Profile() {
  
  const myReduxState = useSelector(state => state);
  console.log(myReduxState);
  const currentUser = {
    name: 'test user',
    email: 'test@test.com',
    role: 'writer',
  }

  return (
    <Provider store={store}>
    <div className='w-full ms-2'>
      <h1>Profile</h1>
      <NavBarProfile/>

      <Routes>
        <Route path="/"
          element={<Navigate
            to="personal-info"/>} />
        <Route path="personal-info"
          element={<PersonalInfo/>} />
        <Route path="liked-reviews"
          element={<LikedReviews/>} />
      </Routes>


    </div>
    </Provider>
  );
};