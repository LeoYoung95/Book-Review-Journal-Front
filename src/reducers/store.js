import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "./usersReducer.js";
import reviewsReducer from "./reviewsReducer.js";
import booksReducer from "./booksReducer.js";


const store = configureStore({
    reducer: {
        usersReducer,
        reviewsReducer,
        booksReducer,
    }
});

export default store;
