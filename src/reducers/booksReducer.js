import { createSlice } from "@reduxjs/toolkit";

// Initial state of the books slice
const initialState = {
    books: [],
    book: { title: "New Book", author: "Author Name", description: "Book Description" },
};

// Creating the books slice
const booksReducer = createSlice({
    name: "books",
    initialState,
    reducers: {
        // Action to set the array of books
        setBooks: (state, action) => {
            state.books = action.payload;
        },

        // Action to add a new book
        addBook: (state, action) => {
            state.books = [action.payload, ...state.books];
        },

        // Action to delete a book
        deleteBook: (state, action) => {
            state.books = state.books.filter((book) => book.id !== action.payload);
        },

        // Action to update a book's details
        updateBook: (state, action) => {
            state.books = state.books.map((book) => {
                if (book.id === action.payload.id) {
                    return action.payload;
                } else {
                    return book;
                }
            });
        },

        // Action to set the current book for detailed view
        setBook: (state, action) => {
            state.book = action.payload;
        },

        // Action to handle liking a book
        likeBook: (state, action) => {
            const { bookId, userId } = action.payload;
            // Update the book's likedUsers array
            const book = state.books.find((book) => book.id === bookId);
            if (book && !book.likedUsers.includes(userId)) {
                book.likedUsers.push(userId);
            }
        },
    },
});

// Exporting the actions and the reducer
export const { addBook, deleteBook, updateBook, setBook, setBooks, likeBook } = booksReducer.actions;

export default booksReducer.reducer;
