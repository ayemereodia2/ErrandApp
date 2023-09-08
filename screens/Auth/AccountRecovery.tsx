import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { SafeAreaView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button'
import InputField from '../../components/InputField'

export default function AccountRecoveryScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={30}
      >
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
            <Text className="font-semibold text-sm">Account Recovery</Text>
            <Text className="text-xs">
              Enter your details to recover your Account
            </Text>

            <View className="pt-2 space-y-4">
              {/* <InputField
                label="New Password"
                placeholder="Enter your New Password"
                keyboardType="default"
              /> */}

              {/* <InputField
                label="Confirm New Password"
                placeHolder="Confirm your New Password"
                keyboardType="visible-password"
              /> */}

              <Button
                style={{ marginTop: 20 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20"
                child="Submit"
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
