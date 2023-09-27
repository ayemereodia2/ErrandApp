import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationPreferenceResponse } from '../../types';
import { _fetch } from '../axios/http';

export const notificationPreferences = createAsyncThunk<NotificationPreferenceResponse, void, { rejectValue: string }>(
  "preference",
  async () => {
  try {
    const _rs = await _fetch({
      method: "GET",
      _url: `/user/notification`,
    })

    const rs = await _rs.json()

    // if (rs.data.success === true) {
    //   return rs.data
    // }
    return rs.data
  } catch (e: any) {
     if (e.response.status === 400) {
      // return rejectWithValue(e.response.data.message)
     } 
    // return rejectWithValue(e.response.data.message)
  }
})

const initialState: NotificationPreferenceResponse = {
  error: "",
  loading: false,
  data: {
    user_id: "",
    email_notifications:false,
    sms_notifications:false,
    account_update_notifications:false,
    newsletter_notifications:false,
    promotions_notifications:false,
    misc_notifications:false,
    cat_errand_notifications:false,
    location_errand_notifications:false,
    bid_notifications:false,
    errand_status_notifications:false,
  }
}

const notificationPreferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(notificationPreferences.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(notificationPreferences.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = "";
      state.data = payload.data
    });
    builder.addCase(notificationPreferences.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const notificationPreferenceReducer = notificationPreferenceSlice.reducer