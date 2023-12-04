import React, { useEffect, useState } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { setReviews } from '../../reducers/reviewsReducer';
import {findBookReviewsByOpenLibraryId} from '../../clients/book_client';

// ReviewListing component displays a list of reviews for a specific book
export default function ReviewList({ olid }) {
    // const dispatch = useDispatch();
    // const users = useSelector((state) => state.users);
    const [fetchedReviews, setFetchedReviews] = useState(null);

    // Fetches and sets the reviews for the specific book on component mount
    useEffect(() => {
        async function fetchReviews() {
            try {
                // Fetch reviews based on book's OLID
                const response = await findBookReviewsByOpenLibraryId(olid);              
                // Filter and set the reviews for this specific book in local state
                setFetchedReviews(response);
            } catch (err) {
                // Log errors if fetching fails
                console.error("Error fetching reviews:", err);
            }
        }

        // Only fetch reviews if an olid is provided
        if (olid) {
            console.log("olid valid: ", olid);
            fetchReviews();
        }
    }, [olid]);

    // Function to truncate long text to a specified length
    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };

    if ([null, undefined].includes(fetchedReviews)) {
        return <div>Loading...</div>;
    } else if (fetchedReviews && fetchedReviews.length === 0) {
        return <div>No reviews found for this book.</div>;
    } else {

        // Render the list of reviews
        return (
            <div className="container mt-4">
                <h2 className="mb-3">Reviews for the Book</h2>
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
