import { createSlice } from '@reduxjs/toolkit';

// Initial State
const initialState = {
    refreshNeeded: false,
};

const refreshSlice = createSlice({
    name: 'refresh',
    initialState,
    reducers: {
        toggleRefresh: (state) => {
            state.refreshNeeded = !state.refreshNeeded;
        },
    },
});

export const { toggleRefresh } = refreshSlice.actions;

export default refreshSlice.reducer;
