import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateErrandRequest, CreateErrandResponse, DraftErrandResponse } from '../../types';
import { _fetch } from '../axios/http';
import { errandMarketList } from './market';

export const createErrand = createAsyncThunk<CreateErrandResponse, CreateErrandRequest, { rejectValue: string }>(
  "/errand/createErrand",
  async ({navigation, Toast, dispatch, setSuccessDialogue, ...data}: CreateErrandRequest, { rejectWithValue }) => {
    try {
      
      const errandId = await AsyncStorage.getItem('errandId')
    
      const _rs = await _fetch({
        method: "POST",
        _url: `/errand/${errandId}`,
        body: data
      })
      const rs = await _rs.json()

       if (rs.success === false)  {
        Toast.show({
          type: 'error',
          text1: rs.message
        })
      }

      if (rs.success === true) {
        dispatch(errandMarketList({}))
        navigation.navigate("MyErrands")
         Toast.show({
          type: 'success',
          text1: "Errand Created successfully",
        })
        return rs.data
      }
     
      return rs.data
    } catch (e: any) {
      
      if (e.response.status === 503) {
        Toast.show({
         type: 'error',
          text1: 'Sorry, something went wrong'
        })
      return rejectWithValue(e.response.data.message)
     }
    }
})

const initialState: DraftErrandResponse = {
  error: "",
  loading: false,
  message: "",
  success: false
}

const createErrandSlice = createSlice({
  name: "/errand/createErrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createErrand.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.success = false

    });
    builder.addCase(createErrand.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = action.payload?.message
      state.success = true
    });
    builder.addCase(createErrand.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
      state.success = false

    });
  },

})

export default createErrandSlice.reducer
