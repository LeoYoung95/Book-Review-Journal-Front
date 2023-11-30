import axios from "axios";

axios.defaults.withCredentials = true;

const request = axios.create({
    withCredentials: true,
});

export const BASE_API = process.env.BRJ_REACT_BASE;
export const USERS_API = `${BASE_API}/api/users`;

// User Authentication
export const signin = async (credentials) => {
    const response = await request.post(`${USERS_API}/signin`, credentials);
    return response.data; };

export const singup = async (credentials) => {
    const response = await request.post(`${USERS_API}/signup`, credentials);
    return response.data; };

export const signout = async () => {
    const response = await request.post(`${USERS_API}/signout`);
    return response.data; };

// Get User Info
export const findCurrentUser = async () => {
    const response = await request.get(`${USERS_API}/current`);
    return response.data; };
export const findUserById = async (id) => {
    const response = await request.get(`${USERS_API}/${id}`);
    return response.data; };

// Update User Profile
export const updateProfile = async (user) => {
    const response = await request.put(`${USERS_API}/${user._id}`, user);
    return response.data; };

// Author Only: Get Written Reviews
export const findWrittenReviewsByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/${id}/written_reviews`);
    return response.data; };

// Reader Only: Get Liked Reviews
export const findLikedReviewsByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/${id}/liked_reviews`);
    return response.data; };

// Reader Only: Get Liked Books
export const findLikedBooksByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/${id}/liked_books`);
    return response.data; };

// Admin Only: Get deleted Reviews
export const findDeletedReviewsByUserId = async (id) => {
    const response = await request.get(`${USERS_API}/${id}/deleted_reviews`);
    return response.data; };

// Reader Only: Add Liked Review
export const addLikedReview = async (id, review) => {
    const response = await request.post(`${USERS_API}/${id}/liked_reviews`, review);
    return response.data; };

// Reader Only: Remove Liked Review
export const removeLikedReview = async (id, review) => {
    const response = await request.delete(`${USERS_API}/${id}/liked_reviews`, review);
    return response.data; };

// Reader Only: Add Liked Book
export const addLikedBook = async (id, book) => {
    const response = await request.post(`${USERS_API}/${id}/liked_books`, book);
    return response.data; };

// Reader Only: Remove Liked Book
export const removeLikedBook = async (id, book) => {
    const response = await request.delete(`${USERS_API}/${id}/liked_books`, book);
    return response.data; };

// Author Only: Add Written Review
export const addWrittenReview = async (id, review) => {
    const response = await request.post(`${USERS_API}/${id}/written_reviews`, review);
    return response.data; };

// Author & Admin Only: Remove Written Review
export const removeWrittenReview = async (id, review) => {
    const response = await request.delete(`${USERS_API}/${id}/written_reviews`, review);
    return response.data; };

// Author Only: Edit Written Review
export const editWrittenReview = async (id, review) => {
    const response = await request.put(`${USERS_API}/${id}/written_reviews`, review);
    return response.data; };



