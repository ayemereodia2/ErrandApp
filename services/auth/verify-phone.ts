import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { securityQuesitions } from './questions';
import { _fetch } from '../axios/http';

type Props = {
  phone_number: string,
  dispatch?: any
  navigate?: any
  setVerifySuccess?: any
  from: string
}

export const verifyPhone = createAsyncThunk("/user/verifyPhone", async ({ navigate, dispatch, phone_number, setVerifySuccess, from}: Props, {rejectWithValue}) => {
  try {
    // const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/user/verify-phone`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ phone_number}),
    // })  

    const _rs = await _fetch({ _url: '/user/verify-phone', method: 'POST', body: JSON.stringify({ phone_number }) })
    
    const rs = await _rs.json()

    if (from === 'passwordRecovery') {
        if (rs.success === false) {
            dispatch(
                securityQuesitions({navigate, phone_number: `${phone_number.substring(1)}` }),
            )
        }
        if (rs.success === true) {
            // toast.error("Sorry, This phone number doesn't exist on our database");
            return 
        }
    } else 

    if (from === "createAccount") {
        if (rs.success === false) {
            // toast.error("Sorry, This phone number already exist in our database");
            return 
        }
        if (rs.success === true) {
            localStorage.setItem("phone", phone_number)
            setVerifySuccess(true)
        }
    } 
  } catch (err) {
    if (err instanceof AxiosError) {
        console.log(">>>>>>>", err.response?.status)
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
      console.log(">>>>>action,", action.payload);
      
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