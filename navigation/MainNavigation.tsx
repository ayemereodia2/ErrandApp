import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { GuestStack, MainStack } from './StackNavigation'

const MainNavigation = () => {
  const [isGuest, setIsGuest] = useState<any>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const navigation = useNavigation()

  const checkAuthenticationStatus = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('accessToken')

      const isGuest = await AsyncStorage.getItem('isGuest')
      // console.log('>>>>auth stuff', isAuthenticated, isGuest)
      // await AsyncStorage.clear()
      // await AsyncStorage.setItem('isGuest', 'false')

      setIsGuest(isGuest)

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
    if (isAuthenticated && isGuest !== null) {
      navigation.navigate('Tabs')
    }
  }, [isAuthenticated, isGuest])

  return <>{isGuest === null ? <GuestStack /> : <MainStack />}</>
}

export default MainNavigation
