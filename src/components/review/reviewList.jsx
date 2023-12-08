import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {findBookByOpenLibraryId} from "../../clients/book_client";
import ReviewCard from './reviewCard';
import './review.css';

export default function ReviewList({olid}) {
    const currentUser = useSelector((state) => state.currentUser);
    const [currentBook, setCurrentBook] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const bookDetails = await findBookByOpenLibraryId(olid);
                console.log('Book details:', bookDetails)
                if (bookDetails) {
                    setCurrentBook(bookDetails);
                } else {
                    setCurrentBook({reviewCount: 0, reviews: []});
                }
            } catch (error) {
                console.error('Error fetching book details:', error);
            }
        };

        fetchBookDetails();
    }, [olid]); // This hook will re-run when olid changes

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
        return (
            <div className="container mt-4 w-[80%]">
                <div className="header-with-button mb-3 w-[81%]">
                    <div><strong>No reviews found for this book.</strong></div>
                    <div className="write-review-container">
                        {renderWriteReviewButton()}
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <div className="container mt-4">
                <div className="header-with-button mb-3 w-[81%]">
                    <h1 className="mb-6 ml-2"><strong>Reviews for the Book</strong></h1>
                    <div className="write-review-container">
                        {renderWriteReviewButton()}
                    </div>
                </div>
                <div>
                    {currentBook.reviews.map((reviewId,i) => (
                        <ReviewCard key={i} reviewId={reviewId}/>
                    ))}
                </div>
            </div>
        );
    }
}
