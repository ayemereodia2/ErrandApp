import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { _fetch } from '../../services/axios/http'

const getUserProfile = async () => {
  const _rs = await _fetch({
    method: "GET",
    _url: `/user/profile`,
})
console.log('response', _rs)
return await _rs.json()

}

const UserProfile = () => {

    const {isLoading, isError, data} = useQuery(['user-profile'], getUserProfile)

   
    
  if (isLoading){
    return (
      <Text>Loading...</Text>
    )
  }

  // console.log('data', data?.last_name)



  return (
    <ScrollView>
     <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>About</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6'>
        Lorem ipsum dolor sit amet consectetur. At convallis lacus sodales lorem et.  MakakdacConsectetur est posuere fermentum egestas congue lectus purus. Mattis libero  ultrices at massa hendrerit purus. Ege
        </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 '>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>Email address / Phone number</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 leading-6  pb-10'>
        {data?.email} <Text>adeoti3123@gmail.com</Text>   </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4 pt-6 pb-6'>
          <Text className='text-base text-[#1E3A79] font-semibold'>Referral code / Date of birth</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6'>
        QE35FG0   <Text>December 18, 2023</Text>     </Text>
      </View>


      <View className='w-[380px] mx-auto mt-6 bg-[#FAFAFA]'>
        <View className='flex-row justify-between items-center ml-4 mr-4'>
          <Text className='text-base text-[#1E3A79] font-semibold pt-6 pb-6'>Referral information</Text>
          <Text><MaterialIcons name="edit" size={20} color="black" /></Text>
        </View>
        <Text className=' ml-4 pb-10 leading-6 mb-20'>
        Lorem ipsum dolor sit amet consectetur. At convallis lacus sodales lorem et.  MakakdacConsectetur est posuere fermentum egestas congue lectus purus. Mattis libero  ultrices at massa hendrerit purus. Ege
        </Text>
      </View>

   </ScrollView>
  )
}

export default UserProfile