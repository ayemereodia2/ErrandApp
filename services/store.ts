import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import createAccount from "./auth/create-account";
import { externalUserDetailsReducer } from "./auth/externalUserInfo";
import login from "./auth/login";
import { userDetailsReducer } from "./auth/userInfo";
import verifyPhone from "./auth/verify-phone";
import { errandDetailsReducer } from "./errands/errandDetails";
import { marketReducer } from "./errands/market";
import { myErrandReducer } from "./errands/myErrands";
import postBidReducer from "./errands/placeBid";
import modalsReducer from "./modals";
import { bidActionReducer } from "./bids/bidsAction";
import { startErrandReducer } from "./errands/beginErrand";

export const store = configureStore({
  reducer: {
    createAccount,
    login,
    verifyPhone,
    modals: modalsReducer,
    marketReducer,
    errandDetailsReducer,
    userDetailsReducer,
    externalUserDetailsReducer,
    postBidReducer,
    myErrandReducer,
    bidActionReducer,
    startErrandReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>()

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
