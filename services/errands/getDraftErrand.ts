import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DraftErrandResponse } from "../../types";
import { _fetch } from "../axios/http";

export const getDraftErrand = createAsyncThunk<
  DraftErrandResponse,
  void,
  { rejectValue: string }
  >
  ("/errand/draftErrand", async (_, { rejectWithValue }) => {
  try {
    const _rs = await _fetch({
      method: "GET",
      _url: `/errand/draft`,
    });

    const rs = await _rs.json()

    // console.log(">>>>>_draft", rs.data.id);

    if (rs.success === true) {
      await AsyncStorage.setItem('errandId', rs.data.id)
      // localStorage.setItem("errandId", rs.data.id);
      return rs.data;
    }
    return rs
  } catch (e: any) {}
});

const initialState: DraftErrandResponse = {
  error: "",
  loading: false,
  data: {},
};

const draftErrandSlice = createSlice({
  name: "/auth/draftErrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDraftErrand.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(getDraftErrand.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload?.data;
    });
    builder.addCase(getDraftErrand.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default draftErrandSlice.reducer;
