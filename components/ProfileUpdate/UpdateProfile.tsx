import DateTimePicker from '@react-native-community/datetimepicker'
import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Platform,
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
import { _fetch } from '../../services/axios/http'

const UpdateProfile = ({ image, data }: any) => {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)

  const [about, setAbout] = useState(data?.data.bio)
  const [lastName, setLastName] = useState(data?.data.last_name)
  const [firstName, setFirstName] = useState(data?.data.first_name)
  const [email, setEmail] = useState(data?.data.email)
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState(data?.data.dob)

  const toggleDatepicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({ type }: any, selectedDate: any) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setDate(currentDate)

      if (Platform.OS === 'android') {
        toggleDatepicker()
        setDateOfBirth(currentDate.toDateString())
      }
    } else {
      toggleDatepicker()
    }
  }

  const confirmIOSDate = () => {
    setDateOfBirth(date.toDateString())
    toggleDatepicker()
  }

  const updateUserProfile = async (userData: any) => {
    setLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: userData,
      })

      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }
      setLoading(false)
      const responseData = await _rs.json()
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
      profile_picture: image,
    }

    try {
      const responseData = await updateUserProfile(updatedData)
      if (responseData.success) {
        Toast.show({
          type: 'success',
          text1: 'Profile update is successful',
        })

      const ok =  await _fetch({
          method: 'GET',
          _url: `/user/profile`,
        })
        

        // Navigate back to the Account screen
        navigation.navigate('Profile')

        console.log(updatedData)
      } else {
        // Handle the case where the server responded with an error message
        console.error('Profile update failed:', responseData.message)

        Toast.show({
          type: 'error',
          text1: 'Profile update failed:' + responseData.message,
        })
      }
    } catch (error) {
      // Handle errors here, such as network errors or server-side errors
      console.error('Error updating profile:', error)

      Toast.show({
        type: 'error',
        text1: 'Sorry, something went wrong',
      })
    }
  }

  return (
    <SafeAreaView>
      <ScrollView className="px-4">
        <View className="mt-10">
          <View>
            <Text className="font-medium text-lg text-[#1E3A79]">Bio</Text>
            <TextInput
              className="w-full mt-2 b rounded-md h-[120px] pl-3 pb-[70px] mx-auto bg-[#E6E6E6] text-sm"
              placeholder={data?.data.bio ? data.data.bio : 'Enter a message'}
              value={about}
              onChangeText={(text) => setAbout(text)}
              placeholderTextColor={'#B3B3B3'}
            ></TextInput>
          </View>

          <View className="mt-8">
            <Text className="font-medium text-lg text-[#1E3A79]">
              First Name
            </Text>
            <TextInput
              className="w-full mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              placeholder={'Enter your First Name'}
              value={firstName}
              onChangeText={(text) => setFirstName(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text className="font-medium text-lg text-[#1E3A79]">
              Last Name
            </Text>
            <TextInput
              className="w-full mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              placeholder={' Enter your last name'}
              value={lastName}
              onChangeText={(text) => setLastName(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text className="font-medium text-lg text-[#1E3A79]">
              Email Address
            </Text>
            <TextInput
              className="w-full mt-2 b rounded-md h-[60px] pl-3 items-center mx-auto bg-[#E6E6E6] text-sm"
              placeholder={'Enter your email Address'}
              value={email}
              onChangeText={(text) => setEmail(text)}
              placeholderTextColor={'#B3B3B3'}
            />
          </View>

          <View className="mt-8">
            <Text className="font-medium text-lg text-[#1E3A79]">
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
          </View>

          <TouchableOpacity
            className=" mt-[52px] mb-[180px] rounded-lg"
            onPress={handleUpdateProfile}
          >
            <View className="w-[300px] h-[50px] bg-[#243763]  mx-auto items-center justify-center rounded-lg">
              <Text className="text-white text-center items-center">
                {loading ? <ActivityIndicator /> : 'Save'}
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
