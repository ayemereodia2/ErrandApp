import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  Pressable,
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
import OtpInputs from '../../components/OtpInputs'
import { template } from '@babel/core'
import { TouchableOpacity } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { AntDesign } from '@expo/vector-icons'

type OtpProp = {
  ref: any
  onChangeText: any
}

type OtpInputProps = {
  length: number,
  value: Array<string>,
  disabled: boolean,
  onChange(value: Array<string>): void
  navigation: any,
   route: any
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

export default function VerifyOtpScreen({length, value, disabled, onChange, navigation, route }: OtpInputProps) {
  // const navigation = useNavigation()
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [phone_no, setPhone_no] = useState('')
  const inputRefs = useRef<Array<TextInput>>([])
  const [timer, setTimer] = useState(60); // Timer state in seconds

  


  const { phone_number, comingFrom } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])


  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => {
        if (prevTimer === 0) {
          clearInterval(interval);
          return 60; // Reset timer to 1 minute (60 seconds)
        } else {
          return prevTimer - 1; // Decrement timer by 1 second
        }
      });
    }, 1000);

    return () => clearInterval(interval); // Clean up interval on unmount
  }, []);

  const formatTimer = () => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `0:${formattedSeconds}`;
  };



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
    <SafeAreaView className='mt-20'>

    <KeyboardAwareScrollView
          // style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >

      <View className="px-4" >
        {/* <Logo /> */}

        {comingFrom === 'forgotPassword' 
            ?
            <TouchableOpacity className=' mb-[50px]' onPress={() => navigation.goBack()}>
              <Text> <AntDesign name="arrowleft" size={24} color="#888" /> </Text>
            </TouchableOpacity>
            :
            (
              <AuthLogo />
            )
          }

        <View>
          <Image source={require('../../assets/images/verifyOtp.png')}  className='mx-auto shadow-sm'/>
        </View>

        <View className="text-[#333333] font-inter mt-10  ">

        {comingFrom === 'forgotPassword' 
            ?
            ''
            :
            (
              <View className='border-b border-[#EEF0F1]'>
            <Text className='text-[#09497D] pb-2' style={{fontFamily: 'Axiforma'}}>Step 2 of 4</Text>
            </View>
            )
          }
          
          { comingFrom === 'forgotPassword' ? (
              // <Text className="font-semibold text-[24px] mt-[45px] text-[#393F42]" style={{fontFamily: 'Chillax'}} onPress={() => Keyboard.dismiss()}>
              <Text className='mt-[45px]' style={{  fontWeight: 'bold', fontSize: 24, color: '#393F42' }} onPress={() => Keyboard.dismiss()}>

             Forgot Password
             </Text>
          ) :
          (
            // <Text className="font-semibold text-[24px] text-[#393F42]"  style={{fontFamily: 'Chillax'}} onPress={()=> Keyboard.dismiss()}>
            <Text className='mt-[40px]' style={{  fontWeight: 'bold', fontSize: 24, color: '#393F42' }} onPress={() => Keyboard.dismiss()}>

           Verification
            </Text>
          )}
        
          <Text className="text-sm text-[#5A6063] mt-2" style={{fontFamily: 'Axiforma'}}>
          Kindly enter the 6-digits verification code sent to
          </Text>
          <Text className="text-[#243763]">{phone_number}</Text>

          <Text className='text-[#393F42] text-sm mt-7 font-medium ml-1'>Code</Text>

          <View className="pt-2 flex-row justify-between mx-1 mb-3">
            {/* <TextInput
              keyboardType="numeric"
              onChangeText={(text) => setOtp(text)}
              value={otp}
              placeholder="Enter Otp"
              className="border border-[#ccc] p-3 rounded-lg w-full text-base"
            /> */}

            <OtpInputs onChangeText={setOtp} />

           
            
          </View>

          <Text className='text-[#09497D] text-sm text-center mb-[50px]' style={{fontFamily: 'Axiforma'}}>
          {formatTimer()}
             </Text>

          <Button
            onPress={() => verifyOtpHandler(otp)}
            style={{}}
            className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg"
            child={
              loading ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                'Proceed'
              )
            }
          />
        </View>


          { comingFrom === 'forgotPassword' ? (
            <Text className="text-[#8E9DA4] text-center mt-3 pb-6 pt-3" style={{fontFamily: 'Axiforma'}}>
                Didn’t get code?
                  <Text
                    onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}
                    className="font-bold text-[#09497D]" style={{fontFamily: 'Axiforma'}}
                  >
                    {' '}
                    Resend code
                  </Text>
                </Text>
          ) :
          (
            <View className='flex-row items-center justify-between'>
            <Text className="text-[#8E9DA4] mt-3 pb-6 pt-3" style={{fontFamily: 'Axiforma'}}>
                Didn’t get OTP? 
                  <Text
                    onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}
                    className="font-bold text-[#09497D]" style={{fontFamily: 'Axiforma'}}
                  >
                    {'  '}
                    Resend code
                  </Text>
                </Text>

                      <TouchableOpacity  onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}>
                    <Text className='font-bold text-[#09497D] text-sm' style={{fontFamily: 'Axiforma'}}>Change Phone number</Text>
                    </TouchableOpacity>
                </View>
          )
          }

          { comingFrom === 'forgotPassword' ? '' : (
              <Text className="text-[#8E9DA4] text-center pb-6">
              Have an Account?{' '}
              <Text
                onPress={() => {
                  navigation.navigate('Login')
                }}
                className="font-bold text-[#243763]"
                style={{fontFamily: 'Axiforma'}}
              >
                Log In
              </Text> 
              </Text>
          )}

         
        
       
      </View>
      </KeyboardAwareScrollView> 
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
  input: {
fontSize: 24,
color: 'black',
textAlign: 'center',
width: 45,
height: 55,
backgroundColor: 'white',
borderRadius: 14
  },

  underlineStyleHighLighted: {
    borderColor: '#000000',
  },
})
