import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

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
      <SafeAreaView className="flex-1">
        <ImageBackground
          source={require('../../assets/images/new_Swave_2.png')}
          className="mt-[250px] mx-auto justify-center items-center w-[120] h-[100]"
          resizeMode="contain"
        >
         
        </ImageBackground>

        <View className="mb-24 mt-8 flex-row justify-center">
          <View className="space-y-6">
            <TouchableOpacity
              onPress={() => navigation.navigate('Login')}
              className="bg-[#243763] py-3 w-60 flex-row items-center justify-center rounded-lg"
            >
              <Text className="text-white text-base">Login</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('VerifyPhone')}
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
