import { yupResolver } from '@hookform/resolvers/yup'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import * as yup from 'yup'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { _fetch } from '../../services/axios/http'
import { useAppDispatch } from '../../services/store'
import AuthLogo from '../../components/AuthLogo'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

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

interface IForgetPassword {
  password: string
  confirmPassword: string
}

const ForgotPassword = () => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [password, setPassword] = useState<string>('')
  const [showPassword, setShowPassword] = useState(true)
  const [showPassword2, setShowPassword2] = useState(true)
  const [showConfirmPassword, setShowConfirmPassword] = useState(true)

  const dispatch = useAppDispatch()
  const [error, setError] = useState('')

  // const { loading } = useSelector((state: RootState) => state.verifyPhone)

  const schema = yup.object({
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
  } = useForm<IForgetPassword>({
    resolver: yupResolver(schema),
  })

  const passwordhandler = async (data: IForgetPassword) => {
    try {
      setLoading(true)
      const phone = await AsyncStorage.getItem('phone')
      const otp = await AsyncStorage.getItem('otp')
      const answer = await AsyncStorage.getItem('answer')

      const payload = {
        new_password: data.password,
        phone,
        answer,
        otp,
      }

      await _fetch({
        method: 'POST',
        _url: `/user/password`,
        body: payload,
      })
        .then((rs) => rs.json())
        .then((rs) => {
          if (rs.success === true) {
            setLoading(false)
            Toast.show({
              type: 'success',
              text1: 'Password has been updated successfully',
            })
            navigation.navigate('Login')
          } else {
            setLoading(false)
            Toast.show({
              type: 'error',
              text1: rs.message,
            })
          }
        })
    } catch (error) {
      setLoading(false)

      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <SafeAreaView className="mx-4 mt-6">
      <ScrollView>
        {/* <Logo /> */}
        <AuthLogo />

        <View className="text-[#333333] font-inter">

          <Text className="font-semibold text-[24px] mt-10">
           Reset Password
          </Text>
          <Text className="text-sm text-[#5A6063] mt-2" style={{fontFamily: 'Axiforma'}}>
          Enter a new password
          </Text>

          <View className="pt-2  ">
            <View className="mt-2">
              <View className="relative">
                <InputField
                  label="New Password"
                  placeholder="Enter your password"
                  keyboardType="default"
                  name="password"
                  control={control}
                  required
                  errors={errors.password}
                  message={errors?.password?.message}
                />
                 <TouchableOpacity
                    onPress={() => setShowPassword(!showPassword)}
                    className="absolute right-8 bottom-5"
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
              </View>

              <View className="relative mb-6">
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

          <TouchableOpacity
                    onPress={() => setShowPassword2(!showPassword2)}
                    className="absolute right-8 bottom-5"
                  >
                    <Icon
                      name={showPassword ? 'eye-slash' : 'eye'}
                      size={24}
                      color="gray"
                    />
                  </TouchableOpacity>
              </View>
            </View>

            <Button
              style={{ marginTop: 36 }}
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg "
              child={
                loading ? (
                  <ActivityIndicator size="small" color="#00ff00" />
                ) : (
                  'Reset Password'
                )
              }
              onPress={handleSubmit(passwordhandler)}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ForgotPassword
