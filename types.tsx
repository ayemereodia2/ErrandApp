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
  message?: string
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
  Feeds: undefined
  Welcome: undefined
  VerifyPhone: undefined
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

export type loginProps = {
  phone_number: string,
  password: string
}

export interface ILogin {
  phone_number: string
  password: string,
  navigation?: any
}

export interface ErrandMarketResponse extends CommonState {
  data: MarketData[];
  action?: string
}

export interface MarketData {
  latitude: any;
  longitude: any;
  id: string;
  user_id: string;
  restriction: string;
  pickup_address: {
    type: string;
    coordinates: Array<Number>;
  };
  // dropoff_address: {
  //   lat: number;
  //   lng: number;
  // };
    dropoff_address: {
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
}

export interface CategoriesList {
  id: string;
  image_url: any;
  identifier: string;
  name: string;
  type: string;
  created_by: string;
  modified_by: [];
  created_at: string;
  updated_at: string;
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