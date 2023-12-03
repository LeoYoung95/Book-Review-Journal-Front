import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  role: '',
}

const currentUserReducer = createSlice({
  name: 'currentUser',
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    removeCurrentUser: (state) => {
      state.currentUser = { userId: '', role: ''};
    }
  }
});

export const { setCurentUser, removeCurrentUser } = currentUserReducer.actions;

export default currentUserReducer.reducer;