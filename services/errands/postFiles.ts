import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilesResponse } from '../../types';


interface Props {
  formData: any
  setUploadedFiles?: any
  uploadedFiles?: any
}

export const postFiles = createAsyncThunk<any, Props, { rejectValue: string }>(
  "/file-upload",
  async ({ formData, setUploadedFiles, uploadedFiles }, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      // const headers = new Headers();
      // headers.append("Authorization", `Bearer ${token}`)
      // headers.append('Content-Type', 'multipart/form-data')
      
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          "Authorization": `Bearer ${token}`
        },
        body: formData,
      };
    
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/file-upload`, requestOptions)
    
    const resJson = await res.json()
    
    if (setUploadedFiles) {
      setUploadedFiles([...uploadedFiles, ...resJson.data])
    }
    return resJson.data[0]
    }
    catch (e) {
      console.log(">>>>eerror", e)
    }
     
})

const initialState: FilesResponse = {
  error: "",
  loading: false,
  data: []
}

const postFilesSlice = createSlice({
  name: "/errand/postFiles",
  initialState,
  reducers: {
    setUploadedFilesToNull(state, { payload }: PayloadAction<[]> ) {
      state.data = []
    }
  },
  extraReducers: (builder) => {
    builder.addCase(postFiles.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(postFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = [...state.data, action.payload]
    });
    builder.addCase(postFiles.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const {setUploadedFilesToNull} = postFilesSlice.actions
export const postFilesReducer = postFilesSlice.reducer
