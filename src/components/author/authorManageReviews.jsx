import React, { useEffect, useState } from 'react';
import { findUserById } from '../../clients/user_client';
import ReviewCard from '../review/reviewCard';
import '../admin/adminReviewManagement.css';
import { useSelector } from "react-redux";

const AuthorReviewManagement = () => {
    const [reviewIds, setReviewIds] = useState([]);
    const currentUserId = useSelector(state => state.currentUser.userId);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedUser = await findUserById(currentUserId);
                setReviewIds(fetchedUser.writtenReviews);

            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchData(); // This line is added to call the fetchData function.
    }, [currentUserId]); // The effect will run every time currentUserId changes.

    console.log(reviewIds)
    return (
        <div className="admin-review-management">
            <h1 className="admin-review-title">My Written Reviews</h1>
            <div className="review-cards-container">
                {reviewIds.map(reviewId => (
                    <ReviewCard
                        key={reviewId}
                        reviewId={reviewId}
                    />
                ))}
            </div>
        </div>
    );
};

export default AuthorReviewManagement;
