import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import createAccount from "./auth/create-account";
import login from "./auth/login";
import verifyPhone from "./auth/verify-phone";
import modalsReducer from "./modals";
import { marketReducer } from "../services/errands/market"
import { errandDetailsReducer } from "./errands/errandDetails";
import { userDetailsReducer } from "./auth/userInfo";

export const store = configureStore({
  reducer: {
    createAccount,
    login,
    verifyPhone,
    modals: modalsReducer,
    marketReducer,
    errandDetailsReducer,
    userDetailsReducer
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
