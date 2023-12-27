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
import AuthLogo from '../../components/AuthLogo'

export default function PasswordQuestions({ route }: any) {
  const navigation = useNavigation()
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    })
  }, [])

  useEffect(() => {
    getSecurityQuestion()
  }, [])

  const getSecurityQuestion = async () => {
    const _phone = (await AsyncStorage.getItem('phone')) || ''
    try {
      setLoading(true)
      const _rs = await _fetch({
        method: 'GET',
        _url: `/security-question?phone=${_phone.substring(1)}`,
      })
      const data = await _rs.json()

      setQuestion(data?.data.question)
    } catch (error) {
    } finally {
      setLoading(false)
    }
  }

  const submitQuestion = async () => {
    const _phone = (await AsyncStorage.getItem('phone')) || ''
    try {
      setLoading(true)
      const newData = {
        phone_number: _phone,
        answer: answer,
      }
      await AsyncStorage.setItem('answer', answer)

      const _rs = await _fetch({
        _url: '/security-question/verify',
        method: 'POST',
        body: newData,
      })
      const rs = await _rs.json()

      if (rs.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Security Question was answered correctly',
        })
        navigation.navigate('RecoverPassword')
      } else {
        Toast.show({
          type: 'error',
          text1: rs.message,
        })
      }
    } catch (e) {
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View className="px-4">
          {/* <Logo /> */}

          <AuthLogo />

          <View className="text-[#333333] font-inter mt-14">
          <Text className="font-semibold text-[24px] text-[#393F42]">
            Security Question
            </Text>

            <Text className="text-sm text-[#5A6063] mt-2" style={{fontFamily: 'Axiforma'}}>
              Please supply the answer to the security question which you
              created during your registration
            </Text>

            <View className="pt-4 space-y-4 mt-3">
              <Text className="text-[#243763] mt-3 text-center text-base mb-2">
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
                style={{ marginTop: 30 }}
                className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg "
                child={
                  loading ? (
                    <ActivityIndicator size="small" color="#00ff00" />
                  ) : (
                    'Proceed'
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
