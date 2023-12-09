import React from 'react';
import './book.css';
import {Link} from "react-router-dom";
import default_book_cover from '../../images/default_book_cover.png';


const BookCard = ({book}) => {
    const getGenres = (genres) => {
        if (genres && typeof genres === 'string') {
            return genres.split(', ').slice(0, 5).join(', ');
        } else if (genres && Array.isArray(genres)) {
            return genres.slice(0, 5).join(', ');
        }
        return 'No genres available';
    };

    const cardStyle = book.reviewCount > 0 ? 'book-card-highlighted' : 'book-card';

    return (
        <div className={cardStyle}>
            <div className="book-cover">
                <img src={book.cover || default_book_cover} alt={book.title}/>
            </div>
            <div className="book-info">
                <h2>
                    <Link to={`/book/${book.olid}`}>{book.title}</Link>
                </h2>
                <p>Author: {book.author}</p>
                {book.publishDate !== 'Unknown' && <p>Published: {book.publishDate}</p>}
                <p>Genres: {getGenres(book.genres)}</p>
                <p>{book.description}</p>
            </div>
            <div>
                {'reviewCount' in book && (
                    <div className="review-count">
                        <p>Reviews:</p>
                        <p className="review-number">{book.reviewCount}</p>
                    </div>
                )}
                {'likedUserCount' in book && !('reviewCount' in book) && (
                    <div className="review-count">
                        <p>Likes:</p>
                        <p className="review-number">{book.likedUserCount}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookCard;
