import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { createAccount } from '../../services/auth/create-account'
import { useAppDispatch } from '../../services/store'
import { ICreateAccount } from '../../types'

export default function CreateAccountScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const schema = yup.object({
    first_name: yup.string().required('First name is required').trim(),
    email: yup
      .string()
      .email('Please enter a correct email address')
      .required()
      .trim(),
    // phone_number: yup
    //   .string()
    //   .min(11, 'Phone must be 11 digits')
    //   .required()
    //   .trim(),
    last_name: yup.string().required('Last name is required').trim(),
    referralCode: yup.string().required('Referral Code is required').trim(),
    password: yup
      .string()
      .min(8, 'Password must be more than 8 chars')
      .required()
      .trim(),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Password must match')
      .trim()
      .required(),
  })

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ICreateAccount>({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data: ICreateAccount) => {
    console.log('>>>>data', data)

    const phone_number = (await AsyncStorage.getItem('phone')) || ''
    const newData = {
      navigation,
      phone_number,
      client: 'web',
      ...data,
    }
    dispatch(createAccount(newData))
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          <View className="px-4">
            <Logo />

            <View className="text-[#333333] font-inter pb-4 space-y-1">
              <Text className="font-semibold text-xl text-center">Create an Account</Text>
              <Text className="text-sm text-center">
                Let’s get started and create a Profile for you
              </Text>

              <View className="pt-2 space-y-4">
                <InputField
                  label="First Name"
                  placeholder="Enter your Name"
                  keyboardType="default"
                  name="first_name"
                  control={control}
                  required
                  errors={errors.first_name}
                  message={errors?.first_name?.message}
                />

                <InputField
                  label="Last Name"
                  placeholder="Enter your Name"
                  keyboardType="default"
                  name="last_name"
                  control={control}
                  required
                  errors={errors.last_name}
                  message={errors?.last_name?.message}
                />

                <InputField
                  label="Email"
                  placeholder="Enter your email"
                  keyboardType="default"
                  name="email"
                  control={control}
                  required
                  errors={errors.email}
                  message={errors?.email?.message}
                />

                <InputField
                  label="Password"
                  placeholder="Enter your Name"
                  keyboardType="visible-password"
                  name="password"
                  control={control}
                  required
                  errors={errors.password}
                  message={errors?.password?.message}
                />

                <InputField
                  label="Confirm Password"
                  placeholder="re-enter password"
                  keyboardType="visible-password"
                  name="confirmPassword"
                  control={control}
                  required
                  errors={errors.confirmPassword}
                  message={errors?.confirmPassword?.message}
                />

                <InputField
                  label="Referral Code"
                  placeholder="Enter referral code"
                  control={control}
                  keyboardType="default"
                  name="referralCode"
                  errors={errors.referralCode}
                  message={errors.referralCode?.message}
                />

                <Button
                  style={{}}
                  className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
                  child="Create Account"
                  onPress={handleSubmit(onSubmit)}
                />
                <Text className="text-black text-center pb-6">
                  Already Have an Account?{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('Login')
                    }}
                    className="font-bold text-[#243763]"
                  >
                    Login
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
