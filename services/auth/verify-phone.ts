import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { _fetch } from '../axios/http';


type Props = {
  phone_number: string,
  dispatch?: any
  navigation?: any
  setVerifySuccess?: any
  from: string
  intent: string
}

export const verifyPhone = createAsyncThunk("/user/verifyPhone", async ({ navigation, dispatch, intent, phone_number, from}: Props, {rejectWithValue}) => {
  try {



    const _rs = await _fetch({ _url: '/user/verify-phone', method: 'POST', body: { phone_number, intent } })
    const rs = await _rs.json()
    

    if (from === 'forgotPassword') {
      if (rs.success === false) {
          Toast.show({
              type: 'error',
              text1: 'Sorry, This phone number already exist in our database',
            });
           
        } else
      if (rs.success === true) {
            navigation.navigate('VerifyOtp', {comingFrom:'forgotPassword'})
            await AsyncStorage.setItem('phone', phone_number )
        }
    } 

    if (from === "createAccount") {      
        if (rs.success === false) {
            Toast.show({
              type: 'error',
              text1: 'Sorry, This phone number already exist in our database',
            });
            return 
        } else if (rs.success === true) {
          await AsyncStorage.setItem('phone', phone_number )
          navigation.navigate('VerifyOtp', {comingFrom: 'createAccount'})
        }
    } 
  } catch (err) {
    if (err instanceof AxiosError) {
        // toast.error("We are Sorry, something went wrong please try again")
        return rejectWithValue(err)
    }
}
})


interface initState {
  error: any,
  loading: boolean,
  status: any
}

const initialState: initState = {
  error: "",
  loading: false,
  status: ""
}

const verifyPhoneSlice = createSlice({
  name: "/users/verify",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder.addCase(verifyPhone.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(verifyPhone.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      // console.log(">>>>>action,", action.payload);
      
      state.status = action.payload
    });
    builder.addCase(verifyPhone.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

// export const { logout } = loginSlice.actions
export default verifyPhoneSlice.reducer