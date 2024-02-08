import AsyncStorage from '@react-native-async-storage/async-storage'
import messaging from '@react-native-firebase/messaging'
import { useNavigation } from '@react-navigation/native'
import * as Notifications from 'expo-notifications'
import React, { useEffect, useState } from 'react'
import { useIsConnected } from 'react-native-offline'
import Toast from 'react-native-toast-message'
import ErrorBoundary from '../components/ErrorBoundary'
import { userDetails } from '../services/auth/userInfo'
import { _fetch } from '../services/axios/http'
import { errandDetails } from '../services/errands/errandDetails'
import { errandMarketList } from '../services/errands/market'
import { myErrandList } from '../services/errands/myErrands'
import { useAppDispatch } from '../services/store'
// import { getAppVersion } from '../utils/helper'
import { MainStack, TabStack } from './StackNavigation'

const MainNavigation = () => {
  const [isGuest, setIsGuest] = useState<any>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isConnected = useIsConnected()
  const dispatch = useAppDispatch()

  const navigation = useNavigation()

  useEffect(() => {
    const checkLoggedIn = async () => {
      return await AsyncStorage.getItem('accessToken')
    }

    const requestUserPermission = async () => {
      const authStatus = await messaging().requestPermission()
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL

      if (enabled) {
        console.log('Authorization status:', authStatus)
      }
    }

    if (requestUserPermission()) {
      messaging()
        .getToken()
        .then(async (token) => {
          // console.log('>>>>>,>token', token)
          const rs = await _fetch({
            method: 'PUT',
            _url: `/user/mobile/token`,
            body: { mobile_token: token },
          })
          const _rs = await rs.json()

          // console.log('>>>>>>>>>-', _rs)
        })
    } else {
      console.log('failed token state')
    }

    // Set up the notification handler for the appp
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    })

    // Handle user clicking on a notification and open the screen
    const handleNotificationClick = async (response: any) => {
      const data = response?.notification?.request?.content?.data

      if (data.screen === 'MyErrandDetails') {
        dispatch(
          errandDetails({
            errandId: data.item_id,
            navigation,
          }),
        )
        navigation.navigate('MyErrandDetails')
        dispatch(myErrandList({}))
        dispatch(userDetails({ user_id: data.user_id }))
      }

      if (data.screen === 'Market') {
        navigation.navigate('Market')
        dispatch(errandMarketList({}))
      }

      if (data.screen === 'Profile') {
        navigation.navigate('Profile')
      }
    }

    // Listen for user clicking on a notification
    const notificationClickSubscription = Notifications.addNotificationResponseReceivedListener(
      handleNotificationClick,
    )

    // Handle push notifications when the app is in the foreground
    const handlePushNotification = async (remoteMessage: any) => {
      console.log('>>>>>>=ermeote message', remoteMessage)

      if (remoteMessage.data.screen === 'MyErrandDetails') {
        dispatch(
          errandDetails({
            errandId: remoteMessage.data.item_id,
            navigation,
          }),
        )
        navigation.navigate('MyErrandDetails')
        dispatch(myErrandList({}))
        dispatch(userDetails({ user_id: remoteMessage.data.user_id }))
      }

      if (remoteMessage.data.screen === 'Market') {
        navigation.navigate('Market')
        dispatch(errandMarketList({}))
      }

      if (remoteMessage.data.screen === 'Profile') {
        navigation.navigate('Profile')
      }

      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      }

      // Schedule the notification with a null trigger to show immediately
      await Notifications.scheduleNotificationAsync({
        content: notification,
        trigger: null,
      })
    }

    // Handle user opening the app from a notification (when the app is in the background)
    messaging().onNotificationOpenedApp((remoteMessage: any) => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.data.screen,
        navigation,
      )
      if (remoteMessage.data.screen === 'MyErrandDetails') {
        dispatch(
          errandDetails({
            errandId: remoteMessage.data.item_id,
            navigation,
          }),
        )
        navigation.navigate('MyErrandDetails')
        dispatch(myErrandList({}))
        dispatch(userDetails({ user_id: remoteMessage.data.user_id }))
      }

      if (remoteMessage.data.screen === 'Market') {
        navigation.navigate('Market')
        dispatch(errandMarketList({}))
      }

      if (remoteMessage.data.screen === 'Profile') {
        navigation.navigate('Profile')
      }
    })

    // Check if the app was opened from a notification (when the app was completely quit)
    messaging()
      .getInitialNotification()
      .then((remoteMessage: any) => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.data,
          )
          if (remoteMessage.data.screen === 'MyErrandDetails') {
            dispatch(
              errandDetails({
                errandId: remoteMessage.data.item_id,
                navigation,
              }),
            )
            navigation.navigate('MyErrandDetails')
            dispatch(myErrandList({}))
            dispatch(userDetails({ user_id: remoteMessage.data.user_id }))
          }

          if (remoteMessage.data.screen === 'Market') {
            navigation.navigate('Market')
            dispatch(errandMarketList({}))
          }
          if (remoteMessage.data.screen === 'Profile') {
            navigation.navigate('Profile')
          }
        }
      })

    // Handle push notifications when the app is in the background
    messaging().setBackgroundMessageHandler(async (remoteMessage: any) => {
      console.log('Message handled in the background!', remoteMessage)
      const notification = {
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        data: remoteMessage.data, // optional data payload
      }

      if (remoteMessage.data.screen === 'MyErrandDetails') {
        dispatch(
          errandDetails({ errandId: remoteMessage.data.item_id, navigation }),
        )
        dispatch(myErrandList({}))
        dispatch(userDetails({ user_id: remoteMessage.data.user_id }))
        navigation.navigate('MyErrandDetails')
      }

      if (remoteMessage.data.screen === 'Market') {
        navigation.navigate('Market')
        dispatch(errandMarketList({}))
      }
      if (remoteMessage.data.screen === 'Profile') {
        navigation.navigate('Profile')
      }
    })

    // Listen for push notifications when the app is in the foreground
    const unsubscribe = messaging().onMessage(handlePushNotification)

    // Clean up the event listeners
    return () => {
      unsubscribe()
      notificationClickSubscription.remove()
    }
  }, [])

  const checkNetworkConnectivity = async () => {
    if (isConnected === null) {
      return
    }
    if (isConnected === false) {
      Toast.show({
        type: 'error',
        text1: 'Sorry, you are offline, please check your network',
      })
      return <ErrorBoundary />
    }
    Toast.show({
      type: 'success',
      text1: 'Back Online',
    })
  }

  const checkAuthenticationStatus = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('accessToken')
      const isGuest = await AsyncStorage.getItem('isGuest')

      setIsGuest(isGuest)

      if (isAuthenticated) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {}
  }

  useEffect(() => {
    // Call the authentication status check function
    // getAppVersion()
    checkAuthenticationStatus()
    checkNetworkConnectivity()
  }, [isAuthenticated, isGuest, isConnected])

  return (
    <>
      {!isAuthenticated ? <MainStack /> : <TabStack />}
      {/* {<MainStack />} */}
    </>
  )
}

export default MainNavigation
