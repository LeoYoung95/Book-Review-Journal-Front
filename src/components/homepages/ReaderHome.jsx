import React from 'react';
import { useSelector } from 'react-redux';
import ReaderLikedReviews from '../reader/readerLikedReview';
import ReaderLikedBooks from '../reader/readerLikedBook';
import ReviewTrending from "../review/reviewTrending";

const ReaderHome = () => {
    const currentUser = useSelector(state => state.currentUser);

    if (currentUser && currentUser.role === 'Reader') {
        return (
            <div className="reader-home-row justify-center">
                {/* ReviewTrending will always be visible */}
                <div className="col-12 col-md-7">
                    <ReviewTrending/>
                </div>
                {/* ReaderLikedReviews will be hidden on screens smaller than md */}
                <div className="col-md-4 d-none d-md-block">
                    <ReaderLikedReviews/>
                </div>
                {/* ReaderLikedBooks will be hidden on screens smaller than md */}
                <div className="col-md-1 d-none d-md-block align-items-start">
                    <ReaderLikedBooks/>
                </div>
            </div>
        )
    }
};

export default ReaderHome;
