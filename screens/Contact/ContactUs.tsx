import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons'
import React, { useLayoutEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import { string } from 'yup'
import { contactUs } from '../../services/Contacts/ContactUsSlice'
import { RootState, useAppDispatch } from '../../services/store'
import { ContactData } from '../../types'

const ContactUs = ({ navigation }: any) => {
  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [number, setNumber] = useState('')

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Contact Us',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between mx-3 px-3 py-3 space-x-3 ">
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={20} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => navigation.navigate('Settings')}
                text="Settings"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => navigation.navigate('Account')}
                text="Profile"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      ),
    })
  }, [])

  const onSubmit = (data: ContactData) => {
    const UserMessage = {
      name: string,
      email: string,
      message: string,
      phone_number: string,
    }
    dispatch(contactUs(UserMessage))
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
      phone_number: '',
    },
  })

  const { loading, error } = useSelector(
    (state: RootState) => state.contactUsReducer,
  )

  return (
    <SafeAreaView>
      {/* Header */}

      {/* End Of Header */}
      <ScrollView>
        <View className="w-[382px] h-[350px] mt-[80px] bg-[#CBD5EC] mx-auto b rounded-md">
          <Text className="ml-5 mt-5 leading-6 text-lg font-semibold">
            We're always<Text className="text-[#317ACF]"> Connected</Text>
          </Text>
          <Text className="ml-5 mt-3 text-base font-normal text-[#011E3E]">
            Looking to partner with us or explore business opportunities? Our
            amazing team would love to hear from you.
          </Text>
          <Text className="ml-5 mt-3 text-base font-bold text-[#317ACF]">
            <Feather name="mail" size={16} color="#317ACF" /> Send us an mail -
            Swave Client Support
          </Text>
          <Text className="ml-11 text-base font-normal text-[#3A3A3A]">
            swaveafrica@gmail.com
          </Text>

          <Text className="ml-5 mt-3 text-base font-bold text-[#317ACF]">
            <Entypo name="phone" size={16} color="#317ACF" /> Give us a phone
            call anytime
          </Text>
          <Text className="ml-11 text-sm font-normal text-[#3A3A3A]">
            +234 (806) 259 2207 +234 (916) 488 7552
          </Text>

          <Text className="ml-5 mt-3 text-base font-bold text-[#317ACF]">
            <FontAwesome5 name="whatsapp" size={16} color="#317ACF" /> We’re on
            Whatsapp too!
          </Text>
          <Text className="ml-11 text-sm font-normal text-[#3A3A3A]">
            +234 (806) 259 2207 +234 (916) 488 7552
          </Text>
        </View>

        {/* Body */}

        <View className="mx-auto bg-[#FAFAFA] w-[382px] h-[40px] mt-5 items-center justify-center">
          <Text>
            <Feather name="mail" size={16} color="#317ACF" /> Via Email Form
          </Text>
        </View>

        <View className="flex-row justify-around items-center mt-5">
          <Text>Catch and Chat Us on Social Media</Text>
          <View className="flex-row gap-2">
            <Text className="text-white">
              <AntDesign name="facebook-square" size={24} color="blue" />
            </Text>
            <Text>
              <Entypo name="twitter" size={24} color="lightblue" />
            </Text>
            <Text>
              <Entypo name="instagram" size={24} color="red" />
            </Text>
            <Text className="text-white">
              <AntDesign name="linkedin-square" size={24} color="blue" />
            </Text>
          </View>
        </View>

        <View className="mt-[40px] ml-4 ">
          <Text>Full Name</Text>
        </View>
        <TextInput
          className="w-[380px] mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
          placeholder="Enter your First Name"
          value={name}
          onChangeText={(text) => setName(text)}
          placeholderTextColor={'#000'}
        />

        <View className="mt-[40px] ml-4 ">
          <Text>Email Address</Text>
        </View>
        <TextInput
          className="w-[380px] mt-2 b rounded-md h-[60px] pl-3 mx-auto bg-[#E6E6E6] text-sm"
          placeholder="Enter your Email Address"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholderTextColor={'#000'}
        />

        <View className="mt-[40px] ml-4 ">
          <Text>Phone Number</Text>
        </View>
        <TextInput
          className="w-[380px] mt-2 b rounded-md h-[60px] pl-3  mx-auto bg-[#E6E6E6] text-sm"
          placeholder="Enter your Phone Number"
          keyboardType="numeric"
          value={number}
          onChangeText={(text) => setNumber(text)}
          placeholderTextColor={'#000'}
        />

        <View className="mt-[30px] ml-[16px]">
          <Text>Your message</Text>
        </View>
        <TextInput
          className="w-[380px] mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm"
          placeholder="Enter your Message Here"
          value={message}
          onChangeText={(text) => setMessage(text)}
          placeholderTextColor={'#000'}
        ></TextInput>

        <TouchableOpacity
          className=" mt-[52px] mb-[200px]"
          onPress={handleSubmit(onSubmit)}
        >
          <View className="w-[300px] h-[50px] bg-[#243763]  mx-auto items-center justify-center">
            <Text className="text-white text-center items-center">
              Send a message{' '}
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ContactUs
