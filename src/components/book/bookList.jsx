/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from './bookCard.jsx';
import { fetchBookInfo } from '../../clients/openlib_client.js';
import { findBookByOpenLibraryId } from "../../clients/book_client";
import { setCurrentBooks, setNeedRefresh } from '../../reducers/currentBooksReducer.js';
import { useLocation } from "react-router-dom";
import { findReviewById } from "../../clients/review_client";

const BookList = ({ searchQuery }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const books = useSelector(state => state.currentBooks.books);
    const needRefresh = useSelector((state) => state.currentBooks.needRefresh);
    
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchedBooks = await fetchBookInfo(searchQuery);

            const booksWithAdditionalDetails = await Promise.all(fetchedBooks.map(async book => {
                const additionalDetails = await findBookByOpenLibraryId(book.olid);

                if (additionalDetails) {

                // Calculate reviewCount excluding deleted reviews
                let reviewCount = 0;
                if (additionalDetails && additionalDetails.reviews) {
                    for (const reviewId of additionalDetails.reviews) {
                        const review = await findReviewById(reviewId);
                        if (review && !review.is_deleted) {
                            reviewCount++;
                        }
                    }
                }


                return {
                    ...book,
                    ...additionalDetails,
                    reviewCount: reviewCount,
                };} else {
                    return {
                        ...book,
                        reviewCount: 0,
                        likedUsers: [],
                    };
                }
            }));
            
            const sortedBooks = booksWithAdditionalDetails.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 15);
            dispatch(setCurrentBooks(sortedBooks));

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        if (searchQuery || needRefresh) {
            fetchData();
            if (needRefresh) {
                dispatch(setNeedRefresh(false)); // Reset the needRefresh flag after fetching data
            }
        }
    }, [searchQuery, needRefresh, dispatch]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div className="trending-container">
            {books && books.length > 0 ? (
                books.map(book => (
                    <BookCard key={book.olid} book={book} />
                ))
            ) : (
                searchQuery ? <p>No books found for "{searchQuery}".</p> : <p>Enter search criteria to find books.</p>
            )}
        </div>
    );
};

export default BookList;
