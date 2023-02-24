import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

const OngoingErrands = () => {
  return (
    <View className="p-3">
      <View className="flex-row items-center">
        <MaterialCommunityIcons
          name="message-badge-outline"
          size={12}
          color="green"
          className=""
        />
        <Text style={{ fontSize: 11 }} className="text-xs pl-1 text-green-800">
          Benita is running this errand
        </Text>
      </View>

      <TouchableOpacity className="mt-2 flex-row border-b-[0.5px] pb-2 border-[#a8a8a8]">
        <View className="mt-2 flex-row">
          <View className="w-12 border h-12 rounded-full mr-2 "></View>
          <View className="pr-12">
            <Text className="text-[#565353] text-[14px]">Benita Jackson</Text>
            <Text className="text-[#888787] text-[10px]">
              32 completed Errands
            </Text>
            <Text className="text-[#434141] text-[12px] pt-2 w-[300px]">
              I need a gardener or anyone who can mow my lawn for me, it's not
              that full, just about 2 sqr meter
            </Text>
            <View className="flex-row justify-between pt-2 pr-2">
              <Text className="text-xs text-blue-900 font-bold">N2,000</Text>
              <Text className="text-xs text-[#a8a6a6]">Gardening</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      
    </View>
  )
}

export default OngoingErrands
