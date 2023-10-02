import {
  AntDesign,
  Entypo,
  FontAwesome5,
  Fontisto,
  Ionicons,
  MaterialIcons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation, useRoute, getFocusedRouteNameFromRoute } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { ProfileInitials } from '../components/ProfileInitials'
import { useAppDispatch } from '../services/store'
import { getUserId } from '../utils/helper'
import {
  MarketStack,
  MyErrandStack,
  PostErrandStack,
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
export const TabsNavigation = ({navigation}: any) => {
  const dispatch = useAppDispatch()
  const [firstName, setFirstName] = React.useState('')
  const [userId, setUserId] = React.useState('')
  const [lastName, setLastName] = React.useState('')
  const [profilePic, setProfilePic] = React.useState('')
  const navigate = useNavigation()
  // const navigation = useNavigation()

  const optionsHandler = ({ headerShown, title, tabBarIcon }: OptionsProps) => {
    return {
      headerShown,
      title,
      tabBarIcon,
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ marginLeft: 12 }}
          className="flex-row items-center justify-between my-3 "
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
          style={{ display: 'flex', flexDirection: 'row', marginRight: 10 }}
          className="flex-row items-center justify-between mx-0 px-3 py-3 space-x-5 "
        >
          <MaterialIcons
            style={{ marginRight: 10 }}
            name="notifications"
            color={'black'}
            size={24}
          />
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={22} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  marginTop: 10,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => navigation.navigate('Contact')}
                text="Contact Us"
                customStyles={{
                  optionWrapper: {
                    paddingVertical: 6,
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      ),
    }
  }


  const route = useRoute()
  const nav = useNavigation()

  const routeName = getFocusedRouteNameFromRoute(route)

  console.log(">>>>route", routeName)
  

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
          backgroundColor: '#ffffff',
          borderRadius: 15,
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
          title: 'Errand Market',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <AntDesign name="home" size={24} color="#243763" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )}
            </View>
          ),
        })}
        name="MarketTab"
        component={MarketStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'My Errrands',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <FontAwesome5 name="running" size={24} color="#243763" />
              ) : (
                <FontAwesome5 name="running" size={24} color="black" />
              )}
            </View>
          ),
        })}
        name="MyErrandTab"
        component={MyErrandStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'Create Errand',
          headerShown: false,
          
          tabBarIcon: ({ focused }: any) => (
            <View>
              <Ionicons
                name="add-circle"
                size={30}
                color="#243763"
                // style={{ top: -40 }}
                className="shadow-lg"
              />
            </View>
          ),
        })}
        name="PostErrandTab"
        component={PostErrandStack}
      />
      <Tab.Screen
        options={optionsHandler({
          title: 'Wallet',
          headerShown: true,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <Ionicons name="wallet-outline" size={24} color="#243763" />
              ) : (
                <Ionicons name="wallet-outline" size={24} color="black" />
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
                <Fontisto name="player-settings" size={26} color="#243763" />
              ) : (
                <Fontisto name="player-settings" size={26} color="black" />
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
