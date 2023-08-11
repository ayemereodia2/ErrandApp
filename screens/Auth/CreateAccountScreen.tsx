import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

export default function CreateAccountScreen() {
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: '',
      password: '',
    },
  })

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

            {/* <View className="pt-2 space-y-4">
              <InputField
                label="First Name"
                placeholder="Enter your Name"
                keyboardType="default"
                name="first_name"
                control={control}
              />

              <InputField
                label="Last Name"
                placeholder="Enter your Name"
                keyboardType="default"
                name="last_name"
                control={control}
              />

              <InputField
                label="Phone Number"
                placeholder="Enter your Name"
                keyboardType="default"
                name="phone_number"
                control={control}
              />

              <InputField
                label="Password"
                placeholder="Enter your Name"
                keyboardType="default"
                name="password"
                control={control}
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
            </View> */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}
