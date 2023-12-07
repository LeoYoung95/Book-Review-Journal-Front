import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findReviewById, addReviewLikedUsersById, deleteReviewLikedUsersById } from "../../clients/review_client";
import { findUserById, addLikedReview, removeLikedReview } from "../../clients/user_client";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";

export default function ReviewDetail() {
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);
    const [user, setUser] = useState(null);
    const [author, setAuthor] = useState(null);
    const currentUserId = useSelector((state) => state.currentUser.userId);

    const isLiked = user && user.likedReviews.includes(reviewId);

    useEffect(() => {
        async function fetchData() {
            try {
                const userRes = await findUserById(currentUserId);
                setUser(userRes);

                const reviewRes = await findReviewById(reviewId);
                setReview(reviewRes);

                const authorRes = await findUserById(reviewRes.author_id);
                setAuthor(authorRes);
            } catch (err) {
                console.error("Error fetching data:", err);
            }
        }

        fetchData();
    }, [currentUserId, reviewId]);

    const handleLikeReview = async () => {
        const alreadyLikedReview = user.likedReviews.includes(reviewId);

        try {
            if (alreadyLikedReview) {
                await deleteReviewLikedUsersById(reviewId, currentUserId);
                await removeLikedReview(currentUserId, reviewId);
            } else {
                await addReviewLikedUsersById(reviewId, currentUserId);
                await addLikedReview(currentUserId, reviewId);
            }

            const updatedUser = await findUserById(currentUserId);
            setUser(updatedUser);

            const updatedReview = await findReviewById(reviewId);
            setReview(updatedReview);
        } catch (error) {
            console.error("Error toggling like on the review:", error);
        }
    };

    if (!review || !author || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                <input type="text" className="form-control " value={review.title} readOnly />
                <h6 className="card-subtitle text-muted text-center">Reviewed by: {`${author.firstName} ${author.lastName}`}</h6>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-lg-4">
                        <img src={author.profilePic} alt={`${author.firstName} ${author.lastName}`}
                             className="img-thumbnail"/>
                    </div>
                    <div className="">
                        <p className="card-text">{review.body}</p>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <button  className={`like-button ${isLiked ? 'liked' : ''}`} onClick={handleLikeReview}>
                    {isLiked ? <IoHeartSharp /> : <IoHeartOutline />}
                </button>
            </div>
        </div>
    );
}
