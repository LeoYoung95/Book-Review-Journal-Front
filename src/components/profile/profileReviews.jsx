/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewCard from '../review/reviewCard';
import { findUserById } from '../../clients/user_client';


export default function ProfileReviews() {
  
  const currentUserSlice = useSelector(state => state.currentUser);
  const [userRole, setUserRole] = useState('');
  const [likedReviews, setLikedReviews] = useState([]);
  const [writtenReviews, setWrittenReviews] = useState([]);
  
  const fetchedLikedAndWrittenReviews = async () => {
    const userResponse = await findUserById(currentUserSlice.userId);
    console.log(userResponse);
    setLikedReviews(userResponse.likedReviews);
    setWrittenReviews(userResponse.writtenReviews);
  }

  useEffect(() => {
    if (currentUserSlice) {
      console.log(currentUserSlice);
      setUserRole(currentUserSlice.role);
      fetchedLikedAndWrittenReviews();
    }
  }, [currentUserSlice])
  
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mt-8 mb-4 font-bold text-2xl'>
        {
          userRole === 'Reader' ?
            'My Liked Reviews' :
          userRole === 'Author' ?
            'My Reviews' :
          null
        }
      </h1>
    
      {
        userRole === 'Reader' ?
          likedReviews.map((reviewId,i) => {
            return (
              <ReviewCard key={i} reviewId={reviewId} />
            )
          }) : 'Writer' ?
          writtenReviews.map((reviewId, i) => {
            return (
              <ReviewCard key={i} reviewId={reviewId} />
            )
          }) : 
          null
      }
    
      
    
    </div>
  );
};