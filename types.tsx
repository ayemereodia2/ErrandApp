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

export type InputProps = {
  onChangeText?: any
  className?: string
  placeHolder?: string
  keyboardType: KeyboardTypeOptions
  label?: string
}

export type ButtonProps = {
  className: string
  child: string
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
  router: any
}