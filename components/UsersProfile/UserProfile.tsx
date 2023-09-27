import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { _fetch } from '../../services/axios/http'
import AsyncStorage from '@react-native-async-storage/async-storage'





const UserProfile = ({data}:any) => {

  return (
    <ScrollView>
     <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base  font-semibold pb-1'>Bio</Text>
        </View>
        <Text className=' font-light ml-4 pb-6 leading-6'>
          {data?.data?.bio}
        </Text>
      </View>


      <View className='w-[380px] mx-auto '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pb-1'>Email address</Text>
        </View>
        <Text className=' ml-4 leading-6  pb-6 font-light'>{data?.data?.email} </Text>
      </View>

      <View className='w-[380px] mx-auto '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pb-1'>Phone number</Text>
        </View>
        <Text className=' ml-4 leading-6 pb-6 font-light'>{data?.data?.phone_number}</Text>
      </View>

      <View className='w-[380px] mx-auto'>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pb-1'>Date of birth</Text>
        </View>
        <Text className=' ml-4 leading-6 font-light  pb-6'>{data?.data?.dob}</Text>
      </View>


      <View className='w-[380px] mx-auto'>
        <View className='flex-row justify-between items-center ml-4 mr-4 pb-1'>
          <Text className='text-base font-semibold'>Referral code</Text>
        </View>
        <Text className=' ml-4 pb-6 leading-6 font-light'>{data?.data?.referral_code}</Text>
      </View>


      <View className='w-[380px] mx-auto '>
        <View className='flex-row justify-between items-center ml-4 mr-4'>
          <Text className='text-base font-semibold pb-1'>Referral information</Text>
        </View>
        <Text className=' ml-4 pb-6 leading-6 font-light '>
        {data?.data?.referred_by ? data?.data?.referred_by : 'N/A'}
        </Text>
      </View>

   </ScrollView>
  )
}

export default UserProfile