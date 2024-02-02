import { AntDesign } from '@expo/vector-icons'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import * as yup from 'yup'
import AuthLogo from '../../components/AuthLogo'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { verifyPhone } from '../../services/auth/verify-phone'
import { RootState, useAppDispatch } from '../../services/store'
import colors from '../../utils/colors'

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
  const [countryCode, setCountryCode] = useState('NG')
  const [callingCode, setCallingCode] = useState('234')

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
    const phoneNumber = `+234${data.phone_number.substring(1)}`;
    dispatch(
      verifyPhone({
        navigation,
        phone_number: phoneNumber,
        intent:
          comingFrom === 'forgotPassword' ? 'forgot_pass' : 'create_account',
        from: comingFrom,
      }),
    )
    
  }

  return (
    <SafeAreaView className="mt-14 ml-1 ">
      <KeyboardAwareScrollView
        // style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
      >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View className="px-5">
            {/* <Logo /> */}

            {comingFrom === 'forgotPassword' ? (
              <TouchableOpacity
                className=" mb-[76px]"
                onPress={() => navigation.goBack()}
              >
                <Text>
                  {' '}
                  <AntDesign name="arrowleft" size={24} color="#888" />{' '}
                </Text>
              </TouchableOpacity>
            ) : (
              <AuthLogo />
            )}

            <View className="text-[#333333] font-inter py-4 space-y-1">
              {comingFrom === 'forgotPassword' ? (
                <View className="mx-auto mb-7 shadow-sm">
                  <Image
                    source={require('../../assets/images/forgotPassword.png')}
                  />
                </View>
              ) : (
                <View className=" mx-auto mb-7 ">
                  <Image
                    source={require('../../assets/images/createAccount.png')}
                  />
                </View>
              )}

              {comingFrom === 'forgotPassword' ? (
                ''
              ) : (
                <View className="border-b border-[#EEF0F1]">
                  <Text
                    className="text-[#09497D] pb-2 mb-7"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Step 1 of 4
                  </Text>
                </View>
              )}

              {comingFrom === 'forgotPassword' ? (
                // <Text className="font-semibold text-[24px] mt-[45px] text-[#393F42]" style={{fontFamily: 'Chillax'}}>
                <Text
                  className="mt-[45px]"
                  style={{
                    fontFamily: 'Chillax-Semibold',
                    fontSize: 24,
                    color: '#393F42',
                  }}
                >
                  Forgot Password
                </Text>
              ) : (
                // <Text className='font-semibold text-[24px] mb-3 text-[#393F42]' style={{fontFamily: 'Chillax'}}>
                <Text
                  className="mt-[45px]"
                  style={{
                    fontFamily: 'Chillax-Semibold',
                    fontSize: 24,
                    color: '#393F42',
                  }}
                >
                  Create Account
                </Text>
              )}

              {comingFrom === 'forgotPassword' ? (
                <Text
                  className="text-sm text-[#5A6063]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Please enter your registered phone number
                </Text>
              ) : (
                <Text
                  className="text-[14px] text-[#5A6063]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Set up your account now to access financing.
                </Text>
              )}

              <View className="pt-2">
                <View className="flex-row items-center w-full mt-3">
                  <View className="w-[258px]">
                    <InputField
                      label="Phone Number"
                      country
                      placeholder="08023456789"
                      keyboardType="numeric"
                      name="phone_number"
                      required={true}
                      control={control}
                      errors={errors.phone_number}
                      message={'phone is required'}
                    />
                  </View>
                </View>

                <Button
                  className="w-full text-white bg-[#09497D] mt-10 flex-row justify-center items-start py-3.5 rounded-lg mb-5"
                  child={
                    loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      'Proceed'
                    )
                  }
                  onPress={handleSubmit(submitPhone)}
                />

                {comingFrom === 'forgotPassword' ? (
                  ''
                ) : (
                  <>
                    <View className="flex-row items-center justify-between mt-2">
                      <View className="bg-[#5F5F5F] border-[0.2px] w-[120px] h-[0.3px]"></View>

                      <View>
                        <Text
                          className="text-[#5F5F5F] text-[12px]"
                          style={{ fontFamily: 'Axiforma' }}
                        >
                          or Sign Up with
                        </Text>
                      </View>

                      <View className="bg-[#5F5F5F] border-[0.2px] w-[120px] h-[0.3px]"></View>
                    </View>

                    <TouchableOpacity className="flex-row items-center justify-center py-3 mt-6  bg-[#FFF] border border-[#888] rounded-lg">
                      <Image
                        source={require('../../assets/images/googleLogo.png')}
                        className="mr-[6px] w-5 h-5"
                      />

                      <Text
                        className="text-[#09497D] text-[12px]"
                        style={{ fontFamily: 'Axiforma-Medium' }}
                      >
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <View className="flex-row justify-center items-center mb-8 pt-2">
                <Text
                  className="text-[#8E9DA4] text-[12px]"
                  style={{ fontFamily: 'Axiforma-Medium' }}
                >
                  Have an account?
                </Text>

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Login', {
                      comingFrom: 'createAccount',
                    })
                  }}
                  className="ml-1"
                >
                  <Text
                    className="text-[#09497D] text-[12px]"
                    style={{
                      fontFamily: 'Axiforma-SemiBold',
                      color: colors.DEFAULT_BLUE,
                    }}
                  >
                    Log In
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}
