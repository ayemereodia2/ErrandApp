import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import { BottomSheetModal } from '@gorhom/bottom-sheet'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useIsConnected } from 'react-native-offline'
import { useSelector } from 'react-redux'

import { ProfileInitials } from '../components/ProfileInitials'
import { pushOut } from '../services/axios/http'
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
  const isConnected = useIsConnected()

  // const navigation = useNavigation()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const optionsHandler = ({ headerShown, title, tabBarIcon }: OptionsProps) => {
    const bottomSheetRef1 = useRef<BottomSheetModal>(null)

    function openMoreModal() {
      bottomSheetRef1.current?.present()
    }

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
          {/* <Feather
            onPress={() => navigation.navigate('Contact')}
            color={textTheme}
            size={24}
            name="help-circle"
          /> */}
          <TouchableOpacity onPress={openMoreModal}>
            <Text style={{ color: textTheme }}>
              <Entypo name="dots-three-vertical" size={24} />
            </Text>
          </TouchableOpacity>
        </View>
      ),
    }
  }

  const route = useRoute()
  const nav = useNavigation()

  const routeName = getFocusedRouteNameFromRoute(route)

  useEffect(() => {
    pushOut({ navigation })
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [isConnected])

  return (
    <Tab.Navigator
      initialRouteName="LandingPageTab"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 0,
          // left: 25,
          // right: 20,
          backgroundColor: theme ? '#0c1730' : 'white',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
          // borderRadius: 15,
          height: 80,
          // width:100
          paddingTop: 0,
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
                <>
                <Entypo
                  name="home"
                  size={24}
                  color={theme ? 'white' : 'black'}
                  style={{marginLeft: 6}}
                />
                <Text style={{color: textTheme}}>Home</Text>
                </>
              ) : (
                <>
                <AntDesign name="home" size={24} color={textTheme} style={{marginLeft: 6}}/>
                <Text style={{color: textTheme}}>Home</Text>
                </>
              )}
            </View>
          ),
        })}
        name="LandingPageTab"
        component={LandingPageStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'Errand Market',
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                <FontAwesome name="search" size={24} color={textTheme} style={{marginLeft: 6}}/>
                <Text style={{color: textTheme}}>Market</Text>
                </>
              ) : (
                <>
                 <Feather name="search" size={24} color={textTheme} style={{marginLeft: 6}}/>
                 <Text style={{color: textTheme}}>Market</Text>
                </>
               
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
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                <MaterialIcons name="run-circle" size={30} color={textTheme} style={{marginLeft: 8}}/>
                <Text style={{color: textTheme}}>Errands</Text>
                </>
              ) : (
                <>
                <FontAwesome5 name="running" size={24} color={textTheme} style={{marginLeft: 8}}/>
                <Text style={{color: textTheme}}>Errands</Text>
                </>
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
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
               <Entypo name="wallet" size={26} color={textTheme} style={{marginLeft: 6}}/> 
                <Text style={{color: textTheme}}>Wallet</Text>
                </>
              ) : (
                <>
                <SimpleLineIcons name="wallet" size={24} color={textTheme} style={{marginLeft: 6}}/>
                <Text style={{color: textTheme}}>Wallet</Text>
                </>
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
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                <Fontisto name="player-settings" size={26} color={textTheme} style={{marginLeft: 6}} />
                <Text style={{color: textTheme}}>Settings</Text>
                </>
                
              ) : (
                <>
                <Ionicons name="settings-outline" size={26} color={textTheme} style={{marginLeft: 7}}/>
                <Text style={{color: textTheme}}>Settings</Text>
                </>
                
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
