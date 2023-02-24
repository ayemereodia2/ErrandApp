import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { deleteCookie } from 'cookies-next';
// import toast from 'react-hot-toast';
import { ILogin } from '../../types';

export const loginUser = createAsyncThunk("/users/sign-in", async ({router, ...rest}: ILogin, {rejectWithValue}) => {
  try {
    console.log(">>>>>>>rest", rest)
    const rs = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/user/sign-in`, rest)
  
    if (rs.status === 200) {
      localStorage?.setItem("accessToken", rs.data.data.token)
      localStorage?.setItem("refreshToken", rs.data.data.refreshToken)
      // toast.success('Login Successful')
      router.push('/profile')
    }
  } catch (e: any) {
     if (e.response.status === 404) {
      // toast.error("Invalid Login Credentials")
      return 'Invalid Login Credentials'
    }
    return rejectWithValue(e.response.message)
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

const loginSlice = createSlice({
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
    builder.addCase(loginUser.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const { logout } = loginSlice.actions
export default loginSlice.reducer