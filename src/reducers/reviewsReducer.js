import { createSlice } from '@reduxjs/toolkit';

// Initial state of the reviews slice
const initialState = {
    reviews: [],
    review: {
        title: '',
        body: '',
        book_id: null,
        author_id: null,
        likedUsers: [],
        is_deleted: false,
        deleted_by: null
    },
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

        // Action to delete a review (soft delete)
        deleteReview: (state, action) => {
            state.reviews = state.reviews.map(review => {
                if (review.id === action.payload.id) {
                    return { ...review, is_deleted: true, deleted_by: action.payload.deletedBy };
                }
                return review;
            });
        },

        // Action to recover a deleted review
        recoverReview: (state, action) => {
            state.reviews = state.reviews.map(review => {
                if (review.id === action.payload) {
                    return { ...review, is_deleted: false, deleted_by: null };
                }
                return review;
            });
        },

        // Action to update a review's details
        updateReview: (state, action) => {
            state.reviews = state.reviews.map((review) => {
                if (review.id === action.payload.id) {
                    return { ...review, ...action.payload };
                } else {
                    return review;
                }
            });
        },

        // Action to set the current review for detailed view or editing
        setReview: (state, action) => {
            state.review = action.payload;
        },

        // // Action to handle liking a review
        // likeReview: (state, action) => {
        //     const { reviewId, userId } = action.payload;
        //     const review = state.reviews.find((review) => review.id === reviewId);
        //     if (review) {
        //         // If the user hasn't already liked the review
        //         if (!review.likedUsers.includes(userId)) {
        //             // Add the user to the likedUsers array
        //             review.likedUsers.push(userId);
        //         }
        //     }
        // },

        
    },
});

// Exporting the actions and the reducer
export const {
    addReview, deleteReview, recoverReview,
    updateReview, setReview, setReviews
} = reviewsReducer.actions;

export default reviewsReducer.reducer;