import { useNavigation } from '@react-navigation/native'
import React, { useState } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'

const PlaceBidInput = ({ toggleShowBid }: any) => {
  const [showModal, setShowModal] = useState(false)
  const toggleModal = () => {
    setShowModal(!showModal)
  }
  const navigation = useNavigation()

  return (
    <>
      <View
        style={{ top: -70, zIndex: 10, backgroundColor: 'white' }}
        className="pb-10"
      >
        <TouchableOpacity className="bg-[#243763] h-12 w-full flex-row justify-center items-center">
          <Text className="text-white text-sm">Place your Bid</Text>
        </TouchableOpacity>
        <View className="px-4 ">
          <Text className="text-xs pt-6">
            How much are you willing to Take for this request
          </Text>
          <TextInput className="w-full border-[1px] border-[#acacac] text-xs py-3 mt-2 rounded-xl px-3" />
          <Text className="text-xs pt-6">Send a note with your request</Text>
          <TextInput
            numberOfLines={4}
            multiline={true}
            className="w-full border-[1px] border-[#acacac] text-xs py-3 mt-2 rounded-xl px-3 h-20"
          />
        </View>

        <View className="flex-row justify-center items-center">
          <TouchableOpacity
            onPress={() => {
              toggleShowBid()
              navigation.navigate("Modal")
            }}
            className="bg-[#243763] w-48 py-4  mt-8 rounded-lg shadow-lg shadow-blue-300"
          >
            <Text className="text-center text-white">Send A Request</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

export default PlaceBidInput
