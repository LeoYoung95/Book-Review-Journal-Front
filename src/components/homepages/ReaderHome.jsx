import React from 'react';
import { useSelector } from 'react-redux';
import ReaderLikedReviews from '../reader/readerLikedReview';
import ReaderLikedBooks from '../reader/readerLikedBook';
import ReviewTrending from "../review/reviewTrending";
import '../../App.css';

const ReaderHome = () => {
    const currentUser = useSelector(state => state.currentUser);

    if (currentUser && currentUser.role === 'Reader') {
        return (
            <div className="reader-home-row justify-center">
                {/* ReviewTrending will always be visible */}
                <div className="w-full lg:w-7/12 ">
                    <ReviewTrending/>
                </div>
                {/* ReaderLikedReviews will be hidden on screens smaller than lg */}
                <div className="hidden lg:block lg:w-3/12 border-l-2 border-r-2">
                    <ReaderLikedReviews/>
                </div>
                {/* ReaderLikedBooks will be hidden on screens smaller than lg */}
                <div className="hidden lg:block lg:w-2/12">
                    <ReaderLikedBooks/>
                </div>
            </div>
        )
    }
};

export default ReaderHome;
