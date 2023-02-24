import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

export default function RecoverPasswordScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      <View className="px-4">
        <View className="flex-row mt-10">
          <Text
            style={{ fontFamily: 'AbrilFatface_400Regular' }}
            className=" text-black text-4xl"
          >
            Gofer
          </Text>
          <View className="w-2 h-2 bg-[#33A532] rounded-full mt-6"></View>
        </View>

        <View className="text-[#333333] font-inter py-4 space-y-1">
          <Text className="font-semibold text-sm">Password Recovery</Text>
          <Text className="text-xs">
            Enter your details to recover your Password
          </Text>

          <View className="pt-2 space-y-4">
            <InputField
              label="Phone Number"
              placeHolder="Enter your phone"
              keyboardType="default"
            />

            <InputField
              label="Security Question"
              placeHolder="Enter your password"
              keyboardType="visible-password"
            />

            <InputField
              label="Answer"
              placeHolder="Enter answer to your Security Question"
              keyboardType="visible-password"
            />

            <Button
              style={{ marginTop: 20 }}
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20"
              child="Recover Password"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
