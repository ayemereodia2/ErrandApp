import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, SafeAreaView, Text, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { verifyPhone } from '../../services/auth/verify-phone'
import { RootState, useAppDispatch } from '../../services/store'
import { useSelector } from 'react-redux'
import { Logo } from '../../components/Logo'
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

export default function VerifyPhone() {
  const [visible, setVisible] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  // const router = useRouter()
  // const [loading, setLoading] = useState<boolean>(false)
  const [otpLoading, setOtpLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(true)
  const navigation = useNavigation()

  const {loading} = useSelector((state: RootState) => state.verifyPhone)

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
    console.log(">>>Data", data);
    
    dispatch(
      verifyPhone({
        navigation,
        phone_number: `+234${data.phone_number.substring(1)}`,
        from: 'createAccount',
      }),
    )
   
 console.log()
  }
 

  return (
    
    <SafeAreaView className='mt-24'>
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View className="px-4">
       <Logo/>
        <View className="text-[#333333] font-inter py-4 space-y-1">
          <Text className="font-semibold text-sm">Phone Verification</Text>
          <Text className="text-xs">
            Enter your details to Verify your Phone
          </Text>

          <View className="pt-2 space-y-4">
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
              style={{ marginTop: 20 }}
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20 "
              child={loading ? <ActivityIndicator size="small" color="#00ff00" /> : "Verify Phone"}
              onPress={handleSubmit(submitPhone)}
            />
          </View>
        </View>
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
    
  )
}
