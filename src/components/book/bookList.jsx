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
    const location = useLocation();

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const fetchedBooks = await fetchBookInfo(searchQuery);

            const booksWithAdditionalDetails = await Promise.all(fetchedBooks.map(async book => {
                const additionalDetails = await findBookByOpenLibraryId(book.olid);
                console.log("additionalDetails:", additionalDetails);

                // Calculate reviewCount excluding deleted reviews
                let reviewCount = 0;
                if (additionalDetails && additionalDetails.reviews) {
                    for (const reviewId of additionalDetails.reviews) {
                        const review = await findReviewById(reviewId);
                        if (!review.is_deleted) {
                            reviewCount++;
                        }
                    }
                }

                return {
                    ...book,
                    ...additionalDetails,
                    reviewCount: reviewCount
                };
            }));
            
            const sortedBooks = booksWithAdditionalDetails.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 15);
            dispatch(setCurrentBooks(sortedBooks));

        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        console.log("BookList useEffect triggered, needRefresh:", needRefresh);
        if (searchQuery || needRefresh) {
            fetchData();
            if (needRefresh) {
                console.log("Refresh current books due to needRefresh flag");
                dispatch(setNeedRefresh(false)); // Reset the needRefresh flag after fetching data
            }
        }
    }, [searchQuery, needRefresh, dispatch, location.pathname]); // Add needRefresh to the dependency array

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
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
