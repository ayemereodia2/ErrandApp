import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import FundWalletModal from '../components/Modals/Errands/FundWallet'
import AccountScreen from '../screens/Accounts'
import AccountRecoveryScreen from '../screens/Auth/AccountRecovery'
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import RecoverPasswordScreen from '../screens/Auth/RecoverPassword'
import SecurityQuestion from '../screens/Auth/SecurityQuestionScreen'
import VerifyOtpScreen from '../screens/Auth/VerifyOtp'
import VerifyPhone from '../screens/Auth/VerifyPhone'
import ContactUs from '../screens/Contact/ContactUs'
import PostErrand from '../screens/CreateErrand'
import EditProfileTitle from '../screens/EditProfile/EditProfileTitle'
import ErrorScreen from '../screens/Error'
import GuestDetails from '../screens/Guest/GuestDetails'
import GuestScreen from '../screens/Guest/GuestScreen'
import ErrandDetails from '../screens/Market/ErrandDetails'
import MainScreen from '../screens/Market/MainScreen'
import AbandonErrandModal from '../screens/Modal/AbandonErrandModal'
import CancelErrandModal from '../screens/Modal/CancelErrandModal'
import CompleteErrandModal from '../screens/Modal/CompleteErrandModal'
import ErrandScreen from '../screens/MyErrands'
import ErrandUserDetails from '../screens/MyErrands/ErrandUserDetails'
import MyErrandInfo from '../screens/MyErrands/MyErrandInfo'
import NotificationScreen from '../screens/Notification/NotficationScreen'
import OnboardingUi from '../screens/Onboarding/OnboardingUi'
import CategoryInterest from '../screens/Setting/AddCategory'
import SettingScreen from '../screens/Setting/SettingScreen'
import WalletScreen from '../screens/Wallets'
import EscrowScreen from '../screens/Wallets/EscrowScreen'
import TransactionScreen from '../screens/Wallets/TransactionScreen'
import WalletAccount from '../screens/Wallets/WalletAccount'
import { RootStackParamList } from '../types'
import { TabsNavigation } from './TabsNavigation'

const Stack = createNativeStackNavigator<RootStackParamList>()

export function GuestStack() {
  return (
    <>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Onboarding"
          component={OnboardingUi}
          options={{
            headerShown: false,
          }}
        />

        <Stack.Screen
          name="GuestScreen"
          component={GuestScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestDetails"
          component={GuestDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SecurityQuestions" component={SecurityQuestion} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen
          name="RecoverPassword"
          component={RecoverPasswordScreen}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfileTitle}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="CategoryInterest"
          component={CategoryInterest}
          options={{
            title: 'Category Interest',
            presentation: 'fullScreenModal',
          }}
        />
        <Stack.Screen
          name="FundWalletModal"
          component={FundWalletModal}
          options={{
            title: 'Fund Your Wallet',
            presentation: 'fullScreenModal',
            headerShown: true,
          }}
        />
        <Stack.Screen name="RecoverAccount" component={AccountRecoveryScreen} />
        <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
        <Stack.Screen
          name="Profile"
          component={AccountScreen}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="VerifyPhone"
          component={VerifyPhone}
          options={{ title: 'Verify Phone' }}
        />
        <Stack.Screen
          name="Contact"
          component={ContactUs}
          options={{
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ErrandDetails"
          component={ErrandDetails}
        />
        <Stack.Screen
          name="MyErrandDetails"
          component={MyErrandInfo}
          options={{
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="ErrorScreen"
          component={ErrorScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Tabs" component={TabsNavigation} />
      </Stack.Navigator>
    </>
  )
}

export const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}
      <Stack.Screen
        name="GuestScreen"
        component={GuestScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GuestDetails"
        component={GuestDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ErrandDetails"
        component={ErrandDetails}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SecurityQuestions" component={SecurityQuestion} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="RecoverPassword" component={RecoverPasswordScreen} />
      <Stack.Screen name="RecoverAccount" component={AccountRecoveryScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen
        name="MyErrandDetails"
        component={MyErrandInfo}
        options={{
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />

      {/* <Stack.Screen
        name="CategoryInterest"
        component={CategoryInterest}
        options={{
          title: 'Category Interest',
          presentation: 'fullScreenModal',
        }}
      /> */}

      <Stack.Screen
        name="FundWalletModal"
        component={FundWalletModal}
        options={{
          title: 'Fund Your Wallet',
          presentation: 'fullScreenModal',
          headerShown: true,
        }}
      />

      <Stack.Screen name="ErrandUserDetails" component={ErrandUserDetails} />

      <Stack.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="CategoryInterest"
        component={CategoryInterest}
        options={{
          title: 'Category Interest',
          presentation: 'fullScreenModal',
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileTitle}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ title: 'Verify Phone' }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactUs}
        options={{
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen name="Wallet" component={WalletScreen} />

      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EscrowScreen"
        component={EscrowScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Tabs" component={TabsNavigation} />
    </Stack.Navigator>
  )
}

export const MyErrandStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MyErrands" component={ErrandScreen} />

      <Stack.Screen
        name="CompleteErrandModal"
        component={CompleteErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />

      <Stack.Screen
        name="CancelErrandModal"
        component={CancelErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />
      <Stack.Screen
        name="AbandonErrandModal"
        component={AbandonErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />
      <Stack.Screen name="VerifyPhone" component={VerifyPhone} />
    </Stack.Navigator>
  )
}

export const MarketStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Market" component={MainScreen} />
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="ErrandUserDetails" component={ErrandUserDetails} /> */}
    </Stack.Navigator>
  )
}

export const WalletStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Wallet" component={WalletScreen} />
      {/* <Stack.Screen
        name="TransactionScreen"
        component={TransactionScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EscrowScreen"
        component={EscrowScreen}
        options={{ headerShown: false }}
      /> */}

      <Stack.Screen
        name="WalletAccount"
        component={WalletAccount}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="FundWalletModal"
        component={FundWalletModal}
        options={{
          title: 'Fund Your Wallet',
          presentation: 'fullScreenModal',
          headerShown: true,
        }}
      /> */}
    </Stack.Navigator>
  )
}

export const PostErrandStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      />
    </Stack.Navigator>
  )
}

export const SetttingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingScreen} />
      {/* <Stack.Screen
        name="CategoryInterest"
        component={CategoryInterest}
        options={{
          title: 'Category Interest',
          presentation: 'fullScreenModal',
        }}
      /> */}
    </Stack.Navigator>
  )
}
