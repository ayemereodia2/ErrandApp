import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import Button from '../../components/Button'
import { Logo } from '../../components/Logo'
import { _fetch } from '../../services/axios/http'
import { string } from 'yup'

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

export default function PasswordOtp({ navigation, route }: any) {
  // const navigation = useNavigation()

  const { phone } = route.params
  
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  // const [phone_no, setPhone_no] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const verifyOtpHandler = async (code) => {

    // const phone = (await AsyncStorage.getItem('phone')) || ''

    console.log(">>>>>tp", code, phone);
    

    try {
      setLoading(true)
      const _rs = await _fetch({
        _url: '/user/verify-otp',
        method: 'POST',
        body: {
          phone_number: `+234${phone}`,
          otp: code,
        },
      })
      setLoading(false)
      // if (_rs.ok) {
      //   const errorResponse = await _rs.json()
      //   throw new Error(`Server error: ${errorResponse.message}`)
      // }
      
      const responseData = await _rs.json()
     
      console.log(responseData)

      return responseData
    } catch (error) {
      throw error
    }

  }


  const handleOtp = async () => {

    const updatedOtp = otp
    

    try {
      const responseData = await verifyOtpHandler(updatedOtp)

      console.log(responseData)

      if (responseData.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Otp verified',
        })
        navigation.navigate('PasswordQuestions', { phone })
      } else {
        Toast.show({
          type: 'error',
          text1: 'otp failed:' + responseData.message,
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors
      console.error('Error updating otp:', error)

      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  

  //     if (responseData.success === false) {
  //       setLoading(false)
  //       Toast.show({
  //         type: 'error',
  //         text1: 'OTP is incorrect',
  //       })
  //     } else {
  //       navigation.navigate('CreateAccount')
  //       Toast.show({
  //         type: 'success',
  //         text1: 'OTP is correct',
  //       })
  //     }
  //   } catch (e) {
  //     Toast.show({
  //       type: 'error',
  //       text1: 'Sorry, Please enter the otp sent to your phone',
  //     })
  //     setLoading(false)
  //   }
  // }

  // const updateUserProfile = async (userData: any) => {
  //   setLoading(true)
  //   try {
  //     const _rs = await _fetch({
  //       method: 'PUT',
  //       _url: `/user/profile`,
  //       body: userData,
  //     })

  //     // Check if the response status code indicates an error
  //     if (!_rs.ok) {
  //       const errorResponse = await _rs.json()
  //       throw new Error(`Server error: ${errorResponse.message}`)
  //     }
  //     const responseData = await _rs.json()
     

  //     setLoading(false)


  //     return responseData
  //   } catch (error) {
  //     throw error
  //   }
  // }

  // const handleUpdateProfile = async () => {
  //   const updatedData = {
  //     first_name: firstName,
  //     last_name: lastName,
  //     bio: about,
  //     email: email,
  //     dob: dateOfBirth,
  //     occupation: occupation,
  //     profile_picture: image,
  //   }

  //   try {
  //     const responseData = await updateUserProfile(updatedData)

  //     if (responseData.success === true) {
  //       Toast.show({
  //         type: 'success',
  //         text1: 'Profile update is successful',
  //       })
  //       navigation.navigate('Profile')
  //     } else {
  //       Toast.show({
  //         type: 'error',
  //         text1: 'Profile update failed:' + responseData.message,
  //       })
  //     }
  //   } catch (error) {
  //     // Handle errors here, such as network errors or server-side errors
  //     console.error('Error updating profile:', error)

  //     Toast.show({
  //       type: 'error',
  //       text1: 'Sorry, something went wrong',
  //     })
  //   }
  // }

  // const getPhone = async () => {
  //   const phone = (await AsyncStorage.getItem('phone')) || ''
  //   setPhone_no(phone)
  // }

  useEffect(() => {
    // getPhone()
  }, [])

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={()=> Keyboard.dismiss()}>
      <View className="px-4">
        <Logo />

        <View className="text-[#333333] font-inter py-2 space-y-1">
          <Text className="font-semibold text-lg text-center">
            OTP verification
          </Text>
          <Text className="text-sm text-center mb-4">
            Enter the OTP number just sent to you at{' '}
            <Text className="text-[#243763]">{phone}</Text>
          </Text>

          <View className="pt-2 flex-row justify-evenly items-center mb-10">
            {/* <OTPInputView
              style={{ width: '80%', height: 80 }}
              pinCount={6}
              code={otp}
              editable={true}
              onCodeChanged={(code) => setOtp(code)}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`)
                code?.length === 6 && verifyOtpHandler(code)
              }}
            /> */}
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setOtp(text)}
              value={otp}
              placeholder="Enter Otp"
              className="border border-[#ccc] p-3 rounded-lg w-full text-base"
            />
          </View>

          <Button
            onPress={handleOtp}
            style={{}}
            className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg"
            child={
              loading ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                'Verify OTP'
              )
            }
          />
        </View>
        {/* </KeyboardAwareScrollView> */}
      </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  borderStyleBase: {
    width: 40,
    height: 45,
    borderColor: '#0000000',
  },

  borderStyleHighLighted: {
    borderColor: '#000000',
  },

  underlineStyleBase: {
    width: 30,
    height: 45,
    borderWidth: 0,
    borderBottomWidth: 1,
    color: '#243763',
    fontSize: 20,
  },

  underlineStyleHighLighted: {
    borderColor: '#000000',
  },
})
