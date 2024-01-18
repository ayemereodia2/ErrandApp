import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { _fetch } from '../axios/http';

export const getCategoryIntersts = createAsyncThunk<[], void, { rejectValue: string }>(
    "category",
  async (_, { rejectWithValue }) => {
        try {
            const _rs = await _fetch({
                method: "GET",
                _url: `/user/category-interest`,
            })

          const rs = await _rs.json()
          return rs.data
            
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

const initialState: any = {
    error: "",
    loading: true,
    data: []
}

const categoryInterestSlice = createSlice({
    name: "/categoryInterests/get",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getCategoryIntersts.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(getCategoryIntersts.fulfilled, (state, { payload }) => {
            state.loading = false;
            state.error = "";
            state.data = payload
        });
        builder.addCase(getCategoryIntersts.pending, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });
    },

})

export const getCategoryInterstsReducer = categoryInterestSlice.reducer