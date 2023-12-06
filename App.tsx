/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
// import messaging from '@react-native-firebase/messaging'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
// import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NetworkProvider } from 'react-native-offline'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
// import {  useSelector} from 'react-redux'
import { StatusBar, useColorScheme } from 'react-native'
import ErrorBoundary from './components/ErrorBoundary'
// import useColorScheme from './hooks/useColorScheme'
import messaging from '@react-native-firebase/messaging'
import { Asset } from 'expo-asset'
import * as Notifications from 'expo-notifications'
import * as SplashScreen from 'expo-splash-screen'
import { useOnlineManager } from './hooks/useOnlineManager'
import MainNavigation from './navigation/MainNavigation'
import { GuestStack, navigationRef } from './navigation/StackNavigation'
import { _fetch } from './services/axios/http'
import { store } from './services/store'
import { getAppVersion } from './utils/helper'

const queryClient = new QueryClient()

function cacheImages(images: any) {
  return images.map((image: any) => {
    if (typeof image === 'string') {
      return Image.prefetch(image)
    } else {
      return Asset.fromModule(image).downloadAsync()
    }
  })
}

export default function App({ navigation }: any) {
  const [appIsReady, setAppIsReady] = useState(false)
  // const versionCode = '1.0.3'

  const [isGuest, setIsGuest] = useState<any>()
  const colorScheme = useColorScheme()

  useOnlineManager()

  // useEffect(() => {
  //   const checkLoggedIn = async () => {
  //     return await AsyncStorage.getItem('accessToken')
  //   }

  //   const requestUserPermission = async () => {
  //     const checked = await checkLoggedIn()
  //     console.log('>>>>checked')

  //     if (checked) {
  //       const authStatus = await messaging().requestPermission()
  //       const enabled =
  //         authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //         authStatus === messaging.AuthorizationStatus.PROVISIONAL

  //       if (enabled) {
  //         console.log('Authorization status:', authStatus)
  //       }
  //     } else {
  //       return false
  //     }
  //   }
  //   if (requestUserPermission()) {
  //     messaging()
  //       .getToken()
  //       .then(async (token) => {
  //         console.log('>>>>token', token)
  //         const rs = await _fetch({
  //           method: 'PUT',
  //           _url: `/user/mobile/token`,
  //           body: { mobile_token: token },
  //         })
  //         const _rs = await rs.json()

  //         console.log('>>>>>>>>>', _rs.success)
  //       })
  //   } else {
  //     console.log('failed token state')
  //   }

  //   // Set up the notification handler for the app
  //   Notifications.setNotificationHandler({
  //     handleNotification: async () => ({
  //       shouldShowAlert: true,
  //       shouldPlaySound: true,
  //       shouldSetBadge: false,
  //     }),
  //   })

  //   // Handle user clicking on a notification and open the screen
  //   const handleNotificationClick = async (response: any) => {
  //     const screen = response?.notification?.request?.content?.data?.screen
  //     if (screen !== null) {
  //       navigation.navigate(screen)
  //     }
  //   }

  //   // Listen for user clicking on a notification
  //   const notificationClickSubscription = Notifications.addNotificationResponseReceivedListener(
  //     handleNotificationClick,
  //   )

  //   // Handle push notifications when the app is in the foreground
  //   const handlePushNotification = async (remoteMessage: any) => {
  //     const notification = {
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       data: remoteMessage.data, // optional data payload
  //     }

  //     // Schedule the notification with a null trigger to show immediately
  //     await Notifications.scheduleNotificationAsync({
  //       content: notification,
  //       trigger: null,
  //     })
  //   }

  //   // Handle user opening the app from a notification (when the app is in the background)
  //   messaging().onNotificationOpenedApp((remoteMessage: any) => {
  //     console.log(
  //       'Notification caused app to open from background state:',
  //       remoteMessage.data.screen,
  //       navigation,
  //     )
  //     if (remoteMessage?.data?.screen) {
  //       // navigation.navigate(`${remoteMessage.data.screen}`)
  //     }
  //   })

  //   // Check if the app was opened from a notification (when the app was completely quit)
  //   messaging()
  //     .getInitialNotification()
  //     .then((remoteMessage: any) => {
  //       if (remoteMessage) {
  //         console.log(
  //           'Notification caused app to open from quit state:',
  //           remoteMessage.notification,
  //         )
  //         if (remoteMessage?.data?.screen) {
  //           // navigation.navigate(`${remoteMessage.data.screen}`)
  //         }
  //       }
  //     })

  //   // Handle push notifications when the app is in the background
  //   messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
  //     console.log('Message handled in the background!', remoteMessage)
  //     const notification = {
  //       title: remoteMessage.notification.title,
  //       body: remoteMessage.notification.body,
  //       data: remoteMessage.data, // optional data payload
  //     }

  //     // Schedule the notification with a null trigger to show immediately
  //     await Notifications.scheduleNotificationAsync({
  //       content: notification,
  //       trigger: null,
  //     })
  //   })

  //   // Listen for push notifications when the app is in the foreground
  //   const unsubscribe = messaging().onMessage(handlePushNotification)

  //   // Clean up the event listeners
  //   return () => {
  //     unsubscribe()
  //     notificationClickSubscription.remove()
  //   }
  // }, [])

  useEffect(() => {
    getAppVersion()
    // check if user is authenticated
    checkAuthenticationStatus()
    // checks network availability
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        Toast.show({
          type: 'success',
          text1: 'Back Online',
        })
      }
      Toast.show({
        type: 'error',
        text1: 'Sorry, you are offline, please check your network',
      })
      return <ErrorBoundary />
    })
    // Load any resources or data that you need before rendering the app
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()

        const imageAssets = cacheImages([
          require('./assets/images/slide--1.jpeg'),
          require('./assets/images/slide--2.jpeg'),
          require('./assets/images/slide--3.jpeg'),
          require('./assets/images/slide--4.jpeg'),
          require('./assets/images/slide--5.jpeg'),
        ])

        await Promise.all([...imageAssets])
      } catch (e) {
        // You might want to provide this error information to an error reporting service
        console.warn(e)
      } finally {
        setAppIsReady(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  const checkAuthenticationStatus = async () => {
    // await AsyncStorage.clear()

    try {
      const isGuest = await AsyncStorage.getItem('isGuest')
      setIsGuest(isGuest)
    } catch (error) {
      throw error
    }
  }

  if (!appIsReady) {
    return null
  } else {
    return (
      <NetworkProvider>
        <ErrorBoundary>
          <View style={{ flex: 1 }}>
            <QueryClientProvider client={queryClient}>
              <MenuProvider>
                <Provider store={store}>
                  <SafeAreaProvider>
                    <StatusBar
                      barStyle="light-content"
                      backgroundColor="lightblue"
                    />
                    {/* <Navigation /> */}
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      {/* Conditionally render AuthStack or AppStack based on authentication status */}

                      {/* {isAuthenticated ? ( */}
                      <NavigationContainer ref={navigationRef}>
                        {isGuest === null ? <GuestStack /> : <MainNavigation />}
                      </NavigationContainer>
                      {/* ) : (
                    <NavigationContainer>
                      <GuestNavigator />
                    </NavigationContainer>
                  )} */}
                    </GestureHandlerRootView>
                  </SafeAreaProvider>
                  <Toast />
                </Provider>
              </MenuProvider>
            </QueryClientProvider>
          </View>
        </ErrorBoundary>
      </NetworkProvider>
    )
  }
}
