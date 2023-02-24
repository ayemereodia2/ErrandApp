import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import createAccount from "./auth/create-account";
import login from "./auth/login";
import questions from "./auth/questions";
import verifyPhone from "./auth/verify-phone";
import modalsReducer from "./modals";

export const store = configureStore({
  reducer: {
    createAccount,
    login,
    questions,
    verifyPhone,
    modals: modalsReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
  >;
