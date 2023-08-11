import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { verifyPhone } from '../../services/auth/verify-phone'
import { useAppDispatch } from '../../services/store'
import { ILogin } from '../../types'
// import {toast }from 'react-hot-toast'

declare global {
  interface Window {
    recaptchaVerifier: any
  }
}

declare global {
  interface Window {
    confirmationResult: any
  }
}

export default function VerifyPhone() {
  const [visible, setVisible] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  // const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [otpLoading, setOtpLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(true)
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: '',
    },
  })


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
          <Text className="font-semibold text-sm">Phone Verification</Text>
          <Text className="text-xs">
            Enter your details to Verify your Phone
          </Text>

          <View className="pt-2 space-y-4">
            {/* <InputField
              label="Phone Number"
              placeholder="Enter your phone Number"
              keyboardType="numeric"
              name="phone_number"
              control={control}
              errors={errors.phone_number}
              required
              message={'Please enter your phone number'}
            /> */}

            <Button
              style={{ marginTop: 20 }}
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20 "
              child="Recover Account"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
