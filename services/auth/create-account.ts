import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Toast from 'react-native-toast-message';
import { ICreateAccount } from '../../types';
import { _fetch } from '../axios/http';
import { currentUserDetails } from './currentUserInfo';
// import toast from 'react-hot-toast';

export const createAccount = createAsyncThunk("/user/createAccount", async ({navigation, dispatch, ...data}: ICreateAccount, {rejectWithValue}) => {
  try {
    const _rs = await _fetch({ _url: `/user/sign-up`, method: "POST", body: data })
    const rs = await _rs.json();

    if (rs.success === true) {
       await AsyncStorage.setItem('accessToken', rs.data.access_token )
      await AsyncStorage.setItem('refreshToken', rs.data.refresh_token )
       await AsyncStorage.setItem('accessToken', rs.data.access_token)
      await AsyncStorage.setItem('refreshToken', rs.data.refresh_token)
      await AsyncStorage.setItem('user_id', rs.data.id)
      await AsyncStorage.setItem("last_name", rs.data.last_name)
      await AsyncStorage.setItem("first_name", rs.data.first_name)
      if (rs.data.profile_picture) {
         await AsyncStorage.setItem('profile_pic', rs.data.profile_picture)
      }
      await AsyncStorage.setItem('isGuest', 'false')
      await AsyncStorage.setItem('pin', JSON.stringify(rs.data.has_transaction_pin))
      Toast.show({
        type: 'success',
        text1: rs.message,
      });
       dispatch(currentUserDetails({user_id: rs.data.id}))
       navigation.navigate('Tabs')
      
    }
    if (rs.success === false) {
        Toast.show({
          type: 'error',
          text1: rs.message,
        });
    
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