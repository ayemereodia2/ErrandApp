import React from 'react'
import { Image, Text, View } from 'react-native'

const MyErrandCard = () => {
  return (
    <View className="  border-b-[0.3px] py-2 border-[#ccc] shadow-lg">
      <View className="flex-row justify-between items-center">
        <Image
          source={require('../../assets/images/timothy.jpg')}
          style={{ width: 40, height: 40, borderRadius: 50 }}
        />
        <View className="flex-row items-center space-x-2">
          <View className="mt-2">
            <Text className="text-[#011E3E] text-sm w-60">
              I need someone to help with laundry
            </Text>
            <View className="flex-row gap-4 items-center mb-3 pt-2">
              <View className="bg-yellow-200 rounded-full px-2">
                <Text>open</Text>
              </View>
              <Text>Laundry / walmart</Text>
              <Text className="text-[#a09e9e]">2 days ago</Text>
            </View>
          </View>
        </View>

        <View className="mr-6 b rounded-full bg-green-500 w-4 ">
          <Text className="text-white text-center">2</Text>
        </View>
      </View>
    </View>
  )
}

export default MyErrandCard
