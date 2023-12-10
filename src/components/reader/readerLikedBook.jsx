import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BookCardMini from '../book/bookCardMini';
import { fetchBookInfoByOLID } from '../../clients/openlib_client';
import { findUserById } from '../../clients/user_client';
import { findBookById } from '../../clients/book_client';
import { findReviewById } from '../../clients/review_client';
import { setLikedBooks } from '../../reducers/currentBooksReducer';

export default function ReaderLikedReviews() {
    const currentUser = useSelector(state => state.currentUser);
    const likedBooks = useSelector(state => state.currentBooks.likedBooks);
    const dispatch = useDispatch();

    useEffect(() => {
        let isMounted = true;

        async function fetchLikedBooks() {
            try {
                if (!currentUser || !currentUser.userId) return;

                const currentUserInfo = await findUserById(currentUser.userId);
                if (!isMounted) return;

                const likedBookIds = currentUserInfo.likedBooks;
                const likedBooksDetails = await Promise.all(likedBookIds.map(async bookId => {
                    const book = await findBookById(bookId);
                    const olid = book.olid;
                    const additionalDetails = await fetchBookInfoByOLID(olid);

                    let reviewCount = 0;
                    if (additionalDetails && additionalDetails.reviews) {
                        for (const reviewId of additionalDetails.reviews) {
                            const review = await findReviewById(reviewId);
                            if (review && !review.is_deleted) {
                                reviewCount++;
                            }
                        }
                    }

                    return {
                        ...book,
                        ...additionalDetails,
                        olid: olid,
                        reviewCount: reviewCount,
                    };
                }));

                if (isMounted) {
                    console.log("Liked books details:", likedBooksDetails);
                    dispatch(setLikedBooks(likedBooksDetails));
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
    }, [currentUser, dispatch]);

    return (
        <div className="trending-container">
            <h2 className="trending-title">My Liked Books</h2>
            <div>
                {likedBooks && likedBooks.length > 0 &&
                    likedBooks.map((book, i) => (
                        <div key={i}>
                            <BookCardMini book={book} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}
