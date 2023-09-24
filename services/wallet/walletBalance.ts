import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { WalletPayload, WalletResponse } from '../../types';
import { _fetch } from '../axios/http';

export const walletAction = createAsyncThunk<WalletResponse, WalletPayload, { rejectValue: string }>(
  "wallet/actions",
  async ({ type, request, toast, amount, dispatch}: WalletPayload, { rejectWithValue }) => {
  try {
    const _rs = await _fetch({
      method: request === 'transact' ? "POST" : "GET",
      _url: request === 'transact' ? `/transact` : `/user/wallet`,
      // body: request === 'transact' ? {type, amount} : {}
    })

    

    const rs = await _rs.json()
    if (rs.success === true) {   

      if (request === "transact") {
        toast({
          position: 'top-right',
          title: 'Success',
          description: 'Wallet was Funded Successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        dispatch(walletAction({request:"wallet"}))
        // dispatch(toggleFundWalletModal())
      }
        return rs
    }
  } catch (e: any) {
    if (e.response.status === 400) {
      if (e.response.data.success === false) {
         toast({
          position: 'top-right',
          title: 'Error',
          description: e.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
})

const initialState: WalletResponse= {
  error: "",
  loading: false,
  success: false,
  data: {
    balance: "",
    escrow: 0,
    transactions: [],
    incoming: 0,
    escrow_breakdown: []
  }
}

const walletActionSlice = createSlice({
  name: "wallet/actions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(walletAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(walletAction.fulfilled, (state, {payload}) => {
      // console.log(">>>>>>>a", action.payload)
      state.success = true
      state.loading = false;
      state.error = "";
      state.data = payload?.data
    });
    builder.addCase(walletAction.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const walletActionReducer = walletActionSlice.reducer