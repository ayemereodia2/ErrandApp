import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { CustomToast } from '../../components/CustomToast';
import { CommonState, PostBidRequest } from '../../types';
import { _fetch } from '../axios/http';
import { market } from './market';
// import { toggleErrrandDetailsModal, togglePlaceBid } from '../modals';

export const postBid = createAsyncThunk<any, PostBidRequest, { rejectValue: string }>(
  "/bids/postBid",
  async ({ errand_id, Toast, dispatch, navigation, ...data }: PostBidRequest, { rejectWithValue }) => {
    try {
      const _rs = await _fetch({
      method: "POST",
      _url: `/errand/${errand_id}/bid`,
      body: data
      })

      const rs = await _rs.json()
      if (rs.success === false) {
         Toast.show({
          type: 'error',
          text1: rs.message
        });
      }

      if (rs.success === true) {
         Toast.show({
          type: 'success',
          text1: 'Bid was placed Successfully',
        });
        dispatch(market({}))
        navigation.navigate('Main')
      }
      return rs.data
    } catch (e: any) {
      if (e.response.status === 400) {
         if (e.response.data.success === false) {
          
         }
       
      
      return rejectWithValue(e.response.data.message)
     }
    }
})

const initialState: CommonState = {
  error: "",
  loading: false,
  message: "",
  success: false
}

const postBidSlice = createSlice({
  name: "/bids/postBid",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postBid.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(postBid.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = action.payload.message
    });
    builder.addCase(postBid.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export default postBidSlice.reducer
