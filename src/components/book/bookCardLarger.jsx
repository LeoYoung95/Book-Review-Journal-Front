import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { findUserById, addBookLikedUsersById, deleteBookLikedUsersById } from "../../clients/user_client"; //
import "./book.css";

const BookCardLarger = ({ book }) => {
    const dispatch = useDispatch();
    const currentUserId = useSelector((state) => state.currentUser.userId);
    const [likedUsers, setLikedUsers] = useState([]);
    const isLiked = book.likedUsers.includes(currentUserId);

    const getGenres = (genres) => {
        // Split the genres string and limit to first 5 genres
        if (genres && typeof genres === "string") {
            return genres.split(", ").slice(0, 5).join(", ");
        }
        return "No genres available"; // Default message if genres is not a string or is empty
    };

    useEffect(() => {
        async function fetchLikedUsers() {
            const userDetailsPromises = book.likedUsers.map((userId) => findUserById(userId));
            const userDetails = await Promise.all(userDetailsPromises);
            setLikedUsers(userDetails);
        }

        fetchLikedUsers();
    }, [book.likedUsers]);

    const handleLikeBook = async () => {
        if (isLiked) {
            try {
                await deleteBookLikedUsersById(book.olid, currentUserId);

                setLikedUsers(likedUsers.filter((user) => user.id !== currentUserId));
            } catch (error) {
                console.error("Error unliking the book:", error);
            }
        } else {
            try {
                await addBookLikedUsersById(book.olid, currentUserId);

                const currentUserInfo = await findUserById(currentUserId);
                setLikedUsers([...likedUsers, currentUserInfo]);
            } catch (error) {
                console.error("Error liking the book:", error);
            }
        }
    };

    return (
        <div className="book-card-large">
            <div className="book-cover-large">
                <img src={book.cover || "default-cover.jpg"} alt={book.title} />
            </div>
            <div className="book-details-large">
                <h1>
                    <strong>{book.title}</strong>
                </h1>
                <p>
                    <strong>Author:</strong> {book.author}
                </p>
                <p>
                    <strong>Published:</strong> {book.publishDate}
                </p>
                <p>
                    <strong>Genres:</strong> {getGenres()}
                </p>
            </div>
            <div className="book-description-large">
                <p>
                    <strong>Description:</strong>{" "}
                </p>
                <p>{book.description}</p>
            </div>
            <button onClick={handleLikeBook}>
                {isLiked ? <IoHeartSharp style={{ color: "red" }} /> : <IoHeartOutline />}
                {likedUsers.map((user, index) => (
                    <span key={user.id}>
                        {index > 0 ? ", " : ""}
                        {user.firstName} {user.lastName}
                    </span>
                ))}
            </button>
        </div>
    );
};

export default BookCardLarger;
