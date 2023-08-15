import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { GetSecurityQuestionRequest, GetSecurityQuestionState, SecurityQuestionResponse } from '../../types';
import { _fetch } from '../axios/http';

export const securityQuesitions = createAsyncThunk<SecurityQuestionResponse, GetSecurityQuestionRequest, { rejectValue: string }>(
  "securityQuestions/get",
  async ({ phone_number, navigation }: GetSecurityQuestionRequest, { rejectWithValue }) => {
    
  try {
    const url = `/security-question?phone_number=${phone_number}`

    const _rs = await _fetch({ _url: url, method: 'GET' })
    const rs =  await _rs.json()

    

    if (rs.data.success === true) {
      localStorage.setItem("phone", phone_number)
      localStorage.setItem("question", rs.data.data.question)
      return rs.data.data
    }
  } catch (e: any) {
    console.log('eeee', e.response.data.message)
    if (e.response.status === 400) {
      // toast.error("Sorry, we are unable to get your security question at this time, please try again later. If this persist please contact our customer care center");
      // navigate("/auth/password-recovery-otp")
      return rejectWithValue(e.response.data.message)
     }
    return rejectWithValue(e.response.data.message)
  }
})

const initialState: GetSecurityQuestionState= {
  error: "",
  loading: false,
  data: {question:""}
}

const securityQuestionSlice = createSlice({
  name: "/auth/security-questions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(securityQuesitions.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(securityQuesitions.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload.data
    });
    builder.addCase(securityQuesitions.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const securityQuestionReducer = securityQuestionSlice.reducer
