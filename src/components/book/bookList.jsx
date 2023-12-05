import React, { useState, useEffect } from 'react';
import BookCard from './bookCard.jsx';
import { fetchBookInfo } from '../../clients/openlib_client.js';
import { findBookReviewsByOpenLibraryId } from "../../clients/book_client.js";

const BookList = ({ searchQuery }) => {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (searchQuery) {
            const fetchData = async () => {
                setIsLoading(true);
                try {
                    const fetchedBooks = await fetchBookInfo(searchQuery);

                    // Fetch review IDs for each book and add the count to the book object
                    const booksWithReviewCounts = await Promise.all(fetchedBooks.map(async (book) => {
                        const reviewIds = await findBookReviewsByOpenLibraryId(book.olid);
                        return { ...book, reviewCount: reviewIds.length };
                    }));

                    // Sort books by the number of reviews in descending order
                    booksWithReviewCounts.sort((a, b) => b.reviewCount - a.reviewCount);

                    // Limit the number of books to 15
                    setBooks(booksWithReviewCounts.slice(0, 15));
                } catch (error) {
                    setError(error.message);
                }
                setIsLoading(false);
            };

            fetchData();
        } else {
            setBooks([]);
        }
    }, [searchQuery]);

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    return (
        <div>
            {books.length > 0 ? (
                books.map(book => (
                    <BookCard key={book.olid} book={book} reviewCount={book.reviewCount} />
                ))
            ) : (
                searchQuery ? <p>No books found for "{searchQuery}".</p> : <p>Enter search criteria to find books.</p>
            )}
        </div>
    );
};

export default BookList;
