import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findAllReviews } from '../../clients/review_client';
import ReviewCard from '../review/reviewCard';
import './adminReviewManagement.css';
import { setNeedRefresh } from '../../reducers/currentBooksReducer';

const AdminReviewManagement = () => {
    const [allReviews, setAllReviews] = useState([]);
    const needRefresh = useSelector(state => state.currentBooks.needRefresh);
    const dispatch = useDispatch();
    const currentUserId = useSelector(state => state.currentUser.userId);

    useEffect(() => {
        fetchAllReviews();
        if (needRefresh) {
            dispatch(setNeedRefresh(false)); // Reset the needRefresh state after fetching
        }
    }, [needRefresh, currentUserId, dispatch]);

    const fetchAllReviews = async () => {
        try {
            const fetchedReviews = await findAllReviews();
            setAllReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching all reviews:', error);
        }
    };

    return (
        <div>
            <div className="row review-cards-container">
                <h1 className="admin-review-title">All Reviews</h1>
            </div>

            <div className="row">
                <div className="review-cards-container">
                    {allReviews.map((review) => (
                        <ReviewCard key={review._id} reviewId={review._id} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default AdminReviewManagement;
