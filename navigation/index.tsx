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
import AccountRecoveryScreen from '../screens/Auth/AccountRecovery'
import { default as CreateAccountScreen } from '../screens/Auth/CreateAccountScreen'
import HomeScreen from '../screens/Auth/HomeScreen'
import LoginScreen from '../screens/Auth/LoginScreen'
import RecoverPasswordScreen from '../screens/Auth/RecoverPassword'
import SecurityQuestion from '../screens/Auth/SecurityQuestionScreen'
import VerifyOtpScreen from '../screens/Auth/VerifyOtp'
import VerifyPhone from '../screens/Auth/VerifyPhone'
import CreateFinance from '../screens/CreateErrand/CreateFinance'
import CreateTasks from '../screens/CreateErrand/CreateTasks'
import ErrandLocation from '../screens/CreateErrand/ErrandLocation'
import ErrandReview from '../screens/CreateErrand/ErrandReview'
import EditProfileTitle from '../screens/EditProfile/EditProfileTitle'
import ErrandDetails from '../screens/Market/ErrandDetails'
import Modal from '../screens/Modal'
import MyErrandInfo from '../screens/MyErrands/MyErrandInfo'
import ProfileScreen from '../screens/ProfileScreen/index'
import WalletScreen from '../screens/Wallets'
import { RootStackParamList } from '../types'
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
  const navigate = useNavigation()
  return (
    <Stack.Navigator>
      {/* <Stack.Screen name="Root" component={BottomTab} options={{ headerShown: false }} /> */}

      {/* <Stack.Screen
        name="SecurityQuestions"
        component={SecurityQuestion}
        options={{ title: 'Security Question' }}
      /> */}
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'Home' }}
      />
      <Stack.Screen
        name="Main"
        component={BottomTab}
        options={{
          headerShown: false,
        }}
        // options={{
        //   title: '',
        //   headerStyle: {},
        //   headerLeft: () => (
        //     <View className="flex-row items-center justify-between mx-0 px-3 py-3 shadow-sm mt-2 bg-white">
        //       <TouchableOpacity
        //         onPress={() => navigate.openDrawer()}
        //         className="flex-row items-center"
        //       >
        //         <ProfileInitials firstName="Azubike" lastName="Orji" />
        //       </TouchableOpacity>
        //     </View>
        //   ),
        //   headerTitle: () => (
        //     <View className="flex-row items-center justify-center">
        //       <Image
        //         style={{
        //           width: 34,
        //           height: 34,
        //           resizeMode: 'contain',
        //         }}
        //         source={require('../assets/images/cropped.jpg')}
        //       />
        //     </View>
        //   ),
        //   // header

        //   headerRight: () => (
        //     <EvilIcons name="search" size={30} color="#243763" />
        //   ),
        //   headerTitleStyle: {
        //     fontSize: 20,
        //     fontWeight: '300',
        //   },
        //   headerShadowVisible: true,
        // }}
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
        name="Login"
        component={LoginScreen}
        options={{ title: 'Login' }}
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
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />

      <Stack.Screen
        name="Modal"
        component={Modal}
        options={{ title: 'Modal' }}
      />
      <Stack.Screen
        name="VerifyPhone"
        component={VerifyPhone}
        options={{ title: 'Verify Phone' }}
      />

      <Stack.Screen
        name="CreateErrand"
        component={CreateTasks}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ErrandLocation"
        component={ErrandLocation}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="CreateFinance"
        component={CreateFinance}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="ErrandReview"
        component={ErrandReview}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfileTitle}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="MyErrandDetails"
        component={MyErrandInfo}
        options={{
          headerStyle: {
            backgroundColor: '#243763',
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
