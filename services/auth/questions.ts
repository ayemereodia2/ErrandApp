import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { deleteCookie } from 'cookies-next';
import { ILogin } from '../../types';
import { http } from '../axios/http';

export const getQuestions = createAsyncThunk("/users/security-questions", async ({router, ...rest}: ILogin, {rejectWithValue}) => {
  try {
    const rs = await http.post(`${process.env.NEXT_PUBLIC_BASE_URL}/users/security-questions`, rest)

    if (rs.data.statusCode === '0000') {
      // setCookie so that I can use it for serverside prop 
      return rs.data
    }

    if (rs.data.statusCode === "9000") {
      return rejectWithValue(rs.data.statusCode)
    }
  } catch (e) {
    console.log(">>>>>>e", e)
    return rejectWithValue(e)
  }
})


interface initState {
  error: any,
  loading: boolean,

}


const initialState: initState = {
  error: "",
  loading: false,
}

const questionSlice = createSlice({
  name: "/users/login",
  initialState,
  reducers: {
    logout: (state) => {
        localStorage.clear();
        deleteCookie('accessToken');
        state.loading = false;
        state.error = ""
        window.location.pathname = "/"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(getQuestions.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export default questionSlice.reducer