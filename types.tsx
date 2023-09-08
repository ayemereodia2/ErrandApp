/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { Dispatch, SetStateAction } from 'react';
import { KeyboardTypeOptions } from 'react-native'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export interface CommonState {
  error?: any;
  loading?: boolean;
  success?: boolean;
  message?: string;
}

export type InputProps = {
  onChangeText?: any
  className?: string
  keyboardType: KeyboardTypeOptions
  label?: string
  required?: boolean
  placeholder?: string
  control?: any
  errors?: any
  name: string;
  message?: string,
  secureTextEntry?: boolean;
}

export type ButtonProps = {
  className: string
  child: any
  style?: any
  onPress?: any
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  // Modal: undefined;
  // NotFound: undefined;
  Home: undefined
  Login: undefined
  CreateAccount: undefined
  RecoverPassword: undefined
  RecoverAccount: undefined
  VerifyOtp: undefined
  Profile: undefined
  Main: undefined
  Account: undefined
  Wallet: undefined
  ErrandDetails: undefined
  Modal: undefined
  Errands: undefined
  MyErrands: undefined
  MyErrandDetails: undefined
  Feeds: undefined
  Welcome: undefined
  VerifyPhone: undefined
  SecurityQuestions: undefined
}

export type RootStackScreenProps<
  Screen extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, Screen>

export type RootTabParamList = {
  TabOne: undefined
  TabTwo: undefined
}

export type RootTabScreenProps<
  Screen extends keyof RootTabParamList
> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type directorDetailsProps = {
  directors_phonenumber: number;
  date: number;
  nationality: string;
  identification: string;
  id_no: number;
  address: string;
};

export type forgot_password = {
  email: string;
};

export interface Location {
  lat: number;
  lng: number;
}

export type set_password = {
  password: string;
  enter_password: string;
};

export interface IHookInputProps {
  label?: string;
  placeholder?: string;
  info?: boolean;
  value?: string;
  className?: string;
  required?: boolean;
  register?: any;
  errors?: any;
  name?: string;
  type?: string;
  show?: any;
  select?: boolean;
  message?: string | any;
  textArea?: boolean;
  textAreaClass?: any;
  selectArray?: any;
  disabled?: boolean;
  ref?: React.MutableRefObject<HTMLInputElement>;
  onClick?: any;
  password?: string;
  validate?: any;
  maxLength?: number;
  minLength?: number;
  pattern?: any;
  handleChange?: any;
  onChange?: any;
  rest?: any;
  setState?: any;
  optional?: boolean;
  selectBorder?: string;
  selectLabel?: string;
  labelClass?: string;
  borderClass?: string;
  inputClass?: string;
}

export interface ICreateAccount {
  first_name: string;
  last_name: string;
  client?: string;
  // phone_number: string;
  password: string;
  confirmPassword: string;
  email?: string;
  referralCode?: string;
}

export interface ILogin {
  phone_number: string;
  password: string;
  router: any;
  setSuccess: any;
}

export interface ContactData {
  name: string;
  email: string;
  message: string;
  phone_number: string;
}

export interface TaskBtnProps {
  image: string;
  description: string;
}

export interface PostErrandData {
  errandType: string
  categoryId: string;
  type: string;
  categoryName: string;
  description: string;
  // duration: DurationData
  images: string[];
  audio: string;
  // pickup_location: PickupData
  // dropoff_location: DropoffData
  budget: number;
  pickup_add_str: string;
  del_add_str: string;
  cur_add_str: string;
  pickup_lat: any;
  pickup_lng: any;
  dropoff_lat: any;
  dropoff_lng: any;
  dur_value: string;
  dur_period: number;
  res_by_qualification: string;
  res_by_verification: string;
  pickup_add: string;
  cur_loc: string;
  del_add: string;
  google_add: string;
  ins_amount: number,
  insurance: string,
  pickup_text: string
  dropoff_text: string
}

export interface DurationData {
  value: string;
  period: string;
}

export interface PickupData extends Geography {}

export interface DropoffData extends Geography {}

interface Geography {
  lat: string;
  lng: string;
}

export interface CommonState {
  error?: any;
  loading?: boolean;
  success?: boolean;
  message?: string;
}

export interface SecurityQuestionState extends CommonState {
  question: Question;
}

interface Question {
  question: string;
}

export interface SecurityQuestionResponse {
  success: boolean;
  message: string;
  data: Question;
}

export interface ISecurityQA {
  question: string;
  answer: string;
  navigate: any;
  phone_number?: string;
}

export interface DraftErrandResponse extends CommonState {
  data?: DraftErrand;
}

export interface DraftErrand {
  id?: string;
  user_id?: string;
  status?: number;
  type?: string;
  step?: number;
  expiry_date?: string;
  created_at?: string;
  updated_at?: string;
}

export interface GetSecurityQuestionRequest {
  phone_number: string;
  question?: string;
  answer?: string;
  navigate?: any;
  newPassword?: string;
  dispatch?: any;
}

export interface GetSecurityQuestionState extends CommonState {
  data: {
    question: string;
  };
}

export interface VerifyQuestionRequest {
  phone_number: string;
  navigate: any;
  answer: string;
}

export interface CreateErrandResponse extends CommonState {}

export interface CreateErrandRequest {
  errand_type: string;
  description: string;
  duration: {
    period: string;
    value: number;
  };
  images: string[];
  audio: string;
  restriction: string;
  pickup_location: {
    lat?: number;
    lng?: number;
  };
  dropoff_location: {
    lat?: number;
    lng?: number;
  };
  budget: number;
  type: string;
  category: string;
  errandId: string;
  navigate?: any;
  setShowLoadingDialogue?: any;
  toast?: any;
  dispatch?: any;
  setSuccessDialogue?: any;
  has_insurance: boolean,
  insurance_amount: number,
  dropoff_text: string;
  pickup_text: string;
}

export interface FilesRequest {
  type: string;
  files: any[];
  errandId: string;
}

export interface FilesResponse extends CommonState {
  data: string[];
}

export interface ErrandMarketResponse extends CommonState {
  data: MarketData[];
  action?: string
}

export interface SingleErrandDetail extends CommonState {
  data: MarketData;
}

export interface MarketData {
  latitude: any;
  longitude: any;
  id: string;
  user_id: string;
  restriction: string;
  pickup_address: {
    address_text: string
    type: string;
    coordinates: Array<Number>;
  };
  // dropoff_address: {
  //   lat: number;
  //   lng: number;
  // };
  dropoff_address: {
      address_text: string
      type: string;
      coordinates: Array<Number>;
  };
  budget: number;
  description: string;
  type: string;
  step: number;
  category: CategoriesList;
  created_at: string;
  updated_at: string;
  status: string;
  total_bids: number;
  bids: Bids[];
  expiry_date: string;
  timeline: Timelines;
  runner_id: string;
  amount: number
  has_insurance: boolean,
  insurance_amount: number
  errand_type: number
  multi_data:{
    num_of_subErrands: 0,
    total_amount_spent: 0
}

}

export interface Timelines {
  id: string;
  errand_id: string;
  updates: Updates[];
  created_at: string;
  updated_at: string;
}

export interface Updates {
  id: string;
  message: string;
  type: string;
  source: string;
  created_at: string;
}

export interface Bids {
  id: string;
  description: string;
  errand_id: string;
  runner: Runner;
  state: string;
  haggles: Haggles[];
  created_at: string;
  updated_at: string;
  amount: number;

}

export interface Runner {
  id: string;
  first_name: string;
  last_name: string;
  is_offline: boolean;
  profile_picture: string;
  phone: string;
  errands_completed: number
  rating: number
}

export interface Haggles {
  id: string;
  source: string;
  created_at: string;
  amount: number;
  description: string;
  runner_id?: string
}

export interface BidActionPayload {
  amount: number;
  response?: string;
  runner_id?: string;
  errand_id: string;
  description?: string;
  source?: string;
  method?: string;
  type?: string;
  bid_id: string;
  setOpenAcceptBidModal?: any;
  setOpenCloseBidModal?: any;
  setOpenRejectBidModal?: any;
  setOpenNegotiateModal?: any;
  setOpenUpdateBidModal?: any;
  dispatch: Function;
  toast: any;
  setSearchedErrand?: Dispatch<SetStateAction<MarketData[]>>;
}

export interface PostBidRequest {
  amount: number;
  source?: string;
  description?: string;
  errand_id?: string;
  Toast?: any;
  dispatch?: any;
  navigation?: any
}

export interface TimelinePayload {
  message?: string;
  errand_id: string;
  type?: string;
  method: string;
  setOpenPostRequestModal?: any;
  setOpenRequestUpdateModal?: any
  sub_errand_id?: string
  dispatch: Function;
  toast?: any;
  setSubErrand?: any
  user_id?: string
}

export interface CategoriesListResponse extends CommonState {
  data: CategoriesList[];
}

export interface CategoriesList {
  id: string;
  icon: string;
  identifier: string;
  name: string;
  type: string;
  // created_by: string;
  // modified_by: [];
  // created_at: string;
  // updated_at: string;
}

export interface StartErrandProps {
  message?: string
  errand_id: string;
  bid_id?: string;
  dispatch: any;
  toast: any;
  setOpenBeginErrandModal?: any;
  setOpenCancelErrandModal?: any;
  setOpenAbandonErrandModal?: any
  setSearchedErrand?: Dispatch<SetStateAction<MarketData[]>>;
  sub_errand_id?: string
}

export interface UserDetailsResponse extends CommonState {
  data: UserDetail;
}

export interface RunnerSenderResponse extends CommonState {
  runner?: UserDetail;
  sender?: UserDetail
}

export interface UserDetail {
  id: string;
  first_name: string;
  last_name: string;
  email: string | undefined;
  client: string;
  created_by: string;
  token: string;
  account_numbers: string;
  is_admin: boolean;
  phone_number: string;
  verification: number;
  rating: number;
  errands_completed: number;
  errands_cancelled: number;
  is_suspended: boolean;
  created_at: string;
  updated_at: string;
  occupation: string;
  referral_code: string;
  referral_info: string; //Please create an endpoint for this
  image: string; //temporary, till we have an endpoint for user profile image
  bio: string;
  dob: string
  has_verified_address: boolean
  has_verified_email: boolean
  has_verified_phone: boolean
  has_insurance: boolean,
  insurance_amount: number  
  profile_picture: string
}

export interface NotificationList extends CommonState {
  data: NotificationProps[];
}

export interface NotificationProps {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  link: string;
  created_at: string;
}

export interface NotificationPreferenceResponse extends CommonState {
  data: NotificationPreferences
}

export interface NotificationPreferences {
    user_id?: string,
    email_notifications: boolean
    sms_notifications: boolean
    account_update_notifications: boolean
    newsletter_notifications: boolean
    promotions_notifications: boolean
    misc_notifications: boolean
    cat_errand_notifications: boolean
    location_errand_notifications: boolean
    bid_notifications: boolean
  errand_status_notifications: boolean
    dispatch?: any
}

export interface RatePayload {
  runner_id: string;
  errand_id: string;
  rating: number;
  toast: any;
  setOpenCompletedSucessDialogue: any;
}

export interface WalletPayload {
  request: string;
  type?: string;
  amount?: number;
  toast?: any;
  dispatch?: any;
}

export interface WalletResponse extends CommonState {
  data: {
    balance: string;
    escrow: number;
    transactions: Transaction[];
    incoming: number;
    escrow_breakdown: {
      description: string
      budget: number
      created_at: string
      status: string
      amount: number
      type: string
    }[]
  };
}

export interface Transaction {
  id: string;
  user_id: string;
  transaction_type: number;
  type: string;
  amount: number;
  description: string;
  created_at: string;
  date: string;
}

export interface Bank {
  code: number;
  name: String;
}

// temporary
export interface UserProps {
  id: string;
}

export interface ChakraModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface Account {
    id: string
    account_number: string 
    account_name: string 
    bank_code: string 
}

export interface SubErrandList extends CommonState {
  data: SubErrand[]
}

export interface SubErrand {
   id: string
    original_errand_id: string
    runner_id: string
    amount: number
    status: string,
    cancellation_reason: string,
    created_at: string,
    updated_at: string,
}

export interface SingleSubErrandResponse extends CommonState {
  data: SingleSubErrand
  
}


export interface SingleSubErrand {
    id: string
    sender_id: string,
    original_errand_id: string
    runner_id: string
    amount: number
    status: string,
    cancellation_reason: string,
    created_at: string,
    updated_at: string,
    timeline : Timelines
}
