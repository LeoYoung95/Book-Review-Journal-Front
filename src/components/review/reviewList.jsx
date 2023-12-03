import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReviews } from '../../reducers/reviewsReducer';
import axios from 'axios';

// ReviewListing component for displaying a list of reviews
export default function ReviewListing() {
    const dispatch = useDispatch();
    // Accessing reviews and users data from the Redux store
    const reviews = useSelector((state) => state.reviews.reviews);
    const users = useSelector((state) => state.users.users);
    // Local state to hold reviews fetched from the API
    const [fetchedReviews, setFetchedReviews] = useState([]);

    // Effect to fetch reviews on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // GET request to fetch reviews
                const response = await axios.get("/api/reviews");
                // Updating the Redux store with the fetched reviews
                dispatch(setReviews(response.data));
                // Updating the local state with the fetched reviews
                setFetchedReviews(response.data);
            } catch (err) {
                // Logging errors if the fetch fails
                console.error("Error fetching reviews:", err);
            }
        }

        fetchReviews();
    }, [dispatch]);

    // Conditional rendering to handle loading state
    if (fetchedReviews.length === 0) {
        return <div>Loading reviews...</div>;
    }

    // Main render return
    return (
        <div className="container mt-4">
            <h2 className="mb-3">Review Listings</h2>
            <div className="row">
                {/* Mapping over fetched reviews to render each review */}
                {fetchedReviews.map((review) => {
                    // Finding the author of each review
                    const author = users.find((user) => user.id === review.author_id) || {};
                    return (
                        <div key={review._id} className="col-md-6 col-lg-4 mb-4">
                            {/* Each review is displayed in a card */}
                            <div className="card">
                                <div className="card-header">
                                    {/* Displaying the author's name */}
                                    {author.firstName} {author.lastName}
                                </div>
                                <div className="card-body">
                                    {/* Displaying the review title and a truncated part of the review body */}
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
