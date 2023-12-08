import React, { useState, useEffect } from "react";
import * as client from "../../clients/review_client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { setCurrentBook, setCurrentBooks, setNeedRefresh } from "../../reducers/currentBooksReducer";
import { useDispatch } from "react-redux";
import ReviewCard from "./reviewCard";
import { createBookByOpenLibraryId, createReviewByOpenLibraryId, findBookByOpenLibraryId } from "../../clients/book_client";
import { addWrittenReview } from "../../clients/user_client";


const ReviewEditor = () => {
    const { reviewId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const book_olid = queryParams.get("book_olid");
    const currentBook = useSelector((state) => state.currentBooks.book);
    const currentBooks = useSelector((state) => state.currentBooks.books);
    const currentUser = useSelector((state) => state.currentUser);
    const dispatch = useDispatch();

    const initialReviewState = {
        title: "",
        body: "",
        book_olid: book_olid,
        book_id: currentBook?._id, // Using _id from the Redux state
        author_id: currentUser ? currentUser.userId : null,
        likedUsers: [],
        is_deleted: false,
        deleted_by: null,
    };
    const [review, setReview] = useState(initialReviewState);
    const [reviewID, setReviewID] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReview = async () => {
            setLoading(true);
            try {
                if (reviewId) {
                    const fetchedReview = await client.findReviewById(reviewId);
                    console.log("fetchedReview:", fetchedReview);
                    setReview({ ...fetchedReview });
                }
            } catch (err) {
                setError("Error fetching review: ${err.message}");
            } finally {
                setLoading(false);
            }
        };
        if (reviewId) {
            fetchReview();
        }
    }, [reviewId]);

    const handleChange = (e) => {
        setReview({ ...review, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        setLoading(true);

        try {
            let newReview = {};

            if (reviewId) {
                // Update an existing review
                newReview = await client.updateReview(reviewId, review);
            } else {
                // Create a new review
                if (currentUser && currentUser.userId) {
                    let book;
                    try {
                        book = await findBookByOpenLibraryId(book_olid);
                    } catch (error) {
                        console.error("Error finding book:", error.message);
                        setError(`Error finding book: ${error.message}`);
                        return;
                    }

                    if (!book) {
                        try {
                            book = await createBookByOpenLibraryId(book_olid);
                        } catch (error) {
                            console.error("Error creating book:", error.message);
                            setError(`Error creating book: ${error.message}`);
                            return;
                        }
                    }

                    const updatedReview = { ...review, book_id: book._id };

                    try {
                        newReview = await client.createReview(updatedReview);
                    } catch (error) {
                        console.error("Error creating review:", error.message);
                        setError(`Error creating review: ${error.message}`);
                        return;
                    }

                    setReviewID(newReview._id);

                    try {
                        await createReviewByOpenLibraryId(book_olid, newReview._id);
                        await addWrittenReview(currentUser.userId, newReview._id);
                    } catch (error) {
                        console.error("Error in post-review operations:", error.message);
                        setError(`Error in post-review operations: ${error.message}`);
                        return;
                    }
                } else {
                    throw new Error("User not found");
                }
            }

            // Update currentBook with new review
            const updatedCurrentBook = {
                ...currentBook,
                reviews: [...(currentBook.reviews || []), newReview._id],
            };
            dispatch(setCurrentBook(updatedCurrentBook));

            // Update the book in the currentBooks array
            const updatedCurrentBooks = currentBooks.map((book) => {
                if (book.olid === book_olid) {
                    // Provide a fallback empty array if book.reviews is null or undefined
                    return { ...book, reviews: [...(book.reviews || []), newReview._id] };
                }
                return book;
            });

            // Dispatch action to update currentBooks in the Redux store
            dispatch(setCurrentBooks(updatedCurrentBooks));
            dispatch(setNeedRefresh(true));

            navigate(`/reviews/${reviewID ? reviewID : newReview._id}`);
        } catch (err) {
            setError(`Error submitting review: ${err.message}`);
        } finally {
            setLoading(false);
        }
    };
    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    return (
        <div className="review-card">
            <div className="review-card-header">{reviewId ? "Edit Review" : "New Review"}</div>
            <div className="review-card-body-editor">
                <div className="form-group row">
                    <label htmlFor="title" className="col-sm-2 col-form-label">
                        Title
                    </label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={review.title}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="form-group row">
                    <label htmlFor="body" className="col-sm-2 col-form-label">
                        Content
                    </label>
                    <div className="col-sm-10">
                        <textarea
                            className="form-control"
                            id="body"
                            name="body"
                            rows="5"
                            value={review.body}
                            onChange={handleChange}
                        />
                    </div>
                </div>
            </div>
            <div className="review-card-footer">
                <button onClick={handleCancel} className="btn btn-danger mr-4 rounded">
                    Cancel
                </button>
                <button onClick={handleSave} className="btn btn-success rounded">
                    Save
                </button>
            </div>
        </div>
    );
};

export default ReviewEditor;