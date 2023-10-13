/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
import {
  focusManager,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import React from 'react'
import { AppStateStatus, Platform, View } from 'react-native'
// import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Provider } from 'react-redux'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { useOnlineManager } from './hooks/useOnlineManager'
import MainNavigation from './navigation/MainNavigation'
import { store } from './services/store'
import ErrorBoundary from './components/ErrorBoundary'

const queryClient = new QueryClient()

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by defaunpm update

  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}

// import { store } from './services/store'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  useOnlineManager()

  // useAppState(onAppStateChange);

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <ErrorBoundary>
        <View style={{ flex: 1 }}>
          <QueryClientProvider client={queryClient}>
            <MenuProvider>
              <Provider store={store}>
                <SafeAreaProvider>
                  {/* <Navigation /> */}
                  <GestureHandlerRootView style={{ flex: 1 }}>
                    {/* Conditionally render AuthStack or AppStack based on authentication status */}

                    {/* {isAuthenticated ? ( */}
                    <NavigationContainer>
                      <MainNavigation />
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
    )
  }
}
