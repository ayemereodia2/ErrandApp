import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { StyleSheet } from 'react-native'
import {
  ActivityIndicator,
  Image,
  Keyboard,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import AuthLogo from '../../components/AuthLogo'
import Button from '../../components/Button'
import InputField from '../../components/InputField'
import { createAccount } from '../../services/auth/create-account'
import { RootState, useAppDispatch } from '../../services/store'
import { ISecurityQA } from '../../types'

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


  const { loading } = useSelector((state: RootState) => state.createAccount)

  // const submitQuestion = async (data: ISecurityQA) => {
  //   if (!question) {
  //     return
  //   }
  //   const _questionData = {
  //     question,
  //     answer: data.answer,
  //   }
  //   const userData = JSON.parse((await AsyncStorage.getItem('userData')) || '')
  //   const newData = { ...userData, ..._questionData, dispatch, navigation }

  //   dispatch(createAccount(newData))
  // }

  const submitQuestion = async (data: any) => {
    if (!question || !data.answer) {
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
    <SafeAreaView className="mt-20">
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

              <View className="mt-[50px]">
                <Image
                  source={require('../../assets/images/securityQuestion.png')}
                  className="mx-auto shadow-sm"
                />
              </View>

              {/* <KeyboardAwareScrollView
            style={{ flex: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
          > */}

              <Text
                className="text-sm text-[#09497D] mt-[50px]"
                style={{ fontFamily: 'Chillax-Semibold', }}
              >
                Step 4 of 4
              </Text>

              <View className="text-[#333333] font-inter py-4 ">
                <Text
                  className="font-semibold text-[24px] text-[#393F42] mb-2"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Security Question
                </Text>
                <Text
                  className="text-sm mb-7 text-[#5A6063]"
                  style={{ fontFamily: 'Axiforma' }}
                >
                  Kindly select and answer
                </Text>

                <View className=" ">
                  <Text
                    className="text-[#393F42] text-sm"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Security Question
                  </Text>
                  {/* <Picker
                selectedValue={question}
                onValueChange={(itemValue, itemIndex) => setQuestion(itemValue)}
                mode={'dialog'}
              >
                {arr.map((question) => (
                  <Picker.Item label={question.text} value={question.value} />
                ))}
              </Picker> */}

                  {/* <View className='flex-row items-center border-[#96A0A5] rounded-lg justify-between pr-7 mt-5 mb-5 border w-full'>
              <SelectDropdown
                data={arr}
                onSelect={(selectedItem) => submitQuestion(selectedItem.value)}
                buttonTextAfterSelection={(selectedItem) => selectedItem.text}
                rowTextForSelection={(item) => item.text}
               
              />

              <Text className='text-[#555555]'> <AntDesign name="down" size={14} /> </Text>
              </View> */}

                  <Dropdown
                    style={style.dropdown}
                    placeholderStyle={style.placeholderStyle}
                    selectedTextStyle={style.selectedTextStyle}
                    inputSearchStyle={style.inputSearchStyle}
                    iconStyle={style.iconStyle}
                    data={arr}
                    maxHeight={300}
                    labelField="text"
                    valueField="value"
                    placeholder={'Please select question'}
                    value={question}
                    onChange={(item) => {
                      setQuestion(item.value)
                    }}
                  />

                  <View className='mt-3'>
                    {/* <Text className="text-[#393F42] text-sm">Answer</Text> */}
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
                  </View>

                  <Button
                    style={{ marginBottom: 40 }}
                    className="w-full text-white bg-[#243763] flex-row justify-center items-start py-4 rounded-lg mt-7"
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

const style = StyleSheet.create({
  dropdownInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    backgroundColor: '#F5F5F5',
    width: 170,
    borderColor: '#E6E6E6',
    borderWidth: 1,
    fontFamily: 'Chillax',

  },
  restrictInput: {
    marginTop: 8,
    paddingVertical: 10,
    borderRadius: 6,
    width: 'auto',
    backgroundColor: '#F5F5F5',
    borderColor: '#E6E6E6',
    borderWidth: 1,
    fontFamily: 'Chillax',

  },

  dropdown: {
    margin: 4,
    height: 45,
    backgroundColor: '#FCFCFC',
    paddingHorizontal: 6,
    borderRadius: 4,
    borderColor: '#ccc',
    borderWidth: 1,
    fontFamily: 'Chillax',

  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
    paddingLeft: 4,
    fontFamily: 'Chillax-Semibold',
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 0,
    fontSize: 16,
    paddingVertical: 0,
    backgroundColor: 'none',
    fontFamily: 'Chillax',
  },
})
