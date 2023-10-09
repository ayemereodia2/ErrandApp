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
}

const constructQueryParams = (raw: MarketQueryParams) => {
  // console.log(">>>>>raw", raw);
  
  const params = new URLSearchParams();
  if (raw.lat) {
    params.append('lat', raw.lat.toString());

  }
  if (raw.lng) {
    params.append('lng', raw.lng.toString());
  }
  if (raw.minPrice) {
    
    params.append('minPrice', raw.minPrice.toString());
  }
  if (raw.maxPrice) {
    params.append('maxPrice', raw.maxPrice.toString());
  }
  if (raw.category) {
    params.append('category', raw.category);
  }

  return params
}

export const errandMarketList = createAsyncThunk<any, MarketQueryParams, { rejectValue: string }>(
  "errandMarketList/get",
  async ({setSearchedErrand, ...marketQueryParams}, { rejectWithValue }) => {
  try {
    let url = "/errand/market";
    const params = constructQueryParams(marketQueryParams)
    if (params.toString()) {
      url += `?${params.toString()}`;
    }

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