import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ErrandMarketResponse, TimelinePayload } from '../../types';
import { _fetch } from '../axios/http';
import { errandDetails } from '../errands/errandDetails';
// import { getSubErrand } from '../errands/multi-users/single_sub_errand';

export const timelineAction = createAsyncThunk<ErrandMarketResponse, TimelinePayload, { rejectValue: string }>(
  "timeline/actions",
  async ({ message, errand_id, type, method, contentType, dispatch, Toast, sub_errand_id, setSubErrand, user_id}: TimelinePayload, { rejectWithValue }) => {
    try {
    const _rs = await _fetch({
      method,
      _url: type === "request" ? `/errand/timeline/${type}/${errand_id}` : `/errand/timeline`,
      body: {errand_id, message, type: contentType, sub_errand_id}
    })
      
      const rs = await _rs.json()

    dispatch(errandDetails({ errandId: errand_id }))
    // dispatch(myErrandList({}))
        // dispatch(getSubErrand({setSubErrand, errand_id: errand_id, runner_id: user_id}))
      return rs.data
  } catch (e: any) {
    if (e.response.status === 400) {
      if (e.response.data.success === false) {
        Toast.show({
           type: 'error',
          show1: e.response.data.message,
         
        })

      }
    }
  }
})

const initialState: ErrandMarketResponse= {
  error: "",
  loading: false,
  data: []
}

const timelineActionSlice = createSlice({
  name: "timeline/actions",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(timelineAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(timelineAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = "";
      state.data = payload?.data
    });
    builder.addCase(timelineAction.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const timelineActionReducer = timelineActionSlice.reducer