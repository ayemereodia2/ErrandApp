import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Props = {
  phone_number: string,
  // toast: any
}

export const verifyPhone = createAsyncThunk("/user/verifyPhone", async ({phone_number}: Props, {rejectWithValue}) => {
  try {
    await fetch('https://errand-app.herokuapp.com/v1/user/verify-phone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone_number }),
    }).then(response => response.json())
      .then(data => {
        if (data.status === true) {
          return data.status
        }
      });
    
  } catch (e) {
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
    });
    builder.addCase(verifyPhone.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

// export const { logout } = loginSlice.actions
export default verifyPhoneSlice.reducer