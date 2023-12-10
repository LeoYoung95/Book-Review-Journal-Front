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

// Get Review by Review ID
export const findReviewById = async (id) => {
    console.log("review id: ", id, typeof id)
    const response = await request.get(`${REVIEW_API}/${id}`);
    return response.data;
}

// Get Review's liked users by Review ID
export const findReviewLikedUsersById = async (id) => {
    const response = await request.get(`${REVIEW_API}/${id}/liked_users`);
    return response.data;
}

// Add to Review's liked users by Review ID
export const addReviewLikedUsersById = async (id, userId) => {
    console.log("review client: id: ", id);
    console.log("review client: userId: ", userId);
    const response = await request.post(`${REVIEW_API}/${id}/liked_users`, {userId});
    return response.data;
}

// Delete Review's liked users by Review ID
export const deleteReviewLikedUsersById = async (id, userId) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
    };

    const response = await fetch(`${REVIEW_API}/${id}/liked_users`, requestOptions);
    return response.data;
};


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

// Author Only: Add Tags to Review
export const addTagsToReview = async (id, tagIds) => {
const response = await request.post(`${REVIEW_API}/${id}/tags`, {tagIds});
    return response.data;
}

// Author & Admin Only: Soft Delete Review
export const softDeleteReview = async (id, userId) => {
    const response = await request.put(`${REVIEW_API}/delete/${id}`, { deletedBy: userId });
    return response.data;
}


// Admin Only: Recover Review
export const recoverReview = async (id) => {
    const response = await request.put(`${REVIEW_API}/recover/${id}`);
    return response.data;
}

// Admin Only: Hard Delete Review
export const hardDeleteReview = async (id) => {
    const response = await request.delete(`${REVIEW_API}/${id}`);
    return response.data;
}
