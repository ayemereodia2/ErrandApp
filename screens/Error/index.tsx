import { useNavigation } from '@react-navigation/native'
import LottieView from 'lottie-react-native'
import React, { useEffect, useRef } from 'react'
import { Image, Pressable, SafeAreaView, Text, View } from 'react-native'

const ErrorScreen = ({ navigation }: any) => {
  const errorGif = '../../assets/error-1.gif'
  const animationRef = useRef<LottieView>(null)

  const navigate = useNavigation()

  useEffect(() => {
    animationRef.current?.play()

    // Or set a specific startFrame and endFrame with:
    animationRef.current?.play(30, 120)
  }, [])

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-[#e4eaf7]">
      <View className="flex-row justify-center items-center">
        <View className="mt-20 ">
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            className="mx-auto"
            source={require(errorGif)}
          />

          {/* <LottieView
            source={require('../../assets/images/error.json')}
            autoPlay
            loop
            style={{ width: 100, height: 100 }}
          /> */}

          <Text className="w-100 px-8 text-center">
            Sory, something went wrong. This error might occur due to your
            network
          </Text>

          <Pressable
            onPress={() => navigate.goBack()}
            className="bg-[#1E3A79] w-[150px] mx-auto py-2 rounded-lg mt-6"
          >
            <Text className="text-white text-base text-center">Reload</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ErrorScreen
