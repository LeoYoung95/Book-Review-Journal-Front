import axios from "axios";

// Set up axios defaults
axios.defaults.withCredentials = true;
const request = axios.create({
    withCredentials: true,
});

// Base URL for API requests
export const BASE_URL = "http://localhost:4000";

// Base endpoint for book-related API requests
export const BOOK_API = `${BASE_URL}/api/books`;

// Function to get a book by its MongoDB ID
export const findBookByMongoId = async (mongo_id) => {
    const response = await request.get(`${BOOK_API}/${mongo_id}`);
    return response.data;
}

// Function to get a book by its Open Library ID
export const findBookByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}`);
    return response.data;
}

// Function to get the reviews of a book by its Open Library ID
export const findBookReviewsByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}/reviews`);
    return response.data;
}

// Function to get the users who liked a book by its Open Library ID
export const findBookLikedUsersByOpenLibraryId = async (olid) => {
    const response = await request.get(`${BOOK_API}/olid/${olid}/liked_users`);
    return response.data;
}

// Function to post a new review for a book by its Open Library ID
export const createReviewByOpenLibraryId = async (olid, reviewID) => {
    const response = await request.post(`${BOOK_API}/olid/${olid}/reviews`, {reviewID});
    return response.data;
}

// Function to add a new book by its Open Library ID
export const createBookByOpenLibraryId = async (olid) => {
    const response = await request.post(`${BOOK_API}/olid/${olid}`);
    return response.data;
}


