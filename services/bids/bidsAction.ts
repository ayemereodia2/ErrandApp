import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BidActionPayload, ErrandMarketResponse } from '../../types';
import { _fetch } from '../axios/http';
import { errandDetails } from '../errands/errandDetails';
import { myErrandList } from '../errands/myErrands';

    
export const bidAction = createAsyncThunk<ErrandMarketResponse, BidActionPayload, { rejectValue: string }>(
  "bid/actions",
  async ({amount, response, description, runner_id,type, bid_id, method, errand_id,  dispatch, source, Toast, toggleNegotiateModal, toggleSuccessDialogue, toggleAcceptModal, toggleRejectErrandModal }: BidActionPayload, { rejectWithValue }) => {
    
  try {
    const _rs = await _fetch({
      method,
      _url: response ? `/errand/${errand_id}/bid/${bid_id}/${type}`: `/errand/${errand_id}/bid/${bid_id}`,
      body: {runner_id, response, amount, description, source}
    })

    const rs = await _rs.json()

    if (rs.success === true) {
      dispatch(myErrandList({}))
      dispatch(errandDetails({ errandId: errand_id }))

      if (response === 'accept') {
        toggleAcceptModal && toggleAcceptModal(false)
        dispatch(errandDetails({ errandId: errand_id }))
        dispatch(myErrandList({}))
         Toast.show({
          type: 'success',
          text1: rs.message,
        });
      }
      if (response === 'reject') {
        toggleSuccessDialogue && toggleSuccessDialogue(true)
        dispatch(errandDetails({ errandId: errand_id }))
        dispatch(myErrandList({}))
         Toast.show({
          type: 'success',
          text1: rs.message,
        });
      }

      toggleNegotiateModal && toggleNegotiateModal(false) 
      toggleSuccessDialogue && toggleSuccessDialogue(true)
      dispatch(errandDetails({ errandId: errand_id }))
      dispatch(myErrandList({}))

       Toast.show({
          type: 'success',
          text1: "Your negotiation was successful",
       });
      
        return rs.data
    }
  } catch (e: any) {
    if (e.response.status === 400) {
      if (e.response.data.success === false) {
         Toast.show({
          type: 'error',
          text1: e.response.data.message,
        });
      }
    }
  }
})

const initialState: ErrandMarketResponse= {
  error: "",
  loading: false,
  data: []
}

const bidActionSlice = createSlice({
  name: "bid/actions",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(bidAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(bidAction.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = "";
      state.data = payload.data
    });
    builder.addCase(bidAction.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const bidActionReducer = bidActionSlice.reducer