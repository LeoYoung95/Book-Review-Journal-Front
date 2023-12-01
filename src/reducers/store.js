import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./user_reducer.js";
import reviewsReducer from "./reviews_reducer.js";
import booksReducer from "./books_reducer.js";


const store = configureStore({
    reducer: {
        usersReducer,
        reviewsReducer,
        booksReducer,
    }
});

export default store;
