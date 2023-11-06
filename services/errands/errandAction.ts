import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DraftErrandResponse } from "../../types";
import { _fetch } from "../axios/http";
import { errandDetails } from "./errandDetails";
import { myErrandList } from "./myErrands";


interface ErrandActionProps {
  errandId: string
  type: string
  reason?: string
  source?: string
  method: string
  setOpenReasonModal?: any
  dispatch: Function
  Toast?: any
  sub_errand_id?: string,
  navigation?: any
}

export const errandAction = createAsyncThunk<
  DraftErrandResponse,
  ErrandActionProps,
  { rejectValue: string }
  >
  ("/errand/action", async ({ errandId, method, type, dispatch, Toast, navigation, ...data }: ErrandActionProps, { rejectWithValue }) => {
    
  try {
    const _rs = await _fetch({
      method,
      _url: `/errand/${errandId}/${type}`,
      body: data
    });

    const rs = await _rs.json()

    if (rs.success === true) {
      if (type === "complete") {
        navigation.navigate("Errands")
        dispatch(errandDetails({ errandId }))
        dispatch(myErrandList({}))
      }
      dispatch(errandDetails({ errandId }))
      dispatch(myErrandList({}))
      // setOpenReasonModal(false)
     
      Toast.show({
          type: 'success',
          text1: 'Errand Cancelled successfully',
        });
      return rs.data.data;
    }
    return rs.data;
  } catch (e: any) {}
});

const initialState: DraftErrandResponse = {
  error: "",
  loading: false,
  data: {},
};

const errandActionSlice = createSlice({
  name: "/errand/action",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(errandAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(errandAction.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload?.data;
    });
    builder.addCase(errandAction.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
});

export default errandActionSlice.reducer;
