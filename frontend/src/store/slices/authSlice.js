import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: Boolean(localStorage.getItem('userInfo')),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
