import { configureStore } from "@reduxjs/toolkit";

import currentUser from './currentUserReducer.js';

const store = configureStore({
    reducer: {
      currentUser,

    }
});

export default store;
