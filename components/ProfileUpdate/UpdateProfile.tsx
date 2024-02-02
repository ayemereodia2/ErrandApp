import AsyncStorage from '@react-native-async-storage/async-storage'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import CountryPicker from 'react-native-country-picker-modal'

import { AntDesign, Feather, FontAwesome6 } from '@expo/vector-icons'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { _fetch } from '../../services/axios/http'
import { RootState, useAppDispatch } from '../../services/store'
import BusinessDropdown from '../BusinessDropdown/BusinessDropdown'

const UpdateProfile = ({ image, data }: any) => {
  const {
    loading: isLoading,
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const dispatch = useAppDispatch()

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const dob = data?.dob === '' ? 'No date of birth' : new Date(data?.dob)

  const [about, setAbout] = useState(data?.bio)
  const [lastName, setLastName] = useState(data?.last_name)
  const [firstName, setFirstName] = useState(data?.first_name)
  const [email, setEmail] = useState(data?.email)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState(dob)
  const [occupation, setOccupation] = useState(data?.occupation)

  const [showDatePicker, setShowDatePicker] = useState(false)
  const [myDate, setMytDate] = useState(new Date(data?.dob))
  const [countryCode, setCountryCode] = useState('NG')
  const [callingCode, setCallingCode] = useState('234')

  const countries = ['Egypt', 'Canada', 'Australia', 'Ireland']
  const [igInput, setIgInput] = useState(false)
  const [fbInput, setFbInput] = useState(false)
  const [xInput, setXInput] = useState(false)

  const handleIG = () => {
    setIgInput(true)
  }
  const handleFB = () => {
    setIgInput(true)
  }
  const handleX = () => {
    setIgInput(true)
  }

  const businessCategoryData = [
    { key: '1', value: 'Tutoring' },
    { key: '2', value: 'Vehicles' },
    { key: '3', value: 'Make Up' },
    { key: '4', value: 'Tech' },
    { key: '5', value: 'Food' },
    { key: '6', value: 'Others' },
  ]

  const businessContact = [
    { key: '1', value: 'Email address' },
    { key: '2', value: 'Phone number' },
  ]

  const businessHours = [
    { key: '1', value: '24/7' },
    { key: '2', value: 'Daily' },
    { key: '3', value: 'Weekly' },
  ]

  const businessType = [
    { key: '1', value: 'Personal' },
    { key: '2', value: 'Corporate' },
    
  ]

  console.log('>>>>>>daaaaa', dateOfBirth)

  const toggleDatepicker = () => {
    setShowPicker(!showPicker)
  }

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dateOfBirth
    setShowDatePicker(false)
    setDateOfBirth(currentDate)
  }

  const updateUserProfile = async (userData: any) => {
    setLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: userData,
      })

      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }
      const responseData = await _rs.json()
      const user_id = (await AsyncStorage.getItem('user_id')) || ''
      dispatch(currentUserDetails({ user_id }))

      setLoading(false)

      return responseData
    } catch (error) {
      throw error
    }
  }

  const handleUpdateProfile = async () => {
    const updatedData = {
      first_name: firstName,
      last_name: lastName,
      bio: about,
      email: email,
      dob: dateOfBirth,
      occupation: occupation,
      profile_picture: image,
    }

    try {
      const responseData = await updateUserProfile(updatedData)

      if (responseData.success === true) {
        Toast.show({
          type: 'success',
          text1: 'Profile update is successful',
        })
        navigation.navigate('Profile')
      } else {
        Toast.show({
          type: 'error',
          text1: 'Profile update failed:' + responseData.message,
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
    <SafeAreaView >
      <ScrollView className="px-4">
        <View className="mt-10">
          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
            >
              First Name
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              style={{ fontFamily: 'Axiforma' }}
              placeholder={'Enter your First Name'}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme, fontFamily: 'Axiforma' }}
            >
              Last Name
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={' Enter your last name'}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Email Address
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={'Enter your email Address'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

        

          <View className="mt-8">
            <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
            Type of Account
            </Text>
            <BusinessDropdown data={businessType} />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              What is your business name?
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={'Exemplar Group'}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Select Business Category
            </Text>
            <BusinessDropdown data={businessType} />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Keywords for your business
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={'Exemplar Group'}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Advertise your message to customers (This message will be shown to
              your customers)
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={
                'Advertise your  message to customers (This message will be shown to your customers). Advertise your  message to customers (This message will be shown to your customers).Advertise your  message to customers (This message will be shown to your customers)'
              }
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Describe what you do in detail
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={
                'Advertise your  message to customers (This message will be shown to your customers). Advertise your  message to customers (This message will be shown to your customers).Advertise your  message to customers (This message will be shown to your customers)'
              }
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
              What is your business address?
            </Text>
            <TextInput className="border border-[#96A0A5] p-4 mt-3 rounded-[8px]" />
          </View>

          <View className="mt-8">
            <Text className="text-[#5E6366]" style={{ fontFamily: 'Axiforma' }}>
              Phone Number
            </Text>

            <View className="flex-row items-center w-full">
              <View className=" flex-row items-center mr-3 mt-1 px-[22px] py-[7px] w-[81px] border rounded-lg border-[#96A0A5]">
                <CountryPicker
                  withFilter
                  countryCode={countryCode}
                  withFlag
                  withAlphaFilter={false}
                  withCurrencyButton={false}
                  withCallingCode
                  onSelect={(country) => {
                    console.log('country', country)
                    const { cca2, callingCode } = country
                    setCountryCode(cca2)
                    setCallingCode(callingCode[0])
                  }}
                  containerButtonStyle={{
                    alignItems: 'center',

                    marginRight: 15,
                  }}
                />

                <Text className="mt-1">
                  <AntDesign name="down" size={16} color="#130F26" />
                </Text>
              </View>

              <View className="w-[67vw]">
                <TextInput className="border border-[#96A0A5] p-4 mt-[5px] rounded-[8px] h-14" />
              </View>
            </View>
          </View>

          <View className="mt-8">
            <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
              What is the best way to contact your business?
            </Text>
            <BusinessDropdown data={businessContact} />
          </View>

          <View className="mt-8">
            <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
              When can your customers reach you?
            </Text>
            <BusinessDropdown data={businessHours} />
          </View>

          <View className="mt-8">
            <Text className="text-[#393F42]" style={{ fontFamily: 'Axiforma' }}>
              Link your social media accounts
            </Text>

            <View
              className="flex-row items-center mt-3"
              style={{
                gap: 12,
                display: igInput || fbInput || xInput ? 'none' : 'flex',
              }}
            >
              <TouchableOpacity onPress={handleIG}>
                <Text>
                  {' '}
                  <AntDesign name="instagram" size={24} color="black" />{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleFB}>
                <Text>
                  {' '}
                  <Feather name="facebook" size={24} color="black" />{' '}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleX}>
                <Text>
                  {' '}
                  <FontAwesome6 name="x-twitter" size={24} color="black" />{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View>
              <View
                className="relative"
                style={{ display: igInput ? 'flex' : 'none' }}
              >
                <TextInput className="border border-[#96A0A5] p-4 mt-3 rounded-[8px]" />
                <TouchableOpacity
                  className="bg-[#09497D] rounded-[12px] w-28 h-8 absolute right-3 bottom-3"
                  onPress={() => setIgInput(false)}
                >
                  <Text className="text-white text-center mt-1.5">Enter</Text>
                </TouchableOpacity>
              </View>

              <View
                className="relative"
                style={{ display: fbInput ? 'flex' : 'none' }}
              >
                <TextInput className="border border-[#96A0A5] p-4 mt-3 rounded-[8px]" />
                <TouchableOpacity
                  className="bg-[#09497D] rounded-[12px] w-28 h-8 absolute right-3 bottom-3"
                  onPress={() => setFbInput(false)}
                >
                  <Text className="text-white text-center mt-1.5">Enter</Text>
                </TouchableOpacity>
              </View>

              <View
                className="relative"
                style={{ display: xInput ? 'flex' : 'none' }}
              >
                <TextInput className="border border-[#96A0A5] p-4 mt-3 rounded-[8px]" />
                <TouchableOpacity
                  className="bg-[#09497D] rounded-[12px] w-28 h-8 absolute right-3 bottom-3"
                  onPress={() => setXInput(false)}
                >
                  <Text className="text-white text-center mt-1.5">Enter</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View className="mt-8">
            <Text
              className="font-medium text-sm text-[#393F42]"
              style={{ color: textTheme }}
            >
              Occupation
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={' Enter your occupation'}
              value={occupation}
              onChangeText={(text) => setOccupation(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View>
            <Text
              className="font-medium text-sm mt-5 text-[#393F42]"
              style={{ color: textTheme }}
            >
              Bio
            </Text>
            <TextInput
              className="w-full mt-2 rounded-md p-5 pl-3 items-center mx-auto border border-[#96A0A5] text-sm"
              placeholder={'Enter your email Address'}
              value={about}
              onChangeText={(text) => setAbout(text)}
              placeholderTextColor={'#B3B3B3'}
            ></TextInput>
          </View>

          {/* <View className="mt-8">
            <Text
              className="font-medium text-lg text-[#1E3A79]"
              style={{ color: textTheme }}
            >
              Date of Birth
            </Text>

            {showPicker && (
              <View className="text-black">
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={date}
                  onChange={onChange}
                  className="h-[120px] mt-[-10px] text-black"
                  textColor="black"
                />
              </View>
            )}

            {showPicker && Platform.OS === 'ios' && (
              <View className="flex-row justify-around mt-2">
                <TouchableOpacity onPress={toggleDatepicker}>
                  <Text className="text-base font-medium">Cancel</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={confirmIOSDate}>
                  <Text className="text-base font-medium">Confirm</Text>
                </TouchableOpacity>
              </View>
            )}

            {!showPicker && (
              <Pressable>
                <TextInput
                  className="w-full mt-2 b rounded-md h-[60px] pl-3  pb-[42x] mx-auto bg-[#E6E6E6] text-sm text-black"
                  placeholder={'23 Aug 2003'}
                  value={dateOfBirth}
                  onChangeText={setDateOfBirth}
                  editable={false}
                  onPressIn={toggleDatepicker}
                  placeholderTextColor="#B3B3B3"
                />
              </Pressable>
            )}
          </View> */}

          <View className="h-24 mt-8">
            {/* <FontAwesome
                className="mr-2"
                name="calendar"
                size={20}
                color={textTheme}
              /> */}
            <Text
              className="font-medium text-lg text-[#1E3A79]"
              style={{ color: textTheme }}
            >
              Date Of Birth
            </Text>

            <View className="mt-2">
              <Pressable
                onPress={() => setShowDatePicker(true)}
                className="text-center flex-row items-center space-x-1 border border-[#ccc] rounded-lg "
              >
                <View className="w-full bg-[#E6E6E6] text-base rounded-md  px-3  py-3 flex-row justify-between">
                  <Text style={{ color: textTheme }}>
                    {dateOfBirth.toString().slice(0, 15)}
                  </Text>

                  <AntDesign name="edit" size={24} />
                </View>
              </Pressable>
              {showDatePicker && (
                <DateTimePicker
                  value={myDate}
                  mode="date"
                  display="default"
                  onChange={onDateChange}
                />
              )}
            </View>
          </View>

          <TouchableOpacity
            className=" mt-[52px] mb-[180px] rounded-lg"
            onPress={handleUpdateProfile}
          >
            <View className="w-[300px] h-[50px] bg-[#243763]  mx-auto items-center justify-center rounded-lg">
              <Text className="text-white text-center items-center">
                {loading ? <ActivityIndicator /> : 'Save changes'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
  },
})

export default UpdateProfile
