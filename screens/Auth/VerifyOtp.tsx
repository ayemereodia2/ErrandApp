import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { SafeAreaView, Text, TextInput, View } from 'react-native'
import Button from '../../components/Button'

type OtpProp = {
  ref: any
  onChangeText: any
}

const OtpInput = ({ ref, onChangeText }: OtpProp) => (
  <View className="border-0.5 rounded-lg w-12 h-12 py-2 flex-row justify-center items-center">
    <TextInput
      className="px-1 text-2xl flex-row justify-center items-cente "
      keyboardType="number-pad"
      maxLength={1}
      ref={ref}
      onChangeText={onChangeText}
    />
  </View>
)

export default function VerifyOtpScreen() {
  const navigation = useNavigation()
  const [otp, setOtp] = useState({
    firstOtp: '',
    secondOtp: '',
    thirdOtp: '',
    fourthOtp: '',
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const firstInput = useRef<HTMLInputElement>(null)
  const secondInput = useRef<HTMLInputElement>(null)
  const thirdInput = useRef<HTMLInputElement>(null)
  const fourthInput = useRef<HTMLInputElement>(null)

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
          <Text className="font-semibold text-sm">OTP verification</Text>
          <Text className="text-xs mb-4">
            Enter the OTP number just sent to you at{' '}
            <Text className="text-[#243763]">+234 9018447933</Text>
          </Text>

          <View className="pt-2 flex-row justify-evenly items-center mb-10">
            <OtpInput
              ref={firstInput}
              onChangeText={(text: string) => {
                setOtp({ ...otp, firstOtp: text })
                text && secondInput.current?.focus()
              }}
            />
            <OtpInput
              ref={secondInput}
              onChangeText={(text: string) => {
                setOtp({ ...otp, secondOtp: text })
                text ? thirdInput.current?.focus() : firstInput.current?.focus()
              }}
            />
            <OtpInput
              ref={thirdInput}
              onChangeText={(text: string) => {
                setOtp({ ...otp, thirdOtp: text })

                text
                  ? fourthInput.current?.focus()
                  : secondInput.current?.focus()
              }}
            />
            <OtpInput
              ref={fourthInput}
              onChangeText={(text: string) => {
                setOtp({ ...otp, fourthOtp: text })

                !text && thirdInput.current?.focus()
              }}
            />
            {/* <OtpInput />
            <OtpInput /> */}
          </View>

          <Button
            onPress={() => console.log('>>>>otp', otp)}
            style={{}}
            className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg"
            child="Verify OTP"
          />
        </View>
      </View>
    </SafeAreaView>
  )
}
