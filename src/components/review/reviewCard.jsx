import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { findReviewById, deleteReview, recoverReview } from "../../clients/review_client";
import { findUserById } from "../../clients/user_client";
import "./review.css";

export default function ReviewCard({ reviewId }) {
    const currentUser = useSelector((state) => state.currentUser);
    const [review, setReview] = useState(null);
    const [author, setAuthor] = useState(null);

    useEffect(() => {
        async function fetchReviewAndAuthor() {
            try {
                const reviewData = await findReviewById(reviewId);
                setReview(reviewData);

                if (reviewData && reviewData.author_id) {
                    const authorData = await findUserById(reviewData.author_id);
                    setAuthor(authorData);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchReviewAndAuthor();
    }, [reviewId]);

    const truncateReviewBody = (body) => {
        const maxLength = 25;
        return body.length > maxLength ? body.substring(0, maxLength) + "..." : body;
    };

    const handleDelete = async () => {
        try {
            await deleteReview(review._id, currentUser._id);
            // Update UI or state as needed after deletion
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    const handleRecover = async () => {
        try {
            await recoverReview(review._id);
            // Update UI or state as needed after recovery
        } catch (err) {
            console.error("Error recovering review:", err);
        }
    };

    if (!review || !author) {
        return <div>Loading...</div>;
    }

    const cardClass = review.is_deleted ? "review-card review-card-deleted" : "review-card";
    const statusIndicatorClass = review.is_deleted ? "status-indicator status-indicator-deleted" : "status-indicator status-indicator-alive";
    const isReviewVisible = currentUser.role === 'Admin' || !review.is_deleted;

    return isReviewVisible ? (
        <div className={cardClass}>
            <div className="review-card-header">
                {review.title}
                {currentUser.role === 'Admin' && (
                    <span className={statusIndicatorClass}>
                        {review.is_deleted ? 'Deleted' : 'Alive'}
                    </span>
                )}
            </div>
            <div className="review-card-body">
                <p>Review Author: {`${author.firstName} ${author.lastName}`}</p>
                <p>Review Preview: {truncateReviewBody(review.body)}</p>
            </div>
            <div className="review-card-footer">
                {currentUser.role === 'Author' && (
                    <>
                        <button className="button button-edit">Edit</button>
                        <button className="button button-delete" onClick={handleDelete}>Delete</button>
                    </>
                )}
                {currentUser.role === 'Admin' && (
                    review.is_deleted ?
                        <button className="button button-recover" onClick={handleRecover}>Restore</button> :
                        <button className="button button-delete" onClick={handleDelete}>Delete</button>
                )}
            </div>
        </div>
    ) : null;
}
