import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SingleSubErrand, SingleSubErrandResponse, SubErrandList } from '../../types';
import { _fetch } from '../axios/http';

interface Props {
  errand_id?: string
  runner_id?: string
  setSubErrand?: any
}

export const getSubErrand = createAsyncThunk<SingleSubErrandResponse, Props, { rejectValue: string }>(
  "/suberrand/get",
  async ({errand_id, runner_id, setSubErrand}: Props, { rejectWithValue }) => {
    try {
    // console.log(">>>>>subErrand", errand_id, runner_id, `/errand/${errand_id}/sub-errand/${runner_id}`);
    
    const _rs = await _fetch({
      method: "GET",
      _url: `/errand/${errand_id}/sub-errand/${runner_id}`,
    })
      
      
      const rs = await _rs.json();

      console.log(">>>>>subErrand", rs);
      return rs

  
    // if (rs.success === true) {
    //   setSubErrand(rs.data.data)
    //   return rs.data
    // }
  } catch (e: any) {
     if (e.response.status === 400) {
      return rejectWithValue(e.response.data.message)
     } 
    return rejectWithValue(e.response.data.message)
  }
})

const initialState: SingleSubErrandResponse = {
  error: "",
  loading: false,
  data: {
    id: '',
      original_errand_id: '',
      sender_id: '',
      runner_id: '',
      amount: 0,
      timeline: {
        id: '',
        errand_id: '',
        updates: [],
        created_at: '',
        updated_at: '',
      },
      status: '',
      cancellation_reason: '',
      created_at: '',
      updated_at: '',
  }
}

const subErrandSlice = createSlice({
  name: "/suberrand/get",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSubErrand.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getSubErrand.fulfilled, (state, {payload}) => {
      // console.log(">>>>>>>a", action.payload)
      state.loading = false;
      state.error = "";
      state.data = payload.data
    });
    builder.addCase(getSubErrand.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const subErrandReducer = subErrandSlice.reducer