import React from 'react';
import { Link } from "react-router-dom";
import default_book_cover from '../../images/default_book_cover.png';

const BookCardMini = ({ book }) => {
    return (
        <div className='book-card-mini'>
            <Link to={`/book/${book.olid}`}>
                <img src={book.cover || default_book_cover} alt={book.title} />
            </Link>
        </div>
    );
};

export default BookCardMini;
