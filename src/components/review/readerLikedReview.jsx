import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewCard from './reviewCard'; 
import axios from 'axios';

export default function ReaderLikedReviews() {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.usersReducer.user); 
    const [likedReviews, setLikedReviews] = useState([]);

    useEffect(() => {
        async function fetchLikedReviews() {
            try {
                // Obtain the array of IDs of reviews liked by the current user
                const likedReviewIds = currentUser.likedReviews;

                // Fetch details for each liked review
                const reviewsData = await Promise.all(
                    likedReviewIds.map((id) =>
                        axios.get(`/api/reviews/${id}`).then(response => response.data)
                    )
                );

                // Update the state to display these reviews
                setLikedReviews(reviewsData);
            } catch (err) {
                console.error("Error fetching liked reviews:", err);
            }
        }

        if (currentUser && currentUser.likedReviews) {
            fetchLikedReviews();
        }
    }, [dispatch, currentUser]);

    if (!currentUser) {
        return <div>Loading user data...</div>;
    }

    if (likedReviews.length === 0) {
        return <div>No liked reviews found.</div>;
    }

    return (
        <div>
            <h2>Liked Reviews</h2>
            {likedReviews.map((review) => (
                <ReviewCard key={review._id} reviewId={review._id} />
            ))}
        </div>
    );
}
