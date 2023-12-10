import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {findReviewById, softDeleteReview, hardDeleteReview, recoverReview} from "../../clients/review_client";
import {findUserById, removeWrittenReview, addDeletedReview, removeDeletedReview} from "../../clients/user_client";
import {deleteReviewByOpenLibraryId} from "../../clients/book_client";
import {fetchBookName} from "../../clients/openlib_client";
import {removeReviewFromTag} from "../../clients/tag_client";
import {setNeedRefresh} from "../../reducers/currentBooksReducer.js";
import "./review.css";

export default function ReviewCard({reviewId}) {
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
        const maxLength = 180;
        return body.length > maxLength ? body.substring(0, maxLength) + "..." : body;
    };
    const truncateReviewTitle = (title) => {
        const maxLength = 80;
        return title.length > maxLength ? title.substring(0, maxLength) + "..." : title;
    };

    const handleReviewClick = () => {
        navigate(`/reviews/${reviewId}`);
    };

    const handleSoftDelete = async () => {
        try {
            if (currentUser.role === "Admin") {
                await addDeletedReview(currentUser.userId, review._id);
            }
            const response = await softDeleteReview(review._id, currentUser.userId);
            setReview(response);
            dispatch(setNeedRefresh(true));
            setTimeout(() => {
                console.log("After dispatching in ReviewCard, needRefresh:", needRefresh);
            }, 1000); // Delay the log
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    const handleHardDelete = async () => {
        try {
            // Delete the review from the review database
            await hardDeleteReview(review._id);
            // Delete the review from the user database
            await removeWrittenReview(review.author_id, review._id);
            // Delete the review from the book database
            await deleteReviewByOpenLibraryId(review.book_olid, review._id);

            // Delete the review from tag database
            for (let i = 0; i < review.tag.length; i++) {
                await removeReviewFromTag(review.tag[i], review._id);
            }
        } catch (err) {
            console.error("Error deleting review:", err);
        }
    };

    const handleRecover = async () => {
        try {
            await removeDeletedReview(currentUser.userId, review._id);
            await recoverReview(review._id);
            // Update the review state to reflect the recovery
            setReview({...review, is_deleted: false, deleted_by: null});
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
    const statusIndicatorClass = review.is_deleted
        ? "status-indicator status-indicator-deleted"
        : "status-indicator status-indicator-alive";
    const isReviewVisible = currentUser.role === "Admin" || !review.is_deleted;

    return isReviewVisible ? (
        <div className={`${cardClass} w-[80%]`}>
            <div className="review-card-header" onClick={handleReviewClick}>
                <span className="clickable-title md:text-sm text-xs">{truncateReviewTitle(review.title)}</span>
                {currentUser.role === "Admin" && (
                    <span className={statusIndicatorClass}>{review.is_deleted ? "Deleted" : "Alive"}</span>
                )}
            </div>
            <div className="review-card-body">
                <div className="">
                    <p>
                        <strong>Book:</strong> {reviewedBook}
                    </p>
                    <p>
                        <strong>Review Author:</strong> {`${author.firstName} ${author.lastName}`}
                    </p>
                    <p>
                        <strong>Review Preview:</strong> {truncateReviewBody(review.body)}
                    </p>
                    <br/>
                    {review.is_deleted && deletedByUser && (
                        <p>Deleted By: {`${deletedByUser.firstName} ${deletedByUser.lastName}`}</p>
                    )}
                </div>
            </div>
            <div className="review-card-footer">
                {currentUser.role === "Author" && currentUser.userId === review.author_id && (
                    <>
                        <button className="button button-edit" onClick={handleEdit}>
                            Edit
                        </button>
                        <button className="button button-delete" onClick={handleSoftDelete}>
                            Delete
                        </button>
                    </>
                )}
                {currentUser.role === "Admin" && (
                    <>
                        {review.is_deleted ? (
                            <button className="button button-recover" onClick={handleRecover}>
                                Restore
                            </button>
                        ) : (
                            <>
                                <button className="button button-delete" onClick={handleSoftDelete}>
                                    Soft Delete
                                </button>
                                <button className="button button-delete" onClick={handleHardDelete}>
                                    Hard Delete
                                </button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    ) : null;
}
