import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CategoriesListResponse } from '../../types';
import { _fetch } from '../axios/http';

export const categoriesList = createAsyncThunk<CategoriesListResponse, void, { rejectValue: string }>(
  "categories/get",
  async (_, { rejectWithValue }) => {
  try {
    const _rs = await _fetch({
      method: "GET",
      _url: `/errand/categories?limit=20`,
    });

    const rs = await _rs.json()

    // console.log(">>>>>>rss cat", rs);
    

    if (rs.success === true) {
      return rs
    }
  } catch (e: any) {
     if (e.response.status === 400) {
      return rejectWithValue(e.response.data.message)
     } 
    return rejectWithValue(e.response.data.message)
  }
})

const initialState: CategoriesListResponse= {
  error: "",
  loading: false,
  data: []
}

const categoriesListSlice = createSlice({
  name: "/categories/errand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(categoriesList.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(categoriesList.fulfilled, (state, {payload}) => {
      // console.log(">>>>>>>a", action.payload)
      state.loading = false;
      state.error = "";
      state.data = payload.data
    });
    builder.addCase(categoriesList.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const categoriesListReducer = categoriesListSlice.reducer