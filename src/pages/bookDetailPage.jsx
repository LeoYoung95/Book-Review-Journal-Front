import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentBook } from '../reducers/currentBooksReducer.js';
import BookCardLarger from "../components/book/bookCardLarger";
import ReviewList from "../components/review/reviewList";

const BookDetail = () => {
    const { olid } = useParams();
    const dispatch = useDispatch();
    const currentBooks = useSelector(state => state.currentBooks.books);
    console.log("Current books:", currentBooks)
    const book = currentBooks.find(b => b.olid === olid);

    useEffect(() => {
        if (book) {
            dispatch(setCurrentBook(book)); // Dispatch action to set current book in Redux
        }
    }, [book, dispatch]);

    // Check if the book is found or not
    if (!book) {
        return <p>Book not found.</p>;
    }

    console.log("Current books:", currentBooks)

    console.log("Book:", book)

    return (
        <div>
            {/* Book details section */}

            {book && <BookCardLarger book={book} />}

            {/* Reviews section */}
            <div className="ml-3">
                <ReviewList key={Date.now()} olid={olid} />
            </div>
        </div>
    );
};

export default BookDetail;
