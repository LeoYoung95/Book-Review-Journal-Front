import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer.js";
import reviewsReducer from "./reviewsReducer.js";
import booksReducer from "./booksReducer.js";
import currentUserReducer from "./currentUserReducer.js";


const store = configureStore({
    reducer: {
        usersReducer,
        reviewsReducer,
        booksReducer,
        currentUserReducer
    }
});

export default store;
