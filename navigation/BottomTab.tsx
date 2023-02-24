import {
  AntDesign,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AccountScreen from '../screens/Accounts'
import ErrandScreen from '../screens/Errands'
import MainScreen from '../screens/Errands/MainScreen'
import PostErrand from '../screens/PostErrand/PostErrand'

const Tab = createBottomTabNavigator()

const BottomTab = () => {
  return (
    <Tab.Navigator
      // backBehavior="Home"
      initialRouteName="Feeds"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: 'absolute',
          bottom: 5,
          left: 25,
          right: 20,
          backgroundColor: '#ffffff',
          borderRadius: 15,
          height: 90,
          ...styles.shadow,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Feeds"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <AntDesign name="home" size={24} color="#243763" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )}
              <Text
                style={{ fontSize: 10, paddingTop: 1 }}
                className={focused ? 'text-[#243763]' : ''}
              >
                Feeds
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Errands"
        component={ErrandScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <FontAwesome5 name="running" size={24} color="#243763" />
              ) : (
                <FontAwesome5 name="running" size={24} color="black" />
              )}
              <Text
                style={{ fontSize: 10, paddingTop: 1 }}
                className={focused ? 'text-[#243763]' : ''}
              >
                Errand
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PostErrands"
        component={PostErrand}
        options={{
           tabBarStyle: {
            display: 'none'
          },
          tabBarIcon: ({ focused }) => (
            <View style={{ ...styles.shadow }}>
              {focused ? (
                <Ionicons
                  name="add-circle"
                  size={75}
                  color="#243763"
                  style={{ top: -40 }}
                  className="shadow-lg"
                />
              ) : (
                <Ionicons
                  name="add-circle"
                  size={75}
                  color="#243763"
                  style={{ top: -40 }}
                  className="shadow-lg"
                />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Wallet"
        component={MainScreen}
        options={{
          // tabBarLabel:"Wallet",
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Ionicons name="wallet-outline" size={24} color="#243763" />
              ) : (
                <Ionicons name="wallet-outline" size={24} color="black" />
              )}
              <Text
                style={{ fontSize: 10, paddingTop: 2 }}
                className={focused ? 'text-[#243763]' : ''}
              >
                Wallet
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          // tabBarLabel:"",
          tabBarIconStyle: { color: 'black' },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <MaterialCommunityIcons
                  name="account-cog-outline"
                  size={28}
                  color="#243763"
                />
              ) : (
                <MaterialCommunityIcons
                  name="account-cog-outline"
                  size={28}
                  color="black"
                />
              )}
              <Text
                style={{ fontSize: 10 }}
                className={focused ? 'text-[#243763]' : ''}
              >
                Account
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
})

export default BottomTab
