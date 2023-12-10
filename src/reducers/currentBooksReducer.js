import { createSlice } from "@reduxjs/toolkit";

// Initial state of the book slice
let initialState = {
    books: [],
    likedBooks: [],
    book: {
        _id: "",
        olid: "",
        reviews: [],
        likedUsers: [],
    },
    needRefresh: false,
};

const storedCurrentBooks = localStorage.getItem('currentBooks');
if (storedCurrentBooks) {
    initialState = JSON.parse(storedCurrentBooks);
}

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

        //Action to mark need refresh
        setNeedRefresh: (state, action) => {
            state.needRefresh = action.payload;
        },

        // Action to set the liked books
        setLikedBooks: (state, action) => {
            state.likedBooks = action.payload;
        },

        // Action to clear the liked books
        clearLikedBooks: (state) => {
            state.likedBooks = [];
        },
    },
});

// Exporting the actions and the reducer
export const {setCurrentBook, removeCurrentBook, clearCurrentBooks, setCurrentBooks,setNeedRefresh, setLikedBooks, clearLikedBooks}  = currentBooksReducer.actions;

export default currentBooksReducer.reducer;
