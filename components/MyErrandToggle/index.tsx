import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'

interface ToggleProp {
  selectedTab: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const MyErrandToggle = () => {
  return (
    <View className="mt-4 mx-4 flex-row space-x-3">
      <View className=" h-[40px] px-6 bg-[#E6E6E6] justify-center rounded-lg border-black border-3">
        <View className="flex-row items-center justify-around space-x-10">
          <Text className="text-center text-base font-medium text-[#4D4D4D]">
            My Bids
          </Text>
          <Text>
            {' '}
            <AntDesign name="down" size={12} color="black" />{' '}
          </Text>
        </View>
      </View>

      {/*Second Part */}
      <View className=" h-[40px] px-6 bg-[#E6E6E6] justify-center rounded-lg">
        <View className="flex-row items-center space-x-8">
          <Text className="text-center text-base font-medium text-[#4D4D4D]">
            All Errands
          </Text>
          <Text>
            {' '}
            <AntDesign name="down" size={12} color="black" />{' '}
          </Text>
        </View>
      </View>
    </View>
  )
}

export default MyErrandToggle
