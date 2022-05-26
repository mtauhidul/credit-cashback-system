import { configureStore } from '@reduxjs/toolkit';
import allRowsReducer from './slices/allRowsSlice';
import allUsersReducer from './slices/allUsersSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    allRows: allRowsReducer,
  },
});
