import React from 'react';
import './book.css';
import {Link} from "react-router-dom"; // Import CSS for styling

const BookCard = ({ book }) => {
    // Function to get a formatted string of genres
    const getGenres = (genres) => {
        // Split the genres string and limit to first 5 genres
        if (genres && typeof genres === 'string') {
            return genres.split(', ').slice(0, 5).join(', ');
        }
        return 'No genres available'; // Default message if genres is not a string or is empty
    };

    return (
        <div className="book-card">
            <div className="book-cover">
                <img src={book.cover || 'default-cover.jpg'} alt={book.title} />
            </div>
            <div className="book-info">
                <h2>
                    <Link to={`/book/${book.olid}`}>{book.title}</Link>
                </h2>
                <p>Author: {book.author}</p>
                <p>Published: {book.publishDate}</p>
                <p>Genres: {getGenres(book.genres)}</p>
                <p>{book.description}</p>
            </div>
        </div>
    );
};

export default BookCard;
