import axios from "axios";

// Set up axios defaults
axios.defaults.withCredentials = true;
const request = axios.create({
    withCredentials: true,
});

// Base URL for API requests
export const BASE_URL = process.env.REACT_APP_BRJ_REACT_BASE;

// Base endpoint for book-related API requests
export const BOOK_API = `${BASE_URL}/api/books`;

// Function to get all books in our database
export const fetchAllBooks = async () => {
    const response = await request.get(BOOK_API);
    return response.data;
};


// Function to get a book by its Open Library ID
export const findBookByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}`);
    return response.data;
}

// Function to add a new book by its Open Library ID
export const createBookByOpenLibraryId = async (olid) => {
    const response = await request.post(`${BOOK_API}/olid/${olid}`);
    return response.data;
}


// Function to post a new review for a book by its Open Library ID
export const createReviewByOpenLibraryId = async (olid, reviewID) => {
    const response = await request.post(`${BOOK_API}/olid/${olid}/reviews`, {reviewID});
    return response.data;
}

// Function to delete a new review for a book by its Open Library ID [Hard Delete]
export const deleteReviewByOpenLibraryId = async (olid, reviewID) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewID })
    };

    const response = await fetch(`${BOOK_API}/olid/${olid}/reviews`, requestOptions);
    const responseData = await response.json();
    return responseData;
};

// Add to Book's liked users by Open Library ID
export const addBookLikedUsersById = async (olid, userId) => {
    const response = await request.post(`${BOOK_API}/olid/${olid}/liked_users`, { userId });
    return response.data;
};

// Delete Book's liked users by Open Library ID ID
export const deleteBookLikedUsersById = async (olid, userId) => {
    const requestOptions = {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
    };

    const response = await fetch(`${BOOK_API}/olid/${olid}/liked_users`, requestOptions);
    const responseData = await response.json();
    return responseData;
};




