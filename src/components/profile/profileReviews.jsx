/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ReviewCard from '../review/reviewCard';
import { findUserById } from '../../clients/user_client';
import "../review/review.css";

export default function ProfileReviews({ profileId, profileUser }) {
  
  const [userRole, setUserRole] = useState('');
  const [likedReviews, setLikedReviews] = useState([]);
  const [writtenReviews, setWrittenReviews] = useState([]);
  const [deletedReviews, setDeletedReviews] = useState([]);
  
  useEffect(() => {
    if (profileUser) {
      setUserRole(profileUser.role);
      setLikedReviews(profileUser.likedReviews);
      setWrittenReviews(profileUser.writtenReviews);
      setDeletedReviews(profileUser.deletedReviews);
    }
  }, [profileUser])
  
  const displayReviews = () => {
    if (userRole === 'Reader' && likedReviews.length) {
      return (
        likedReviews.map((reviewId, i) => (
          <ReviewCard key={i} reviewId={reviewId} />
        ))
      )
    } else if (userRole === 'Author' && writtenReviews.length) {
      return (
        writtenReviews.map((reviewId, i) => (
          <ReviewCard key={i} reviewId={reviewId} />
        ))
      )
    } else if (userRole === 'Admin' && deletedReviews.length) {
      return (
        deletedReviews.map((reviewId, i) => (
          <ReviewCard key={i} reviewId={reviewId} />
        ))
      )
    } else {
      return 'Nothing yet'
    }
  }

  return (
    <div className='pl-10'>
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
        displayReviews()
      }
    
      
    </div>
  );
};