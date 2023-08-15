import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { loginUser } from '../../services/auth/login'
import { RootState, useAppDispatch } from '../../services/store'
import { ILogin } from '../../types'

export default function LoginScreen() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const onSubmit = (data: ILogin) => {
    const loginData = {
      phone_number: `+234${data?.phone_number.substring(1)}`,
      password: data.password,
      navigation
    }
    dispatch(loginUser(loginData));
  };

  const { control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      phone_number: '',
      password: ''
    }
  });

  const {loading} = useSelector((state: RootState) => state.login)

  return (
    <SafeAreaView>
      <View className="px-4">
       <Logo/>

        <View className="text-[#333333] font-inter py-4 space-y-1">
          <Text className="font-semibold text-sm">
            Welcome Back, Please Login
          </Text>
          <Text className="text-xs">
            Enter your Gofer credentials and Login
          </Text>

          <View className="pt-2 space-y-4">
            <InputField
              label="Phone Number"
              placeholder="Enter your phone"
              keyboardType="numeric"
              name="phone_number"
              required={true}
              control={control}
              errors={errors.phone_number}
              message={"phone is required"}
            />

            <InputField
              label="Password"
              placeholder="Enter your password"
              keyboardType="visible-password"
              name='password'
              required={true}
              control={control}
              errors={errors.password}
              message={"password is required"}

            />

            <Button
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
              child={loading ? <ActivityIndicator size="small" color="#000000" />: "Login"}
              onPress={handleSubmit(onSubmit)}
              // className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-16"
            />
            <Text className="text-black text-center pb-6">
              Don’t Have an Account?
              <Text onPress={() => {navigation.navigate("CreateAccount")}} className="font-bold text-[#243763]"> {" "}Create Account</Text>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
