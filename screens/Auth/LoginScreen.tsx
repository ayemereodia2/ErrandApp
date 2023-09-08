import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  ImageBackground,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { loginUser } from '../../services/auth/login'
import { RootState, useAppDispatch } from '../../services/store'
import { ILogin } from '../../types'

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [showPassword, setShowPassword] = useState(true)

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
    }
    dispatch(loginUser(loginData))
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
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-4">
          <View className="mt-20">
            <ImageBackground
              source={require('../../assets/images/new_Swave_2.png')}
              className="mt-[30px] mx-auto justify-center items-center w-[120] h-[100]"
              resizeMode="contain"
            ></ImageBackground>
          </View>

          <View className="text-[#333333] font-inter mt-4 py-4 space-y-1">
            <Text className="font-semibold text-sm text-center">
              Welcome Back, Please Login
            </Text>
            <Text className="text-xs text-center">
              Enter your Gofer credentials and Login
            </Text>

            <View className="pt-2 space-y-4">
              <InputField
                label="Phone Number"
                placeholder="Enter your Phone Number"
                keyboardType="numeric"
                name="phone_number"
                required={true}
                control={control}
                errors={errors.phone_number}
                message={'phone is required'}
              />

              <View className="relative">
                <InputField
                  label="Password"
                  placeholder="Enter your password"
                  keyboardType="default"
                  name="password"
                  required={true}
                  control={control}
                  errors={errors.password}
                  message={'password is required'}
                  secureTextEntry={!showPassword}
                />

                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  className="absolute right-7 bottom-3"
                >
                  <Icon
                    name={showPassword ? 'eye' : 'eye-slash'}
                    size={24}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>

              <Button
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#000000" />
                  ) : (
                    'Login'
                  )
                }
                onPress={handleSubmit(onSubmit)}
                // className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
              />
              <Text className="text-black text-center pb-6">
                Don’t Have an Account?
                <Text
                  onPress={() => {
                    navigation.navigate('CreateAccount')
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
      </ScrollView>
    </SafeAreaView>
  )
}
