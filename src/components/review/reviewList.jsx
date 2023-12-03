import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../../reducers/reviewsReducer';
import axios from 'axios';

// ReviewListing component displays a list of reviews for a specific book
export default function ReviewList({ bookId }) {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.users.users);
    const [fetchedReviews, setFetchedReviews] = useState([]);

    // Fetches and sets the reviews for the specific book on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // Fetch reviews based on bookId, assuming the API supports this query
                const response = await axios.get(`/api/reviews?bookId=${bookId}`);
                // Dispatch action to store the fetched reviews in the global state
                dispatch(setReviews(response.data));
                // Filter and set the reviews for this specific book in local state
                setFetchedReviews(response.data);
            } catch (err) {
                // Log errors if fetching fails
                console.error("Error fetching reviews:", err);
            }
        }

        // Only fetch reviews if a bookId is provided
        if (bookId) {
            fetchReviews();
        }
    }, [dispatch, bookId]);

    // Function to truncate long text to a specified length
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    // Display message if no reviews are found
    if (fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    }

    // Render the list of reviews
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Reviews for the Book</h2>
            <div>
                {fetchedReviews.map((review) => {
                    // Find the author of each review using author_id
                    const author = users.find((user) => user._id.$oid === review.author_id) || {};
                    // Truncate review body text
                    const truncatedBody = truncateText(review.body, 200);
                    // Render review card
                    return (
                        <div key={review._id.$oid} className="mb-3 p-3 border rounded">
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
