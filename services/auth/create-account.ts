import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import toast from 'react-hot-toast';

export const createAccount = createAsyncThunk("/user/createAccount", async ({router, newData}: any, {rejectWithValue}) => {
  try {
    // console.log(">>>>>>>newDATA", newData)

    await fetch('https://errand-app.herokuapp.com/v1/user/sign-up', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData),
    }).then(response => response.json())
      .then(data => {
        // console.log(">>>>>>>exact", data)
        if (data.success === true) {
          // toast.success(data.message)
          router.push("/profile")
          return data.message
        }
         if (data.success === false) {
          // router.push("/profile")
          //  toast.error(data.message)
          //  console.log(">>>>>>data.message", data.message)
          return data.message
        }
      })
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