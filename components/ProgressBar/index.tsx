import React from 'react'
import { Text, View } from 'react-native'

type ProgressProp = {
  selectedStep: number
}

export default function ProgressBar({ selectedStep }: ProgressProp) {
  return (
    <>
      <View className="flex-row pb-2 mt-4 pl-8">
        <Text className="text-[10px] pr-6">Category</Text>
        <Text className="text-[10px] pr-8">Details</Text>
        <Text className="text-[10px] pr-7">Location</Text>
        <Text className="text-[10px] pr-8">Finance</Text>
        <Text className="text-[10px]">Review</Text>
      </View>
      <View className="flex-row items-center justify-center shadow-lg">
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 1 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
        <View
          className={`w-3 border rounded-full h-3 ${
            selectedStep >= 1 ? 'bg-blue-800' : ''
          }`}
        ></View>
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 2 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
        <View
          className={`w-3 border rounded-full h-3 ${
            selectedStep >= 2 ? 'bg-blue-800' : ''
          }`}
        ></View>
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 3 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
        <View
          className={`w-3 border rounded-full h-3 ${
            selectedStep >= 3 ? 'bg-blue-800' : ''
          }`}
        ></View>
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 4 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
        <View
          className={`w-3 border rounded-full h-3 ${
            selectedStep >= 4 ? 'bg-blue-800' : ''
          }`}
        ></View>
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 5 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
        <View
          className={`w-3 border rounded-full h-3 ${
            selectedStep >= 5 ? 'bg-blue-800' : ''
          }`}
        ></View>
        <View
          className={`w-14 h-[1px] bg-blue-900 ${
            selectedStep >= 5 ? 'bg-blue-900' : 'bg-[#ccc]'
          }`}
        ></View>
      </View>
    </>
  )
}
