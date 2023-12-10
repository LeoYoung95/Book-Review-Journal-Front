import React, {useState, useEffect} from 'react';
import {findUserById} from "../../clients/user_client";
import {findAllReviews} from '../../clients/review_client';
import ReviewCard from '../review/reviewCard';
import './adminReviewManagement.css';
import {useSelector} from "react-redux";

const AdminReviewManagement = () => {
    const [allReviews, setAllReviews] = useState([]);
    const [deletedReviews, setDeletedReviews] = useState([]);
    const [refreshNeeded, setRefreshNeeded] = useState(true);
    const currentUserId = useSelector(state => state.currentUser.userId);

    useEffect(() => {
        if (refreshNeeded) {
            setRefreshNeeded(false);
        }

        fetchAllReviews();
        if (currentUserId) {
            fetchDeletedReviews(currentUserId);
        }
    }, [currentUserId, refreshNeeded]);

    const fetchAllReviews = async () => {
        try {
            const fetchedReviews = await findAllReviews();
            console.log('Fetched all reviews:', fetchedReviews);
            setAllReviews(fetchedReviews);
        } catch (error) {
            console.error('Error fetching all reviews:', error);
        }
    };

    const fetchDeletedReviews = async (userId) => {
        try {
            const user = await findUserById(userId);
            const myDeletedReviews = user.deletedReviews;
            console.log('Fetched deleted reviews:', myDeletedReviews);
            setDeletedReviews(myDeletedReviews);
        } catch (error) {
            console.error('Error fetching deleted reviews:', error);
        }
    };

    const triggerRefresh = () => {
        setRefreshNeeded(true);
    };
    
    return (
        <div className="row admin-home-row">

                <h1 className="admin-review-title">All Reviews</h1>
                <div className="review-cards-container">
                    {allReviews.map((review) => (
                        <ReviewCard
                            key={review._id}
                            reviewId={review._id}
                            triggerRefresh={triggerRefresh}
                        />
                    ))}
                </div>
        </div>
    );
}

export default AdminReviewManagement;