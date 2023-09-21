import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const EscrowDetails = () => {
  return (
    <SafeAreaView className='mr-4 mb-[37px]'>
       <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
       <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
        <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
            <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center mr-2'>
            <View className='w-[276px] px-2 mr-2'>
            <Text className='text-base font-medium'>I need help on the laundry of my clothes and my suits</Text>
            </View>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>
    </SafeAreaView>
  )
}

export default EscrowDetails