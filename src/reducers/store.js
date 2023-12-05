import {configureStore} from "@reduxjs/toolkit";

import currentUser from './currentUserReducer.js';
import searchReducer from "./searchReducer.js";
import currentBooksReducer from "./currentBooksReducer";

const store = configureStore({
    reducer: {
        currentUser,
        currentBooks: currentBooksReducer,
        search: searchReducer

    }
});

export default store;
