import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NotificationPreferenceResponse, NotificationPreferences } from '../../types';
import { _fetch } from '../axios/http';
import { notificationPreferences } from './preferences';

export const updateNotificationPrefeference = createAsyncThunk<NotificationPreferenceResponse, NotificationPreferences, { rejectValue: string }>(
  "updatePreference",
  async ({ dispatch, Toast, ...data }: NotificationPreferences) => {
  try {
    const _rs = await _fetch({
      method: "PUT",
      _url: `/user/notification`,
      body:data
    })
    const rs = await _rs.json()
    dispatch(notificationPreferences()),
    Toast.show({
       type: 'success',
        text1: 'Update Successful',
    })
     return rs  //rs.data
  } catch (e: any) {
     if (e.response.status === 400) {
     } 
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

const updateNotificationPreferenceSlice = createSlice({
  name: "preference",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateNotificationPrefeference.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(updateNotificationPrefeference.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = "";
      state.data = payload.data
    });
    builder.addCase(updateNotificationPrefeference.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const updateNotificationPreferenceReducer = updateNotificationPreferenceSlice.reducer