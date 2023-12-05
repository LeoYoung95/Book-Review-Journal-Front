import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findBookReviewsByOpenLibraryId } from '../../clients/book_client';
import './review.css';

export default function ReviewList({ olid }) {
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.currentUser);
    const [fetchedReviews, setFetchedReviews] = useState(null);

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

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    const renderWriteReviewButton = () => {
        if (currentUser && currentUser.role === 'Author') {
            return <button className="write-review-button">Write a New Review</button>;
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
                    {Array.isArray(fetchedReviews) ? (
                        fetchedReviews.map((review) => {
                            const truncatedBody = truncateText(review.body, 200);
                            return (
                                <div key={review._id} className="mb-3 p-3 border rounded">
                                    <div>
                                        <h5 className="mt-2">{review.title}</h5>
                                        <p>{truncatedBody}</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div>Loading...</div>
                    )}
                </div>
            </div>
        );
    }
}
