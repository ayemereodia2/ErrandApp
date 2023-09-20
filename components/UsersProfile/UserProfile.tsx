import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { _fetch } from '../../services/axios/http'
import AsyncStorage from '@react-native-async-storage/async-storage'




  // const getUserProfile = async () => {
  //   console.log('get user profile is called')
  //   const token = await AsyncStorage.getItem('accessToken');


  //   const _rs = await _fetch({
  //     method: "GET",
  //     _url: `/user/profile`,
  // })
  // console.log('response', _rs)
  // console.log(token)
  // return await _rs.json()

  // }


const UserProfile = ({data}:any) => {

  //   const {isLoading, isError, data} = useQuery({ queryKey: ['user-profile'], queryFn: getUserProfile })
  //   console.log(data);
    
   
    
  // if (isLoading){
  //   return (
  //     <Text>Loading...</Text>
  //   )
  // }

  // if (isError){
  //   return (
  //     <Text>{isError}</Text>
  //   )
  // }

  // console.log('data', data?.last_name)



  return (
    <ScrollView>
     <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base  font-semibold pt-1 pb-3'>About</Text>
        </View>
        <Text className=' ml-4 pb-6 leading-6'>
          {data?.data.bio}
        </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pt-1 pb-3'>Email address</Text>
        </View>
        <Text className=' ml-4 leading-6  pb-6'>{data?.data.email} </Text>
      </View>

      <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pt-1 pb-3'>Phone number</Text>
        </View>
        <Text className=' ml-4 leading-6 pb-6'>{data?.data.phone_number}</Text>
      </View>

      <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base font-semibold pt-1 pb-3'>Date of birth</Text>
        </View>
        <Text className=' ml-4 leading-6  pb-6'>{data?.data.dob}</Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 '>
        <View className='flex-row justify-between items-center ml-4 mr-4 pt-1 pb-3'>
          <Text className='text-base font-semibold'>Referral code</Text>
        </View>
        <Text className=' ml-4 pb-6 leading-6'>{data?.data.referral_code}</Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 mb-24'>
        <View className='flex-row justify-between items-center ml-4 mr-4'>
          <Text className='text-base font-semibold pt-1 pb-3'>Referral information</Text>
        </View>
        <Text className=' ml-4 pb-6 leading-6 '>
        {data?.data.referred_by ? data.referred_by : 'N/A'}
        </Text>
      </View>

   </ScrollView>
  )
}

export default UserProfile