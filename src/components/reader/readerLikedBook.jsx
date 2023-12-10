import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchBookInfoByOLID } from "../../clients/openlib_client";
import { findUserById } from "../../clients/user_client";
import BookCardMini from "../book/bookCardMini";
import { findBookById } from "../../clients/book_client";

export default function ReaderLikedReviews() {
    const currentUser = useSelector(state => state.currentUser);
    const [likedBooks, setLikedBooks] = useState([]);

    useEffect(() => {
        let isMounted = true;

        async function fetchLikedBooks() {
            try {
                if (!currentUser || !currentUser.userId) return;

                // Fetch the current user's data
                const currentUserInfo = await findUserById(currentUser.userId);

                if (!isMounted) return;

                // Obtain the array of IDs of reviews liked by the current user
                const likedBookIds = currentUserInfo.likedBooks;

                // Get the book OLIDs from each book ID
                const likedBookOlids = await Promise.all(likedBookIds.map(async bookId => {
                    const book = await findBookById(bookId);
                    return book.olid;
                }));

                // Get the book details from each book OLID
                const likedBooks = await Promise.all(likedBookOlids.map(async olid => {
                    const additionalDetails = await fetchBookInfoByOLID(olid);
                    return {
                        ...additionalDetails,
                        olid: olid,
                    };
                }));

                if (isMounted) {
                    setLikedBooks(likedBooks);
                }

            } catch (err) {
                console.error("Error fetching liked books:", err);
            }
        }

        if (currentUser && currentUser.role === "Reader") {
            fetchLikedBooks();
        }

        return () => {
            isMounted = false;
        };

    }, [currentUser]);

    console.log("Liked books:", likedBooks);

    return (
        <div className="trending-container">
            <h2 className="trending-title">My Liked Books</h2>
            <div>
                {likedBooks.map((book, i) => (
                    <div key={i}>
                        <BookCardMini book={book} />
                    </div>
                ))}
            </div>
        </div>
    );
}
