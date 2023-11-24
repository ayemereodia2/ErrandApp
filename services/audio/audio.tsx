// audioSlice.js
import { createSlice } from '@reduxjs/toolkit';

const audioSlice = createSlice({
  name: 'audio',
  initialState: {
    recordedAudioURI: '', // Initial state for the recorded audio URI
  },
  reducers: {
    setRecordedAudioURI: (state, action) => {
      state.recordedAudioURI = action.payload;
    },
    clearRecordedAudioURI: (state) => {
      state.recordedAudioURI = '';
    },
  },
});

export const { setRecordedAudioURI, clearRecordedAudioURI } = audioSlice.actions;
export const selectRecordedAudioURI = (state) => state.audio.recordedAudioURI;
export default audioSlice.reducer;
