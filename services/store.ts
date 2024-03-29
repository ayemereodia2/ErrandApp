import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";
import createAccount from "./auth/create-account";
import { externalUserDetailsReducer } from "./auth/externalUserInfo";
import login from "./auth/login";
import { userDetailsReducer } from "./auth/userInfo";
import verifyPhone from "./auth/verify-phone";
import { bidActionReducer } from "./bids/bidsAction";
import contactUsReducer from './Contacts/ContactUsSlice';
import { startErrandReducer } from "./errands/beginErrand";
import createErrandReducer from './errands/createErrand';
import { errandDetailsReducer } from "./errands/errandDetails";
import { myErrandReducer } from "./errands/myErrands";
import postBidReducer from "./errands/placeBid";
import { subErrandReducer } from "./errands/subErrand";
import modalsReducer from "./modals";
import { timelineActionReducer } from "./timeline/sendMessage";
import { currentUserDetailsReducer } from "./auth/currentUserInfo";
import { errandMarketListReducer } from "./errands/market";
import { postAudioFilesReducer } from "./errands/postAudioFIle";
import { postFilesReducer } from "./errands/postFiles";
import { notificationPreferenceReducer } from "./notification/preferences";
import { updateNotificationPreferenceReducer } from "./notification/updatePreference";
import { categoriesListReducer } from "./PostErrand/categories";
import { getAccountsReducer } from "./wallet/getAccount";
import { walletActionReducer } from "./wallet/walletBalance";
import darkModeReducer from './DarkMode/DarkMode';
import modalSliceReducer from './Modal/ModalSlice';
import audioReducer from './audio/audio';
import { getCategoryInterstsReducer } from "./settings/getCategoryInterests";
import notifications from "./notification/index"
import mapReducer from "./map/mapslice"



// "adaptiveIcon": {
//         "foregroundImage": "./assets/images/logo.png",
//         "backgroundColor": "#ffffff"
//       },

// const combinedReducer = combineReducers({
//    notifications
// });

export const store = configureStore({
  reducer: {
    notifications,
    createAccount,
    login,
    verifyPhone,
    mapReducer,
    modals: modalsReducer,
    errandDetailsReducer,
    userDetailsReducer,
    externalUserDetailsReducer,
    postBidReducer,
    myErrandReducer,
    bidActionReducer,
    darkMode: darkModeReducer,
    modal: modalSliceReducer,
    startErrandReducer,
    audio: audioReducer,
    contactUsReducer,
    timelineActionReducer,
    subErrandReducer,
    categoriesListReducer,
    createErrandReducer,
    postFilesReducer,
    postAudioFilesReducer,
    walletActionReducer,
    getAccountsReducer,
    errandMarketListReducer,
    notificationPreferenceReducer,
    currentUserDetailsReducer,
    updateNotificationPreferenceReducer,
    getCategoryInterstsReducer
    
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

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
