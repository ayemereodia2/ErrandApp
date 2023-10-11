import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { GuestStack, MainStack } from './StackNavigation'

const MainNavigation = () => {
  const [isGuest, setIsGuest] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigation = useNavigation()

  const checkAuthenticationStatus = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('accessToken')

      const isGuest = await AsyncStorage.getItem('isGuest')

      console.log('>>>>asuth guest', isGuest, isAuthenticated)

      // Check if the value is 'true' to determine authentication status
      if (isAuthenticated) {
        // User is authenticated, you can navigate to the AppStack
        // or perform any other actions as needed
        setIsAuthenticated(true)
      } else {
        // User is not authenticated, you can navigate to the AuthStack
        // or perform any other actions as needed
        setIsAuthenticated(false)
      }
    } catch (error) {
      // Handle AsyncStorage read error
      console.log(error)
    }
  }

  useEffect(() => {
    // Call the authentication status check function
    checkAuthenticationStatus()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Tabs')
    }
  }, [isAuthenticated])

  return <>{isGuest === null ? <GuestStack /> : <MainStack />}</>
}

export default MainNavigation
