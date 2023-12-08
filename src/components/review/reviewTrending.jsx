import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { findAllReviews } from "../../clients/review_client";

// ReviewTrending component displays the top 5 trending reviews based on likes
export default function ReviewTrending() {
    const [reviews, setReviews] = useState([]);
    const [topReviews, setTopReviews] = useState([]);

    // Fetch all reviews on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // Perform the GET request to fetch reviews
                const allReviews = await findAllReviews();
                setReviews(allReviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, []);

    // Sort and slice the reviews whenever the reviews data changes
    useEffect(() => {
        // Sort reviews by the number of likes in descending order
        const sortedReviews = [...reviews].sort((a, b) => b.likedUsers.length - a.likedUsers.length);
        // Update the topReviews state with the top 10 reviews
        setTopReviews(sortedReviews.slice(0, 10));
    }, [reviews]);

    // Show loading text if reviews are not yet fetched
    if (topReviews.length === 0) {
        return <div>Loading trending reviews...</div>;
    }

    return (
        <div className="trending-container">
            <h2 className="trending-title">Trending Reviews</h2>
            <div className="trending-row">
                {topReviews.map((review) => (
                    <div key={review._id} className="trending-col">
                        <ReviewCard reviewId={review._id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
