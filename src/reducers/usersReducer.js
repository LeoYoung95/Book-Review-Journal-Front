import { createSlice } from "@reduxjs/toolkit";

// Initial state of the users slice
const initialState = {
    users: [],

    user: { name: "", email: "", role: "", id: "" },
};

// Creating the users slice
const usersReducer = createSlice({
    name: "users",
    initialState,
    reducers: {
        // Action to set the array of users
        setUsers: (state, action) => {
            state.users = action.payload;
        },

        // Action to add a new user
        addUser: (state, action) => {
            state.users = [action.payload, ...state.users];
        },

        // Action to delete a user
        deleteUser: (state, action) => {
            state.users = state.users.filter((user) => user.id !== action.payload);
        },

        // Action to update a user's details
        updateUser: (state, action) => {
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
        },

        // Action to set the current user for detailed view or editing
        setUser: (state, action) => {
            state.user = action.payload;
        },

        // Action to add a liked review to the user's array
        addLikedReviewToUser: (state, action) => {
            const { userId, reviewId } = action.payload;
            const user = state.users.find((user) => user.id === userId);
            if (user && !user.likedReviews.includes(reviewId)) {
                user.likedReviews.push(reviewId);
            }
        },

        // Action to remove a liked review from the user's array
        removeLikedReviewFromUser: (state, action) => {
            const { userId, reviewId } = action.payload;
            const user = state.users.find((user) => user.id === userId);
            if (user) {
                user.likedReviews = user.likedReviews.filter((id) => id !== reviewId);
            }
        },

        // Action to add a liked book to the user's array
        addLikedBookToUser: (state, action) => {
            const { userId, bookId } = action.payload;
            const user = state.users.find((user) => user.id === userId);
            if (user && !user.likedBooks.includes(bookId)) {
                user.likedBooks.push(bookId);
            }
        },

        // Action to remove a liked book from the user's array
        removeLikedBookFromUser: (state, action) => {
            const { userId, bookId } = action.payload;
            const user = state.users.find((user) => user.id === userId);
            if (user) {
                user.likedBooks = user.likedBooks.filter((id) => id !== bookId);
            }
        },
    },
});

// Exporting the actions and the reducer
export const { addUser, deleteUser, updateUser, setUser, setUsers, addLikedReviewToUser, removeLikedReviewFromUser, addLikedBookToUser,removeLikedBookFromUser  } =
    usersReducer.actions;

export default usersReducer.reducer;
