import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'

const UserVerification = () => {
  return (
   <SafeAreaView className='mt-6'>
    <ScrollView>
        <View className='flex-row justify-between items-center mx-4'>
            <View className='w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md'>
                <Text><MaterialIcons name="person-add-alt" size={24} color="#3F60AC" /></Text>
            </View>
            <Text className='font-light leading-8 '>Basic Verification</Text>
            <View className='w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px] '>
                <Text className='text-[#115A38] font-md text-sm'>Completed</Text>
            </View>
        </View>

        <View className='flex-row justify-between items-center mx-4 mt-6'>
            <View className='w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md'>
                <Text><Ionicons name="md-swap-vertical" size={24} color="#3F60AC" /></Text>
            </View>
            <Text className='font-light leading-8'>Verification for Transactions</Text>
            <View className='w-[100px] h-[34px] bg-[#FEE1CD] justify-center items-center rounded-[20px] '>
                <Text className='text-[#642B02] font-md text-sm'>Incomplete</Text>
            </View>
        </View>


        <View className='flex-row justify-between items-center mx-4 mt-6'>
            <View className='w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md'>
                <Text><MaterialCommunityIcons name="email-outline" size={24} color="#3F60AC" /></Text>
            </View>
            <Text className='font-light leading-8'>Email Verification</Text>
            <View className='w-[100px] h-[34px] bg-[#FEE1CD] justify-center items-center rounded-[20px] '>
                <Text className='text-[#642B02] font-md text-sm'>Incomplete</Text>
            </View>
        </View>


        <View className='flex-row justify-between items-center mx-4 mt-6'>
            <View className='w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md'>
                <Text><MaterialCommunityIcons name="office-building-outline" size={24} color="#3F60AC" /></Text>
            </View>
            <Text className='font-light leading-8'>Office Address Verification</Text>
            <View className='w-[100px] h-[34px] bg-[#FEE1CD] justify-center items-center rounded-[20px] '>
                <Text className='text-[#642B02] font-md text-sm'>Incomplete</Text>
            </View>
        </View>


        <View className='flex-row justify-between items-center mx-4 mt-6 mb-40'>
            <View className='w-10 h-10 border border-[#3F60AC] items-center justify-center rounded-md'>
                <Text><MaterialIcons name="person-add-alt" size={24} color="#3F60AC" /></Text>
            </View>
            <Text className='font-light leading-8'>Swave Reference Guarantor</Text>
            <View className='w-[100px] h-[34px] bg-[#D8F8E9] justify-center items-center rounded-[20px] '>
                <Text className='text-[#115A38] font-md text-sm'>Completed</Text>
            </View>
        </View>
    </ScrollView>
   </SafeAreaView>
  )
}

export default UserVerification