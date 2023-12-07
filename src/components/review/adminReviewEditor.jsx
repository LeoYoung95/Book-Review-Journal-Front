import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReviews, deleteReview, recoverReview } from "../../reducers/reviewsReducer";
import ReviewCard from "./reviewCard";
import axios from "axios";

// AdminReviewEdit component for admin to edit reviews
export default function AdminReviewEdit() {
    const dispatch = useDispatch();
    // Accessing the reviews from the Redux store
    const reviews = useSelector((state) => state.reviewsReducer.reviews);

    // Effect to fetch reviews on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // GET request to fetch reviews
                const response = await axios.get("/api/reviews");
                // Updating the Redux store with the fetched reviews
                dispatch(setReviews(response.data));
            } catch (err) {
                // Logging errors if the fetch fails
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, [dispatch]);

    // Function to handle review deletion
    const handleDelete = (reviewId) => {
        axios
            .post(`/api/reviews/${reviewId}/delete`)
            .then(() => {
                // Dispatch deleteReview action after successful API response
                dispatch(deleteReview({ id: reviewId, deletedBy: "admin" }));
            })
            .catch((err) => console.error("Error deleting review:", err));
    };

    // Function to handle review recovery
    const handleRecover = (reviewId) => {
        axios
            .post(`/api/reviews/${reviewId}/recover`)
            .then(() => {
                // Dispatch recoverReview action after successful API response
                dispatch(recoverReview(reviewId));
            })
            .catch((err) => console.error("Error recovering review:", err));
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Admin Review Edit</h2>
            <div className="row">
                {reviews.map((review) => (
                    <div key={review.id} className="col-12 mb-4">
                        {/* Displaying each review in a ReviewCard */}
                        <ReviewCard reviewId={review.id} />
                        <div className="mt-2">
                            {/* Displaying the review status */}
                            <span className="badge bg-secondary">{review.is_deleted ? "Deleted" : "Alive"}</span>
                            {/* Conditionally rendering the delete or recover button based on review status */}
                            {review.is_deleted ? (
                                <button onClick={() => handleRecover(review.id)} className="btn btn-success ml-2">
                                    Recover Review
                                </button>
                            ) : (
                                <button onClick={() => handleDelete(review.id)} className="btn btn-danger ml-2">
                                    Delete
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
