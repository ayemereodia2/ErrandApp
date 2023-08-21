import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { formatMoney } from '../../utils/helper'

const index = () => {
  return (
    <View className="pt-4">
      <Text className="text-xl font-md pb-6">Transaction History</Text>

      <View className="border-b-[#243763] border-b-[0.5px] w-16">
        <Text className="text-[#243763] text-base font-semibold ">
          All Time
        </Text>
      </View>

      <View className='space-y-6'>
        <View className="flex-row mt-3 justify-between space-x-4">
          <AntDesign name="swap" size={20} />
          <Text>Errand Details</Text>
          <View className="flex-row justify-between space-x-2 items-center">
            <View className="h-2 w-2 bg-red-700 rounded-full "></View>
            <Text>Debit</Text>
          </View>
          <Text>{formatMoney(4000)}</Text>
        </View>
        <View className="flex-row mt-3 justify-between space-x-4">
          <AntDesign name="swap" size={20} />
          <Text>Errand Details</Text>
          <View className="flex-row justify-between space-x-2 items-center">
            <View className="h-2 w-2 bg-red-700 rounded-full "></View>
            <Text>Debit</Text>
          </View>
          <Text>{formatMoney(4000)}</Text>
        </View>
        <View className="flex-row mt-3 justify-between space-x-4">
          <AntDesign name="swap" size={20} />
          <Text>Errand Details</Text>
          <View className="flex-row justify-between space-x-2 items-center">
            <View className="h-2 w-2 bg-red-700 rounded-full "></View>
            <Text>Debit</Text>
          </View>
          <Text>{formatMoney(4000)}</Text>
        </View>
        <View className="flex-row mt-3 justify-between space-x-4">
          <AntDesign name="swap" size={20} />
          <Text>Errand Details</Text>
          <View className="flex-row justify-between space-x-2 items-center">
            <View className="h-2 w-2 bg-red-700 rounded-full "></View>
            <Text>Debit</Text>
          </View>
          <Text>{formatMoney(4000)}</Text>
        </View>
        <View className="flex-row mt-3 justify-between space-x-4">
          <AntDesign name="swap" size={20} />
          <Text>Errand Details</Text>
          <View className="flex-row justify-between space-x-2 items-center">
            <View className="h-2 w-2 bg-red-700 rounded-full "></View>
            <Text>Debit</Text>
          </View>
          <Text>{formatMoney(4000)}</Text>
        </View>
      </View>
    </View>
  )
}

export default index
