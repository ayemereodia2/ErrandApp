import { AntDesign, Entypo, Feather, FontAwesome5 } from '@expo/vector-icons'
import React, { useLayoutEffect, useState } from 'react'
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'

const ContactUs = ({ navigation }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const dispatch = useAppDispatch()

  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [phone, setPhone] = useState('')

  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [phoneError, setPhoneError] = useState('')
  const [messageError, setMessageError] = useState('')

  const [error, setError] = useState('')

  const twitterUrl = 'https://twitter.com/swavework'
  const instagramUrl = 'https://www.instagram.com/swavework/?hl=en'
  const facebookUrl = 'https://www.facebook.com/swavework/'
  const linkedInUrl = 'https://linkedin.com/showcase/swavework'

  const handleTwitter = () => {
    Linking.openURL(twitterUrl)
  }

  const handleInstagram = () => {
    Linking.openURL(instagramUrl)
  }

  const handleFaceBook = () => {
    Linking.openURL(facebookUrl)
  }

  const handleLinkedIn = () => {
    Linking.openURL(linkedInUrl)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Contact Us',
      headerStyle: { backgroundColor: backgroundTheme },
      headerTitleStyle: { color: textTheme },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 px-3 py-3"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
    })
  }, [])

  const ContactUs = async (userData: any) => {
    setLoading(true)
    setError('')

    try {
      const _rs = await _fetch({
        method: 'POST',
        _url: `/user/send-enquiry`,
        body: userData,
      })

      setLoading(false)
      const responseData = await _rs.json()

      return responseData
    } catch (error) {
      throw error
    }
  }

  const handleSubmit = async () => {
    setNameError('')
    setEmailError('')
    setPhoneError('')
    setMessageError('')

    const userMessage = {
      name: name,
      email: email,
      message: message,
      phone: '+234' + phone,
      subject: 'General Complaints',
    }

    if (!name || !email || !message || !phone) {
      return setError('Please, make sure you fill in the required fields')
    }

    // Validation rules
    if (userMessage.name.trim() === '') {
      setNameError('Name is required')
      return
    }
    if (userMessage.email.trim() === '') {
      setEmailError('Email is required')
      return
    }
    if (userMessage.phone.trim() === '') {
      setEmailError('Phone is required')
      return
    }
    if (userMessage.message.trim() === '') {
      setEmailError('Message is required')
      return
    }

    try {
      const responseData = await ContactUs(userMessage)
      if (responseData.success) {
        Toast.show({
          type: 'success',
          text1: 'Your message was sent!',
        })

        // Navigate back to the Account screen
        navigation.goBack()

      } else {
        // Handle the case where the server responded with an error message

        Toast.show({
          type: 'error',
          text1: 'Please fill all the required fields',
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors
      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <SafeAreaView>
      {/* Header */}

      {/* End Of Header */}
      <ScrollView
        className="h-screen"
        style={{ backgroundColor: backgroundTheme }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAwareScrollView
          style={{ flex: 1, marginTop: 52 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
        >
          {error && (
            <Text className="pt-2 text-center" style={{ color: 'red' }}>
              {error}
            </Text>
          )}

          <View className="px-4">
            <Text
              className="mb-5 font-bold text-lg"
              style={{ color: textTheme }}
            >
              Reach out to us directly
            </Text>
            <View className="">
              <Text style={{ color: textTheme }}>Full Name</Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[50px] px-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              style={{ backgroundColor: theme ? '#bbb' : '#E6E6E6' }}
              placeholder="Enter your Full Name"
              value={name}
              onChangeText={(text) => setName(text)}
              placeholderTextColor={'#000'}
            />
            {nameError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {nameError}
              </Text>
            )}

            <View className="mt-[40px] ">
              <Text style={{ color: textTheme }}>Email Address</Text>
            </View>
            <TextInput
              className="w-full mt-2 px-3 rounded-md h-[50px] mx-auto bg-[#E6E6E6] text-sm"
              style={{ backgroundColor: theme ? '#bbb' : '#E6E6E6' }}
              placeholder="Enter your Email Address"
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'#000'}
            />

            {emailError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {emailError}
              </Text>
            )}

            <View className="mt-[40px] ">
              <Text style={{ color: textTheme }}>Phone Number </Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[50px] px-3  mx-auto bg-[#E6E6E6] text-sm"
              style={{ backgroundColor: theme ? '#bbb' : '#E6E6E6' }}
              placeholder="Enter your Phone Number"
              keyboardType="numeric"
              value={phone}
              onChangeText={(text) => setPhone(text)}
              placeholderTextColor={'#000'}
            />

            {phoneError && (
              <Text className="ml-4" style={{ color: 'red' }}>
                {phoneError}
              </Text>
            )}

            <View className="mt-[30px]">
              <Text style={{ color: textTheme }}>Your message</Text>
            </View>
            <TextInput
              className="w-full mt-2 b rounded-md h-[120px] px-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm"
              style={{ backgroundColor: theme ? '#bbb' : '#E6E6E6' }}
              placeholder="Enter your Message Here"
              value={message}
              onChangeText={(text) => setMessage(text)}
              placeholderTextColor={'#000'}
            ></TextInput>
          </View>

          {messageError && (
            <Text className="ml-4" style={{ color: 'red' }}>
              {messageError}
            </Text>
          )}

          <TouchableOpacity
            className=" mt-5 mb-10 mx-4 rounded-lg"
            onPress={handleSubmit}
          >
            <View className="w-full h-[50px] bg-[#243763] items-center justify-center">
              <Text className="text-white text-center items-center">
                {loading ? <ActivityIndicator /> : 'Send a message '}
              </Text>
            </View>
          </TouchableOpacity>

          <View
            className="w-[95%] h-[350px]  mx-auto b rounded-md"
            style={{ backgroundColor: backgroundTheme }}
          >
            <Text
              className="ml-5 mt-5 leading-6 text-lg font-semibold"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              We're always Connected
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-normal"
              style={{ color: theme ? 'white' : '#011E3E' }}
            >
              Looking to partner with us or explore business opportunities? Our
              amazing team would love to hear from you.
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <Feather name="mail" size={16} color="#317ACF" /> Send us a mail -
              Swave Client Support
            </Text>

            <Text
              className="ml-11 text-base font-normal text-[#3A3A3A]"
              style={{ color: theme ? 'white' : '#011E3E' }}
            >
              support@swaveafrica.com
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <Entypo name="phone" size={16} color="#317ACF" /> Give us a phone
              call anytime
            </Text>
            <Text
              className="ml-11 text-sm font-normal text-[]"
              style={{ color: theme ? 'white' : '#3A3A3A' }}
            >
              +234 704 402 6192    +234 704 402 6328 
            </Text>

            <Text
              className="ml-5 mt-3 text-base font-bold text-[#317ACF]"
              style={{ color: theme ? 'white' : '#317ACF' }}
            >
              <FontAwesome5 name="whatsapp" size={16} color="#317ACF" /> We’re
              on Whatsapp too!
            </Text>
            <Text
              className="ml-11 text-sm font-normal text-[#3A3A3A]"
              style={{ color: theme ? 'white' : '#3A3A3A' }}
            >
              +234 704 402 6745     +234 704 402 6987
            </Text>
          </View>

          {/* Body */}

          <View
            className="mx-auto bg-[] w-[382px] h-[40px] mt-5 items-center justify-center"
            style={{ backgroundColor: theme ? '#243763' : '#FAFAFA' }}
          >
            <Text className="text-base">
              <Feather name="mail" size={16} color="#317ACF" />{' '}
              <Text style={{ color: textTheme }}>Subscribe</Text>
            </Text>
          </View>

          <View className=" items-center mt-5 mb-[200px]">
            <Text
              style={{ color: textTheme }}
              className="text-base font-medium"
            >
              Catch and Chat Us on Social Media
            </Text>
            <View className="flex-row space-x-2.5 mt-2">
              <TouchableOpacity onPress={handleFaceBook}>
                <Text className="text-white">
                  <AntDesign name="facebook-square" size={28} color="blue" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTwitter}>
                <Text>
                  <Entypo name="twitter" size={28} color="lightblue" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleInstagram}>
                <Text>
                  <Entypo name="instagram" size={28} color="red" />
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleLinkedIn}>
                <Text className="text-white">
                  <AntDesign name="linkedin-square" size={28} color="blue" />
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ContactUs
