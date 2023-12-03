import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { findCurrentUser } from '../../clients/user_client.js';

const AdminReviewManagement = () => {
    const [reviews, setReviews] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        fetchCurrentUser();
        fetchReviews();
    }, []);

    const fetchCurrentUser = async () => {
        try {
            const userInfo = await findCurrentUser();
            setCurrentUser(userInfo);
        } catch (error) {
            console.error('Error fetching current user:', error);
        }
    };

    const fetchReviews = async () => {
        try {
            const response = await axios.get('/api/reviews'); // Adjust the URL as per your API endpoint
            setReviews(response.data);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    const deleteReview = async (reviewId) => {
        if (!currentUser) return;

        try {
            await axios.put(`/api/reviews/delete/${reviewId}`, { deletedBy: currentUser._id });
            // Update local state
            setReviews(reviews.map(review => review.id === reviewId ? { ...review, is_deleted: true, deleted_by: currentUser._id } : review));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };

    const recoverReview = async (reviewId) => {
        try {
            await axios.put(`/api/reviews/recover/${reviewId}`);
            // Update local state
            setReviews(reviews.map(review => review.id === reviewId ? { ...review, is_deleted: false, deleted_by: null } : review));
        } catch (error) {
            console.error('Error recovering review:', error);
        }
    };

    return (
        <div>
            <h1>Review Management</h1>
            <ul>
                {reviews.map(review => (
                    <li key={review.id}>
                        <p>Title: {review.title}</p>
                        <p>Status: {review.is_deleted ? 'Deleted' : 'Active'}</p>
                        {review.is_deleted ? (
                            <p>Deleted by User ID: {review.deleted_by}</p>
                        ) : (
                            <p>Author ID: {review.author_id}</p>
                        )}
                        {review.is_deleted ? (
                            <button onClick={() => recoverReview(review.id)}>Recover</button>
                        ) : (
                            <button onClick={() => deleteReview(review.id)}>Delete</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminReviewManagement;
