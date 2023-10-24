import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// Define the initial state
const initialState = {
  darkMode: false,
};

export const toggleTheme = createAsyncThunk(
  'current_user_details/toggleTheme',
  async () => {
     const theme = await AsyncStorage.getItem('theme');
    if (theme === 'light') {
      await AsyncStorage.setItem("theme", 'dark')
    } else {
      await AsyncStorage.setItem("theme", 'light')
    }
  }
);

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
