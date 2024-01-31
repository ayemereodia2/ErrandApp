
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import toast from 'react-hot-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCookie } from 'cookies-next';
import Toast from 'react-native-toast-message';
import { _fetch } from '../../services/axios/http';
import { ILogin } from '../../types';
import { getNotifications } from '../notification';
import { currentUserDetails } from './currentUserInfo';

export const loginUser = createAsyncThunk<void, ILogin, { rejectValue: string }>("/users/sign-in", async ({ navigation, dispatch, ...rest }: ILogin, { rejectWithValue }) => {
  
  try {
    const rs = await _fetch({
    method: "POST",
      _url: `/user/sign-in`,
      body: rest
    })

    const _rs = await rs.json()

    // console.log(">>>>Login res", _rs);
  
    if (_rs.success === true) {
      console.log(">>>>>rs", _rs);

      dispatch(currentUserDetails({ user_id: _rs.data.id }))
      dispatch(getNotifications({userId: _rs.data.id}))
      
      await AsyncStorage.setItem('accessToken', _rs.data.access_token)
      await AsyncStorage.setItem('refreshToken', _rs.data.refresh_token)
      await AsyncStorage.setItem('user_id', _rs.data.id)
      await AsyncStorage.setItem("last_name", _rs.data.last_name)
      await AsyncStorage.setItem("first_name", _rs.data.first_name)
      if (_rs.data.profile_picture) {
         await AsyncStorage.setItem('profile_pic', _rs.data.profile_picture)
      }

      await AsyncStorage.setItem('isGuest', 'false')
     const pin = await AsyncStorage.setItem('pin', JSON.stringify(_rs.data.has_transaction_pin))

    
       Toast.show({
        type: 'success',
        text1: 'Login Successful',
       });
      
      navigation.navigate('Tabs')
      
      return _rs
    } 

    if (_rs.success === false) {
       Toast.show({
        type: 'error',
        text1: _rs.message,
      });
    }
    return rejectWithValue(_rs)

  } catch (e: any) {
     if (e.response.status === 400) {
      // toast.error("Invalid Login Credentials")
      return rejectWithValue(e.response.data.message)
     }
    if (e.response.status === 404) {
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