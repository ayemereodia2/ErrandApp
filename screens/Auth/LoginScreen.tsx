import Checkbox from 'expo-checkbox'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import AuthLogo from '../../components/AuthLogo'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { loginUser } from '../../services/auth/login'
import { RootState, useAppDispatch } from '../../services/store'
import { ILogin } from '../../types'
import colors from '../../utils/colors'

export default function LoginScreen({ navigation }: any) {
  // const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [countryCode, setCountryCode] = useState('NG')
  const [callingCode, setCallingCode] = useState('234')

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

  const [checked, setChecked] = useState(false)
  const [showBusiness, setShowBusiness] = useState(true)

  const handleChecked = () => {
    setChecked(!checked)
  }

  const handleShowBusiness = () => {
    setShowBusiness(false)
  }

  return (
    <SafeAreaView className="bg-[#FEFEFE] h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView
          style={{ flex: 1, marginTop: 52 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <View className="px-6">
            {/* <Logo /> */}
            <AuthLogo />

            {/* <View className='flex-row items-center justify-between py-4 mb-7 border px-4 rounded-[6px]  border-[#D4DEE2] bg-[#EEF2F3]' style={{display: showBusiness ? 'flex' : 'none'}}>
              <View className=''>
                <Text style={{fontFamily: 'Axiforma'}} className='text-[#09497D]'>Do you have a business?</Text>
              </View>
              <View className='flex-row items-center'>
                <TouchableOpacity className='mr-5' onPress={() => navigation.navigate('BusinessLogin')}>
                  <Text style={{fontFamily: 'Axiforma'}}>Yes</Text>
                </TouchableOpacity>

                <TouchableOpacity className='mr-2' onPress={handleShowBusiness}>
                  <Text style={{fontFamily: 'Axiforma'}}>No</Text>
                </TouchableOpacity>
              </View>
            </View> */}

            <View className="pb-4">
              <Text
                style={{
                  fontFamily: 'Chillax-Semibold',
                  fontSize: 24,
                  color: '#393F42',
                }}
              >
                Get Right Back In
              </Text>
              <Text
                className="text-sm mt-1 text-[#717E83]"
                style={{ fontFamily: 'Axiforma' }}
              >
                Input your password continue enjoying our services.
              </Text>

              <View className="mt-8">
                <View className="flex-row items-center w-full">
                  <View className="w-[255px]">
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

                <View className="relative mt-5 mb-5">
                  <InputField
                    label="Password"
                    placeholder="Enter password"
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
                    className="absolute right-4 bottom-4"
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
                </View>

                <View className="flex-row justify-between items-center mt-3">
                  <View className="flex-row items-center">
                    <Checkbox value={checked} onValueChange={handleChecked} />

                    <Text
                      className="ml-3 text-[12px] text-[#717E83]"
                      style={{ fontFamily: 'Axiforma-Medium' }}
                    >
                      Keep me logged in
                    </Text>
                  </View>

                  <View>
                    <Text
                      style={{
                        fontFamily: 'Axiforma-SemiBold',
                        color: colors.DEFAULT_BLUE,
                      }}
                      onPress={() => {
                        navigation.navigate('VerifyPhone', {
                          comingFrom: 'forgotPassword',
                        })
                      }}
                      className="text-[12px] text-[#243763] mb-2"
                    >
                      Forgot Password?
                    </Text>
                  </View>
                </View>

                <Button
                  className="w-full text-white bg-[#09497D] mt-10 flex-row justify-center items-start py-3.5 rounded-lg mb-5"
                  child={
                    loading ? (
                      <ActivityIndicator size="small" color="white" />
                    ) : (
                      'Login'
                    )
                  }
                  onPress={handleSubmit(onSubmit)}
                />

                <View className="flex-row items-center justify-between mt-2">
                  <View className="bg-[#5F5F5F] border-[0.4px] w-[110px] h-[1px]"></View>

                  <View>
                    <Text
                      className="text-[#5F5F5F] text-[12px]"
                      style={{ fontFamily: 'Axiforma-Medium' }}
                    >
                      or continue with
                    </Text>
                  </View>

                  <View className="bg-[#5F5F5F] border-[0.4px] w-[110px] h-[1px]"></View>
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
                    Log In
                  </Text>
                </TouchableOpacity>

                {errorMessage && (
                  <Text style={{ color: 'red', textAlign: 'center' }}>
                    {errorMessage}
                  </Text>
                )}

                <Text
                  style={{ fontFamily: 'Axiforma-Medium' }}
                  className="text-[#8E9DA4] text-center text-[12px] pb-6 pt-3"
                >
                  Don’t Have an account yet?
                  <Text
                    onPress={() => {
                      navigation.navigate('VerifyPhone', {
                        comingFrom: 'createAccount',
                      })
                    }}
                    className="text-[#243763] text-[12px]"
                    style={{
                      fontFamily: 'Axiforma-SemiBold',
                      color: colors.DEFAULT_BLUE,
                    }}
                  >
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
