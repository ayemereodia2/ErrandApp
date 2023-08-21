import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SingleErrandDetail } from '../../types';
import { _fetch } from '../axios/http';

interface DetailProps {
    errandId: string
}

export const errandDetails = createAsyncThunk<SingleErrandDetail, DetailProps, { rejectValue: string }>(
    "errandDetails/get",
    async ({ errandId }: DetailProps, { rejectWithValue }) => {
        try {
            const _rs = await _fetch({
                method: "GET",
                _url: `/errand/${errandId}`,
            })
          
          const rs = await _rs.json()

            if (rs.success === true) {
                return rs
            }
        } catch (e: any) {
            if (e.response.status === 400) {
                return rejectWithValue(e.response.data.message)
            }
            return rejectWithValue(e.response.data.message)
        }
    })

const initialState: SingleErrandDetail = {
    error: "",
    loading: true,

    data: {
        latitude: "",
        longitude: "",
        id: "",
        user_id: "",
        restriction: "",
        pickup_address: {
            type: "",
            coordinates: []
        },
        dropoff_address: {
             type: "",
            coordinates: []
        },
        budget: 0,
        description: "",
        type: "",
        step: 0,
        category: {
            id: "",
            image_url: "",
            identifier: "",
            name: "",
            type: "",
            created_by: "",
            modified_by: [],
            created_at: "",
            updated_at: "",
        },
        created_at: "",
        updated_at: "",
        status: "",
        total_bids: 0,
        bids: [],
        expiry_date: "",
        timeline: {
            id: "",
            errand_id: "",
            updates: [],
            created_at: "",
            updated_at: "",
        },

        runner_id: "",
      amount: 0,
           has_insurance: false,
    insurance_amount: 0
    }
}

const errandDetailsSlice = createSlice({
    name: "/errand/Detail",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(errandDetails.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
        });
        builder.addCase(errandDetails.fulfilled, (state, { payload }) => {
              state.loading = false;
            state.error = "";
            state.data = payload.data
        });
        builder.addCase(errandDetails.pending, (state, action) => {
            state.loading = true;
            state.error = action.payload;
        });
    },

})

export const errandDetailsReducer = errandDetailsSlice.reducer