import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { findReviewById, deleteReview, recoverReview } from "../../clients/review_client";
import { findUserById } from "../../clients/user_client";
import { fetchBookName } from "../../clients/openlib_client";
import { setNeedRefresh } from "../../reducers/currentBooksReducer.js";
import "./review.css";

export default function ReviewCard({ reviewId }) {
    const currentUser = useSelector((state) => state.currentUser);
    const needRefresh = useSelector((state) => state.currentBooks.needRefresh);
    const [review, setReview] = useState(null);
    const [reviewedBook, setReviewedBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [deletedByUser, setDeletedByUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchReviewDetails() {
            try {
                const reviewData = await findReviewById(reviewId);
                setReview(reviewData);

                if (reviewData && reviewData.author_id) {
                    const authorData = await findUserById(reviewData.author_id);
                    setAuthor(authorData);
                }

                if (reviewData && reviewData.book_olid) {
                    const bookName = await fetchBookName(reviewData.book_olid);
                    setReviewedBook(bookName);
                }

                // Fetch information of the user who deleted the review
                if (reviewData && reviewData.is_deleted && reviewData.deleted_by) {
                    const deletedByUserData = await findUserById(reviewData.deleted_by);
                    setDeletedByUser(deletedByUserData);
                }
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchReviewDetails();
    }, [reviewId]);

    const truncateReviewBody = (body) => {
        const maxLength = 25;
        return body.length > maxLength ? body.substring(0, maxLength) + "..." : body;
    };

    const handleDelete = async () => {
        try {
            const response = await deleteReview(review._id, currentUser.userId);
            setReview(response);
            dispatch(setNeedRefresh(true));
            setTimeout(() => {
                console.log("After dispatching in ReviewCard, needRefresh:", needRefresh);
            }, 1000); // Delay the log
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };



    const handleRecover = async () => {
        try {
            await recoverReview(review._id);
            // Update the review state to reflect the recovery
            setReview({ ...review, is_deleted: false, deleted_by: null });
        } catch (err) {
            console.error("Error recovering review:", err);
        }
    };
    const handleEdit = () => {
        navigate(`/review-editor/edit/${reviewId}`); // Navigate to ReviewEditor for editing
    };


    if (!review || !author) {
        return <div>Loading...</div>;
    }

    const cardClass = review.is_deleted ? "review-card review-card-deleted" : "review-card";
    const statusIndicatorClass = review.is_deleted ? "status-indicator status-indicator-deleted" : "status-indicator status-indicator-alive";
    const isReviewVisible = currentUser.role === 'Admin' || !review.is_deleted;

    return isReviewVisible ? (
        <div className={cardClass}>
            <div className="review-card-header">
                {review.title}
                {currentUser.role === 'Admin' && (
                    <span className={statusIndicatorClass}>
                        {review.is_deleted ? 'Deleted' : 'Alive'}
                    </span>
                )}
            </div>
            <div className="review-card-body">
                <p>Book Title: {reviewedBook}</p>
                <p>Review Author: {`${author.firstName} ${author.lastName}`}</p>
                <p>Review Preview: {truncateReviewBody(review.body)}</p>
                <br/>
                {review.is_deleted && deletedByUser && (
                    <p>Deleted By: {`${deletedByUser.firstName} ${deletedByUser.lastName}`}</p>
                )}
            </div>
            <div className="review-card-footer">
                {currentUser.role === 'Author' &&  currentUser.userId === review.author_id &&(
                    <>
                        <button className="button button-edit" onClick={handleEdit}>Edit</button>
                        <button className="button button-delete" onClick={handleDelete}>Delete</button>
                    </>
                )}
                {currentUser.role === 'Admin' && (
                    review.is_deleted ?
                        <button className="button button-recover" onClick={handleRecover}>Restore</button> :
                        <button className="button button-delete" onClick={handleDelete}>Delete</button>
                )}
            </div>
        </div>
    ) : null;
}
