/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
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
import { Asset } from 'expo-asset'
import * as SplashScreen from 'expo-splash-screen'
import { useOnlineManager } from './hooks/useOnlineManager'
import MainNavigation from './navigation/MainNavigation'
import { GuestStack } from './navigation/StackNavigation'
import { store } from './services/store'

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

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false)

  // const isLoadingComplete = useCachedResources()
  const [isGuest, setIsGuest] = useState<any>()
  const colorScheme = useColorScheme()
  const statusBarBarStyle =
    colorScheme === 'dark' ? 'light-content' : 'dark-content'

  useOnlineManager()

  useEffect(() => {
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
