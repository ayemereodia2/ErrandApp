import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
// import AppLoading from 'expo-app-loading';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'

export default function HomeScreen() {
  const navigation = useNavigation()

  let [fontsLoaded] = useFonts({
    AbrilFatface_400Regular,
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  if (!fontsLoaded) {
    return (
      <View>
        <Text>Loading ...</Text>
      </View>
    )
  } else {
    return (
      <SafeAreaView>
        <View className="flex-row items-center justify-center mx-10 mt-20">
          <Text
            style={{ fontFamily: 'AbrilFatface_400Regular' }}
            className=" text-black text-4xl"
          >
            Gofer
          </Text>
          <View className="w-2 h-2 bg-[#33A532] rounded-full mt-4"></View>
        </View>

        <View className=" mt-44 flex-row items-center justify-center w-full">
          <View className="space-y-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="bg-[#243763] py-3 w-60 flex-row items-center justify-center rounded-lg"
            >
              <Text className="text-white text-base">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Main')}
              style={{ borderWidth: 1 }}
              className="border-[#243763] border-solid border-1 text-[#243763] py-3 w-60 flex-row items-center justify-center rounded-lg cursor-pointer"
            >
              <Text className="text-base text-[#243763]">Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    )
  }
}
