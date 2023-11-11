import React from 'react'
import { Linking, TouchableOpacity } from 'react-native'
import { SafeAreaView, Text, Touchable, View } from 'react-native'

const UpdateAppScreen = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cbd4f6',
      }}
    >
      <View className="px-6 w-full">
        <View className="bg-white h-64 rounded-xl">
          <Text className="text-center pt-8 text-2xl">App Update Required</Text>
          <Text className="text-center px-4 pt-4 text-base text-[#838181]">
            We have added new features and fixed some bugs to make your
            experience seemless
          </Text>
          <TouchableOpacity onPress={() => Linking.openURL('https://play.google.com/store/apps/details?id=com.orj5.Swave')} className="bg-[#1E3A79] w-44 mx-auto mt-8 rounded-xl">
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
