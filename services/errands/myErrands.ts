import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ErrandMarketResponse, MarketData } from '../../types';
import { _fetch } from '../axios/http';
import { errandDetails } from './errandDetails';

interface Props {
    setSearchedErrand?: any
    dispatch?: any
}

export const myErrandList = createAsyncThunk<ErrandMarketResponse, Props, { rejectValue: string }>(
    "myErrandList/get",
  async ({ setSearchedErrand, dispatch }: Props, { rejectWithValue }) => {
        try {
            const _rs = await _fetch({
                method: "GET",
                _url: `/user/errands`,
            })

          const rs = await _rs.json()

          console.log(">>>>errands", rs.data);
          

            if (rs.success === true) {
                // setSearchedErrand(rs.data?.sort(
                //     (a: MarketData, b: MarketData) =>
                //         new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
                // ))
                // dispatch(errandDetails({ errandId: rs?.data.data[0].id }))
                // return rs.data?.sort(
                //     (a: MarketData, b: MarketData) =>
                //         new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
                // )
              return rs
            }
        } catch (err) {
            if (err instanceof AxiosError) {
                if (err.response?.status === 400) {
                    // toast.error("Sorry, something went wrong");
                    return rejectWithValue(err.response.data.message)
                }
                return rejectWithValue(err.response?.data.message)
            }
        }
    })

const initialState: ErrandMarketResponse = {
    error: "",
    loading: true,
    data: []
}

const myErrandListSlice = createSlice({
    name: "/myErrand/get",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(myErrandList.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(myErrandList.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = "";
            state.data = payload.data
        });
        builder.addCase(myErrandList.pending, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });
    },

})

export const myErrandReducer = myErrandListSlice.reducer