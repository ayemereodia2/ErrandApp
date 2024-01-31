import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import Checkbox from 'expo-checkbox'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Image, SafeAreaView, ScrollView, Text, View } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as yup from 'yup'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { useAppDispatch } from '../../services/store'
import { ICreateAccount } from '../../types'
import colors from '../../utils/colors'

export default function CreateAccountScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  const schema = yup.object({
    first_name: yup.string().required('First name is required').trim(),
    email: yup.string().email('Please enter a correct email address').trim(),
    // phone_number: yup
    //   .string()
    //   .min(11, 'Phone must be 11 digits')
    //   .required()
    //   .trim(),
    last_name: yup.string().required('Last name is required').trim(),
    referralCode: yup.string().optional().trim(),
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
    const phone_number = (await AsyncStorage.getItem('phone')) || ''
    const newData = {
      // dispatch,
      // navigation,
      phone_number,
      client: 'web',
      ...data,
    }

    await AsyncStorage.setItem('userData', JSON.stringify(newData))
    navigation.navigate('SecurityQuestions')
  }

  const [checked, setChecked] = useState(false)

  const handleChecked = () => {
    setChecked(!checked)
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
          <View className="px-6">
            {/* <Logo /> */}
            <Image
              source={require('../../assets/images/authSwave.png')}
              className="mt-[29px] mx-1 mb-7"
            />

            <View className="text-[#333333] font-inter ">
              <View className="border-b border-[#EEF0F1]">
                <Text
                  className="text-[#09497D] pb-2 mb-7"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Step 3 of 4
                </Text>
              </View>

              <Text
                style={{
                  fontFamily: 'Chillax-Semibold',
                  color: colors.DEFAULT_BLUE,
                }}
                className="text-[24px] text-[#393F42] mb-2"
              >
                Profile
              </Text>
              <Text
                style={{
                  fontFamily: 'Axiforma',
                }}
                className="text-sm text-[#717E83] mb-8"
              >
                Create your account profile by filling your details below.
              </Text>

              <View className="pt-3">
                <View className="mb-7">
                  <InputField
                    label="First Name"
                    placeholder="Enter First Name"
                    keyboardType="default"
                    name="first_name"
                    control={control}
                    required
                    errors={errors.first_name}
                    message={errors?.first_name?.message}
                  />
                </View>

                <View className="mb-7">
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
                </View>

                <View className="mb-7">
                  <InputField
                    label="Email Address"
                    placeholder="Enter your email addrss"
                    keyboardType="default"
                    optional="optional"
                    name="email"
                    control={control}
                    errors={errors.email}
                    message={errors?.email?.message}
                  />
                </View>

                <View className="mb-7">
                  <InputField
                    label="Password"
                    placeholder="***********"
                    keyboardType="visible-password"
                    name="password"
                    control={control}
                    required
                    errors={errors.password}
                    message={errors?.password?.message}
                  />
                </View>

                <View className="mb-7">
                  <InputField
                    label="Confirm Password"
                    placeholder="***********"
                    keyboardType="visible-password"
                    name="confirmPassword"
                    control={control}
                    required
                    errors={errors.confirmPassword}
                    message={errors?.confirmPassword?.message}
                  />
                </View>

                <View className="">
                  <InputField
                    label="Referral Code"
                    optional="optional"
                    placeholder="Enter Invite Code"
                    control={control}
                    keyboardType="default"
                    name="referralCode"
                    errors={errors.referralCode}
                    message={errors.referralCode?.message}
                  />
                </View>

                <View className="flex-row items-center mt-7">
                  <Checkbox
                    value={checked}
                    onValueChange={handleChecked}
                    className=""
                  />
                  <Text
                    style={{
                      fontFamily: 'Axiforma',
                    }}
                    className="ml-2 text-[12px] text-[#5A6063]"
                  >
                    I Accept Privacy Policies,{' '}
                    <Text className="text-[#09497D] font-medium ">
                      Terms & Conditions
                    </Text>{' '}
                  </Text>
                </View>

                <Button
                  style={{}}
                  className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-6 mb-6"
                  child="Proceed"
                  onPress={handleSubmit(onSubmit)}
                />
                {/* <Text className="text-black text-center pb-6">
                  Already Have an Account?{' '}
                  <Text
                    onPress={() => {
                      navigation.navigate('Login')
                    }}
                    className="font-bold text-[#243763]"
                  >
                    Login
                  </Text>
                </Text> */}
              </View>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}
