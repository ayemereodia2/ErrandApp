import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FilesResponse } from '../../types';

interface Props {
  formData: any
  setAudio: any
  audios: any
}

export const postAudioFiles = createAsyncThunk<any, Props, { rejectValue: string }>(
  "/errand/postAudioFiles",
  async ({formData, setAudio, audios}, { rejectWithValue }) => {
    try {
      const token = await AsyncStorage.getItem('accessToken');
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`)
      headers.append('Content-Type', 'multipart/form-data')
      
      const requestOptions = {
        method: 'POST',
        headers: headers,
        body: formData,
      };

      const res =  await fetch(`https://staging.apis.swave.ng/v1/file-upload`, requestOptions)
        
    //     .then((res) => res.json()).then((data) => {
    //   if (data.success === true) {
    //     data?.data.forEach((audio: string) => {
    //       setAudio(audio)
    //     })
         
    //     }
    // })
    
      const resJson = await res.json()

      console.log(">>>>>>>res audio", resJson);
      
    if (setAudio) {
      setAudio([...audios, ...resJson.data])
    }
    return resJson.data[0]
    } catch (e: any) {
      console.log("e",e );
      
    }
  
    
})

const initialState: FilesResponse = {
  error: "",
  loading: false,
  data: []
}

const postAudioFilesSlice = createSlice({
  name: "/errand/postAudioFiles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postAudioFiles.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;

    });
    builder.addCase(postAudioFiles.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.data = action.payload
    });
    builder.addCase(postAudioFiles.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },
})

export const postAudioFilesReducer = postAudioFilesSlice.reducer
