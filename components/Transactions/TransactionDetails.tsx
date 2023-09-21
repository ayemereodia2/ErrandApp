import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'

const TransactionDetails = () => {
  return (
    <SafeAreaView>
       <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base font-medium'>Accepted Bid Debit</Text>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦70,000</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base font-medium'>Errand creation</Text>
              <Text className='font-bold text-base text-[#C82332]'>- ₦45,000</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base font-medium'>Refund errand budget excess</Text>
              <Text className='font-bold text-base text-[#21B06E]'>+ ₦10,000</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>


        <View className='mx-2 py-4 border-b border-[#CCCCCC]'>
            <View className='flex-row justify-between items-center'>
              <Text className='text-base font-medium'>Errand creation</Text>
              <Text className='font-bold text-base text-[#C82332]'>- ₦25,470</Text>
            </View>
            <Text className='mt-2 text-base font-medium text-[#808080]'>17th September 2023 - 17:59pm</Text>

        </View>
    </SafeAreaView>
  )
}

export default TransactionDetails