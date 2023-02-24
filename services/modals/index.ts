import { createSlice } from '@reduxjs/toolkit';

interface initState {
  showTransferFundsModal: boolean,
  showVerifyTransaction: boolean,
  showTransactionStatus: boolean,
  showCashoutModal: boolean
  showVerifyCashout: boolean
  showCashoutStatus: boolean
  showTransactionDetailModal: boolean
  approveCreditRequest: boolean,
  verifyCreditTransanction: boolean,
  creditRequestApproved: boolean,
  declineCreditRequest: boolean,
  creditRequestDeclined: boolean
}

const initialState: initState = {
  showTransferFundsModal: false,
  showVerifyTransaction: false,
  showTransactionStatus: false,
  showCashoutModal: false,
  showVerifyCashout: false,
  showCashoutStatus: false,
  showTransactionDetailModal: false,
  approveCreditRequest: false,
  verifyCreditTransanction: false,
  creditRequestApproved: false,
  declineCreditRequest: false,
  creditRequestDeclined: false
}

const modalSlice = createSlice({
  name: "/modals/setup",
  initialState,
  reducers: {
    toggleTransferFundsModal(state: initState) {
      state.showTransferFundsModal = !state.showTransferFundsModal
    },
    toggleVerifyTransaction(state: initState) {
      state.showVerifyTransaction = !state.showVerifyTransaction
    },
    toggleTransactionStatus(state: initState) {
      state.showTransactionStatus = !state.showTransactionStatus
    },
    toggleCashoutModal(state: initState) {
      state.showCashoutModal = !state.showCashoutModal
    },
    toggleVerifyCashout(state: initState) {
      state.showVerifyCashout = !state.showVerifyCashout
    },
    toggleCashoutStatus(state: initState) {
      state.showCashoutStatus = !state.showCashoutStatus
    },
    toggleTransactionDetail(state: initState) {
      state.showTransactionDetailModal = !state.showTransactionDetailModal
    },
    toggleApproveCreditRequest(state: initState) {
      state.approveCreditRequest = !state.approveCreditRequest
    },
     toggleVerifyCreditTransaction(state: initState) {
      state.verifyCreditTransanction = !state.verifyCreditTransanction
    },
     toggleCreditRequestApproved(state: initState) {
      state.creditRequestApproved= !state.creditRequestApproved
    },
     toggleDeclineCreditRequest(state: initState) {
      state.declineCreditRequest= !state.declineCreditRequest
    },
       toggleCreditRequestDeclined(state: initState) {
      state.creditRequestDeclined= !state.creditRequestDeclined
    },

  }
})

export const {toggleTransferFundsModal, toggleVerifyTransaction, toggleTransactionStatus, toggleCashoutModal, toggleVerifyCashout, toggleCashoutStatus, toggleTransactionDetail, toggleApproveCreditRequest, toggleVerifyCreditTransaction, toggleCreditRequestApproved, toggleDeclineCreditRequest, toggleCreditRequestDeclined} = modalSlice.actions
export default modalSlice.reducer