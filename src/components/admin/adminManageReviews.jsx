import React, { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { findAllReviews } from '../../clients/review_client';
import ReviewCard from '../review/reviewCard';
import './adminReviewManagement.css';

const AdminReviewManagement = () => {
    const [reviews, setReviews] = useState([]);

    // Get the current user from the Redux store
    // const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        fetchReviews();
    }, []);

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
                    <ReviewCard key={review._id} reviewId={review._id} />
                ))}
            </div>
        </div>
    );
};

export default AdminReviewManagement;
