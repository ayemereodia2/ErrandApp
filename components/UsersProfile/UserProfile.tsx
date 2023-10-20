import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const UserProfile = ({ data }: any) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <ScrollView>
      <View className="w-[380px] mx-auto mt-6 ">
        <View className="flex-row justify-between items-center ml-4 mr-4 ">
          <Text
            style={{ color: textTheme }}
            className="text-base  font-semibold pb-1"
          >
            Bio
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" font-light ml-4 pb-6 leading-6"
        >
          {data?.data?.bio}
        </Text>
      </View>

      <View className="w-[380px] mx-auto ">
        <View className="flex-row justify-between items-center ml-4 mr-4 ">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold pb-1"
          >
            Email address
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 leading-6  pb-6 font-light"
        >
          {data?.data?.email}{' '}
        </Text>
      </View>

      <View className="w-[380px] mx-auto ">
        <View className="flex-row justify-between items-center ml-4 mr-4 ">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold pb-1"
          >
            Phone number
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 leading-6 pb-6 font-light"
        >
          {data?.data?.phone_number}
        </Text>
      </View>

      <View className="w-[380px] mx-auto">
        <View className="flex-row justify-between items-center ml-4 mr-4 ">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold pb-1"
          >
            Date of birth
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 leading-6 font-light  pb-6"
        >
          {data?.data?.dob}
        </Text>
      </View>

      {/* <View className="w-[380px] mx-auto">
        <View className="flex-row justify-between items-center ml-4 mr-4 pb-1">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold"
          >
            Referral code
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 pb-6 leading-6 font-light"
        >
          {data?.data?.referral_code}
        </Text>
      </View> */}

      {/* <View className="w-[380px] mx-auto mb-14">
        <View className="flex-row justify-between items-center ml-4 mr-4">
          <Text
            style={{ color: textTheme }}
            className="text-base font-semibold pb-1"
          >
            Referral information
          </Text>
        </View>
        <Text
          style={{ color: textTheme }}
          className=" ml-4 pb-6 leading-6 font-light "
        >
          {data?.data?.referred_by ? data?.data?.referred_by : 'N/A'}
        </Text>
      </View> */}
    </ScrollView>
  )
}

export default UserProfile
