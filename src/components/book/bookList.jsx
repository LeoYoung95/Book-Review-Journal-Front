import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCard from './bookCard.jsx';
import { fetchBookInfo } from '../../clients/openlib_client.js';
import { findBookByOpenLibraryId } from "../../clients/book_client";
import { setCurrentBooks } from '../../reducers/currentBooksReducer.js';
import {useLocation} from "react-router-dom";

const BookList = ({ searchQuery }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();
    const books = useSelector(state => state.currentBooks.books);
    const location = useLocation();

    useEffect(() => {
        dispatch(setCurrentBooks([]));
        if (searchQuery) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const fetchedBooks = await fetchBookInfo(searchQuery);

                    // Fetch additional details for each book
                    const booksWithAdditionalDetails = await Promise.all(fetchedBooks.map(async book => {
                        const additionalDetails = await findBookByOpenLibraryId(book.olid);

                        // Check if additionalDetails is not null, then calculate reviewCount
                        const reviewCount = additionalDetails && additionalDetails.reviews ? additionalDetails.reviews.length : 0;

                        return {
                            ...book,
                            ...additionalDetails,
                            reviewCount: reviewCount
                        };
                    }));

                    const books = (booksWithAdditionalDetails.sort((a, b) => b.reviewCount - a.reviewCount)).slice(0,15);
                    dispatch(setCurrentBooks(books));


                } catch (error) {
                    setError(error.message);
                }
                setIsLoading(false);
            };

            fetchData();
        } else {
            dispatch(setCurrentBooks([]));
        }
    }, [searchQuery, dispatch, location.pathname]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }



    return (
        <div>
            {books && books.length > 0 ? (
                console.log("Books:", books),
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
