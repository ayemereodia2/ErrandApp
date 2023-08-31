
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import toast from 'react-hot-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCookie } from 'cookies-next';
import Toast from 'react-native-toast-message';
import { ILogin } from '../../types';

export const loginUser = createAsyncThunk<void, ILogin, { rejectValue: string }>("/users/sign-in", async ({ navigation, ...rest }: ILogin, { rejectWithValue }) => {
  
  try {

    const rs = await fetch(`https://errand-app.herokuapp.com/v1/user/sign-in`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    })

    const _rs = await rs.json()

    // console.log(">>>>>>_rs", _rs.data.access_token);
    
    if (_rs.success === true) {
      await AsyncStorage.setItem('accessToken', _rs.data.access_token )
      await AsyncStorage.setItem('refreshToken', _rs.data.refresh_token)
      await AsyncStorage.setItem('user_id', _rs.data.id)

      // setCookie("access_token", rs.data.data.access_token)
      // localStorage.setItem('user_id', rs.data.data.id)
      // localStorage.setItem("accessToken", rs.data.data.access_token)
      // localStorage.setItem("refreshToken", rs.data.data.refresh_token)
      // localStorage?.setItem("last_name", rs.data.data.last_name)
      // localStorage?.setItem("first_name", rs.data.data.first_name)

      // setSuccess(true)

      // toast.success('Login Successful')
       Toast.show({
        type: 'success',
        text1: 'Login Successful',
      });
      navigation.navigate('Main')
    }

  } catch (e: any) {
     if (e.response.status === 400) {
      // toast.error("Invalid Login Credentials")
      return rejectWithValue(e.response.data.message)
     }
    if (e.response.status === 404) {
      // console.log(">>>>>>e,respomse", e.response)
      return rejectWithValue(e.response.data.message)
    }
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
        deleteCookie('access_token');
        state.loading = false;
        state.error = ""
        window.location.pathname = "/"
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(">>>>rejecgt", state.error)
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