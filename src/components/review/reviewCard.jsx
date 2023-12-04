import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReview } from "../../reducers/reviewsReducer";
import axios from "axios";

export default function ReviewCard({ reviewId }) {
    const dispatch = useDispatch();
    // Accessing the review and users state from the Redux store
    const review = useSelector((state) => state.reviews);
    const users = useSelector((state) => state.users);

    // Finding the author of the review in the users array based on author_id from the review
    const author = review && review.author_id
        ? users.find((user) => user._id.$oid === review.author_id)
        : null;

    useEffect(() => {
        // Fetching the review data from the API
        async function fetchData() {
            try {
                const reviewRes = await axios.get(`/api/reviews/${reviewId}`);
                dispatch(setReview(reviewRes.data));
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }
        fetchData();
    }, [dispatch, reviewId]);

    // Function to truncate the review body to a certain length
    const truncateReviewBody = (body) => {
        const maxLength = 200;
        return body.length > maxLength ? body.substring(0, maxLength) + "..." : body;
    };

    // Displaying a loading message if review or author data is not available yet
    if (!review || !author) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                {/* Displaying the review title in a read-only input field */}
                <input type="text" className="form-control" value={review.title} readOnly />
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4">
                        {/* Displaying the author's name and profile picture */}
                        <h5 className="card-title">{`${author.firstName} ${author.lastName}`}</h5>
                        <img src={author.profilePic} alt="Author" className="img-thumbnail" />
                    </div>
                    <div className="col-lg-8">
                        {/* Displaying the truncated review body text */}
                        <p className="card-text">{truncateReviewBody(review.body)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
