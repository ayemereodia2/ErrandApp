import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { _fetch } from "../axios/http"

export const getAccounts = createAsyncThunk("get-accounts", async(_, {rejectWithValue}) => {
    try {
      const rs = await _fetch({ method: "GET", _url: '/user/bank-account' })
      const res = await rs.json()
      
      return res.data
      
    } catch (err) {
        rejectWithValue(err)
    }
})

interface AccountProps {
  error: string
  loading: boolean
  data: {
    bank_code: string
    account_number: string
    account_name: string
    id: string
  }[]
}

const initialState: AccountProps = {
  error: "",
  loading: false,
    data: []
}

const bankAccountSlice = createSlice({
    name: "/get-account",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(getAccounts.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload as string;
          });
      builder.addCase(getAccounts.fulfilled, (state, { payload }) => {
            state.data = payload
            state.error = "";
            state.loading = false
          });
      builder.addCase(getAccounts.pending, (state, action) => {
            state.loading = true
            state.error = action.payload as unknown as string;
          });
    }
})

export const getAccountsReducer = bankAccountSlice.reducer