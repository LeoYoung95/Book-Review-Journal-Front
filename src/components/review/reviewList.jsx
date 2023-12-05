import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findBookReviewsByOpenLibraryId } from '../../clients/book_client';
import { findCurrentUser } from "../../clients/user_client.js";
import './review.css';

export default function ReviewList({ olid }) {
    // const dispatch = useDispatch();
    // const users = useSelector((state) => state.users);
    const [fetchedReviews, setFetchedReviews] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        async function fetchReviewsAndUser() {
            try {
                // Fetch reviews based on book's OLID
                const reviewsResponse = await findBookReviewsByOpenLibraryId(olid);
                setFetchedReviews(reviewsResponse);

                // Fetch current user information
                const userResponse = await findCurrentUser();
                setCurrentUser(userResponse);
            } catch (err) {
                console.error("Error:", err);
            }
        }

        if (olid) {
            fetchReviewsAndUser();
        }
    }, [olid]);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Conditional rendering for the write review button
    const renderWriteReviewButton = () => {
        if (currentUser && currentUser.role === 'Author') {
            return <button className="write-review-button">Write a new review</button>;
        }
        return null;
    };

    if ([null, undefined].includes(fetchedReviews)) {
        return <div>Loading...</div>;
    } else if (fetchedReviews && fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    } else {
        // Include the number of reviews in the header
        return (
            <div className="container mt-4">
                <h1 className="mb-6 ml-2"><strong>Reviews for the Book ( {fetchedReviews.length} )</strong></h1>
                <div>
                    {Array.isArray(fetchedReviews) ? (
                        fetchedReviews.map((review) => {
                            // const author = users.find((user) => user._id.$oid === review.author_id) || {};
                            const truncatedBody = truncateText(review.body, 200);
                            return (
                                <div key={review._id.$oid} className="mb-3 p-3 border rounded">
                                    {/* <div className="fw-bold">{author.firstName} {author.lastName}</div> */}
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
