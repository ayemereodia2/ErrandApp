import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import Button from '../../components/Button'
import { Logo } from '../../components/Logo'
import { _fetch } from '../../services/axios/http'

export default function PasswordQuestions({ route }) {
  const { phone } = route.params

  const navigation = useNavigation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const [loading, setLoading] = useState(false)

  //   const arr = [
  //     { text: "Mother's maiden name?", value: "mother's maiden name" },
  //     { text: 'Childhood hero?', value: 'childhood hero?' },
  //     { text: 'First pet?', value: 'First pet?' },
  //     { text: 'First school name?', value: 'First school name?' },
  //     { text: 'Favorite place', value: 'Favorite place?' },
  //     { text: 'Favorite food', value: 'Favorite food?' },
  //     { text: "Father's occupation", value: "Father's occupation" },
  //     { text: "Grandfather's occupation", value: "Grandfather's occupation" },
  //   ]

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  //   const {
  //     handleSubmit,
  //     watch,
  //     setValue,
  //     control,
  //     formState: { errors },
  //   } = useForm<ISecurityQA>({
  //     // resolver: yupResolver(schema),
  //   })

  useEffect(() => {
    getSecurityQuestion()
  }, [])

  const getSecurityQuestion = async () => {
    try {
      setLoading(true)
      const _rs = await _fetch({
        method: 'GET',
        _url: `/security-question?phone=234${phone.slice(1, 11)}`,
      })
      const data = await _rs.json()

      setQuestion(data?.data.question)
      console.log(data?.data.question)
    } catch (error) {
      console.error('Error fetching security question:', error)
    } finally {
      setLoading(false)
    }
  }

  const submitQuestion = async () => {
    try {
      setLoading(true)
      const newData = {
        question: question,
        answer: answer,
      }
      await AsyncStorage.setItem('answer', answer)

      const _rs = await _fetch({
        _url: '/security-question',
        method: 'POST',
        body: newData,
      })
      const rs = await _rs.json()

      if (rs.success === false) {
        Toast.show({
          type: 'success',
          text1: 'success',
        })
        navigation.navigate('RecoverPassword')
      } else {
        Toast.show({
          type: 'error',
          text1: rs.message,
        })
      }
    } catch (e) {
      console.error('Error submitting security question:', e)
    } finally {
      setLoading(false)
    }
  }

  //   const getPhone = async () => {
  //     const token = (await AsyncStorage.getItem('token')) || ''
  //     // setPhone_no(phone)
  //   }

  //   useEffect(() => {
  //     getPhone()
  //   }, [])

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          <Logo />

          {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}
          <View className="text-[#333333] font-inter py-4 space-y-1">
            <Text className="font-semibold text-lg text-center">
              Password Recovery
            </Text>

            <Text className="text-base text-center">
              Please supply the answer to the security question which you
              created during your registration
            </Text>

            <View className="pt-4 space-y-4 mt-4">
              <Text className="text-[#243763] mt-4 text-center text-base mb-2">
                {question ? question : 'No Security Question'}
              </Text>

              <TextInput
                keyboardType="default"
                onChangeText={(text) => setAnswer(text)}
                value={answer}
                placeholder="Enter Your Answer"
                className="border border-[#ccc] p-4 pt-1 rounded-lg w-full text-base"
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
                onPress={submitQuestion}
              />
            </View>
          </View>
          {/* </KeyboardAwareScrollView> */}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}
