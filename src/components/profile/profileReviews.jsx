/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewCard from '../review/reviewCard';
import { findUserById } from '../../clients/user_client';

export default function ProfileReviews({ profileId, profileUser }) {
  
  const [userRole, setUserRole] = useState('');
  const [likedReviews, setLikedReviews] = useState([]);
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [deletedReviews, setDeletedReviews] = useState([]);
  
  useEffect(() => {
    if (profileUser) {
      setLikedReviews(profileUser.likedReviews);
      setWrittenReviews(profileUser.writtenReviews);
      setDeletedReviews(profileUser.deletedReviews);
      setUserRole(profileUser.role);
    }
  }, [profileUser])
  
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mt-8 mb-4 font-bold text-2xl'>
        {
          userRole === 'Reader' ?
            `Liked Reviews` :
          userRole === 'Author' ?
            'Reviews' :
          userRole === 'Admin' ?
            'Reviews Deleted' :
            null
        }
      </h1>
    
      {
        userRole === 'Reader' ?
          likedReviews.length ? 
            likedReviews.map((reviewId,i) => {
              return (
                <ReviewCard key={i} reviewId={reviewId} />
              )
            }) : 'No liked reviews yet'
        : 'Writer' ?
          writtenReviews.length ?
            writtenReviews.map((reviewId, i) => {
              return (
                <ReviewCard key={i} reviewId={reviewId} />
              )
            }) : 'No reviews yet' 
        : 'Admin' ?
          deletedReviews.length ?
            deletedReviews.map((reviewId, i) => {
              return (
                <ReviewCard key={i} reviewId={reviewId} />
              )
            }) : 'No deleted reviews'
        :
        null
      }
    
      
    </div>
  );
};