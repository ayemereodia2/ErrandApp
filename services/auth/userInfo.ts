import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { UserDetailsResponse } from '../../types';
import { _fetch } from '../axios/http';
// import { http } from '../axios/http';

interface UserProps {
  user_id: string
}

export const userDetails = createAsyncThunk<UserDetailsResponse, UserProps, { rejectValue: string }>(
  "user_details/get",
  async ({  user_id}: UserProps, { rejectWithValue }) => {
    
    try {
        const _rs = await _fetch({
            method: "GET",
            _url:  `/user/${user_id}`,
        })
      
      const rs = await _rs.json()

      // console.log(">>>rs", rs);
      
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
    preferred_theme: 'light'
    
  }
}

const userDetailsSlice = createSlice({
  name: "user_details/get",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userDetails.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(userDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload.data
    });
    builder.addCase(userDetails.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
})

export const userDetailsReducer = userDetailsSlice.reducer
