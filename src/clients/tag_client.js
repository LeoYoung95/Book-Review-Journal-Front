import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
    baseURL: process.env.REACT_APP_BRJ_REACT_BASE,
});
export const BASE_URL = process.env.REACT_APP_BRJ_REACT_BASE;
export const TAGS_API = `${BASE_URL}/api/tags`;


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

// Get All Tags
export const findAllTags = async () => {
    return request.get(TAGS_API).then(handleResponse).catch(handleError);
};

// Find Tag by ID
export const findTagById = async (id) => {
    console.log('tagId', id, typeof id);
    return request.get(`${TAGS_API}/${id}`).then(handleResponse).catch(handleError);
};

// Add a new Tag
export const addTag = async (tag) => {
    return request.post(TAGS_API, tag).then(handleResponse).catch(handleError);
};

// Add a new Review to an existing Tag
export const addReviewToTag = async (tagId, reviewId) => {
    return request.post(`${TAGS_API}/${tagId}/reviews`, {reviewId}).then(handleResponse).catch(handleError);
};

// Remove a Review from an existing Tag [Hard Delete]
export const removeReviewFromTag = async (tagId, reviewId) => {
    return request.delete(`${TAGS_API}/${tagId}/reviews`, {reviewId}).then(handleResponse).catch(handleError);
};