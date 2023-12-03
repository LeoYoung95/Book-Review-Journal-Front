import React from 'react';
import './book.css'; // Ensure this path is correct

const BookCardLarger = ({ book }) => {
    const getGenres = (genres) => {
        // Split the genres string and limit to first 5 genres
        if (genres && typeof genres === 'string') {
            return genres.split(', ').slice(0, 5).join(', ');
        }
        return 'No genres available'; // Default message if genres is not a string or is empty
    };

    return (
        <div className="book-card-large">
            <div className="book-cover-large">
                <img src={book.cover || 'default-cover.jpg'} alt={book.title} />
            </div>
            <div className="book-details-large">
                <h1><strong>{book.title}</strong></h1>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published:</strong> {book.publishDate}</p>
                <p><strong>Genres:</strong> {getGenres()}</p>
                <p><strong>ISBN:</strong> {book.isbn}</p>
                <p><strong>Publisher:</strong> {book.publisher}</p>
                <p><strong>Pages:</strong> {book.pages}</p>
                <p><strong>Language:</strong> {book.language}</p>
            </div>
            <div className="book-description-large">
                <p><strong>Description:</strong> </p>
                <p>{book.description}</p>
            </div>
        </div>
    );
};

export default BookCardLarger;
