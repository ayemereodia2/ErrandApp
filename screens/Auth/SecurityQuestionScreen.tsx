import AsyncStorage from '@react-native-async-storage/async-storage'
import { Picker } from '@react-native-picker/picker'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  View,
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { Logo } from '../../components/Logo'
import { _fetch } from '../../services/axios/http'
import { ISecurityQA } from '../../types'

export default function SecurityQuestion() {
  const navigation = useNavigation()
  const [question, setQuestion] = useState('')
  const [loading, setLoading] = useState(false)

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

  const submitQuestion = async (data: ISecurityQA) => {
    setLoading(true)
    const phone = (await AsyncStorage.getItem('phone')) || ''
    if (!question) {
      return
    }

    const newData = {
      question,
      answer: data.answer,
    }

    console.log('phpne__', newData)

    try {
      const _rs = await _fetch({
        _url: 'security-question',
        method: 'POST',
        body: JSON.stringify(newData),
      })
      const rs = await _rs.json()

      if (rs.success === true) {
        setLoading(false)
        Toast.show({
          type: 'success',
          text1: rs.message,
        })
        navigation.navigate('Main')
      }

      if (rs.success === false) {
        setLoading(false)
        Toast.show({
          type: 'error',
          text1: rs.message,
        })
      }
    } catch (e) {
      setLoading(false)
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
      throw e
    }
  }

  const getPhone = async () => {
    const token = (await AsyncStorage.getItem('token')) || ''
    // setPhone_no(phone)
  }

  useEffect(() => {
    getPhone()
  }, [])

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          <Logo />

          <View className="text-[#333333] font-inter py-4 space-y-1">
            <Text className="font-semibold text-sm">Security Question</Text>
            <Text className="text-xs">
              Enter your details for security questions
            </Text>

            <View className="pt-2 mt-10 space-y-4">
              <Text>Select Question</Text>
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
                style={{ marginTop: 20 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-20"
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Submit Answer'
                  )
                }
                onPress={handleSubmit(submitQuestion)}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
