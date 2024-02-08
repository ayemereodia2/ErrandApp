import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  origin: null,
  destination: null,
  travelTimeInformation: null
}

export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload
    },
    setDestination: (state, action) => {
      state.destination = action.payload
    },
    setTravelTimeInformation: (state, action) => {
      state.travelTimeInformation = action.payload
    }
  }
})

export const { setDestination, setOrigin, setTravelTimeInformation } = mapSlice.actions

export const selectOrigin = (state) => state.map.origin
export const selectDestination = (state) => state.map.destination
export const selectTravelTimeInformation = (state) => state.map.travelTimeInformation

export default mapSlice.reducer