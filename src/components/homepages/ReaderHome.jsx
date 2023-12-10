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
                <div className="w-full lg:w-9/12 ">
                    <ReviewTrending/>
                </div>
                {/* ReaderLikedReviews will be hidden on screens smaller than lg */}
                <div className="hidden lg:block lg:w-2/12 border-l-4 border-r-4">
                    <ReaderLikedReviews/>
                </div>
                {/* ReaderLikedBooks will be hidden on screens smaller than lg */}
                <div className="hidden lg:block lg:w-1/12 items-start">
                    <ReaderLikedBooks/>
                </div>
            </div>
        )
    }
};

export default ReaderHome;
