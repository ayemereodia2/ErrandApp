import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect } from 'react'
import { useForm } from 'react-hook-form'
import { SafeAreaView, Text, View } from 'react-native'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { ISecurityQA } from '../../types'


export default function RecoverPasswordScreen() {
  const navigation = useNavigation()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  const {
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ISecurityQA>({
    // resolver: yupResolver(schema),
  })

  return (
    <SafeAreaView>
      <View className="px-4">
        <Logo/>

        <View className="text-[#333333] font-inter py-4 space-y-1">
          <Text className="font-semibold text-sm">Password Recovery</Text>
          <Text className="text-xs">
            Enter your details to recover your Password
          </Text>

          <View className="pt-2 space-y-4">
            <InputField
              label="Security Question"
              placeholder="Enter your password"
              keyboardType="visible-password"
              name="question"
              control={control}
              required
             
            />

            {/* <InputField
              label="Answer"
              placeholder="Enter answer to your Security Question"
              keyboardType="visible-password"
            /> */}

            <Button
              style={{ marginTop: 20 }}
              className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20"
              child="Recover Password"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}
