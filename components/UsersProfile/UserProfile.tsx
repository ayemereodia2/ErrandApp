import React from 'react'
import {
  ScrollView, Text, View,SafeAreaView
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const UserProfile = () => {
  const { data, backgroundTheme, textTheme, landingPageTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const theme = data?.preferred_theme === 'light' ? true : false

  return (
    <SafeAreaView >
      <ScrollView className="mt-6 h-full mb-40">
        <View className="w-[380px] mx-auto mt-6 mb-5">
          <View className="flex-row justify-between items-center ml-2 mr-4 ">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma-Medium' }}
              className="text-base font-semibold pb-1"
            >
              Bio
            </Text>
          </View>
          <View className='w-full mt-2 rounded-md py-3 pl-3 border border-[#96A0A5]'>
          <Text
            style={{ color: textTheme , fontFamily: 'Axiforma'}}
            className=" text-sm  mt-2 leading-6"
          >
            {data.bio ? data?.bio : 'N/A'}
          </Text>
          </View>
        </View>

        <View className="w-[380px] mx-auto ">
          <View className="flex-row justify-between items-center ml-2 mr-4 ">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma-Medium' }}
              className="text-base font-semibold pb-1"
            >
              Email address
            </Text>
          </View>
         
          <View className='w-full mt-2 rounded-md py-3 pl-3 border border-[#96A0A5]'>
          <Text
            style={{ color: textTheme, fontFamily: 'Axiforma' }}
            className=" text-sm mt-2  "
          >
            {data.email ? data?.email : 'N/A'}
          </Text>
          </View>
        </View>

        <View className="w-[380px] mx-auto mt-5">
          <View className="flex-row justify-between items-center ml-2 mr-4 ">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma-Medium' }}
              className="text-base font-semibold pb-1"
            >
              Phone number
            </Text>
          </View>
          
          <View className='w-full mt-2 rounded-md py-3 pl-3 border border-[#96A0A5]'>
          <Text
            style={{ color: textTheme, fontFamily: 'Axiforma' }}
            className=" mt-2 text-sm"
          >
            {data?.phone_number}
          </Text>
          </View>
        </View>

        <View className="w-[380px] mx-auto">
          <View className="flex-row justify-between items-center mt-5 ml-2 mr-4 ">
            <Text
              style={{ color: textTheme, fontFamily: 'Axiforma-Medium' }}
              className="text-base font-semibold pb-1"
            >
              Date of birth
            </Text>
          </View>
          
          <View className='w-full mt-2 rounded-md py-3 pl-3 border border-[#96A0A5]'>
          <Text
            style={{ color: textTheme, fontFamily: 'Axiforma' }}
            className="mt-2 text-sm"
          >
            {data.dob ? data?.dob.slice(0, 10) : 'N/A'}
          </Text>
          </View>
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
          {data?.referral_code}
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
          {data?.referred_by ? data?.referred_by : 'N/A'}
        </Text>
      </View> */}
      </ScrollView>
    </SafeAreaView>
  )
}

export default UserProfile
