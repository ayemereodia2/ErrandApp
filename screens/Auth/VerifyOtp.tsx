import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import OTPInputView from '@twotalltotems/react-native-otp-input'
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

export default function VerifyOtpScreen() {
  const navigation = useNavigation()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone_no, setPhone_no] = useState('')

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
        body: JSON.stringify({
          phone_number: `+${phone?.substring(1)}`,
          otp: code,
        }),
      })
      const rs = await _rs.json()
      if (rs.success === false) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: 'OTP is incorrect',
        })
      } else {
        navigation.navigate('CreateAccount')
        Toast.show({
          type: 'success',
          text1: 'OTP is correct',
        })
      }
    } catch (e) {
      Toast.show({
        type: 'error',
        text1: 'Sorry, Please enter the otp sent to your phone',
      })
      setLoading(false)
    }
  }

  const getPhone = async () => {
    const phone = (await AsyncStorage.getItem('phone')) || ''
    setPhone_no(phone)
  }

  useEffect(() => {
    getPhone()
  }, [])

  return (
    <SafeAreaView>
      <View className="px-4">
        <Logo/>
        <View className="text-[#333333] font-inter py-4 space-y-1">
          <Text className="font-semibold text-sm">OTP verification</Text>
          <Text className="text-xs mb-4">
            Enter the OTP number just sent to you at{' '}
            <Text className="text-[#243763]">{phone_no}</Text>
          </Text>

          <View className="pt-2 flex-row justify-evenly items-center mb-10">
            <OTPInputView
              style={{ width: '80%', height: 80 }}
              pinCount={6}
              code={otp}
              editable={true}
              onCodeChanged={(code) => setOtp(code)}
              keyboardAppearance="dark"
              keyboardType="number-pad"
              // code={this.state.code} //You can supply this prop or not. The component will be used as a controlled / uncontrolled component respectively.
              // onCodeChanged = {code => { this.setState({code})}}
              autoFocusOnLoad
              codeInputFieldStyle={styles.underlineStyleBase}
              codeInputHighlightStyle={styles.underlineStyleHighLighted}
              onCodeFilled={(code) => {
                console.log(`Code is ${code}, you are good to go!`)
                code.length === 6 && verifyOtpHandler(code)
              }}
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
