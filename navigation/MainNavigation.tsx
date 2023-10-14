import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { GuestStack, MainStack } from './StackNavigation'

const MainNavigation = () => {
  const [isGuest, setIsGuest] = useState<any>()
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // const {
  //   data: currentUser,
  //   backgroundTheme,
  //   textTheme,
  //   landingPageTheme,
  // } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const navigation = useNavigation()

  const checkAuthenticationStatus = async () => {
    try {
      const isAuthenticated = await AsyncStorage.getItem('accessToken')

      if (isAuthenticated) {
        navigation.navigate('Tabs')
      }

      // console.log(">>>>>>accessTokn", is);

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
    if (!isAuthenticated && isGuest !== null) {
      // navigation.navigate('GuestScreen')
    }
  }, [isAuthenticated, isGuest])

  return (
    <>
      {isGuest === null?  <GuestStack /> : <MainStack/>}
    </>
  )
}

export default MainNavigation
