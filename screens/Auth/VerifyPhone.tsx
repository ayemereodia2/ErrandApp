import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
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
import AuthLogo from '../../components/AuthLogo'
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
          {/* <Logo /> */}
          <AuthLogo />

          {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}
          <View className="text-[#333333] font-inter py-4 space-y-1">

            <View className='border-b border-[#EEF0F1]'>
            <Text className='text-[#09497D] pb-2 mb-7' style={{fontFamily: 'Axiforma'}}>Step 1 of 4</Text>
            </View>
            
            
              {comingFrom === 'forgotPassword'
                ? 
                (
                  <Text className="font-semibold text-lg text-center">
                Password Recovery
                </Text>
                )
                : 
                (
                  <Text className='font-semibold text-[24px] mb-3 text-[#393F42]'>Create Account</Text>
                
                )
              }
            
           
              {comingFrom === 'forgotPassword'

                ? 
                (  <Text className="text-sm text-center">
                  Please supply the phone number used for registration
                  </Text>
                )
                : 
                (
                <Text className='text-[14px]' style={{fontFamily: 'Axiforma'}}>
                Set up your account now to access financing.
                </Text>) }
            

            <View className="pt-2 space-y-6 mt-8">
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

              <TouchableOpacity
                style={{ marginTop: 60 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-[60px]"
                
                onPress={handleSubmit(submitPhone)}>
                  {
                  loading ? (
                   <Text> <ActivityIndicator size="small" color="#00ff00" /> </Text> 
                  ) : (
                    <Text className='text-base text-[#EEF2F3] font-semibold' style={{fontFamily: 'Axiforma'}}>Proceed</Text>
                  )
                }
                </TouchableOpacity>
            </View>

            <Text className="text-[#8E9DA4] text-center mt-5 pb-6 pt-3" style={{fontFamily: 'Axiforma'}}>
                  Have an account?
                  <Text
                    onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}
                    className="font-bold text-[#09497D]" style={{fontFamily: 'Axiforma'}}
                  >
                    {' '}
                    Log In
                  </Text>
                </Text>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
