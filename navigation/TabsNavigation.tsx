import {
  AntDesign,
  Feather,
  FontAwesome5,
  Fontisto,
  Ionicons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { ProfileInitials } from '../components/ProfileInitials'
import { RootState, useAppDispatch } from '../services/store'
import { getUserId } from '../utils/helper'
import {
  LandingPageStack,
  MarketStack,
  MyErrandStack,
  SetttingsStack,
  WalletStack,
} from './StackNavigation'

const Header = (props: any) => {
  return (
    <View style={{ flexDirection: 'row', margin: 15 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'black' }}>
        {props.name}
      </Text>
    </View>
  )
}

interface OptionsProps {
  headerShown: boolean
  title: string
  tabBarIcon: any
}

const Tab = createBottomTabNavigator()
export const TabsNavigation = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const [firstName, setFirstName] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [profilePic, setProfilePic] = React.useState('')
  const navigate = useNavigation()
  // const navigation = useNavigation()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const optionsHandler = ({ headerShown, title, tabBarIcon }: OptionsProps) => {
    return {
      headerShown,
      title,
      tabBarIcon,
      headerStyle: { backgroundColor: backgroundTheme, color: textTheme },
      headerTitleStyle: {
        color: textTheme,
      },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ marginLeft: 20 }}
          className="flex-row items-center justify-between my-3 px-3 "
        >
          <ProfileInitials
            firstName={firstName.charAt(0).toUpperCase()}
            lastName={lastName.charAt(0).toUpperCase()}
            profile_pic={profilePic}
            textClass="text-white text-base"
            width={35}
            height={35}
          />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View
          style={{ display: 'flex', flexDirection: 'row', marginRight: 20 }}
          className="flex-row items-center justify-between mx-0 px-3 py-3 "
        >
          <Ionicons
            onPress={() => navigation.navigate('Notification')}
            style={{ marginRight: 14 }}
            name="notifications-outline"
            color={textTheme}
            size={24}
          />

          <Feather
            onPress={() => navigation.navigate('Contact')}
            color={textTheme}
            size={24}
            name="help-circle"
          />
        </View>
      ),
    }
  }

  // const marketOptionsHandler = ({
  //   headerShown,
  //   title,
  //   tabBarIcon,
  // }: OptionsProps) => {
  //   return {
  //     headerShown,
  //     title,
  //     tabBarIcon,
  //     headerStyle: { backgroundColor: backgroundTheme, color: textTheme },
  //     headerTitleStyle: {
  //       color: textTheme,
  //     },
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         onPress={() => navigation.navigate('Profile')}
  //         style={{
  //           marginLeft: 20,
  //         }}
  //         className="flex-row items-center justify-between my-3 px-3 "
  //       >
  //         <View
  //           style={{
  //             display: 'flex',
  //             flexDirection: 'row',
  //             alignItems: 'center',
  //           }}
  //         >
  //           <ProfileInitials
  //             firstName={firstName.charAt(0).toUpperCase()}
  //             lastName={lastName.charAt(0).toUpperCase()}
  //             profile_pic={profilePic}
  //             textClass="text-white text-base"
  //             width={35}
  //             height={35}
  //           />
  //           <View
  //             style={{
  //                marginLeft: 10,
  //               display: 'flex',
  //               flexDirection: 'row',
  //               alignItems: 'center',
  //               justifyContent: 'space-between',
  //             }}
  //             // className="mt-3 flex-row items-center justify-between "
  //           >
  //             <Text
  //               className="font-bold text-[25px] leading-7"
  //               style={{ color: textTheme, fontSize: 20, fontWeight:800 }}
  //             >
  //               Errand Market
  //             </Text>
  //           </View>
  //         </View>
  //       </TouchableOpacity>
  //     ),

  //     headerRight: () => (
  //       <View
  //         style={{ display: 'flex', flexDirection: 'row', marginRight: 20 }}
  //         className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-5 "
  //       >
  //         {/* <MaterialIcons
  //           onPress={() => navigation.navigate('Notification')}
  //           style={{ marginRight: 10 }}
  //           name="notifications"
  //           color={textTheme}
  //           size={24}
  //         />
  //         <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
  //           <MenuTrigger>
  //             <Entypo name="dots-three-vertical" color={textTheme} size={22} />
  //           </MenuTrigger>
  //           <MenuOptions
  //             customStyles={{
  //               optionWrapper: {
  //                 marginTop: 10,
  //                 borderBottomColor: '#AAAAAA',
  //               },
  //               optionText: { textAlign: 'center', fontWeight: '600' },
  //             }}
  //           >
  //             <MenuOption
  //               onSelect={() => navigation.navigate('Contact')}
  //               text="Contact Us"
  //               customStyles={{
  //                 optionWrapper: {
  //                   paddingVertical: 6,
  //                 },
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //           </MenuOptions>
  //         </Menu> */}

  //         <View className="items-center flex-row gap-4 mr-2">
  //           <Text style={{ color: textTheme }}>
  //             <FontAwesome
  //               name="bell-o"
  //               size={24}
  //               onPress={() => {
  //                 navigation.navigate('Notification')
  //               }}
  //             />
  //           </Text>
  //         </View>
  //       </View>
  //     ),
  //   }
  // }

  const route = useRoute()
  const nav = useNavigation()

  const routeName = getFocusedRouteNameFromRoute(route)

  useEffect(() => {
    // dispatch(market({}))
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [])

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          // left: 25,
          // right: 20,
          backgroundColor: backgroundTheme,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          // borderRadius: 15,
          height: 70,
          // width:100
          paddingTop: 13,
          ...styles.shadow,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        options={optionsHandler({
          title: 'Landing Page',
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <AntDesign name="home" size={24} color={textTheme} />
              ) : (
                <AntDesign name="home" size={24} color={textTheme} />
              )}
            </View>
          ),
        })}
        name="Landing Page"
        component={LandingPageStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'Errand Market',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <Feather name="search" size={26} color={textTheme} />
              ) : (
                <Feather name="search" size={24} color={textTheme} />
              )}
            </View>
          ),
        })}
        name="MarketTab"
        component={MarketStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'My Errands',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <FontAwesome5 name="running" size={26} color={textTheme} />
              ) : (
                <FontAwesome5 name="running" size={24} color={textTheme} />
              )}
            </View>
          ),
        })}
        name="MyErrandTab"
        component={MyErrandStack}
      />

      <Tab.Screen
        options={optionsHandler({
          title: 'Wallet',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <Ionicons name="wallet-outline" size={26} color={textTheme} />
              ) : (
                <Ionicons name="wallet-outline" size={24} color={textTheme} />
              )}
            </View>
          ),
        })}
        name="WalletTab"
        component={WalletStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <Fontisto name="player-settings" size={26} color={textTheme} />
              ) : (
                <Fontisto name="player-settings" size={26} color={textTheme} />
              )}
            </View>
          ),
        })}
        name="SettingsTab"
        component={SetttingsStack}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 100,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
})
