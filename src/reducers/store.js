import {configureStore} from "@reduxjs/toolkit";

import currentUser from './currentUserReducer.js';
import searchReducer from "./searchReducer.js";

const store = configureStore({
    reducer: {
        currentUser,
        search: searchReducer
    }
});

export default store;
