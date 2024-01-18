// contactUsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ContactData } from '../../types';
import { _fetch } from '../axios/http';


// Define your async action (contactUs) and initial state here
export const contactUs = createAsyncThunk<void, ContactData, { rejectValue: string }>(
  "/users/send-enquiry",
  async (data: ContactData, { rejectWithValue }) => {
    try {
      // Make an API request to submit the contact form data
      const response = await _fetch({
        method: 'POST',
        _url:`/users/send-enquiry`,
        body: data
      });

      const result = await response.json();

      if (response.ok) {
        // Handle success (e.g., show success message)
      } else {
        return rejectWithValue(result.error);
      }
    } catch (error) {
      return rejectWithValue('An error occurred while submitting the message');
    }
  }
);

// Define your initial state and reducer for the contactUs slice
const contactUsSlice = createSlice({
  name: 'contactUs',
  initialState: {
    loading: false,
    error: '',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(contactUs.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(contactUs.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'An error occurred while submitting the message';
    });
    builder.addCase(contactUs.fulfilled, (state) => {
      state.loading = false;
      state.error = '';
    });
  },
});

export default contactUsSlice.reducer;
