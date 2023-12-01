export default function MyOrLikedReviews({ currentUser, profileUser }) {

  const likedReviews = [
    {
      bookId: '234234',
      writerName: 'Jason',
      title: 'my title',
      body: 'this is a review body',
    }
  ];
  
  return (
    <div>
      <h1 className='mt-8 font-bold text-2xl'>
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
    
    
    </div>
  );
};