import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useHistory
import { findBookReviewsByOpenLibraryId } from '../../clients/book_client';
import ReviewCard from './reviewCard';
import './review.css';

export default function ReviewList({ olid }) {

    const currentUser = useSelector((state) => state.currentUser);
    const [fetchedReviews, setFetchedReviews] = useState(null);
    const navigate = useNavigate(); // useHistory hook for navigation

    useEffect(() => {
        async function fetchReviews() {
            try {
                const reviewsResponse = await findBookReviewsByOpenLibraryId(olid);
                setFetchedReviews(reviewsResponse);
            } catch (err) {
                console.error("Error:", err);
            }
        }

        if (olid) {
            fetchReviews();
        }
    }, [olid]);

    const handleWriteReviewClick = () => {
        navigate(`/review-editor/new?book_olid=${olid}`); // Navigate to ReviewEditor using useNavigate
    };

    const renderWriteReviewButton = () => {
        if (currentUser && currentUser.role === 'Author') {
            return (
                <button
                    className="write-review-button"
                    onClick={handleWriteReviewClick}>Write a New Review
                </button>
            );
        }
        return null;
    };

    if ([null, undefined].includes(fetchedReviews)) {
        return <div>Loading...</div>;
    } else if (fetchedReviews && fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    } else {
        return (
            <div className="container mt-4">
                <div className="header-with-button mb-3">
                    <h1 className="mb-6 ml-2"><strong>Reviews for the Book ( {fetchedReviews.length} )</strong></h1>
                    <div className="write-review-container">
                        {renderWriteReviewButton()}
                    </div>
                </div>
                <div>
                    {Array.isArray(fetchedReviews) && fetchedReviews.map((review) => (
                        <ReviewCard key={review._id} reviewId={review._id} />
                    ))}
                </div>
            </div>
        );
    }
}
