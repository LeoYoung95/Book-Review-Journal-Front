import React, {useEffect, useState} from "react";
import BookCard from "./bookCard";
import {fetchAllBooks} from "../../clients/book_client";
import {fetchBookDetails, fetchBookInfoByOLID} from "../../clients/openlib_client";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentBooks, setNeedRefresh} from "../../reducers/currentBooksReducer";

// ReviewTrending component displays the top 10 trending books based on likes
export default function BookTrending() {
    const [books, setBooks] = useState([]);
    const [topBooks, setTopBooks] = useState([]);
    const needRefresh = useSelector(state => state.currentBooks.needRefresh);
    const dispatch = useDispatch();

    // Fetch all reviews on component mount
    useEffect(() => {
        async function fetchBooks() {
            try {
                // Perform the GET request to fetch reviews
                const allBooks = await fetchAllBooks();

                const booksWithAdditionalDetails = await Promise.all(allBooks.map(async book => {
                        const additionalDetails = await fetchBookInfoByOLID(book.olid);

                        const description = await fetchBookDetails(book.olid);


                        return {
                            ...book,
                            olid: book.olid,
                            title: additionalDetails.title,
                            author: additionalDetails.author_name || 'Unknown',
                            publishDate: additionalDetails.first_publish_date || 'Unknown',
                            genres: additionalDetails.genres,
                            description: description ? description : 'No description available',
                            cover: additionalDetails.cover_i ? `https://covers.openlibrary.org/b/id/${additionalDetails.cover_i}-L.jpg` : null,
                            likedUserCount: book.likedUsers.length
                        };
                    }
                ));

                setBooks(booksWithAdditionalDetails);
                dispatch(setCurrentBooks(booksWithAdditionalDetails));
            } catch (err) {
                console.error("Error fetching books:", err);
            }

            if (needRefresh) {
                dispatch(setNeedRefresh(false));
            }
        }

        fetchBooks();
    }, [needRefresh]);

    // Sort and slice the books whenever the reviews data changes
    useEffect(() => {
        // Sort reviews by the number of likes in descending order
        const sortedBooks = [...books].sort((a, b) => b.likedUserCount - a.likedUserCount);
        // Update the topReviews state with the top 10 reviews
        setTopBooks(sortedBooks.slice(0, 10));
    }, [books]);

    // Show loading text if reviews are not yet fetched
    if (topBooks.length === 0) {
        return <div>Loading trending books...</div>;
    }

    return (
        <div className="trending-container">
            <h2 className="trending-title">Trending Books</h2>
            <div>
                {topBooks.map((book, i) => (
                    <div key={i}>
                        <BookCard book={book}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
