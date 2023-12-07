import React from 'react';
import { useSelector } from 'react-redux';
import ReaderLikedReviews from '../reader/readerLikedReview';

const ReaderHome = () => {
    const currentUser = useSelector(state => state.currentUser);

    // Check if the user is an Admin
    if (currentUser && currentUser.role === 'Reader') {
        return <ReaderLikedReviews />;
    }

};

export default ReaderHome;
