import { createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  darkMode: false,
};

// Create a slice
const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  
});

// Export the action creator
export const { toggleDarkMode } = darkModeSlice.actions;

// Export the reducer
export default darkModeSlice.reducer;
