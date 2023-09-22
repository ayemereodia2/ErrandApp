import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const EscrowDetails = () => {
  return (
    <SafeAreaView className='mr-3 mb-[37px] mx-2'>
       <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
       <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
            <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 ml-2 text-base font-medium text-[#808080]'>17-09-2023</Text>

        </View>
    </SafeAreaView>
  )
}

export default EscrowDetails