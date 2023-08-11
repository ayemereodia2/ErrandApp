import { Entypo } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { getTimeDiff } from '../../constants/utility'
import { MarketData } from '../../types'

interface ErrandCardProp {
  errand: MarketData
}

export default function ErrandComp({ errand }: ErrandCardProp) {
  const navigation = useNavigation()
  const budgetInNaira = Number(errand?.budget / Number(100))

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('ErrandDetails')}
      className="mt-4 border-[0.5px] border-t-0 pb-2 border-[#a8a8a8]"
    >
      <View className="px-3">
        <View className="flex-row items-center">
          <View className="w-10 border h-10 rounded-full "></View>
          <View className="pl-2 flex-row space-x-48 justify-between">
            <View className="">
              <Text>Jane Doe</Text>
              <View className="flex-row items-center">
                <Entypo name="location-pin" size={14} color="red" />
                <Text className="text-xs text-[#a8a8a8]">Ajah, Lagos</Text>
              </View>
            </View>
            <Text className="text-xs text-[#a8a8a8]">
              {getTimeDiff(errand?.created_at)}
            </Text>
          </View>
        </View>
        <View className="pl-12">
          <Text className="text-xs pt-2">{errand.description}</Text>
          <View className="flex-row justify-between items-center pt-1 ">
            <Text className="text-xs text-[#243763] font-bold">
              {' '}
              &#x20A6; {budgetInNaira.toLocaleString()}
            </Text>
            <Text className="text-xs text-[#243763] font-bold">
              {errand?.category.name}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}
