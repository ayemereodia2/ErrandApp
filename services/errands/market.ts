import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ErrandMarketResponse, MarketData } from '../../types';
import { _fetch } from '../axios/http';

export interface LocationProps {
  lat?: number
  lng?: number
  minPrice?: number,
  maxPrice?: number,
  category?: string
}

export const market = createAsyncThunk<ErrandMarketResponse, LocationProps, { rejectValue: string }>(
  "errandMarketList/get",
  async ({ lat, lng, minPrice, maxPrice, category }, { rejectWithValue }) => {


    console.log(">>>>>jello");
    

    
  try {
    let url = "/errand/market"

    // if (lat !== 0 || lng !== 0) {
    //   url = `/errand/market?lat=${lat}&lng=${lng}`
    // }

    // if (minPrice !== undefined || maxPrice !== undefined) {
    //   url = `/errand/market?minPrice=${minPrice}&maxPrice=${maxPrice}`
    // }

    // if (category) {
    //   url = `/errand/market?category=${category}`
    // }
    const _rs = await _fetch({ _url: url, method: 'GET' })
    const rs = await _rs.json()

    // console.log(">>>>>rs", rs.data);
    // if (rs.data.success === true) {
      return rs
    // }
  } catch (err) {
    if (err) {
       return err
    } 
  }
})

const initialState: ErrandMarketResponse = {
  error: "",
  loading: true,
  action: "",
  data: [],
   
}

const _market = createSlice({
  name: "/auth/errandMarket",
  initialState,
  reducers: {
    setSortedErrands(state: ErrandMarketResponse, { payload }: PayloadAction<MarketData[]>  ) {
      state.data = payload
    },
    setActionState(state: ErrandMarketResponse, { payload }: PayloadAction<string>) {
      state.action = payload
    }

  },
  extraReducers: (builder) => {
    builder.addCase(market.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
    builder.addCase(market.fulfilled, (state, {payload}) => {
      state.loading = false;
      state.error = "";
      console.log(">>>>>payload", payload.data);
      
      state.data = payload.data
    });
    builder.addCase(market.pending, (state, action) => {
      state.loading = true;
      state.error = action.payload;
    });
  },

})

export const {setSortedErrands,setActionState} = _market.actions
export const marketReducer = _market.reducer