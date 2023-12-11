import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {IoHeartOutline, IoHeartSharp} from "react-icons/io5";
import {findUserById, addLikedBook, removeLikedBook} from "../../clients/user_client";
import {
    addBookLikedUsersById,
    createBookByOpenLibraryId,
    deleteBookLikedUsersById,
    findBookByOpenLibraryId
} from "../../clients/book_client";
import {useNavigate} from "react-router-dom";
import {setCurrentBooks, setLikedBooks} from "../../reducers/currentBooksReducer";
import "./book.css";
import Modal from "react-modal";


const BookCardLarger = ({book}) => {
    const currentUserId = useSelector((state) => state.currentUser.userId);
    const currentUserRole = useSelector((state) => state.currentUser.role);
    const currentBooks = useSelector((state) => state.currentBooks);
    const [likedUsers, setLikedUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const dispatch = useDispatch();

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

    const closeModal = () => {
        setShowModal(false);
    };


    useEffect(() => {
        async function fetchLikedUsers() {
            const bookInDb = await findBookByOpenLibraryId(book.olid);
            if (!bookInDb) return;
            const userDetails = await Promise.all(bookInDb.likedUsers.map(async (userId) => {
                return await findUserById(userId);
            }));
            setLikedUsers(userDetails);
            console.log("Liked users:", likedUsers)
        }

        fetchLikedUsers();
    }, [book.likedUsers]);

    const handleLikeBook = async () => {
        // Check if the book exists in the database
        let bookInDb;
        try {
            bookInDb = await findBookByOpenLibraryId(book.olid);
        } catch (error) {
            console.error("Error finding book:", error.message);
            // If the book doesn't exist, create it
            try {
                bookInDb = await createBookByOpenLibraryId(book.olid);
            } catch (creationError) {
                console.error("Error creating book:", creationError.message);
                return;
            }
        }

        let updatedLikedUsers;
        if (isLiked) {
            updatedLikedUsers = likedUsers.filter((user) => user._id !== currentUserId);
        } else {
            const currentUserDetails = await findUserById(currentUserId);
            updatedLikedUsers = [...likedUsers, currentUserDetails];
        }

        setLikedUsers(updatedLikedUsers);

        try {
            if (isLiked) {
                await Promise.all([
                    deleteBookLikedUsersById(book.olid, currentUserId),
                    removeLikedBook(currentUserId, bookInDb._id)
                ]);
            } else {
                await Promise.all([
                    addBookLikedUsersById(book.olid, currentUserId),
                    addLikedBook(currentUserId, bookInDb._id)
                ]);
            }

            // Find and update the book in the books array
            const updatedBooks = currentBooks.books.map(b =>
                b.olid === book.olid ? {...b, likedUsers: updatedLikedUsers.map(user => user._id)} : b
            );
            dispatch(setCurrentBooks(updatedBooks));

// Find and update the book in the likedBooks array
            const updatedLikedBooks = currentBooks.likedBooks.map(b =>
                b.olid === book.olid ? {...b, likedUsers: updatedLikedUsers.map(user => user._id)} : b
            );
            dispatch(setLikedBooks(updatedLikedBooks));

        } catch (error) {
            console.error("Error updating the book:", error);
            setLikedUsers(likedUsers); // Revert the likedUsers state in case of an error
        }
    };


    return (
        <div className="book-card-large" style={{display: 'flex', flexDirection: 'column'}}>
            <div className="row">
                <div className="book-cover-large">
                    <img src={book.cover || "default-cover.jpg"} alt={book.title}/>
                </div>
                <div style={{flex: 1}}>
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
            </div>
            <div className="row" style={{marginTop: '10px', alignSelf: 'flex-start'}}>
                {currentUserRole !== 'Author' && (
                    <button className="like-button" onClick={handleLikeBook}>
                        {isLiked ? <IoHeartSharp style={{color: "red"}}/> : <IoHeartOutline/>}
                    </button>
                )}
                <span className="mr-2">Liked By:</span>
                {likedUsers.map((likedUser, index) => (
                    <span
                        key={index}
                        style={{cursor: "pointer", color: "grey"}}
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

            <Modal
                isOpen={showModal}
                onRequestClose={closeModal}
                appElement={document.getElementById('root') || undefined}
                overlayClassName="dimmed-background"
                className="modal-container"
            >
                <div className="justify-items-center">
                    <p>Please sign in to like books</p>
                    <br/>
                    <button className="btn-danger pl-15" onClick={() => navigate('/signin')}>Sign In</button>
                </div>
            </Modal>
        </div>
    );
}


export default BookCardLarger;
