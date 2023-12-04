import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  userId: '',
  role: '',
}

const storedCurrentUser = localStorage.getItem('currentUser');
if (storedCurrentUser) {
  initialState = JSON.parse(storedCurrentUser);
}

const currentUserReducer = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.userId = action.payload.userId;
      state.role = action.payload.role;
    },
    removeCurrentUser: (state) => {
      state.userId = '';
      state.role = '';
    }
  }
});

export const { setCurrentUser, removeCurrentUser } = currentUserReducer.actions;

export default currentUserReducer.reducer;