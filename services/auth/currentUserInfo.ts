import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDetailsResponse } from '../../types';
import { _fetch } from '../axios/http';
// import { http } from '../axios/http';

interface UserProps {
  user_id: string
}

export const currentUserDetails = createAsyncThunk<UserDetailsResponse, UserProps, { rejectValue: string }>(
  "current_user_details/get",
  async ({  user_id}: UserProps, { rejectWithValue }) => {
    
    try {
        const _rs = await _fetch({
            method: "GET",
            _url:  `/user/${user_id}`,
        })
      
      
      const rs = await _rs.json()
        if (rs.success === true) {
        return rs
        }
        } catch (e: any) {
            if (e.response.status === 400) {
            return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.response.data.message)
        }
})

const initialState: UserDetailsResponse = {
  error: "",
  loading: true,
  backgroundTheme: '',
  textTheme: "",
  landingPageTheme: '',
  data: {
    id: "",
    first_name: "",
    last_name: "",
    client: "",
    created_by: "",
    token: "",
    account_numbers: "",
    is_admin: false,
    phone_number: "",
    verification: 0,
    rating: 0,
    errands_completed: 0,
    is_suspended: false,
    created_at: "",
    updated_at: "",
    referral_code: '',
    email: '',
    occupation: '',
    errands_cancelled: 0,
    image: '',
    bio: '',
    dob: '',
    has_verified_address: false,
    has_verified_email: false,
    has_verified_phone: false,
     has_insurance: false,
    insurance_amount: 0,
    referral_info: "",
    profile_picture: "",
    preferred_theme: 'light',
    has_transaction_pin: false,
    errands_posted: 0,
    referred_by: ''
  }
}

const currentUserDetailsSlice = createSlice({
  name: "current_user_details/get",
  initialState,
  reducers: {
     toggleLightTheme: (state) => {
      state.data.preferred_theme = 'light'
    },
    toggleDarkTheme: (state) => {
      state.data.preferred_theme = 'dark'
    },
  },
  extraReducers: (builder) => {
    builder.addCase(currentUserDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(currentUserDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload.data
      state.backgroundTheme = state.data.preferred_theme === 'light' ? '#0c1730' : '#e9ebf2'
      state.textTheme = state.data.preferred_theme === 'light' ? 'white' : 'black'
      state.landingPageTheme = state.data.preferred_theme === 'light' ? '#d2d8e4' : 'grey'
      
      
    });
    builder.addCase(currentUserDetails.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
})

export const { toggleDarkTheme, toggleLightTheme } = currentUserDetailsSlice.actions;

export const currentUserDetailsReducer = currentUserDetailsSlice.reducer
