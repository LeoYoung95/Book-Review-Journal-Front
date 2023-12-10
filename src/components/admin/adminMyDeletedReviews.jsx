import React, { useState, useEffect } from 'react';
import { findUserById } from "../../clients/user_client";
import ReviewCard from '../review/reviewCard';
import { toggleRefresh } from '../../reducers/refreshReducer';
import './adminReviewManagement.css';
import {useSelector, useDispatch} from "react-redux";

const AdminMyDeletedReviewsManagement = () => {
    const [reviews, setReviews] = useState([]);
    const refreshNeeded = useSelector(state => state.refresh.refreshNeeded);
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.currentUser.userId);

    // Get the current user from the Redux store
    // const currentUser = useSelector(state => state.currentUser);

    useEffect(() => {
        fetchReviews();
    }, [currentUserId, refreshNeeded]);

    const fetchReviews = async () => {
        try {
            const user = await findUserById(currentUserId);
            const myDeletedReviews = user.deletedReviews;
            setReviews(myDeletedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    return (
        <div className="admin-review-management">
            <h1 className="admin-review-title">My Deleted Reviews</h1>
            <div className="review-cards-container">
                {reviews.map((review,i) => (
                    <ReviewCard
                        key={i}
                        reviewId={review._id}
                        triggerRefresh={() => dispatch(toggleRefresh())}
                    />
                ))}
            </div>
        </div>
    );
};

export default AdminMyDeletedReviewsManagement;
