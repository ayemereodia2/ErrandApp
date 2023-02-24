import React from 'react'
import { Text, View } from 'react-native'

const Review = () => {
  return (
    <View className="mx-3 shadow shadow-[#ccc]  bg-white rounded-lg mt-6 py-4">
      <View className="space-y-2 border-b-[0.5px] border-[#d4d4d4] px-3 py-3">
        <Text className="text-[12px] text-[#807d7d]">Category</Text>
        <Text className="text-[12px]">Pick-up & delivery</Text>
      </View>

      <View className="space-y-2 border-b-[0.5px] border-[#d4d4d4] px-3 py-6">
        <Text className="text-[#807d7d]">Location</Text>
        <Text className="text-[12px] ">
          <Text className="text-[#807d7d]">From: </Text>Road 1, Ikota shopping
          complex, Ajah, Lagos
        </Text>
        <Text className="text-[12px] ">NO. 126, Mende, Maryland</Text>
      </View>

      <View className="space-y-2 border-b-[0.5px] border-[#d4d4d4] px-3 py-6">
        <Text className="text-[#807d7d]">
          Give more information about the errand
        </Text>
        <Text className="text-[12px] ">
          Road 1, Ikota shopping complex, Ajah, Lagos
        </Text>
      </View>

      <View className="space-y-2 border-b-[0.5px] border-[#d4d4d4] px-3 py-6">
        <Text className="text-[#807d7d]">
          Reward <Text className='text-[#a5a3a3] text-[12px]'>(this include all costs of running this errand)</Text> 
        </Text>
        <Text className="text-[12px] ">
          Road 1, Ikota shopping complex, Ajah, Lagos
        </Text>
      </View>

       <View className="space-y-2  border-[#d4d4d4] px-3 py-6">
        <Text className="text-[#807d7d]">
          Deadline
        </Text>
        <Text className="text-[12px] ">
          Road 1, Ikota shopping complex, Ajah, Lagos
        </Text>
      </View>
    </View>
  )
}

export default Review
