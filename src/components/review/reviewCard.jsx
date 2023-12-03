import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReview} from "../../reducers/reviewsReducer";
import { setUser } from "../../reducers/usersReducer";
import axios from "axios";

export default function ReviewCard({ reviewId }) {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.reviews.review);
    const user = useSelector((state) => state.users.user);
    const users = useSelector((state) => state.users.users);

    useEffect(() => {
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

    useEffect(() => {
        // Fetch author data based on author_id from review
        if (review && review.author_id) {
            const authorInfo = users.find((user) => user.id === review.author_id);
            if (authorInfo) {
                dispatch(setUser(authorInfo));
            }
        }
    }, [dispatch, review, users]);

    // Truncate the review body to approximately two lines of text
    const truncateReviewBody = (body) => {
        const maxLength = 200;
        return body.length > maxLength ? body.substring(0, maxLength) + "..." : body;
    };

    if (!review || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                <input type="text" className="form-control" value={review.title} readOnly />
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4">
                        <h5 className="card-title">{`${author.firstName} ${author.lastName}`}</h5>
                        <img src={user.profilePic} alt="Author" className="img-thumbnail" />
                    </div>
                    <div className="col-lg-8">
                        <p className="card-text">{truncateReviewBody(review.body)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
