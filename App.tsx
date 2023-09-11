/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
import { AppStateStatus, Platform } from 'react-native'
import 'react-native-gesture-handler'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { focusManager, QueryClient, QueryClientProvider } from 'react-query'
import { Provider } from 'react-redux'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import { useOnlineManager } from './hooks/useOnlineManager'
import Navigation from './navigation'
import { store } from './services/store'

const queryClient = new QueryClient()

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
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
        <GestureHandlerRootView style={{ flex: 1 }}>
          <>
            <Provider store={store}>
              <SafeAreaProvider>
                <Navigation />
              </SafeAreaProvider>
              <Toast />
            </Provider>
          </>
        </GestureHandlerRootView>
      </QueryClientProvider>
    )
  }
}
