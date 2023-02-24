import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

export default function CreateAccountScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
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
            <Text className="font-semibold text-sm">Create an Account</Text>
            <Text className="text-xs">
              Let’s get started and create a Profile for you
            </Text>

            <View className="pt-2 space-y-4">
              <InputField
                label="First Name"
                placeHolder="Enter your Name"
                keyboardType="default"
              />

              <InputField
                label="Last Name"
                placeHolder="Enter your Name"
                keyboardType="default"
              />

              <InputField
                label="Phone Number"
                placeHolder="Enter your Name"
                keyboardType="default"
              />

              <InputField
                label="Password"
                placeHolder="Enter your Name"
                keyboardType="default"
              />

              <Button
                style={{}}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-sm mt-8"
                child="Create Account"
              />
              <Text className="text-black text-center pb-6">
                Already Have an Account?{' '}
                <Text
                  onPress={() => {
                    navigation.navigate('Login')
                  }}
                  className="font-bold text-[#243763]"
                >
                  Login
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
