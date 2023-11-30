import { createSlice } from '@reduxjs/toolkit';

// Initial state of the reviews slice
const initialState = {
    reviews: [],
    review: { title: '', content: '', author: '' },
};

// Creating the reviews slice
const reviewsReducer = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        // Action to set the array of reviews
        setReviews: (state, action) => {
            state.reviews = action.payload;
        },

        // Action to add a new review
        addReview: (state, action) => {
            state.reviews = [action.payload, ...state.reviews];
        },

        // Action to delete a review
        deleteReview: (state, action) => {
            state.reviews = state.reviews.filter(
                (review) => review.id !== action.payload
            );
        },

        // Action to update a review's details
        updateReview: (state, action) => {
            state.reviews = state.reviews.map((review) => {
                if (review.id === action.payload.id) {
                    return action.payload;
                } else {
                    return review;
                }
            });
        },

        // Action to set the current review for detailed view or editing
        setReview: (state, action) => {
            state.review = action.payload;
        },
    },
});

// Exporting the actions and the reducer
export const {
    addReview, deleteReview,
    updateReview, setReview, setReviews
} = reviewsReducer.actions;

export default reviewsReducer.reducer;
