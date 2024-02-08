/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
// import messaging from '@react-native-firebase/messaging'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as NetInfo from '@react-native-community/netinfo'
import { NavigationContainer } from '@react-navigation/native'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { Image, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Modal from 'react-native-modal'
import { NetworkProvider } from 'react-native-offline'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { ToastProvider } from 'react-native-toast-notifications'
import { Provider } from 'react-redux'
import UpdateAppScreen from './screens/UpdateAppScreen'
// import {  useSelector} from 'react-redux'
import { StatusBar, useColorScheme } from 'react-native'
import ErrorBoundary from './components/ErrorBoundary'
// import useColorScheme from './hooks/useColorScheme'
import { Asset } from 'expo-asset'
import { useFonts } from 'expo-font'
import * as SplashScreen from 'expo-splash-screen'
import { useOnlineManager } from './hooks/useOnlineManager'
import MainNavigation from './navigation/MainNavigation'
import { GuestStack, navigationRef } from './navigation/StackNavigation'
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

export default function App({ navigation }: any) {
  const [appIsReady, setAppIsReady] = useState(false)

  const [loaded] = useFonts({
    Roboto: require('./assets/fonts/Roboto-Regular.ttf'),
    Poppins: require('./assets/fonts/Poppins-Regular.ttf'),
    'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
    Axiforma: require('./assets/fonts/Axiforma-Regular.ttf'),
    'Axiforma-Medium': require('./assets/fonts/Axiforma-Medium.ttf'),
    'Axiforma-SemiBold': require('./assets/fonts/Axiforma-SemiBold.ttf'),
    'Chillax-Regular': require('./assets/fonts/Chillax-Regular.otf'),
    'Chillax-Light': require('./assets/fonts/Chill/Chillax-Light.otf'),
    'Chillax-Extralight': require('./assets/fonts/Chill/Chillax-Extralight.otf'),
    'Chillax-Semibold': require('./assets/fonts/Chill/Chillax-Semibold.otf'),
    'Chillax-Medium': require('./assets/fonts/Chill/Chillax-Medium.otf'),
  })

  // const versionCode = '1.0.3'

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  const [isGuest, setIsGuest] = useState<any>()
  const colorScheme = useColorScheme()

  useOnlineManager()

  const getAppVersion = async () => {
    const versionCode = '9'
    await fetch(`${process.env.EXPO_PUBLIC_API_URL}/mobileversion`)
      .then((rs) => rs.json())
      .then((rs) => {
        //  console.log('>>>>>rs.andrpid', rs.Android)
        if (versionCode !== rs.Android) {
          setShowUpdateModal(true)
        }
      })
  }

  useEffect(() => {
    // getAppVersion()
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

  if (!loaded) {
    return null
  }

  if (!appIsReady) {
    return null
  } else {
    return (
      
      <NetworkProvider>
        <StatusBar barStyle="light-content" backgroundColor="#09497D" />

        <ErrorBoundary>
          <View style={{ flex: 1, backgroundColor: 'transparent' }}>
            <ToastProvider>
              <QueryClientProvider client={queryClient}>
                <MenuProvider>
                  <Provider store={store}>
                    <SafeAreaProvider>
                      {/* <Navigation /> */}
                      <GestureHandlerRootView style={{ flex: 1 }}>
                        {/* Conditionally render AuthStack or AppStack based on authentication status */}

                        {/* {isAuthenticated ? ( */}
                        <NavigationContainer ref={navigationRef}>
                          {isGuest === null ? (
                            <GuestStack />
                          ) : (
                            <MainNavigation />
                          )}
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
            </ToastProvider>

            <Modal
              onBackdropPress={() => {
                setShowUpdateModal(!setShowUpdateModal)
              }}
              isVisible={showUpdateModal}
            >
              <UpdateAppScreen />
            </Modal>
          </View>
        </ErrorBoundary>
      </NetworkProvider>
    )
  }
}
