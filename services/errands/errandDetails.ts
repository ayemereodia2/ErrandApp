import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SingleErrandDetail } from '../../types';
import { _fetch } from '../axios/http';

interface DetailProps {
  errandId: string
  navigation?: any
}

export const errandDetails = createAsyncThunk<SingleErrandDetail, DetailProps, { rejectValue: string }>(
    "errandDetails/get",
  async ({ errandId, navigation }: DetailProps, { rejectWithValue }) => {
        try {
            const _rs = await _fetch({
                method: "GET",
                _url: `/errand/${errandId}`,
            })
          
          // const _rs = await fetch(`https://apis.swave.ng/v1/errand/${errandId}`)
          const rs = await _rs.json()

            if (rs.success === true) {
                return rs
            }
          if (rs.success === false) {
            if (navigation) {
              navigation.navigate('ErrorScreen')
            }
                // return rs
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
         multi_data: {
          num_of_subErrands: 0,
          total_amount_spent: 0
        },
        errand_type: 0,
        latitude: "",
        longitude: "",
        id: "",
        user_id: "",
        restriction: "",
        pickup_address: {
          address_text:"",
            type: "",
            coordinates: []
        },
        dropoff_address: {
          address_text:"",
             type: "",
            coordinates: []
        },
        budget: 0,
        description: "",
        type: "",
        step: 0,
        category: {
          icon: "",
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
      user: {
        id: "",
        first_name: "",
        last_name: "",
        client: "",
        created_by: "",
        token: "",
        account_numbers: "",
        is_admin: false,
        phone_number: "",
        verification: 0,
        rating: 0,
        errands_completed: 0,
        is_suspended: false,
        created_at: "",
        updated_at: "",
        referral_code: '',
        email: '',
        occupation: '',
        errands_cancelled: 0,
        image: '',
        bio: '',
        dob: '',
        has_verified_address: false,
        has_verified_email: false,
        has_verified_phone: false,
        has_insurance: false,
        insurance_amount: 0,
        referral_info: "",
        profile_picture:""
        },
        runner_id: "",
        amount: 0,
        has_insurance: false,
        insurance_amount: 0,
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