import React from 'react';
import {useSelector} from 'react-redux';
import ReaderLikedReviews from '../reader/readerLikedReview';
import ReviewTrending from "../review/reviewTrending";

const ReaderHome = () => {
    const currentUser = useSelector(state => state.currentUser);

    // Check if the user is an Admin
    if (currentUser && currentUser.role === 'Reader') {
        return (
            <div className="reader-home-row">
                <div className="col col-md-8">
                    <ReviewTrending/>
                </div>
                <div className="col col-md-4 align-items-start">
                        <ReaderLikedReviews/>
                </div>
            </div>
        )
    }

};

export default ReaderHome;
