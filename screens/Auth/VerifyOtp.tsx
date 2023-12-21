import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import Button from '../../components/Button'
import { Logo } from '../../components/Logo'
import { _fetch } from '../../services/axios/http'
import AuthLogo from '../../components/AuthLogo'

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

export default function VerifyOtpScreen({ navigation, route }: any) {
  // const navigation = useNavigation()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone_no, setPhone_no] = useState('')

  const { comingFrom } = route.params

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const verifyOtpHandler = async (code: string) => {
    const phone = (await AsyncStorage.getItem('phone')) || ''

    try {
      setLoading(true)
      const _rs = await _fetch({
        _url: '/user/verify-otp',
        method: 'POST',
        body: {
          phone_number: `+${phone?.substring(1)}`,
          otp: code,
        },
      })
      const rs = await _rs.json()

      if (rs.success === false) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'OTP is incorrect',
        })
      } else {
        if (comingFrom === 'forgotPassword') {
          await AsyncStorage.setItem('otp', code)
          navigation.navigate('VerifyQuestion')
          Toast.show({
            type: 'success',
            text1: 'OTP is correct',
          })
        }
        if (comingFrom === 'createAccount') {
          navigation.navigate('CreateAccount')
          Toast.show({
            type: 'success',
            text1: 'OTP is correct',
          })
        }
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Sorry, Please enter the otp sent to your phone',
      })
      setLoading(false)
    }
  }

  useEffect(() => {
    // getPhone()
  }, [])

  return (
    <SafeAreaView>
      <View className="px-4">
        {/* <Logo /> */}

        <AuthLogo />

        <View className="text-[#333333] font-inter py-2 space-y-1">
          <Text className="font-semibold text-lg text-center">
            OTP verification
          </Text>
          <Text className="text-sm text-center mb-4">
            Enter the OTP number just sent to you at{' '}
            <Text className="text-[#243763]">{phone_no}</Text>
          </Text>

          <View className="pt-2 flex-row justify-evenly items-center mb-10">
            <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setOtp(text)}
              value={otp}
              placeholder="Enter Otp"
              className="border border-[#ccc] p-3 rounded-lg w-full text-base"
            />
          </View>

          <Button
            onPress={() => verifyOtpHandler(otp)}
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
