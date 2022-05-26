import { createSlice } from '@reduxjs/toolkit';

const initialState = { allUsers: [] };
export const allUsersSlice = createSlice({
  name: 'allUsers',
  initialState,
  reducers: {
    setAllUsers: (state, action) => {
      state.allUsers = action.payload;
    },
  },
});

export const { setAllUsers } = allUsersSlice.actions;

// Selector
export const selectAllUsers = (state) => state.allUsers.allUsers;

export default allUsersSlice.reducer;
