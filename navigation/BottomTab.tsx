import { AntDesign, FontAwesome5, Fontisto, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, View } from 'react-native'
import MainScreen from '../screens/Market'
import ErrandScreen from '../screens/MyErrands'
// import PostErrand from '../screens/CreateErrand'
import PostErrand from '../screens/CreateErrand'
import SettingScreen from '../screens/Settings'
import WalletScreen from '../screens/Wallets'

const Tab = createBottomTabNavigator()

const getHeaderTitle = (routeName: string) => {
  switch (routeName) {
    case 'Tab1':
      return 'Header for Tab 1'
    case 'Tab2':
      return 'Header for Tab 2'
    // Add more cases for other tabs
    default:
      return 'Default Header'
  }
}

const BottomTab = () => {
  // const route = useRoute()
  // const navigation = useNavigation()
  // const headerTitle = getHeaderTitle(route.name)

  // useLayoutEffect(() => {
  //   navigation.setOptions({ headerTitle })
  // }, [navigation, headerTitle])

  return (
    <Tab.Navigator
      // backBehavior="Home"
      initialRouteName="Main"
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
          paddingTop: Platform.OS === 'ios' ? 60 : 20,
          ...styles.shadow,
        },
        headerShown: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <AntDesign name="home" size={24} color="#243763" />
              ) : (
                <AntDesign name="home" size={24} color="black" />
              )}
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
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="PostErrands"
        component={PostErrand}
        options={{
          tabBarStyle: {
            display: 'none',
          },
          tabBarIcon: ({ focused }) => (
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
        }}
      />
      <Tab.Screen
        name="Wallets"
        component={WalletScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Ionicons name="wallet-outline" size={24} color="#243763" />
              ) : (
                <Ionicons name="wallet-outline" size={24} color="black" />
              )}
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settin"
        component={SettingScreen}
        options={{
          // tabBarLabel:"",
          tabBarIconStyle: { color: 'black' },
          tabBarIcon: ({ focused }) => (
            <View>
              {focused ? (
                <Fontisto name="player-settings" size={26} color="#243763" />
              ) : (
                <Fontisto name="player-settings" size={26} color="black" />
              )}
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
      width: 100,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
})

export default BottomTab
