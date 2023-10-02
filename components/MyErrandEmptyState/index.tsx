import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, Text, View, TouchableOpacity } from 'react-native'

export const MyErrandEmptyState = () => {
  const navigate = useNavigation()
  return (
    <View className="mt-16">
      <View className="flex-row items-center justify-center mt-2">
        <Image
          style={{
            width: 200,
            height: 200,
            resizeMode: 'contain',
          }}
          source={require('../../assets/images/empty.jpg')}
        />
      </View>

      <Text className="text-center font-semibold text-lg ">
        There’s no activity here yet...
      </Text>
      <Text className="text-sm font-light px-4 text-center pt-2">
        Lorem ipsum dolor sit amet consectetur. Eget at pretium risus consequat
        praesent ornare interdum imperdiet tristique. A euismod justo nibh
        pellentesque scelerisque blandit.
      </Text>

      <View className=" items-center">
        <TouchableOpacity
          className="bg-[#314B87] h-12 w-[300px] mt-6 flex-row justify-center items-center rounded-lg"
          onPress={() => {}}
        >
          <Text className="text-white text-base">Create Errand</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            navigate.navigate('Main')
          }}
          className="bg-white h-12 w-[300px] mt-6 flex-row justify-center items-center rounded-lg border-[0.6px] border-[#314B87]"
        >
          <Text className="text-base text-[#314B87]">Visit Market</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
