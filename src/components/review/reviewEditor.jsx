import React, { useState, useEffect } from 'react';
import * as client from '../../clients/review_client';
import { useParams, useLocation } from 'react-router-dom';

const ReviewEditor = () => {
    const { reviewId } = useParams();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const book_olid = queryParams.get('book_olid');

    const initialReviewState = { title: '', content: '', book_olid: book_olid };
    const [review, setReview] = useState(initialReviewState);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            if (reviewId) {
                setLoading(true);
                try {
                    const fetchedReview = await client.findReviewById(reviewId);
                    setReview({ title: fetchedReview.title, content: fetchedReview.content, book_olid: fetchedReview.book_olid });
                } catch (err) {
                    setError('Error fetching review');
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchReview();
    }, [reviewId]);


    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (reviewId) {
                await client.updateReview(reviewId, review);
            } else {
                // Ensure book_olid is included for new reviews
                await client.createReview({ ...review, book_olid });
            }
        } catch (err) {
            setError('Error submitting review');
        } finally {
            setLoading(false);
        }
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="title">Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={review.title}
                onChange={handleChange}
            />

            <label htmlFor="content">Content</label>
            <textarea
                id="content"
                name="content"
                value={review.content}
                onChange={handleChange}
            />

            <button type="submit">{reviewId ? 'Update Review' : 'Post Review'}</button>
        </form>
    );
};

export default ReviewEditor;
