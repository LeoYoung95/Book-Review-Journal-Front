import React, { useState, useEffect } from 'react';
import * as client from '../../clients/review_client';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {findBookByOpenLibraryId} from "../../clients/book_client";


const ReviewEditor = () => {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const book_olid = queryParams.get('book_olid');
    const currentUser = useSelector((state) => state.currentUser);

    const initialReviewState = {
        title: '',
        body: '',
        book_olid: book_olid,
        book_id: '', // Initialize as empty string
        author_id: currentUser ? currentUser.userId : null
    };
    const [review, setReview] = useState(initialReviewState);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookAndReview = async () => {
            setLoading(true);
            try {
                // Fetch book data to get book_id
                const bookData = await findBookByOpenLibraryId(book_olid);
                setReview(prev => ({ ...prev, book_id: bookData._id }));

                if (reviewId) {
                    const fetchedReview = await client.findReviewById(reviewId);
                    setReview({ ...fetchedReview, book_id: bookData._id });
                }
            } catch (err) {
                setError('Error fetching book or review');
            } finally {
                setLoading(false);
            }
        };
        fetchBookAndReview();
    }, [reviewId, book_olid]);


    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);
        try {
            if (reviewId) {
                await client.updateReview(reviewId, review);
            } else {
                if (currentUser && currentUser.userId) {
                    console.log("Review:", review)
                    await client.createReview(currentUser.userId, review);
                } else {
                    throw new Error("User not found");
                }
            }
            navigate(`/reviews/${book_olid}`);
        } catch (err) {
            setError('Error submitting review');
        } finally {
            setLoading(false);
        }
    };


    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="review-card">
            <div className="review-card-header">
                {reviewId ? 'Edit Review' : 'New Review'}
            </div>
            <div className="review-card-body">
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">Title</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="body" className="col-sm-2 col-form-label">Content</label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="body"
                            name="body"
                            rows="5"
                            value={review.body}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="review-card-footer">
                <button onClick={handleCancel} className="btn btn-danger mr-4 rounded">
                     Cancel
                </button>
                <button onClick={handleSave} className="btn btn-success rounded">
                     Save
                </button>
            </div>
        </div>
    );
};

export default ReviewEditor;
