import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../../reducers/reviewsReducer';
import axios from 'axios';

// ReviewListing component for displaying a list of reviews for a specific book
export default function ReviewList({ bookId }) {
    const dispatch = useDispatch();
    const allReviews = useSelector((state) => state.reviews.reviews);
    const users = useSelector((state) => state.users.users);
    const [fetchedReviews, setFetchedReviews] = useState([]);

    // Fetch and filter reviews based on the provided bookId
    useEffect(() => {
        async function fetchAndFilterReviews() {
            try {
                const response = await axios.get("/api/reviews");
                dispatch(setReviews(response.data));
                // Filtering the reviews for the specified bookId
                const filteredReviews = response.data.filter(review => review.book_id === bookId);
                setFetchedReviews(filteredReviews);
            } catch (err) {
                console.error("Error fetching reviews:", err);
            }
        }

        if (bookId) {
            fetchAndFilterReviews();
        }
    }, [dispatch, bookId]); // Dependency on bookId ensures re-fetching when bookId changes

    // Display a message if no reviews are found
    if (fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    }

    // Render the list of reviews
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Reviews for the Book</h2>
            <div className="row">
                {fetchedReviews.map((review) => {
                    // Finding the author of the review
                    const author = users.find((user) => user.id === review.author_id) || {};
                    return (
                        <div key={review._id} className="col-md-6 col-lg-4 mb-4">
                            {/* Display each review in a card format */}
                            <div className="card">
                                <div className="card-header">
                                    {/* Display author's name */}
                                    {author.firstName} {author.lastName}
                                </div>
                                <div className="card-body">
                                    {/* Display review title and body */}
                                    <h5 className="card-title">{review.title}</h5>
                                    <p className="card-text text-truncate">{review.body}</p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
