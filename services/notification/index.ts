import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { NotificationPreferenceResponse, NotificationPreferences, NotificationProps, NotificationResponse, Notifications } from "../../types";
import { _fetch } from "../axios/http";



export const getNotifications = createAsyncThunk<NotificationResponse[], NotificationProps, { rejectValue: string }>(
  "/getNotifications",
  async ({ userId }: NotificationProps, thunkAPI) => {
   
    try {
       const _rs = await _fetch({
        method: "GET",
        _url: `/internal/notification/find/${userId}`,
       })
      
      const rs =  await _rs.json()

      return rs.data
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message)
    }
  }
)

export const getNotificationPreferences = createAsyncThunk<NotificationPreferenceResponse, void, { rejectValue: string }>(
  "preference",
  async () => {
  try {
    const _rs = await _fetch({
      method: "GET",
      _url: `/user/notification`,
    })

    return await _rs.json()
  } catch (e: any) {
     if (e.response.status === 400) {
      // return rejectWithValue(e.response.data.message)
     } 
    // return rejectWithValue(e.response.data.message)
  }
  })

  export const updateNotificationPrefeference = createAsyncThunk<NotificationPreferenceResponse, NotificationPreferences, { rejectValue: string }>(
  "updatePreference",
  async ({ dispatch, Toast, ...data }: NotificationPreferences) => {
  try {
    const _rs = await _fetch({
      method: "PUT",
      _url: `/user/notification`,
      body: data
    })
    const rs = await _rs.json()
    dispatch(getNotificationPreferences())
    
    Toast.show({
       type: 'success',
        text1: 'Update Successful',
    })
     return rs
  } catch (e: any) {
     if (e.response.status === 400) {
     } 
  }
    })

const initialState: Notifications = {
  error: "",
  loading: false,
  notifications: [],
  preference: {
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
      errand_status_notifications: false,
    }
  }
  
}

  
const notificationSlice = createSlice({
  name: "notificaitons",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getNotifications.rejected, (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(getNotifications.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.notifications = payload
    });
    builder.addCase(getNotifications.pending, (state, {payload}) => {
      state.loading = true;
      state.error = payload;
    });
     builder.addCase(getNotificationPreferences.rejected, (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(getNotificationPreferences.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.preference = payload
    });
    builder.addCase(getNotificationPreferences.pending, (state, {payload}) => {
      state.loading = true;
      state.error = payload;
    });
     builder.addCase(updateNotificationPrefeference.rejected, (state, {payload}) => {
      state.error = payload;
      state.loading = false;
    });
    builder.addCase(updateNotificationPrefeference.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.preference = payload
    });
    builder.addCase(updateNotificationPrefeference.pending, (state, {payload}) => {
      state.loading = true;
      state.error = payload;
    });
  }
})

export default notificationSlice.reducer;

  