import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { createAccount } from '../../services/auth/create-account'
import { RootState, useAppDispatch } from '../../services/store'
import { ISecurityQA } from '../../types'
import AuthLogo from '../../components/AuthLogo'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function SecurityQuestion() {
  const navigation = useNavigation()
  const dispatch = useAppDispatch()
  const [question, setQuestion] = useState('')
  const arr = [
    { text: "Mother's maiden name?", value: "mother's maiden name" },
    { text: 'Childhood hero?', value: 'childhood hero?' },
    { text: 'First pet?', value: 'First pet?' },
    { text: 'First school name?', value: 'First school name?' },
    { text: 'Favorite place', value: 'Favorite place?' },
    { text: 'Favorite food', value: 'Favorite food?' },
    { text: "Father's occupation", value: "Father's occupation" },
    { text: "Grandfather's occupation", value: "Grandfather's occupation" },
  ]

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

  const {loading} = useSelector((state: RootState) => state.createAccount )

  const submitQuestion = async (data: ISecurityQA) => {
    if (!question) {
      return
    }
    const _questionData = {
      question,
      answer: data.answer,
    }
    const userData = JSON.parse((await AsyncStorage.getItem('userData')) || '')
    const newData = { ...userData, ..._questionData, dispatch, navigation }

    dispatch(createAccount(newData))
  }

  return (
    <SafeAreaView>
      <ScrollView>

      <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          {/* <Logo /> */}

          <AuthLogo />

          {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}
          <View className="text-[#333333] font-inter py-4 ">
            <Text className='font-semibold text-[24px] text-[#393F42] mb-2' >
              Security Question
            </Text>
            <Text className="text-sm mb-7">
            Kindly select and answer
            </Text>

            <View className=" ">
              <Text className="text-[#243763]">Security Question</Text>
              <Picker
                selectedValue={question}
                onValueChange={(itemValue, itemIndex) => setQuestion(itemValue)}
                mode={'dialog'}
              >
                {arr.map((question) => (
                  <Picker.Item label={question.text} value={question.value} />
                ))}
              </Picker>

              <InputField
                label="Answer"
                placeholder="Enter your answer"
                keyboardType="default"
                name="answer"
                control={control}
                required
                errors={errors.answer}
                message={errors?.answer?.message}
              />

              <Button
                style={{ marginBottom: 40 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-5"
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Create Account'
                  )
                }
                onPress={handleSubmit(submitQuestion)}
              />
            </View>
          </View>
          
        </View>
      </TouchableWithoutFeedback>
      </KeyboardAwareScrollView> 
      </ScrollView>
    </SafeAreaView>
  )
}
