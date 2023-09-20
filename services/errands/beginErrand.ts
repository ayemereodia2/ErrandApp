import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CreateErrandResponse, DraftErrandResponse, StartErrandProps } from '../../types';
import { _fetch } from '../axios/http';
import { errandDetails } from './errandDetails';
import { myErrandList } from './myErrands';

export const startErrand = createAsyncThunk<CreateErrandResponse, StartErrandProps, { rejectValue: string }>(
  "/errand/createErrand",
  async ({dispatch, Toast, toggleBeginErrandModal, toggleSuccessDialogue, ...data}: StartErrandProps, { rejectWithValue }) => {
    try {
      const _rs = await _fetch({
      method: "POST",
      _url: `/errand/start`,
      body: data
      })

      const rs = await _rs.json()
      if (rs.success === true) {
        dispatch(errandDetails({ errandId: data.errand_id }))
        toggleBeginErrandModal && toggleBeginErrandModal(false)
        toggleSuccessDialogue && toggleSuccessDialogue(true)
      
        dispatch(myErrandList({}))
         Toast({
          position: 'top-right',
          title: 'Successful',
          description: "You have successfully started this errand",
          status: 'success',
          duration: 5000,
          isClosable: true,
        })
        return rs.data
      }
      return rs.data
    } catch (e: any) {
      if (e.response.status === 400) {
      Toast({
          position: 'top-right',
          title: 'Error',
          description: e.response.data.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      return rejectWithValue(e.response.data.message)
      }
      if (e.response.status === 503) {
        Toast({
          position: 'top-right',
          title: 'Error',
          description: 'Sorry, please something went wrong',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      return rejectWithValue(e.response.data.message)
     }
    }
})

const initialState: DraftErrandResponse = {
  error: "",
  loading: false,
  message:""
}

const startErrandSlice = createSlice({
  name: "/errand/start",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(startErrand.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(startErrand.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.message = action.payload?.message
    });
    builder.addCase(startErrand.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const startErrandReducer = startErrandSlice.reducer
