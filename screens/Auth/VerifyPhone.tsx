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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons'
import { Image } from 'react-native'

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
  const [countryCode, setCountryCode] = useState("NG")
  const [callingCode, setCallingCode] = useState("234")

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
    <SafeAreaView className="mt-20 ml-1 ">
      
      <KeyboardAwareScrollView
          // style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          {/* <Logo /> */}

          {comingFrom === 'forgotPassword' 
            ?
            <TouchableOpacity className=' mb-[76px]' onPress={() => navigation.goBack()}>
              <Text> <AntDesign name="arrowleft" size={24} color="#888" /> </Text>
            </TouchableOpacity>
            :
            (
              <AuthLogo />
            )
          }
          

          {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}
          <View className="text-[#333333] font-inter py-4 space-y-1">

          {comingFrom === 'forgotPassword' 
            ?
            <View className='mx-auto mb-7 shadow-sm'>
            <Image source={require('../../assets/images/forgotPassword.png')} />
            </View>
            :
            (
              <View className=' mx-auto mb-7 '>
            <Image source={require('../../assets/images/createAccount.png')} />
            </View>
            )
          }

            {comingFrom === 'forgotPassword' 
            ?
            ''
            :
            (
              <View className='border-b border-[#EEF0F1]'>
            <Text className='text-[#09497D] pb-2 mb-7' style={{fontFamily: 'Axiforma'}}>Step 1 of 4</Text>
            </View>
            )
          }

            
            
            
              {comingFrom === 'forgotPassword'
                ? 
                (
                  <Text className="font-semibold text-[24px] mt-[45px] text-[#393F42]" style={{fontFamily: 'Chillax'}}>
                Forgot Password
                </Text>
                )
                : 
                (
                  <Text className='font-semibold text-[24px] mb-3 text-[#393F42]'>Create Account</Text>
                
                )
              }
            
           
              {comingFrom === 'forgotPassword'

                ? 
                (  <Text className="text-sm mt-1 text-[#5A6063]" style={{fontFamily: 'Axiforma'}}>
                  Please enter your registered phone number
                  </Text>
                )
                : 
                (
                <Text className='text-[14px]' style={{fontFamily: 'Axiforma'}}>
                Set up your account now to access financing.
                </Text>) }
            

            <View className="pt-2 mt-8">
              {/* <InputField
                label="Phone Number"
                placeholder="Enter your phone Number"
                keyboardType="numeric"
                name="phone_number"
                control={control}
                errors={errors.phone_number}
                required
                message={errors?.phone_number?.message}
              /> */}

                  <Text className='mt-[26px] text-[#5E6366] text-sm' style={{fontFamily: 'Axiforma'}}>Phone Number</Text>

                  <View className='flex-row items-center w-full'>


                      <View className=' flex-row items-center mr-3 mt-1 px-[22px] py-[7px] w-[81px] border rounded-lg border-[#96A0A5]'>

                      <CountryPicker
                      withFilter
                      countryCode={countryCode}
                      withFlag
                      withAlphaFilter={false}
                      withCurrencyButton={false}
                      withCallingCode
                      onSelect={country => {
                        console.log('country', country);
                        const {cca2, callingCode} = country;
                        setCountryCode(cca2)
                        setCallingCode(callingCode[0]);
                      }}
                      containerButtonStyle={{
                        alignItems: 'center',
                        
                        marginRight: 15
                      }}
                      />

                      <Text className='mt-1'><AntDesign name="down" size={16} color="#130F26" /></Text>
                      </View>

                      <View className='w-[70vw]'>
                      <InputField
                      // label="Phone Number"
                      placeholder="8023456789"
                      keyboardType="numeric"
                      name="phone_number"
                      required={true}
                      control={control}
                      errors={errors.phone_number}
                      message={'phone is required'}

                      />
                      </View>
                      </View>


              <TouchableOpacity
                style={{ marginTop: 65 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-[65px]"
                
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

            <View className='flex-row justify-center items-center mb-8'>

            <Text className="text-[#8E9DA4] mt-5" style={{fontFamily: 'Axiforma'}}>
                  Have an account?
                 
                </Text>

                <TouchableOpacity onPress={() => {
                      navigation.navigate('Login', {
                        comingFrom: 'createAccount',
                      })
                    }} className='ml-1'>
                  <Text
                    
                    className="font-bold text-[#09497D] mt-5" style={{fontFamily: 'Axiforma'}}
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
