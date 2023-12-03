import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setReview, likeReview } from "../../reducers/reviewsReducer";
import {
    addLikedReviewToUser,
    addLikedBookToUser,
    removeLikedReviewFromUser,
    removeLikedBookFromUser,
    setUser,
} from "../../reducers/usersReducer";
import { likeBook } from "../../reducers/booksReducer";
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


    const handleLikeReview = async () => {
        const alreadyLikedReview = review.likedUsers.includes(user.id);
        try {
            await axios.post(`/api/reviews/${reviewId}/toggleLike`, { userId: user.id });
            dispatch(likeReview({ reviewId, userId: user.id }));
            if (alreadyLikedReview) {
                // If the review is already liked, this action will remove the like
                dispatch(removeLikedReviewFromUser({ userId: user.id, reviewId }));
            } else {
                // If the review is not liked yet, this action will add the like
                dispatch(addLikedReviewToUser({ userId: user.id, reviewId }));
            }
        } catch (error) {
            console.error("Error toggling like on the review:", error);
        }
    };

    const handleLikeBook = async () => {
        const bookId = review.book_id;
        const alreadyLikedBook = user.likedBooks.includes(bookId);
        try {
            await axios.post(`/api/books/${bookId}/toggleLike`, { userId: user.id });
            dispatch(likeBook({ bookId, userId: user.id }));
            if (alreadyLikedBook) {
                // If the book is already liked, this action will remove the like
                dispatch(removeLikedBookFromUser({ userId: user.id, bookId }));
            } else {
                // If the book is not liked yet, this action will add the like
                dispatch(addLikedBookToUser({ userId: user.id, bookId }));
            }
        } catch (error) {
            console.error("Error toggling like on the book:", error);
        }
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
