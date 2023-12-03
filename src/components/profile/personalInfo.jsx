import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setReview, likeReview } from '../../reducers/reviewsReducer';
import {
    addLikedReviewToUser,
    addLikedBookToUser,
    removeLikedReviewFromUser,
    removeLikedBookFromUser,
} from '../../reducers/usersReducer';
import { likeBook } from '../../reducers/booksReducer';
import axios from 'axios';

export default function ReviewCard({ reviewId }) {
    const dispatch = useDispatch();
    const review = useSelector((state) => state.reviews.review);
    const users = useSelector((state) => state.users.users);

    // Fetch review data on component mount or when reviewId changes
    useEffect(() => {
        async function fetchReviewData() {
            try {
                const reviewResponse = await axios.get(`/api/reviews/${reviewId}`);
                dispatch(setReview(reviewResponse.data));
            } catch (err) {
                console.error('Error fetching review data:', err);
            }
        }
        fetchReviewData();
    }, [dispatch, reviewId]);

    // This useEffect can be removed if the author data is not used elsewhere
    // As we are now directly mapping the author data in the JSX below

    const handleLikeReview = async () => {
        const alreadyLiked = review.likedUsers.includes(user.id);
        try {
            await axios.post(`/api/reviews/${reviewId}/toggleLike`, { userId: user.id });
            dispatch(likeReview({ reviewId, userId: user.id }));
            dispatch(alreadyLiked ? removeLikedReviewFromUser({ userId: user.id, reviewId })
                                  : addLikedReviewToUser({ userId: user.id, reviewId }));
        } catch (error) {
            console.error('Error toggling like on the review:', error);
        }
    };

    const handleLikeBook = async () => {
        const bookId = review.book_id;
        const alreadyLiked = user.likedBooks.includes(bookId);
        try {
            await axios.post(`/api/books/${bookId}/toggleLike`, { userId: user.id });
            dispatch(likeBook({ bookId, userId: user.id }));
            dispatch(alreadyLiked ? removeLikedBookFromUser({ userId: user.id, bookId })
                                  : addLikedBookToUser({ userId: user.id, bookId }));
        } catch (error) {
            console.error('Error toggling like on the book:', error);
        }
    };

    if (!review) {
        return <div>Loading...</div>;
    }

    // Directly find the author from the users array
    const author = users.find((user) => user.id === review.author_id) || {};

    return (
        <div className='card'>
            <div className='card-header'>
                <input type="text" className="form-control" value={review.title} readOnly />
            </div>
            <div className='card-body'>
                <div className='row'>
                    <div className='col-lg-4'>
                        {/* Display author's first and last name, and profile picture */}
                        <h5 className='card-title'>{`${author.firstName} ${author.lastName}`}</h5>
                        <img src={author.profilePic} alt='Author' className='img-thumbnail' />
                    </div>
                    <div className='col-lg-8'>
                        {/* Display review body */}
                        <p className='card-text'>{review.body}</p>
                    </div>
                </div>
            </div>
            <div className='card-footer'>
                {/* Buttons to like the review or the book */}
                <button className='btn btn-primary' onClick={handleLikeReview}>
                    Like Review
                </button>
                <button className='btn btn-secondary' onClick={handleLikeBook}>
                    Like Book
                </button>
            </div>
        </div>
    );
}
