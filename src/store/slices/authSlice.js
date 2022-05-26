import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  user_name: '',
  email: '',
  id: '',
  isAuthenticated: false,
  points: 0,
  feedbacks: [],
  rows: [],
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setId: (state, action) => {
      state.id = action.payload;
    },
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setPoints: (state, action) => {
      state.points = action.payload;
    },
    setFeedbacks: (state, action) => {
      state.feedbacks = action.payload;
    },
    setRows: (state, action) => {
      state.rows = action.payload;
    },
  },
});

export const {
  setName,
  setUserName,
  setEmail,
  setId,
  setIsAuthenticated,
  setPoints,
  setFeedbacks,
  setRows,
} = authSlice.actions;

// Selectors
export const selectName = (state) => state.auth.name;
export const selectUserName = (state) => state.auth.userName;
export const selectEmail = (state) => state.auth.email;
export const selectId = (state) => state.auth.id;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectPoints = (state) => state.auth.points;
export const selectFeedbacks = (state) => state.auth.feedbacks;
export const selectRows = (state) => state.auth.rows;

export default authSlice.reducer;
