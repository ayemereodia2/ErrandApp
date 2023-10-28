import { ErrandMarketResponse, MarketData } from '@/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { _fetch } from '../axios/http';

export interface MarketQueryParams {
  lat?: number
  lng?: number
  minPrice?: number,
  maxPrice?: number,
  category?: string
  setSearchedErrand?: any
  start?: number
  count?: number
}

export const errandMarketList = createAsyncThunk<any, MarketQueryParams, { rejectValue: string }>(
  "errandMarketList/get",
  async ({setSearchedErrand, minPrice, maxPrice, category, ...marketQueryParams}, { rejectWithValue }) => {
  try {
    let url = `/errand/market?start=0&count=20${category ? `&category=${category}`: ""}${minPrice === 0 ? '' : `&minPrice=${minPrice}`}${maxPrice === 0 ? '' : `&maxPrice=${maxPrice}`}`;



    console.log(">url", url)



    const rs = await _fetch({ method: 'GET', _url: url });
    const res = await rs.json()

     if (setSearchedErrand) {
          const marketErrand = res.data ?? []
          setSearchedErrand(marketErrand)
     }
    
    

    if (res.success) {
      return res.data
    }
  } catch (err) {
    if (err instanceof AxiosError) {
       return rejectWithValue(err.response?.data.message)
    } 
  }
})

const initialState: ErrandMarketResponse = {
  error: "",
  loading: true,
  action: "",
  data: [],
   
}

const errandMarketListSlice = createSlice({
  name: "/auth/errandMarket",
  initialState,
  reducers: {
    setSortedErrands(state: ErrandMarketResponse, { payload }: PayloadAction<MarketData[]>  ) {
      state.data = payload
    },
    setActionState(state: ErrandMarketResponse, { payload }: PayloadAction<string>) {
      state.action = payload
    },
     setLoading(state: ErrandMarketResponse, { payload }: PayloadAction<boolean>) {
      state.loading = payload
    }

  },
  extraReducers: (builder) => {
    builder.addCase(errandMarketList.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(errandMarketList.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.error = "";
      state.data = payload
    });
    builder.addCase(errandMarketList.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const {setSortedErrands,setActionState, setLoading} = errandMarketListSlice.actions
export const errandMarketListReducer = errandMarketListSlice.reducer