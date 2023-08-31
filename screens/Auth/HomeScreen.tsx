import {
  AbrilFatface_400Regular,
  useFonts,
} from '@expo-google-fonts/abril-fatface'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
// import AppLoading from 'expo-app-loading';
import {
  Image,
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
  const size = 20
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
        <View className="flex-row items-center justify-center mt-28">
          <Text
            style={{ fontFamily: 'AbrilFatface_400Regular' }}
            className=" text-black text-4xl"
          >
            <Image
              style={{
                width: 120,
                height: 100,
                resizeMode: 'contain',
              }}
              source={require('../../assets/images/new_Swave_2.png')}
            />
          </Text>
        </View>

        <View className=" mt-36 flex-row items-center justify-center w-full">
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

const logoContainer = StyleSheet.create({
  image: {
    // flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'cover',
  },
})
