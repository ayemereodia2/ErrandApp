import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { useIsConnected } from 'react-native-offline'
import Toast from 'react-native-toast-message'
import ErrorBoundary from '../components/ErrorBoundary'
import { MainStack, TabStack } from './StackNavigation'

const MainNavigation = () => {
  const [isGuest, setIsGuest] = useState<any>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const isConnected = useIsConnected()

  const navigation = useNavigation()

  const checkNetworkConnectivity = async () => {
    console.log('>>>>>isConnect', isConnected)

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

      console.log('>>>>>>>', isAuthenticated)

      setIsGuest(isGuest)

      if (isAuthenticated) {
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // Call the authentication status check function
    checkAuthenticationStatus()
    checkNetworkConnectivity()
  }, [isAuthenticated, isGuest, isConnected])

  // useEffect(() => {
  //   if (!isAuthenticated && isGuest !== null) {
  //     navigation.navigate('GuestScreen')
  //   }
  // }, [isAuthenticated, isGuest, isConnected])

  return (
    <>
      {/* {isGuest === null ? (
        <GuestStack />
      ) : !isAuthenticated ? (
        <MainStack />
      ) : isAuthenticated ? (
        <TabStack />
      ) : (
        ''
      )} */}

      {!isAuthenticated ? <MainStack /> : <TabStack />}

      {/* {!isAuthenticated ? <MainStack/> : ''} */}
    </>
  )
}

export default MainNavigation
