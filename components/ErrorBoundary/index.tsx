import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
// import AsyncStorage from '@react-native-community/async-storage'
import FontAwesome from 'react-native-vector-icons/Ionicons'
// import RNRestart from 'react-native-restart'
// some stylesheet
// import { styles } from './styles'
// some button component
// import Button from './Button'

export class ErrorBoundary extends React.Component<any, any> {
  state = {
    error: false,
  }

  handleRedirect = async () => {
    const navigation = useNavigation()
    await AsyncStorage.removeItem('accessToken')
    navigation.navigate('Login')
  }

  static getDerivedStateFromError(error: any) {
    return { error: true }
  }

  componentDidCatch(error: any, errorInfo: any) {
    // deal with errorInfo if needed
  }

  // destroyAuthToken = async () => {
  //   await AsyncStorage.removeItem('user_settings');
  // }

  handleBackToSignIn = async () => {
    // remove user settings
    // await this.destroyAuthToken();
    // restart app
    // RNRestart.Restart();
  }

  render() {
    // const { theme } = this.context;

    if (this.state.error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
          marginHorizontal: 10,
        }}
      >
        <View>
          <View>
            <View className="flex-row items-center " style={{ width: '100%' }}>
              <FontAwesome
                name="ios-information-circle-outline"
                size={60}
                color="red"
              />
              <Text style={{ fontSize: 22 }}>Oops, Something Went Wrong</Text>
            </View>

            <Text
              style={{
                marginVertical: 10,
                lineHeight: 23,
                fontWeight: '500',
                paddingHorizontal: 10,
              }}
            >
              The app ran into a problem and could not continue. We apologise
              for any inconvenience this has caused! Press the button below to
              restart the app and sign back in. Please contact us if this issue
              persists.
            </Text>

            <View className="flex-row justify-center items-center px-4">
              <TouchableOpacity
                className="bg-[#1E3A79] h-12 w-full mx-4 mt-6 flex-row justify-center items-center rounded-lg"
                onPress={() => this.handleRedirect()}
              >
                <Text className="text-white text-base">Reload</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    )
    } else {
      return this.props.children
    }
  }
}

export default ErrorBoundary
