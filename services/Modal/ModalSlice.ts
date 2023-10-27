// modalSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the initial state
interface ModalState {
  isOpen: boolean;
}

const initialState: ModalState = {
  isOpen: false,
};

// Create a modal slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state) => {
      state.isOpen = true;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

// Export the actions
export const { openModal, closeModal } = modalSlice.actions;

// Export the reducer
export default modalSlice.reducer;