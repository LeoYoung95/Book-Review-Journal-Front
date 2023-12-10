import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { findUserById, addLikedBook, removeLikedBook } from "../../clients/user_client";
import { addBookLikedUsersById, deleteBookLikedUsersById } from "../../clients/book_client";
import { useNavigate } from "react-router-dom";
import "./book.css";

const BookCardLarger = ({ book }) => {
    const currentUserId = useSelector((state) => state.currentUser.userId);
    const currentUserRole = useSelector((state) => state.currentUser.role);
    const [likedUsers, setLikedUsers] = useState([]);

    const isLiked = likedUsers.some(user => user._id === currentUserId);
    const navigate = useNavigate();

    const navigateToUserProfile = (userId) => {
        console.log(`Navigating to user profile with ID: ${userId}`);
        navigate(`/profile/${userId}`);
    };

    const getGenres = (genres) => {
        if (genres && typeof genres === "string") {
            return genres.split(", ").slice(0, 5).join(", ");
        }
        return "No genres available";
    };


    useEffect(() => {
        async function fetchLikedUsers() {
            const userDetailsPromises = book.likedUsers.map((userId) => findUserById(userId));
            const userDetails = await Promise.all(userDetailsPromises);
            setLikedUsers(userDetails);
            console.log("Liked users:", likedUsers)
        }

        fetchLikedUsers();
    }, [book.likedUsers]);

    const handleLikeBook = async () => {
        let updatedLikedUsers;

        if (isLiked) {
            updatedLikedUsers = likedUsers.filter((user) => user._id !== currentUserId);
            setLikedUsers(updatedLikedUsers);

            try {
                await Promise.all([
                    deleteBookLikedUsersById(book.olid, currentUserId),
                    removeLikedBook(currentUserId, book._id)
                ]);
            } catch (error) {
                console.error("Error unliking the book:", error);
                setLikedUsers(likedUsers);
            }
        } else {
            // Assuming you have a function to get the full user details
            const currentUserDetails = await findUserById(currentUserId);

            updatedLikedUsers = [...likedUsers, currentUserDetails];
            setLikedUsers(updatedLikedUsers);

            try {
                await Promise.all([
                    addBookLikedUsersById(book.olid, currentUserId),
                    addLikedBook(currentUserId, book._id)
                ]);
            } catch (error) {
                console.error("Error liking the book:", error);
                setLikedUsers(likedUsers);
            }
        }
    };



    return (
        <div className="book-card-large" style={{ display: 'flex', flexDirection: 'row' }}>
            <div className="book-cover-large">
                <img src={book.cover || "default-cover.jpg"} alt={book.title}/>
            </div>
            <div style={{ flex: 1 }}>
                <div className="book-details-large">
                    <h1><strong>{book.title}</strong></h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published:</strong> {book.publishDate}</p>
                    <p><strong>Genres:</strong> {getGenres(book.genres)}</p>
                </div>
                <div className="book-description-large">
                    <p><strong>Description:</strong></p>
                    <p>{book.description}</p>
                </div>
            </div>
            <div className="liked-by-section" style={{ alignSelf: 'flex-start' }}>
                {currentUserRole !== 'Author' && (
                    <button className="like-button" onClick={handleLikeBook}>
                        {isLiked ? <IoHeartSharp style={{ color: "red" }} /> : <IoHeartOutline />}
                    </button>
                )}
                <span className="mr-2">Liked By:</span>
                {likedUsers.map((likedUser, index) => (
                    <span
                        key={index}
                        style={{ cursor: "pointer", color: "grey" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigateToUserProfile(likedUser._id);
                        }}
                    >
                    {index > 0 && ", "}
                        {likedUser.firstName} {likedUser.lastName}
                </span>
                ))}
            </div>
        </div>
    );
}



    export default BookCardLarger;
