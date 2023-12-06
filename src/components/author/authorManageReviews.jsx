import React, {useEffect, useState} from 'react';
import { findUserById } from '../../clients/user_client';
import ReviewCard from '../review/reviewCard';
import '../admin/adminReviewManagement.css';
import {useSelector} from "react-redux";

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
    }, [currentUserId]);


    return (
        <div className="admin-review-management">
            <h1 className="admin-review-title">Review Management</h1>
            <div className="review-cards-container">
                {reviewIds.map(reviewId => (
                    <ReviewCard key={reviewId} reviewId={reviewId} />
                ))}
            </div>
        </div>
    );
};

export default AuthorReviewManagement;
