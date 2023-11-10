import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
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
import { _fetch } from '../../services/axios/http'
import Toast from 'react-native-toast-message'
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

export default function PhonePassword({navigation}: any) {
  const [visible, setVisible] = useState<boolean>(false)
  const [phone, setPhone] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  // const router = useRouter()
  // const [loading, setLoading] = useState<boolean>(false)
  const [otpLoading, setOtpLoading] = useState<boolean>(false)
  const dispatch = useAppDispatch()
  const [error, setError] = useState('')
  const [showPhoneInput, setShowPhoneInput] = useState<boolean>(true)

  const { loading } = useSelector((state: RootState) => state.verifyPhone)

  const schema = yup.object({
    phone_number: yup
      .string()
      .min(11, 'Phone number can not be less than 11')
      .max(11, 'Phone number can not be more than 11')
      .required()
      .trim(),
  })

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])



const submitPhone = async (data: IData) => {

    try {
        const phoneNumber = `+234${phone}`;
        const _rs = await _fetch({
          method: 'POST',
          _url: `/user/verify-phone`,
          body: { phone_number: phoneNumber},
        })
  
        // Check if the response status code indicates an error
        if (!_rs.ok) {
          const errorResponse = await _rs.json()
          throw new Error(`Server error: ${errorResponse.message}`)
        }
        if(phone.length < 11 || phone.length > 11){
           
        setError('Phone number cannot be less or more than 11')

        setTimeout(() => {
            setError('')
        }, 4000);
        
            
           
        }else{
            const responseData = await _rs.json()
            
            navigation.navigate('PasswordOtp', { phone })
            console.log(responseData.message)
            Toast.show({
              type: 'success',
              text1: 'Your OTP has been sent',
            })
            return responseData
           
        }
        
  
  
       
      } catch (error) {
        console.error('Error submitting phone number:', error);
      }
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
          <Text className="font-semibold text-xl text-center">Password Recovery</Text>
            <Text className="text-[14px] text-center mb-4">
            Please supply the phone number used for registration
            </Text>

            

            <View className="pt-2 space-y-6">
              {/* <InputField
                label="Phone Number"
                placeholder="Enter your phone Number"
                keyboardType="numeric"
                name="phone"
                control={control}
                errors={errors.phone_number}
                required
                message={errors?.phone_number?.message}
              /> */}

            <View className=''>
            <Text className='mb-2 text-[#243763] text-[14px]'>Phone Number</Text>
            <TextInput 
            value={phone}
            onChangeText={(text)=>setPhone(text)}
            keyboardType='numeric'
            className='w-full h-14 rounded-md mb-2 bg-gray-200 pl-3'
            />
            <Text className='text-red-500'>{error}</Text>
            </View>

              <Button
                style={{ marginTop: 36 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20 "
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Next'
                  )
                }
                onPress={submitPhone}
              />
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
