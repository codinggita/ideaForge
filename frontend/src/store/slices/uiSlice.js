import { createSlice } from '@reduxjs/toolkit';

const storedTheme = localStorage.getItem('themePreference') || 'light';

const initialState = {
  theme: storedTheme,
  toast: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.theme = action.payload;
      localStorage.setItem('themePreference', action.payload);
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const { setTheme, showToast, clearToast } = uiSlice.actions;
export default uiSlice.reducer;
