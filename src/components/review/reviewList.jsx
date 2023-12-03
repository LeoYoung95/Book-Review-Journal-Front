import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../../reducers/reviewsReducer';
import axios from 'axios';

// ReviewListing component for displaying a list of reviews for a specific book
export default function ReviewListing({ bookId }) {
    const dispatch = useDispatch();
    const allReviews = useSelector((state) => state.reviews.reviews);
    const users = useSelector((state) => state.users.users);
    const [fetchedReviews, setFetchedReviews] = useState([]);

    useEffect(() => {
        async function fetchAndFilterReviews() {
            try {
                const response = await axios.get("/api/reviews");
                dispatch(setReviews(response.data));
                const filteredReviews = response.data.filter(review => review.book_id === bookId);
                setFetchedReviews(filteredReviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        if (bookId) {
            fetchAndFilterReviews();
        }
    }, [dispatch, bookId]);

    const truncateText = (text, maxLength) => {
        // Approximate the number of characters that would fit in two lines
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if (fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Reviews for the Book</h2>
            <div>
                {fetchedReviews.map((review) => {
                    const author = users.find((user) => user.id === review.author_id) || {};
                    const truncatedBody = truncateText(review.body, 200); // Truncate to approx 200 characters
                    return (
                        <div key={review._id} className="mb-3 p-3 border rounded">
                            <div className="fw-bold">{author.firstName} {author.lastName}</div>
                            <div>
                                <h5 className="mt-2">{review.title}</h5>
                                <p>{truncatedBody}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
