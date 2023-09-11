import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

interface ToggleProp {
  selectedTab: string
  setSelectedItem: React.Dispatch<React.SetStateAction<string>>
}

const MyErrandToggle = ({ selectedTab, setSelectedItem }: ToggleProp) => {
  return (
    <View className="w-full border-[#243763] border-[0.6px] h-10 flex-row mt-6">
      <View
        className={`${
          selectedTab === 'details' ? 'bg-[#243763] text-white' : 'bg-white'
        }  w-1/2 justify-center items-center text-sm cursor-pointer`}
      >
        <TouchableOpacity onPress={() => setSelectedItem('details')}>
          <Text
            className={
              selectedTab === 'details' ? 'text-white' : 'text-[#243763]'
            }
          >
            Errand Details
          </Text>
        </TouchableOpacity>
      </View>

      <View
        className={`${
          selectedTab === 'bids' ? 'bg-[#243763] text-white' : 'bg-white'
        } w-1/2 text-sm justify-center items-center cursor-pointer`}
      >
        <TouchableOpacity onPress={() => setSelectedItem('bids')}>
          <Text
            className={selectedTab === 'bids' ? 'text-white' : 'text-[#243763]'}
          >
            Bids
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default MyErrandToggle
