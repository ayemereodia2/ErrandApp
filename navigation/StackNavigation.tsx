import { createNavigationContainerRef } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import FundWalletModal from '../components/Modals/Errands/FundWallet'
import AboutSwave from '../screens/AboutSwave/AboutSwave'
import AdsScreen from '../screens/AdsScreen'
import AccountRecoveryScreen from '../screens/Auth/AccountRecovery'
import CreateAccountScreen from '../screens/Auth/CreateAccountScreen'
import ForgotPassword from '../screens/Auth/ForgotPassword'
import LoginScreen from '../screens/Auth/LoginScreen'
import SecurityQuestion from '../screens/Auth/SecurityQuestionScreen'
import VerifyOtpScreen from '../screens/Auth/VerifyOtp'
import VerifyPhone from '../screens/Auth/VerifyPhone'
import VerifyQuestion from '../screens/Auth/VerifyQuestion'
import ContactUs from '../screens/Contact/ContactUs'
import PostErrand from '../screens/CreateErrand'
import EditProfileTitle from '../screens/EditProfile/EditProfileTitle'
import ErrorScreen from '../screens/Error'
import GuestMarket from '../screens/Guest/GuestMarket'
import GuestMarketDetails from '../screens/Guest/GuestMarketDetails'
import LandingForm from '../screens/Landing/LandingForm'
import LandingTest from '../screens/Landing/LandingTest'
import ErrandDetails from '../screens/Market/ErrandDetails'
import MainScreen from '../screens/Market/MainScreen'
import AbandonErrandModal from '../screens/Modal/AbandonErrandModal'
import CancelErrandModal from '../screens/Modal/CancelErrandModal'
import CompleteErrandModal from '../screens/Modal/CompleteErrandModal'
import ErrandScreen from '../screens/MyErrands'
import ErrandUserDetails from '../screens/MyErrands/ErrandUserDetails'
import MyErrandInfo from '../screens/MyErrands/MyErrandInfo'
import RejectErrandScreen from '../screens/MyErrands/RejectErrandScreen'
import NotificationScreen from '../screens/Notification/NotficationScreen'
import OnboardingUi from '../screens/Onboarding/OnboardingUi'
import PrivacyPolicy from '../screens/Privacy/PrivacyPolicy'
import AccountScreen from '../screens/Profile'
import CategoryInterest from '../screens/Settings/AddCategory'
import SettingScreen from '../screens/Settings/SettingScreen'
import TermsAndConditions from '../screens/Terms & Condition/TermsAndConditions'
import UpdateAppScreen from '../screens/UpdateAppScreen'
import WalletScreen from '../screens/Wallets'
import EscrowScreen from '../screens/Wallets/EscrowScreen'
import TransactionScreen from '../screens/Wallets/TransactionScreen'
import WalletAccount from '../screens/Wallets/WalletAccount'
import { getAppVersion } from '../utils/helper'
import { TabsNavigation } from './TabsNavigation'

const Stack = createNativeStackNavigator()

export const navigationRef = createNavigationContainerRef()

export function navigateToScreen(name: any) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name)
  }
}

export const TabStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* <Stack.Screen name="Home" component={HomeScreen} /> */}

      <Stack.Screen name="Tabs" component={TabsNavigation} />

      <Stack.Screen
        name="GuestScreen"
        component={GuestMarket}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GuestDetails"
        component={GuestMarketDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen name="MyErrands" component={ErrandScreen} /> */}

      <Stack.Screen
        name="UpdateApp"
        component={UpdateAppScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ErrandDetails"
        component={ErrandDetails}
      />

      {/* <Stack.Screen name="Market" component={MainScreen} /> */}

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SecurityQuestions" component={SecurityQuestion} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="RecoverPassword" component={ForgotPassword} />
      <Stack.Screen name="VerifyQuestion" component={VerifyQuestion} />
      <Stack.Screen name="RecoverAccount" component={AccountRecoveryScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="RejectErrand" component={RejectErrandScreen} />

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
        name="AbandonErrandModal"
        component={AbandonErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />

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
        name="WalletAccount"
        component={WalletAccount}
        options={{ headerShown: false }}
      />

      {/* <Stack.Screen
        name="Withd"
        component={WalletAccount}
        options={{ headerShown: false }}
      /> */}

      {/* <Stack.Screen
        name="CategoryInterest"
        component={CategoryInterest}
        options={{
          title: 'Category Interest',
          presentation: 'fullScreenModal',
        }}
      /> */}

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      />

      <Stack.Screen name="LandingForm" component={LandingForm} />

      {/* <Stack.Screen
        name="LandingForm"
        component={LandingForm}
        options={{ headerShown: false }}
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
        name="About"
        component={AboutSwave}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
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
    </Stack.Navigator>
  )
}

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
          name="Default"
          component={AdsScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestScreen"
          component={GuestMarket}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="GuestDetails"
          component={GuestMarketDetails}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SecurityQuestions" component={SecurityQuestion} />
        <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
        <Stack.Screen name="RecoverPassword" component={ForgotPassword} />
        <Stack.Screen name="RejectErrand" component={RejectErrandScreen} />

        <Stack.Screen
          name="UpdateApp"
          component={UpdateAppScreen}
          options={{ headerShown: false }}
        />

        {/* <Stack.Screen name="Market" component={MainScreen} /> */}

        <Stack.Screen name="VerifyQuestion" component={VerifyQuestion} />

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
          name="AbandonErrandModal"
          component={AbandonErrandModal}
          options={{ title: 'Modal', presentation: 'fullScreenModal' }}
        />
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
          options={{
            headerShown: false,
          }}
          name="CreateErrand"
          component={PostErrand}
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
          name="About"
          component={AboutSwave}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="Privacy"
          component={PrivacyPolicy}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="Terms"
          component={TermsAndConditions}
          options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen
          name="WalletAccount"
          component={WalletAccount}
          options={{ headerShown: false }}
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
        <Stack.Screen name="ErrandUserDetails" component={ErrandUserDetails} />
        <Stack.Screen
          name="MyErrandDetails"
          component={MyErrandInfo}
          options={{
            headerStyle: {
              backgroundColor: '#F8F9FC',
            },
          }}
        />
        <Stack.Screen name="LandingForm" component={LandingForm} />
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
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GuestScreen"
        component={GuestMarket}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="GuestDetails"
        component={GuestMarketDetails}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="UpdateApp"
        component={UpdateAppScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{ headerShown: false }}
        name="ErrandDetails"
        component={ErrandDetails}
      />

      {/* <Stack.Screen name="Market" component={MainScreen} /> */}

      <Stack.Screen
        name="AbandonErrandModal"
        component={AbandonErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />

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

      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SecurityQuestions" component={SecurityQuestion} />
      <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
      <Stack.Screen name="RecoverPassword" component={ForgotPassword} />

      <Stack.Screen name="VerifyQuestion" component={VerifyQuestion} />
      <Stack.Screen name="RecoverAccount" component={AccountRecoveryScreen} />
      <Stack.Screen name="VerifyOtp" component={VerifyOtpScreen} />
      <Stack.Screen name="RejectErrand" component={RejectErrandScreen} />

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
        name="WalletAccount"
        component={WalletAccount}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      />

      <Stack.Screen name="LandingForm" component={LandingForm} />

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
        name="About"
        component={AboutSwave}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="Privacy"
        component={PrivacyPolicy}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="Terms"
        component={TermsAndConditions}
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
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      /> */}

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
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      /> */}
      <Stack.Screen
        name="ErrorScreen"
        component={ErrorScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen name="ErrandUserDetails" component={ErrandUserDetails} /> */}
    </Stack.Navigator>
  )
}

export const LandingPageStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LandingPage"
        component={LandingTest}
        // options={{
        //   headerShown: false,
        //   title: '',
        //   headerStyle: {
        //     backgroundColor: '#F8F9FC',
        //   },
        // }}
      />

      <Stack.Screen
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen name="MyErrands" component={ErrandScreen} />
      <Stack.Screen name="Market" component={MainScreen} />

      {/* <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="CreateErrand"
        component={PostErrand}
      /> */}
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
      {/* <Stack.Screen
        options={{ headerShown: false }}
        name="ErrandDetails"
        component={ErrandDetails}
      /> */}
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
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      />
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

// export const PostErrandStack = () => {
//   return (
//     <Stack.Navigator screenOptions={{ headerShown: false }}>
//       <Stack.Screen
//         options={{
//           headerShown: false,
//         }}
//         name="CreateErrand"
//         component={PostErrand}
//       />
//     </Stack.Navigator>
//   )
// }

export const SetttingsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={SettingScreen} />
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

      {/* <Stack.Screen
        name="Default"
        component={AdsScreen}
        options={{ headerShown: false }}
      /> */}
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
