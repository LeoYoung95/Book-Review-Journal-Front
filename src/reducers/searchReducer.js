import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
let initialState = {
    searchInput: ''
}

// Check if there is any stored search input in local storage
const storedSearchInput = localStorage.getItem('searchInput');
if (storedSearchInput) {
    initialState.searchInput = storedSearchInput;
}

const searchReducer = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchInput: (state, action) => {
            state.searchInput = action.payload;
            // Optionally save to local storage
            localStorage.setItem('searchInput', action.payload);
        },
        clearSearchInput: (state) => {
            state.searchInput = '';
            // Clear from local storage
            localStorage.removeItem('searchInput');
        }
    }
});

// Export the actions and reducer
export const { setSearchInput, clearSearchInput } = searchReducer.actions;
export default searchReducer.reducer;
