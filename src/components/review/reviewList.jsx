import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ReviewCard from './reviewCard';
import './review.css';

export default function ReviewList({ olid }) {
    const currentUser = useSelector((state) => state.currentUser);
    const currentBooks = useSelector((state) => state.currentBooks.books);
    const needRefresh = useSelector((state) => state.currentBooks.needRefresh);
    const [currentBook, setCurrentBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const book = currentBooks.find(book => book.olid === olid);
        setCurrentBook(book);
    }, [currentBooks, olid, needRefresh]); // This hook will re-run when needRefresh changes

    const handleWriteReviewClick = () => {
        navigate(`/review-editor/new?book_olid=${olid}`);
    };

    const renderWriteReviewButton = () => {
        if (currentUser && currentUser.role === 'Author') {
            return (
                <button
                    className="write-review-button"
                    onClick={handleWriteReviewClick}>Write A New Review
                </button>
            );
        }
        return null;
    };

    if (!currentBook) {
        return <div>Loading...</div>;
    } else if (currentBook.reviewCount === 0) {
        return <div>No reviews found for this book.</div>;
    } else {
        return (
            <div className="container mt-4">
                <div className="header-with-button mb-3">
                    <h1 className="mb-6 ml-2"><strong>Reviews for the Book ( {currentBook.reviewCount} )</strong></h1>
                    <div className="write-review-container">
                        {renderWriteReviewButton()}
                    </div>
                </div>
                <div>
                    {currentBook.reviews.map((reviewId) => (
                        <ReviewCard key={reviewId} reviewId={reviewId} />
                    ))}
                </div>
            </div>
        );
    }
}
