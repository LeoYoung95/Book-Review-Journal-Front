import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BRJ_REACT_BASE,
});

export const USERS_API = `/api/users`;

// Helper function for handling errors
const handleResponse = (response) => {
    return response.data;
};

const handleError = (error) => {
    // Log the error for debugging
    console.error("API call error:", error.response || error);

    if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        throw new Error(error.response.data.error || "Server responded with an error");
    } else if (error.request) {
        // The request was made but no response was received
        throw new Error("No response received from server");
    } else {
        // Something happened in setting up the request that triggered an Error
        throw new Error("Error setting up the request");
    }
};

// User Authentication
export const signin = (credentials) => {
    return request.post(`${USERS_API}/signin`, credentials)
        .then(handleResponse)
        .catch(handleError);
};

export const signup = (credentials) => {
    return request.post(`${USERS_API}/signup`, credentials)
        .then(handleResponse)
        .catch(handleError);
};

export const signout = () => {
    return request.post(`${USERS_API}/signout`)
        .then(handleResponse)
        .catch(handleError);
};

// Get User Info
export const findCurrentUser = () => {
    return request.get(`${USERS_API}/current`)
        .then(handleResponse)
        .catch(handleError);
};

export const findUserById = (id) => {
    return request.get(`${USERS_API}/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

// Update User Profile
export const updateProfile = (user) => {
    return request.put(`${USERS_API}/${user._id}`, user)
        .then(handleResponse)
        .catch(handleError);
};

// Author Only: Get Written Reviews
export const findWrittenReviewsByUserId = (id) => {
    return request.get(`${USERS_API}/${id}/written_reviews`)
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Get Liked Reviews
export const findLikedReviewsByUserId = (id) => {
    return request.get(`${USERS_API}/${id}/liked_reviews`)
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Get Liked Books
export const findLikedBooksByUserId = (id) => {
    return request.get(`${USERS_API}/${id}/liked_books`)
        .then(handleResponse)
        .catch(handleError);
};

// Admin Only: Get Deleted Reviews
export const findDeletedReviewsByUserId = (id) => {
    return request.get(`${USERS_API}/${id}/deleted_reviews`)
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Add Liked Review
export const addLikedReview = (id, review) => {
    return request.post(`${USERS_API}/${id}/liked_reviews`, review)
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Remove Liked Review
export const removeLikedReview = (id, reviewId) => {
    return request.delete(`${USERS_API}/${id}/liked_reviews`, { data: { reviewId } })
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Add Liked Book
export const addLikedBook = (id, book) => {
    return request.post(`${USERS_API}/${id}/liked_books`, book)
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Remove Liked Book
export const removeLikedBook = (id, bookId) => {
    return request.delete(`${USERS_API}/${id}/liked_books`, { data: { bookId } })
        .then(handleResponse)
        .catch(handleError);
};

// Author Only: Add Written Review
export const addWrittenReview = (id, review) => {
    return request.post(`${USERS_API}/${id}/written_reviews`, review)
        .then(handleResponse)
        .catch(handleError);
};

// Author & Admin Only: Remove Written Review
export const removeWrittenReview = (id, reviewId) => {
    return request.delete(`${USERS_API}/${id}/written_reviews`, { data: { reviewId } })
        .then(handleResponse)
        .catch(handleError);
};

// Author Only: Edit Written Review
export const editWrittenReview = (id, reviewId, review) => {
    return request.put(`${USERS_API}/${id}/written_reviews`, { ...review, reviewId })
        .then(handleResponse)
        .catch(handleError);
};




