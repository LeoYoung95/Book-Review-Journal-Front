import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
});

export const BASE_URL = process.env.REACT_APP_BRJ_REACT_BASE;
export const REVIEW_API = `${BASE_URL}/api/reviews`;

// Get All Reviews
export const findAllReviews = async () => {
    const response = await request.get(`${REVIEW_API}`);
    return response.data;
}


// Get Trending Top 10 Reviews
export const findTrendingReviews = async () => {
    const response = await request.get(`${REVIEW_API}/trending`);
    return response.data;
}

// Get Review by Review ID
export const findReviewById = async (id) => {
    const response = await request.get(`${REVIEW_API}/${id}`);
    return response.data;
}

// Get Review's liked users by Review ID
export const findReviewLikedUsersById = async (id) => {
    const response = await request.get(`${REVIEW_API}/${id}/liked_users`);
    return response.data;
}

// Add to Review's liked users by Review ID
export const addReviewLikedUsersById = async (id, user) => {
    const response = await request.post(`${REVIEW_API}/${id}/liked_users`, user);
    return response.data;
}

// Delete Review's liked users by Review ID
export const deleteReviewLikedUsersById = async (id, user) => {
    const response = await request.delete(`${REVIEW_API}/${id}/liked_users`, { data: user });
    return response.data;
}

// Author Only: Post Review
export const createReview = async (review) => {
    const response = await request.post(`${REVIEW_API}/post`, review);
    return response.data;
}


// Author Only: Update Review
export const updateReview = async (id, review) => {
    const response = await request.put(`${REVIEW_API}/${id}`, review);
    return response.data;
}

// Author & Admin Only: Soft Delete Review
export const deleteReview = async (id, userId) => {
    const response = await request.put(`${REVIEW_API}/delete/${id}`, { deletedBy: userId });
    return response.data;
}

// Admin Only: Recover Review
export const recoverReview = async (id) => {
    const response = await request.put(`${REVIEW_API}/recover/${id}`);
    return response.data;
}
