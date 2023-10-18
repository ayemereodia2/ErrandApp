/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { View } from 'react-native'
// import 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { NetworkProvider } from 'react-native-offline'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import {  Provider } from 'react-redux';
// import {  useSelector} from 'react-redux'
import { StatusBar, useColorScheme } from 'react-native'
import ErrorBoundary from './components/ErrorBoundary'
import useCachedResources from './hooks/useCachedResources'
// import useColorScheme from './hooks/useColorScheme'
import { useOnlineManager } from './hooks/useOnlineManager'
import MainNavigation from './navigation/MainNavigation'
import { GuestStack } from './navigation/StackNavigation'
import { RootState, store } from './services/store'

const queryClient = new QueryClient()

// import { store } from './services/store'

export default function App() {

  // const {
  //   data: currentUser,
  //   backgroundTheme,
  //   textTheme,
  //   landingPageTheme,
  // } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const isLoadingComplete = useCachedResources()
  const [isGuest, setIsGuest] = useState<any>()

  // const [isAuthenticated, setIsAuthenticated] = useState<any>('')
  const colorScheme = useColorScheme()
  const statusBarBarStyle = colorScheme === 'dark' ? 'light-content' : 'dark-content';
  // const theme = currentUser?.preferred_theme === 'light' ? true : false



  useOnlineManager()

  useEffect(() => {
    checkAuthenticationStatus()
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
  }, [])

  const checkAuthenticationStatus = async () => {
    console.log('>>>>ok', isGuest)

    await AsyncStorage.clear()

    try {
      const isGuest = await AsyncStorage.getItem('isGuest')
      setIsGuest(isGuest)
      // const isAuthenticated = await AsyncStorage.getItem('accessToken')
      // setIsAuthenticated(isAuthenticated)
    } catch (error) {
      throw error
    }
  }

  if (!isLoadingComplete) {
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
                     backgroundColor="lightblue" />
                    {/* <Navigation /> */}
                    <GestureHandlerRootView style={{ flex: 1 }}>
                      {/* Conditionally render AuthStack or AppStack based on authentication status */}

                      {/* {isAuthenticated ? ( */}
                      <NavigationContainer>
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
