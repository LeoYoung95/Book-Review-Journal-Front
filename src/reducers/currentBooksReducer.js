import {createSlice} from "@reduxjs/toolkit";

// Initial state of the book slice
const initialState = {
    books: [],
    book: {
        _id: "",
        olid: "",
        reviews: [],
        likedUsers: [],
    },
};

// Creating the books slice
const currentBooksReducer = createSlice({
    name: "currentBooks",
    initialState,
    reducers: {

        // Action to set the current book
        setCurrentBook: (state, action) => {
            state.book = action.payload;
        },


        // Action to remove the current book
        removeCurrentBook: (state) => {
            state.book = {};
        },

        // Action to set the current books
        setCurrentBooks: (state, action) => {
            state.books = action.payload;
        },

        // Action to clear the current books
        clearCurrentBooks: (state) => {
            state.books = [];
        },
    },
});

// Exporting the actions and the reducer
export const {setCurrentBook, removeCurrentBook, clearCurrentBooks, setCurrentBooks} = currentBooksReducer.actions;

export default currentBooksReducer.reducer;
