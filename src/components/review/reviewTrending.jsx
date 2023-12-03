import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReviews } from "../../reducers/reviewsReducer";
import ReviewCard from "./reviewCard";
import axios from "axios";

// ReviewTrending component displays the top 5 trending reviews based on likes
export default function ReviewTrending() {
    const dispatch = useDispatch();
    // Access the reviews from the Redux store
    const reviews = useSelector((state) => state.reviews.reviews);
    // State to hold the top 5 reviews
    const [topReviews, setTopReviews] = useState([]);

    // Fetch all reviews on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // Perform the GET request to fetch reviews
                const response = await axios.get("/api/reviews");
                // Dispatch the setReviews action to update the Redux store
                dispatch(setReviews(response.data));
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, [dispatch]);

    // Sort and slice the reviews whenever the reviews data changes
    useEffect(() => {
        // Sort reviews by the number of likes in descending order
        const sortedReviews = [...reviews].sort((a, b) => b.likedUsers.length - a.likedUsers.length);
        // Update the topReviews state with the top 5 reviews
        setTopReviews(sortedReviews.slice(0, 5));
    }, [reviews]);

    // Show loading text if reviews are not yet fetched
    if (reviews.length === 0) {
        return <div>Loading trending reviews...</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Trending Reviews</h2>
            <div className="row">
                {topReviews.map((review) => ( // Map through the topReviews array and render a ReviewCard for each review 
                    <div key={review._id} className="col-md-6 col-lg-4 mb-4">
                        <ReviewCard reviewId={review._id} />
                    </div>
                ))}
            </div>
        </div>
    );
}
