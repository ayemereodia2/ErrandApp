import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { ICreateAccount } from '../../types';
import { _fetch } from '../axios/http';
// import toast from 'react-hot-toast';

export const createAccount = createAsyncThunk("/user/createAccount", async ({navigation, ...data}: ICreateAccount, {rejectWithValue}) => {
  try {
    // console.log(">>>>>>>newDATA", newData)
    const _rs = await _fetch({ _url: `/user/sign-up`, method: "POST", body: data })
    const rs = await _rs.json();

    console.log("<<<<<_rs",rs);
    

    if (rs.success === true) {
       await AsyncStorage.setItem('accessToken', rs.data.access_token )
      await AsyncStorage.setItem('refreshToken', rs.data.refresh_token )
          // setCookie("access_token", rs.data.data.access_token)
      Toast.show({
        type: 'success',
        text1: rs.message,
      });
      navigation.navigate("SecurityQuestions")
    }
    if (rs.success === false) {
        Toast.show({
          type: 'error',
          text1: rs.message,
        });
      // navigation.navigate("SecurityQuestions")
      
        return rejectWithValue(rs.message)
      }

  } catch (e) {
    // console.log(">>>>>err", e)
    return rejectWithValue(e)
  }
})


interface initState {
  error: any,
  loading: boolean,
  data: any
}

const initialState: initState = {
  error: "",
  loading: false,
  data: {}
}

const createAccountSlice = createSlice({
  name: "/user/createAccount",
  initialState,
  reducers: {
   
  },
  extraReducers: (builder) => {
    builder.addCase(createAccount.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(createAccount.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload
    });
    builder.addCase(createAccount.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

// export const { logout } = loginSlice.actions
export default createAccountSlice.reducer