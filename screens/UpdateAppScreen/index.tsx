import React from 'react'
import {
  Linking,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

const UpdateAppScreen = () => {
  const user = true

  // useFocusEffect(() => {
  //   const onBackPress = () => {
  //     if (user) {
  //       return true // Prevent navigation back to the login screen
  //     }
  //     return false // Allow navigation back to the login screen
  //   }

  //   BackHandler.addEventListener('hardwareBackPress', onBackPress)

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', onBackPress)
  //   }
  // })
  return (
    <SafeAreaView>
      <View className="px-6 w-full">
        <View className="bg-white h-72 rounded-xl">
          <Text className="text-center pt-8 text-2xl">App Update Required</Text>
          <Text className="text-center px-4 pt-4 text-base text-[#838181]">
            We have added new features and fixed some bugs to make your
            experience better
          </Text>
          <Text className="text-center px-6 pt-4 text-sm text-[#838181]">
            Please click to update your app on the store{' '}
          </Text>
          <TouchableOpacity
            onPress={() =>
              Linking.openURL(
                'https://play.google.com/store/apps/details?id=com.orj5.Swave',
              )
            }
            className="bg-[#1E3A79] w-44 mx-auto mt-8 rounded-xl"
          >
            <Text className="text-center py-3 text-lg text-white">
              Update App
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UpdateAppScreen
