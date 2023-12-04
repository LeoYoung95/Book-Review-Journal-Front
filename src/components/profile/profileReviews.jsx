import React from 'react';
import ProfileReviewCard from './profileReviewCard';

export default function ProfileReviews({ currentUser, profileUser }) {

  const likedReviews = [
    {
      title: 'My title',
      content: 'Oh my goodness! What in the actual f*ck is going on? I have no idea where I am, or what I am doing. Wait a minute!! WHO AM I?',
      writerName: 'Whoopi Goldberg',
      likes: 7,
      bookTitle: 'Whoops! Whats going on??',
    },
    {
      title: 'Your title',
      content: 'I totally recommend this book to anyone trying to start a communist revolution!!! The secret is in the VODKA',
      writerName: 'Joseph Stalin',
      likes: 2,
      bookTitle: 'Best Vodka Recipes'
    },
    {
      title: 'Their title',
      content: 'In war, you must move quickly. If you move too slowly, you will end up like me. Dead in a ditch and bald as hell',
      writerName: 'Benito Mussolini',
      likes: 9,
      bookTitle: 'Despacito'
    },
    {
      title: 'Our title',
      content: 'The main reason why I write this book is this - I have many problems and my shrink is telling me that there is no longer hope.',
      writerName: 'Adolf Hitler',
      likes: 3,
      bookTitle: 'Mein Kamph'
    }
  ];
  
  return (
    <div className='w-full flex flex-col items-center'>
      <h1 className='mt-8 mb-4 font-bold text-2xl'>
        {
          profileUser.role === 'reader' ?
            'My Liked Reviews' :
          profileUser.role === 'writer' ?
            'My Reviews' :
          profileUser.role === 'admin' ?
            'My Deleted Reviews' :
            null
        }
      </h1>
    
      {
        likedReviews.map(((review, i) => {
          return <ProfileReviewCard key={i} review={review} />
        }))
      }
    
    </div>
  );
};