/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
<<<<<<< Updated upstream
import { AppStateStatus, Platform,View } from 'react-native'
=======
import { AppStateStatus, Platform, View } from 'react-native'
>>>>>>> Stashed changes
// import 'react-native-gesture-handler'
// import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { MenuProvider } from 'react-native-popup-menu'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { focusManager } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { useOnlineManager } from './hooks/useOnlineManager'
import Navigation from './navigation'
import { store } from './services/store'

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
      <QueryClientProvider client={queryClient}>
        <View style={{ flex: 1 }}>
          <>
            <MenuProvider>
              <Provider store={store}>
                <SafeAreaProvider>
                  <Navigation />
                </SafeAreaProvider>
                <Toast />
              </Provider>
            </MenuProvider>
          </>
        </View>
      </QueryClientProvider>
    )
  }
}
