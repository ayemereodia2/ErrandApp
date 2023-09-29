/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { TouchableOpacity } from 'react-native'
import FundWalletModal from '../components/Modals/Errands/FundWallet'
import AccountRecoveryScreen from '../screens/Auth/AccountRecovery'
import { default as CreateAccountScreen } from '../screens/Auth/CreateAccountScreen'
import HomeScreen from '../screens/Auth/HomeScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import RecoverPasswordScreen from '../screens/Auth/RecoverPassword'
import SecurityQuestion from '../screens/Auth/SecurityQuestionScreen'
import VerifyOtpScreen from '../screens/Auth/VerifyOtp'
import VerifyPhone from '../screens/Auth/VerifyPhone'
import ContactUs from '../screens/Contact/ContactUs'

import PostErrand from '../screens/CreateErrand'
import EditProfileTitle from '../screens/EditProfile/EditProfileTitle'
import ErrandTimeline from '../screens/ErrandTimeline/ErrandTimeline'
import ErrandDetails from '../screens/Market/ErrandDetails'
import AbandonErrandModal from '../screens/Modal/AbandonErrandModal'
import CancelErrandModal from '../screens/Modal/CancelErrandModal'
import CompleteErrandModal from '../screens/Modal/CompleteErrandModal'
import ErrandUserDetails from '../screens/MyErrands/ErrandUserDetails'
import MyErrandInfo from '../screens/MyErrands/MyErrandInfo'
import CategoryInterest from '../screens/Setting/AddCategory'
import SettingScreen from '../screens/Setting/SettingScreen'
import WalletScreen from '../screens/Wallets'
import AccountStatement from '../screens/Wallets/AccountStatement'
import EscrowScreen from '../screens/Wallets/EscrowScreen'
import TransactionScreen from '../screens/Wallets/TransactionScreen'
import WalletAccount from '../screens/Wallets/WalletAccount'
import WithdrawalScreen from '../screens/Wallets/WithdrawalScreen'
import { useAppDispatch } from '../services/store'
import { RootStackParamList } from '../types'
import { getUserId } from '../utils/helper'
import BottomTab from './BottomTab'
import DrawerNavigator from './DrawerNav'

// import DrawerNav from './DrawerNav'

export default function Navigation() {
  return (
    <NavigationContainer>
      {/* <RootNavigator /> */}
      <DrawerNavigator />
    </NavigationContainer>
  )
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

export function RootNavigator() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [firstName, setFirstName] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [profilePic, setProfilePic] = React.useState('')
  const navigate = useNavigation()

  React.useEffect(() => {
    // dispatch(market({}))
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="CreateErrand"
        component={PostErrand}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          headerShown: false,
          title: '',
          headerStyle: {},

          headerTitleStyle: {
            fontSize: 20,
            fontWeight: '300',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="ErrandUserDetails"
        component={ErrandUserDetails}
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
          title: 'Errand Details',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigate.navigate('MyErrandDetails')}
            >
              <AntDesign name="arrowleft" size={24} color="#243763" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
          headerShadowVisible: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingScreen}
        options={{ title: 'Settings' }}
      />
      <Stack.Screen
        name="SecurityQuestions"
        component={SecurityQuestion}
        options={{ title: 'Security Question' }}
      />
      <Stack.Screen
        name="CreateAccount"
        component={CreateAccountScreen}
        options={{ title: 'Create An Account' }}
      />
      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPasswordScreen}
        options={{ title: 'Recover Password' }}
      />
      <Stack.Screen
        name="RecoverAccount"
        component={AccountRecoveryScreen}
        options={{ title: 'Recover Account' }}
      />
      <Stack.Screen
        name="VerifyOtp"
        component={VerifyOtpScreen}
        options={{ title: 'Recover Account' }}
      />
      {/* <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      /> */}

      <Stack.Screen
        name="CompleteErrandModal"
        component={CompleteErrandModal}
        options={{ title: 'Modal', presentation: 'fullScreenModal' }}
      />

      <Stack.Screen
        name="FundWalletModal"
        component={FundWalletModal}
        options={{ title: 'Fund Your Wallet', presentation: 'fullScreenModal' }}
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
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ title: 'Verify Phone' }}
      />

      <Stack.Screen
        name="CategoryInterest"
        component={CategoryInterest}
        options={{ title: 'Category Interest', presentation: 'fullScreenModal' }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileTitle}
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

      <Stack.Screen
        name="WalletAccount"
        component={WalletAccount}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WithdrawalScreen"
        component={WithdrawalScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="AccountStatement"
        component={AccountStatement}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ErrandTimeline"
        component={ErrandTimeline}
        options={{ headerShown: false }}
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
        name="Contact Us"
        component={ContactUs}
        options={{
          headerStyle: {
            backgroundColor: '#F8F9FC',
          },
        }}
      />
      <Stack.Screen
        name="ErrandDetails"
        component={ErrandDetails}
        options={{
          title: 'Errand',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigate.navigate('Main')}>
              <AntDesign name="arrowleft" size={24} color="#243763" />
            </TouchableOpacity>
          ),
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '600',
          },
          headerShadowVisible: false,
        }}
      />
    </Stack.Navigator>
  )
}

// const DrawerNav = () => {
//   return (
//       <Drawer.Navigator initialRouteName="Feeds">
//         <Drawer.Screen name="" component={BottomTab} />
//         {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
//       </Drawer.Navigator>
//   )
// }

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
// const BottomTab = createBottomTabNavigator<RootTabParamList>()

// function BottomTabNavigator() {
//   const colorScheme = useColorScheme();

//   return (
//     <BottomTab.Navigator
//       initialRouteName="TabOne"
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme].tint,
//       }}>
//       <BottomTab.Screen
//         name="TabOne"
//         component={TabOneScreen}
//         options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
//           title: 'Tab One',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//           headerRight: () => (
//             <Pressable
//               onPress={() => navigation.navigate('Modal')}
//               style={({ pressed }) => ({
//                 opacity: pressed ? 0.5 : 1,
//               })}>
//               <FontAwesome
//                 name="info-circle"
//                 size={25}
//                 color={Colors[colorScheme].text}
//                 style={{ marginRight: 15 }}
//               />
//             </Pressable>
//           ),
//         })}
//       />
//       <BottomTab.Screen
//         name="TabTwo"
//         component={TabTwoScreen}
//         options={{
//           title: 'Tab Two',
//           tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
//         }}
//       />
//     </BottomTab.Navigator>
//   );
// }

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name']
  color: string
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
