import {
  AntDesign,
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native'
import React, { useEffect } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { CurvedBottomBarExpo } from 'react-native-curved-bottom-bar'
import { useIsConnected } from 'react-native-offline'
import { useSelector } from 'react-redux'
import { pushOut } from '../services/axios/http'
import { RootState, useAppDispatch } from '../services/store'
import colors from '../utils/colors'
import { getUserId } from '../utils/helper'
import {
  LandingPageStack,
  MarketStack,
  MyErrandStack,
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
  unmountOnBlur: boolean
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

  const route = useRoute()
  const nav = useNavigation()

  const routeName = getFocusedRouteNameFromRoute(route)

  useEffect(() => {
    pushOut({ navigation })
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [isConnected])

  const _renderIcon = ({ routeName, selectedTab }: any) => {
    switch (routeName) {
      case 'Home':
        return (
          <>
            {routeName === selectedTab ? (
              <Entypo
                name="home"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : 'gray'}
              />
            ) : (
              <AntDesign
                name="home"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : 'gray'}
              />
            )}
          </>
        )

      case 'Market':
        return (
          <>
            {routeName === selectedTab ? (
              <MaterialCommunityIcons
                name="shopping"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : '#484C52'}
              />
            ) : (
              <MaterialCommunityIcons
                name="shopping-outline"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : '#484C52'}
              />
            )}
          </>
        )

      case 'Errands':
        return (
          <MaterialIcons
            name="directions-run"
            size={25}
            color={routeName === selectedTab ? '#1E3A79' : '#484C52'}
          />
        )

      case 'Wallet':
        return (
          <>
            {routeName === selectedTab ? (
              <Entypo
                name="wallet"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : '#484C52'}
              />
            ) : (
              <Ionicons
                name="wallet-outline"
                size={25}
                color={routeName === selectedTab ? '#1E3A79' : '#484C52'}
              />
            )}
          </>
        )
    }
  }

  const renderTabBar = ({ routeName, selectedTab, navigate }: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        <>
          {_renderIcon({ routeName, selectedTab })}
          <Text
            style={{
              fontSize: 12,
              fontFamily: 'Poppins-Medium',
              fontWeight: '600',
              color: routeName === selectedTab ? '#09497D' : 'gray',
            }}
          >
            {routeName}
          </Text>
        </>
      </TouchableOpacity>
    )
  }

  return (
    // <Tab.Navigator
    //   initialRouteName="LandingPageTab"
    //   screenOptions={{
    //     tabBarShowLabel: false,
    //     tabBarStyle: {
    //       position: 'absolute',
    //       bottom: 0,
    //       backgroundColor: theme ? '#0c1730' : 'white',
    //       borderTopRightRadius: 10,
    //       borderTopLeftRadius: 10,
    //       borderBottomStartRadius: 20,
    //       height: 92,
    //       paddingTop: 0,
    //       ...styles.shadow,
    //     },
    //     headerShown: false,
    //     tabBarHideOnKeyboard: true,
    //   }}
    // >
    <CurvedBottomBarExpo.Navigator
      type="DOWN"
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      height={65}
      circleWidth={60}
      bgColor="white"
      screenOptions={{ headerShown: false }}
      initialRouteName="Home"
      borderTopLeftRight
      renderCircle={() => (
        <Animated.View style={styles.btnCircleUp}>
          <TouchableOpacity
            style={{
              backgroundColor: colors.DARK_BLUE,
            }}
            onPress={() => navigation.navigate('CreateErrand')}
            className={`bg-[#1E3A79] rounded-full h-[55px] w-[55px] flex-row justify-center items-center shadow-xl`}
          >
            <Text>
              <MaterialIcons
                name="add"
                size={24}
                color={theme ? 'black' : 'white'}
                // style={{ top: -40 }}
                className="shadow-lg"
              />
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}
      tabBar={renderTabBar}
    >
      {/* <Tab.Screen
        options={optionsHandler({
          title: 'Landing Page',
          headerShown: false,
          unmountOnBlur: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                  <Entypo
                    name="home"
                    size={24}
                    color={theme ? 'white' : '#09497D'}
                    style={{ marginLeft: 6 }}
                  />
                  <Text className="mt-2" style={{ color: textTheme }}>
                    Home
                  </Text>
                </>
              ) : (
                <>
                  <AntDesign
                    name="home"
                    size={24}
                    color={textTheme}
                    style={{ marginLeft: 6 }}
                  />
                  <Text className="mt-2" style={{ color: textTheme }}>
                    Home
                  </Text>
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
          unmountOnBlur: false,
          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View style={{}}>
              {focused ? (
                <>
                  <Fontisto
                    name="shopping-bag"
                    size={24}
                    color={'#09497D'}
                    style={{ textAlign: 'center' }}
                  />
                  <Text style={{ color: textTheme }}>Market Place</Text>
                </>
              ) : (
                <>
                  <Feather
                    name="shopping-bag"
                    size={24}
                    color={textTheme}
                    style={{ textAlign: 'center' }}
                  />
                  <Text style={{ color: textTheme }}>Market Place</Text>
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
          unmountOnBlur: false,

          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                  <MaterialCommunityIcons
                    name="clock-time-five"
                    size={24}
                    color="#09497D"
                    style={{ textAlign: 'center' }}
                  />
                  <Text className="mt-2" style={{ color: textTheme }}>
                    My Errands
                  </Text>
                </>
              ) : (
                <>
                  <Feather
                    name="clock"
                    size={24}
                    color={textTheme}
                    style={{ textAlign: 'center' }}
                  />
                  <Text
                    className="mt-2"
                    style={{ color: textTheme, textAlign: 'center' }}
                  >
                    {' '}
                    My Errands
                  </Text>
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
          unmountOnBlur: true,

          headerShown: false,
          tabBarIcon: ({ focused }: any) => (
            <View>
              {focused ? (
                <>
                  <Entypo
                    name="wallet"
                    size={26}
                    color={'#09497D'}
                    style={{ marginLeft: 6 }}
                  />
                  <Text style={{ color: textTheme }}>Wallet</Text>
                </>
              ) : (
                <>
                  <SimpleLineIcons
                    name="wallet"
                    size={24}
                    color={textTheme}
                    style={{ marginLeft: 6 }}
                  />
                  <Text style={{ color: textTheme }}>Wallet</Text>
                </>
              )}
            </View>
          ),
        })}
        name="WalletTab"
        component={WalletStack}
      /> */}
      <CurvedBottomBarExpo.Screen
        name={'Home'}
        position="LEFT"
        component={LandingPageStack}
      />
      <CurvedBottomBarExpo.Screen
        name={'Market'}
        position="LEFT"
        component={MarketStack}
      />
      <CurvedBottomBarExpo.Screen
        name={'Errands'}
        component={MyErrandStack}
        position="RIGHT"
      />
      <CurvedBottomBarExpo.Screen
        name={'Wallet'}
        component={WalletStack}
        position="RIGHT"
      />
      {/* </Tab.Navigator> */}
    </CurvedBottomBarExpo.Navigator>
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

  container: {
    flex: 1,
    padding: 20,
  },
  shawdow: {
    shadowColor: '#DDDDDD',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 5,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
  },
  bottomBar: {},
  btnCircleUp: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.DARK_BLUE,
    bottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 1,
  },
  imgCircle: {
    width: 30,
    height: 30,
    tintColor: 'gray',
  },
  tabbarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 30,
    height: 30,
  },
  screen1: {
    flex: 1,
    backgroundColor: '#BFEFFF',
  },
  screen2: {
    flex: 1,
    backgroundColor: '#FFEBCD',
  },
})
