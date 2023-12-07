import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BRJ_REACT_BASE,
});
export const BASE_URL = process.env.REACT_APP_BRJ_REACT_BASE;
export const USERS_API = `${BASE_URL}/api/users`;

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

export const findUserById = async (id) => {
    return request.get(`${USERS_API}/${id}`)
        .then(handleResponse)
        .catch(handleError);
};

// Update User Profile
export const updateProfile = (userId, user) => {
    return request.put(`${USERS_API}/${userId}`, user)
        .then(handleResponse)
        .catch(handleError);
};


// Reader Only: Add Liked Review
export const addLikedReview = (id, reviewId) => {
    return request.post(`${USERS_API}/${id}/liked_reviews`, { reviewId })
        .then(handleResponse)
        .catch(handleError);
};

// Reader Only: Remove Liked Review
export const removeLikedReview = (id, reviewId) => {
    console.log("user id:", id);
    console.log("reviewId:", reviewId);

    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId })
    };

    return fetch(`${USERS_API}/${id}/liked_reviews`, requestOptions)
        .then(handleResponse)
        .catch(handleError);
};


// Author Only: Add Written Review
export const addWrittenReview = (id, reviewId) => {
    return request.post(`${USERS_API}/${id}/written_reviews`, { reviewId })
        .then(handleResponse)
        .catch(handleError);
};

// Admin Only: Remove Written Review [Hard Delete]
export const removeWrittenReview = (id, reviewId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reviewId })
    };

    return fetch(`${USERS_API}/${id}/written_reviews`, requestOptions)
        .then(handleResponse)
        .catch(handleError);
};






