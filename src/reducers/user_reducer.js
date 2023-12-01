import { createSlice } from '@reduxjs/toolkit';

// Initial state of the users slice
const initialState = {
    users: [],

    user: { name: '', email: '', role: '', id: '' },
};

// Creating the users slice
const usersReducer = createSlice({
    name: 'users',
    initialState,
    reducers: {
        // Action to set the array of users
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        
        // Action to add a new user
        addUser: (state, action) => {
            state.users = [action.payload, ...state.users];
        },

        // Action to delete a user
        deleteUser: (state, action) => {
            state.users = state.users.filter(
                (user) => user.id !== action.payload
            );
        },

        // Action to update a user's details
        updateUser: (state, action) => {
            state.users = state.users.map((user) => {
                if (user.id === action.payload.id) {
                    return action.payload;
                } else {
                    return user;
                }
            });
        },

        // Action to set the current user for detailed view or editing
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

// Exporting the actions and the reducer
export const {
    addUser, deleteUser,
    updateUser, setUser, setUsers
} = usersReducer.actions;

export default usersReducer.reducer;
