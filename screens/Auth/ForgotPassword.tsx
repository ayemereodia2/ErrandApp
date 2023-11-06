import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { verifyPhone } from '../../services/auth/verify-phone'
import { RootState, useAppDispatch } from '../../services/store'

import { ISecurityQA } from '../../types'
import { ScrollView } from 'react-native'
import { useSelector } from 'react-redux'
import { ActivityIndicator } from 'react-native'
import { TextInput } from 'react-native'
import { _fetch } from '../../services/axios/http'
import Toast from 'react-native-toast-message'



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

const ForgotPassword = () => {

    const navigation = useNavigation()

    const [password, setPassword] = useState<string>('')
    const [confirmPassword, setConfirmPassword] = useState<string>('')
   
    const dispatch = useAppDispatch()
    const [error, setError] = useState('')
  
    const { loading } = useSelector((state: RootState) => state.verifyPhone)
  
    const schema = yup.object().shape({
        password: yup.string().required('Password is required'),
        confirmPassword: yup
          .string()
          .required('Confirm Password is required')
          .oneOf([yup.ref('password')], 'Passwords must match'),
      });
      

    const updatePassword = async (userData: any) => {
       
        try {
          const _rs = await _fetch({
            method: 'POST',
            _url: `/user/password`,
            body: userData,
          })
    
          // Check if the response status code indicates an error
          if (!_rs.ok) {
            const errorResponse = await _rs.json()
            throw new Error(`Server error: ${errorResponse.message}`)
          }
          const responseData = await _rs.json()
        
    
         
    
    
          return responseData
        } catch (error) {
          throw error
        }
      }
    
      const handleUpdatePassword = async () => {
        try {
          const validationResult = await schema.validate({ password, confirmPassword }, { abortEarly: false });
    
          if (validationResult) {
            const updatedData = {
              password: password,
              
            };
    
            const responseData = await updatePassword(updatedData);
    
            if (responseData.success === true) {
              Toast.show({
                type: 'success',
                text1: 'Profile update is successful',
              });
              navigation.navigate('Profile');
            } else {
              Toast.show({
                type: 'error',
                text1: 'Profile update failed:' + responseData.message,
              });
            }
          }
        } catch (error) {
          console.error('Error updating profile:', error);
    
          Toast.show({
            type: 'error',
            text1: 'Sorry, something went wrong',
          });
        }
      };
    

    // const {
    //     control,
    //     handleSubmit,
    //     formState: { errors },
    //   } = useForm<IData>({
    //     resolver: yupResolver(schema),
    //     defaultValues: {
    //       phone_number: '',
    //     },
    //   })
    
    //   const submitPhone = (data: IData) => {
    //     dispatch(
    //       verifyPhone({
    //         navigation,
    //         phone_number: `+234${data.phone_number.substring(1)}`,
    //         from: 'createAccount',
    //       }),
    //     )
    //   }




  return (
    <SafeAreaView className='mx-4 mt-6'>
        <ScrollView>
         <Logo />

        
          <View className="text-[#333333] font-inter py-4 space-y-1">
            <Text className="font-semibold text-xl text-center">Password Recovery</Text>
            <Text className="text-[14px] text-center">
            Enter your new password
            </Text>

            <View className="pt-2 space-y-4 ">
            
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

        <View className="mt-8">
           
            <TextInput
              className="w-full mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              placeholder={' Enter your password'}
              value={password}
              onChangeText={(text) => setPassword(text)}
              placeholderTextColor={'#B3B3B3'}
            />

            <TextInput
              className="w-full mt-4 mb-5 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              placeholder={'Confirm password'}
              value={confirmPassword}
              onChangeText={(text) => setConfirmPassword(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>


             

            <Button
                style={{ marginTop: 36 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20 "
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Update Password'
                  )
                }
                onPress={handleUpdatePassword}
              />
            </View>
          </View>
        
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword