import React from 'react';
import { Link } from 'react-router-dom';
import profileAvatar from '../../images/profile-avatar.jpg'
import { FaThumbsUp, FaEdit } from 'react-icons/fa'

export default function ProfileReviewCard({ review }) {

  const truncatedContent = review.content.substring(0, 25);

  
  return (
    <div className='border-2 border-gray-300 p-4 w-[80%] mb-4 flex justify-between items-center'>
      <div className='flex'>
        <div className='w-[100px] mr-6 '>
          <img 
            src={profileAvatar} 
            alt='profile avatar' 
            className='h-[60px] w-[60px] mb-2'
          />
          <p>
            {review.writerName}
          </p>
        </div>
    
        <div className='flex flex-col justify-between '>
          <div className=''>
            <h2 className='font-bold'>
              Book: {review.bookTitle}
            </h2>
            <p><strong>Review title</strong>: {review.title} </p>
          </div>
          <p className='italic'>
            <strong>Preview</strong>: {truncatedContent}...
          </p>
        </div>
      </div>
      
      <div className='flex flex-col items-center ml-2'>
        <FaThumbsUp />
        <p>{review.likes}</p>
      </div>
    </div>
  )
}