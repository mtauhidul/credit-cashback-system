import { createSlice } from '@reduxjs/toolkit';

const initialState = { allRows: [] };
export const allRowsSlice = createSlice({
  name: 'allRows',
  initialState,
  reducers: {
    setAllRows: (state, action) => {
      state.allRows = action.payload;
    },
  },
});

export const { setAllRows } = allRowsSlice.actions;

// Selector
export const selectAllRows = (state) => state.allRows.allRows;

export default allRowsSlice.reducer;
