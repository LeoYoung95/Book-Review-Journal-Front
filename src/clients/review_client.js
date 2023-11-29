import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.BRJ_REACT_BASE;
export const REVIEW_API = `${BASE_API}/api/review`;

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
export const createReview = async (user, review) => {
    const response = await request.post(`${REVIEW_API}/post/${user._id}`, review);
    return response.data;
}

// Author Only: Update Review
export const updateReview = async (id, review) => {
    const response = await request.put(`${REVIEW_API}/${id}`, review);
    return response.data;
}

// Author & Admin Only: Delete Review [Soft Delete]
export const deleteReview = async (user, review) => {
    const response = await request.put(`${REVIEW_API}/delete/${user._id}`,review);
    return response.data;
}

