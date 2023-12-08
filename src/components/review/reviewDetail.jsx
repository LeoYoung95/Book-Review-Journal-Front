import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { findReviewById, addReviewLikedUsersById, deleteReviewLikedUsersById } from "../../clients/review_client";
import { findUserById, addLikedReview, removeLikedReview } from "../../clients/user_client";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function ReviewDetail() {
    const { reviewId } = useParams();
    const [review, setReview] = useState(null);
    const [user, setUser] = useState(null);
    const [author, setAuthor] = useState(null);
    const [likedUsers, setLikedUsers] = useState([]);
    const currentUserId = useSelector((state) => state.currentUser.userId);
    const navigate = useNavigate();

    const navigateToUserProfile = (userId) => {
        navigate(`/profile/${userId}`);
    };

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
        console.log("Current User ID:", currentUserId);

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

    // Function to fetch all users who liked the review
    const fetchLikedUsers = async () => {
        // Make sure review.likedUsers is available and is an array
        if (review && Array.isArray(review.likedUsers)) {
            const userDetailsPromises = review.likedUsers.map((userId) => findUserById(userId));
            const userDetails = await Promise.all(userDetailsPromises);

            // Set the likedUsers state with the fetched user details
            setLikedUsers(userDetails.filter((user) => user)); // filter out any possible null/undefined values
        }
    };

    useEffect(() => {
        // Call fetchLikedUsers when the review is fetched or updated
        fetchLikedUsers();
    }, [review]);

    if (!review || !author || !user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="card">
            <div className="card-header">
                <h6 className="card-title text-center">{review.title}</h6>
                <h6 className="card-subtitle text-muted text-center">
                    Reviewed by: {`${author.firstName} ${author.lastName}`}
                </h6>
            </div>
            <div className="card-body">
                <div className="">
                    <p className="card-text">{review.body}</p>
                </div>
            </div>
            <div className="card-footer">
                <button className="like-button" onClick={handleLikeReview}>
                    {isLiked ? <IoHeartSharp style={{ color: "red" }} /> : <IoHeartOutline />}
                    {likedUsers.map((likedUser, index) => (
                        <React.Fragment key={likedUser._id}>
                            {index > 0 && ", "}
                            <span
                                onClick={(e) => {
                                    e.stopPropagation(); // Prevent the like button's onClick from firing
                                    navigate(`/profile/${likedUser._id}`); // Navigate to the liked user's profile page
                                }}
                                style={{ cursor: "pointer", color: "grey" }} // Apply grey color to usernames
                            >
                                {likedUser.firstName} {likedUser.lastName}
                            </span>
                        </React.Fragment>
                    ))}
                </button>
            </div>
        </div>
    );
}
