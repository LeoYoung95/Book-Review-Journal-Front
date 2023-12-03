import React, { useState, useEffect } from 'react';
import BookCard from './bookCard.jsx';
import {fetchBookInfo} from '../../clients/openlib_client.js';

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
                    setBooks(fetchedBooks);
                } catch (error) {
                    setError(error.message);
                }
                setIsLoading(false);
            };

            fetchData();
        } else {
            // Clear previous results if there's no search query
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
                    <BookCard key={book.olid} book={book} />
                ))
            ) : (
                searchQuery ? <p>No books found for "{searchQuery}".</p> : <p>Enter search criteria to find books.</p>
            )}
        </div>
    );
};

export default BookList;
