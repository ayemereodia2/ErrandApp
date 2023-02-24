/// <reference types="nativewind/types" />

// import { SafeAreaProvider } from 'react-native-safe-area-context'
// import { Provider } from 'react-redux'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'
import useCachedResources from './hooks/useCachedResources'
import useColorScheme from './hooks/useColorScheme'
import Navigation from './navigation'
import { store } from './services/store'

// import { store } from './services/store'

export default function App() {
  const isLoadingComplete = useCachedResources()
  const colorScheme = useColorScheme()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation />
        </SafeAreaProvider>
      </Provider>
    )
  }
}
