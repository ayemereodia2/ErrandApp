import React from 'react'
import { Text, TextInput, View } from 'react-native'
import { InputProps } from '../../types'

export default function InputField({
  onChangeText,
  placeHolder,
  keyboardType,
  label,
}: InputProps) {
  return (
    <View className="pt-6">
      <Text className="text-[#243763] text-sm">{label}</Text>
      <TextInput
        className="w-full border border-[#E6E6E6] text-xs py-3.5 mt-2 rounded-lg px-3"
        onChangeText={onChangeText}
        placeholder={placeHolder}
        keyboardType={keyboardType}
      />
    </View>
  )
}
