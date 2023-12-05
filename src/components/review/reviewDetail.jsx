import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReview, likeReview } from "../../reducers/reviewsReducer";
import {
    addLikedReviewToUser,
    addLikedBookToUser,
    removeLikedReviewFromUser,
    removeLikedBookFromUser,
} from "../../reducers/usersReducer";
import { likeBook } from "../../reducers/currentBooksReducer";
import axios from "axios";

export default function ReviewDetail({ reviewId }) {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.reviews.review);
    const currentUser = useSelector((state) => state.users.user); // Renamed for clarity
    const users = useSelector((state) => state.users.users);

    // Find the author of the review
    const author = review && review.author_id
        ? users.find((user) => user._id.$oid === review.author_id) // Updated to match your data structure
        : null;

    useEffect(() => {
        // Fetch review data
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

    const handleLikeReview = async () => {
        const alreadyLikedReview = review.likedUsers.includes(currentUser._id.$oid); // Updated to match data structure
        try {
            await axios.post(`/api/reviews/${reviewId}/toggleLike`, { userId: currentUser._id.$oid });
            dispatch(likeReview({ reviewId, userId: currentUser._id.$oid }));
            // Dispatch actions based on whether the review is already liked
            alreadyLikedReview
                ? dispatch(removeLikedReviewFromUser({ userId: currentUser._id.$oid, reviewId }))
                : dispatch(addLikedReviewToUser({ userId: currentUser._id.$oid, reviewId }));
        } catch (error) {
            console.error("Error toggling like on the review:", error);
        }
    };

    const handleLikeBook = async () => {
        const bookId = review.book_id;
        const alreadyLikedBook = currentUser.likedBooks.includes(bookId);
        try {
            await axios.post(`/api/books/${bookId}/toggleLike`, { userId: currentUser._id.$oid });
            dispatch(likeBook({ bookId, userId: currentUser._id.$oid }));
            // Dispatch actions based on whether the book is already liked
            alreadyLikedBook
                ? dispatch(removeLikedBookFromUser({ userId: currentUser._id.$oid, bookId }))
                : dispatch(addLikedBookToUser({ userId: currentUser._id.$oid, bookId }));
        } catch (error) {
            console.error("Error toggling like on the book:", error);
        }
    };

    if (!review || !author) {
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
                        <img src={author.profilePic} alt={`${author.firstName} ${author.lastName}`} className="img-thumbnail" />
                    </div>
                    <div className="col-lg-8">
                        <p className="card-text">{review.body}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button className="btn btn-primary" onClick={handleLikeReview}>
                    Like Review
                </button>
                <button className="btn btn-secondary" onClick={() => handleLikeBook(review.book_id)}>
                    Like Book
                </button>
            </div>
        </div>
    );
}
