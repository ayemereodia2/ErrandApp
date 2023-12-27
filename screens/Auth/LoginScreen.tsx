import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { loginUser } from '../../services/auth/login'
import { RootState, useAppDispatch } from '../../services/store'
import { ILogin } from '../../types'
import AuthLogo from '../../components/AuthLogo'
import Checkbox from 'expo-checkbox'
import CountryPicker from 'react-native-country-picker-modal'
import { AntDesign } from '@expo/vector-icons'

export default function LoginScreen({navigation}: any) {
  // const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [countryCode, setCountryCode] = useState("NG")
  const [callingCode, setCallingCode] = useState("234")

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const onSubmit = (data: ILogin) => {
    const loginData = {
      phone_number: `+234${data?.phone_number.substring(1)}`,
      password: data.password,
      navigation,
      dispatch,
    }

    try {
      dispatch(loginUser(loginData))
    } catch (error) {
      setErrorMessage('Incorrect phone number or password. Please try again.')
    }
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone_number: '',
      password: '',
    },
  })

  const { loading } = useSelector((state: RootState) => state.login)

  return (
    <SafeAreaView className='bg-[#FEFEFE]'>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          style={{ flex: 1, marginTop: 52 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <View className="px-4">
            {/* <Logo /> */}
            <AuthLogo />

            <View className=" font-inter mt-4 pb-4 ">
              <Text className="font-semibold text-[24px] text-[#393F42]" style={{fontFamily: 'Chillax'}}>
                Get Right Back In
              </Text>
              <Text className="text-sm mt-3" style={{fontFamily: 'Axiforma'}}>
              Input your password continue enjoying our services.
              </Text>

              <View className="mt-7">

              <Text className=''>Phone Number</Text>

                <View className='flex-row items-center w-full'>


                  <View className=' flex-row items-center mr-3 mt-1 px-[22px] py-1 w-[81px] border rounded-lg border-[#09497D]'>

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
                  placeholder="Enter your Phone Number"
                  keyboardType="numeric"
                  name="phone_number"
                  required={true}
                  control={control}
                  errors={errors.phone_number}
                  message={'phone is required'}
                  
                />
                </View>
              </View>

                  {/* <Text>Password</Text> */}
                <View className="relative mt-5 mb-5">
                  <InputField
                    label="Password"
                    placeholder="Enter your password"
                    keyboardType="default"
                    name="password"
                    required={true}
                    control={control}
                    errors={errors.password}
                    message={'password is required'}
                    secureTextEntry={showPassword}
                  />

                  <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-4 bottom-7"
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>

              <View className='flex-row justify-between items-center mb-7'> 

                <View className='flex-row items-center'>
                <Checkbox />

                <Text className='ml-2 text-[12px]' style={{fontFamily: 'Axiforma'}}>Keep me logged in</Text>
                </View>

              <View>
                <Text
                  onPress={() => {
                    navigation.navigate('VerifyPhone', {
                      comingFrom: 'forgotPassword',
                    })
                  }}
                  className="font-bold text-[#243763] mb-2"
                >
                  Forgot Password?
                </Text>
                </View>
                </View>

                <Button
                  className="w-full text-white bg-[#243763] mt-8 flex-row justify-center items-start py-4 rounded-lg mb-5"
                  child={
                    loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      'Login'
                    )
                  }
                  onPress={handleSubmit(onSubmit)}
                  // className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
                />

                {errorMessage && (
                  <Text style={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                  </Text>
                )}

                <Text className="text-black text-center pb-6 pt-3">
                  Don’t Have an account yet?
                  <Text
                    onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}
                    className="font-bold text-[#243763]"
                  >
                    {' '}
                    Create Account
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
