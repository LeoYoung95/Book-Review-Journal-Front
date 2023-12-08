import React from 'react';
import { useSelector } from 'react-redux';
import ReviewTrending from '../review/reviewTrending';

const VisitorHome = () => {
    const currentUser = useSelector(state => state.currentUser); // Assuming this is how you access the current user


    return <div>
        <ReviewTrending />
        </div>;
};

export default VisitorHome;
