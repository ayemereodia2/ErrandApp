import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { verifyPhone } from '../../services/auth/verify-phone'
import { RootState, useAppDispatch } from '../../services/store'
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

interface IData {
  phone_number: string
}

export default function VerifyPhone({ navigation, route }: any) {
  const [visible, setVisible] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [otpLoading, setOtpLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(true)

  const { comingFrom } = route.params

  const { loading } = useSelector((state: RootState) => state.verifyPhone)

  const schema = yup.object({
    phone_number: yup
      .string()
      .min(11, 'Phone number can not be lesser than 11')
      .max(11, 'Phone number can not be more than 11')
      .required()
      .trim(),
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IData>({
    resolver: yupResolver(schema),
    defaultValues: {
      phone_number: '',
    },
  })

  const submitPhone = (data: IData) => {
    dispatch(
      verifyPhone({
        navigation,
        phone_number: `+234${data.phone_number.substring(1)}`,
        intent: comingFrom === 'forgotPassword' ? 'forgot_pass': 'create_account',
        from: comingFrom,
      }),
    )
  }

  return (
    <SafeAreaView className="mt-24">
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          <Logo />

          {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}
          <View className="text-[#333333] font-inter py-4 space-y-1">
            <Text className="font-semibold text-lg text-center">
              {comingFrom === 'forgotPassword'
                ? 'Password Recovery'
                : 'Phone Verification'}
            </Text>
            <Text className="text-sm text-center">
              {comingFrom === 'forgotPassword'
                ? 'Please supply the phone number used for registration'
                : 'Enter your details to Verify your Phone'}
            </Text>

            <View className="pt-2 space-y-6">
              <InputField
                label="Phone Number"
                placeholder="Enter your phone Number"
                keyboardType="numeric"
                name="phone_number"
                control={control}
                errors={errors.phone_number}
                required
                message={errors?.phone_number?.message}
              />

              <Button
                style={{ marginTop: 36 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20 "
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Verify Phone'
                  )
                }
                onPress={handleSubmit(submitPhone)}
              />
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
