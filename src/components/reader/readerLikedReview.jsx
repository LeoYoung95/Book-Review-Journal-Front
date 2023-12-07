import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import ReviewCard from '../review/reviewCard'; // Ensure ReviewCard is correctly imported
import {findUserById} from "../../clients/user_client";

export default function ReaderLikedReviews() {
    const dispatch = useDispatch();
    const currentUser = useSelector(state => state.currentUser);
    console.log("Current user:", currentUser);
    const [likedReviews, setLikedReviews] = useState([]);

    useEffect(() => {
        async function fetchLikedReviews() {
            try {
                // Fetch the current user's data
                const currentUserInfo = await findUserById(currentUser.userId);
                console.log("Current user info:", currentUserInfo)

                // Obtain the array of IDs of reviews liked by the current user
                const likedReviewIds = currentUserInfo.likedReviews;
                console.log("Liked review IDs:", likedReviewIds)

                // Update the state to display these reviews
                setLikedReviews(likedReviewIds);

            } catch (err) {
                console.error("Error fetching liked reviews:", err);
            }
        }

        if (currentUser && currentUser.role === "Reader") {
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
        <div className="admin-review-management">
            <h1 className="admin-review-title">My Liked Reviews</h1>
            <div className="review-cards-container">
                {likedReviews.map((reviewId) => (
                    <ReviewCard key={Date.now()} reviewId={reviewId}/>
                ))}
            </div>
        </div>
    );
}
