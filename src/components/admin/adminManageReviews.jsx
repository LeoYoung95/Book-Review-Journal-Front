import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { findAllReviews } from '../../clients/review_client';
import ReviewCard from '../review/reviewCard';
import './adminReviewManagement.css';

const AdminReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [refreshNeeded, setRefreshNeeded] = useState(false);

    // Get the current user from the Redux store
    // const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        fetchReviews();
    }, [refreshNeeded]);

    const fetchReviews = async () => {
        try {
            const fetchedReviews = await findAllReviews();
            setReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div className="admin-review-management">
            <h1 className="admin-review-title">Review Management</h1>
            <div className="review-cards-container">
                {reviews.map(review => (
                    <ReviewCard
                        key={review._id}
                        reviewId={review._id}
                        triggerRefresh={() => setRefreshNeeded(prev => !prev)}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminReviewManagement;
