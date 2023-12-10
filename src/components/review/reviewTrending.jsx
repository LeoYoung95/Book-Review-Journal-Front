import React, { useEffect, useState } from "react";
import ReviewCard from "./reviewCard";
import { findAllReviews } from "../../clients/review_client";
import "./review.css";

export default function ReviewTrending() {
    const [reviews, setReviews] = useState([]);
    const [topReviews, setTopReviews] = useState([]);

    useEffect(() => {
        async function fetchReviews() {
            try {
                const allReviews = await findAllReviews();
                setReviews(allReviews);
                console.log("Fetched reviews:", allReviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, []);

    useEffect(() => {
        // Filter out deleted reviews, then sort and slice
        const filteredAndSortedReviews = reviews
            .filter(review => !review.is_deleted) // Exclude reviews marked as deleted
            .sort((a, b) => b.likedUsers.length - a.likedUsers.length);

        setTopReviews(filteredAndSortedReviews.slice(0, 10));
    }, [reviews]);

    if (topReviews.length === 0) {
        return (
            <div className="loading-indicator">
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
                <div className="loading-dot"></div>
            </div>
        );
    }

    return (
        <div className="trending-container">
            <h2 className="trending-title">Trending Reviews</h2>
            <div className="trending-row">
                {topReviews.map((review, i) => (
                    <div key={i} className="trending-col">
                        <ReviewCard reviewId={review._id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
