import React from 'react'
import { Text, TouchableOpacity } from 'react-native'
import { ButtonProps } from '../../types'

export default function Button({
  className,
  child,
  style,
  onPress,
}: ButtonProps) {
  return (
    <TouchableOpacity style={style} onPress={onPress} className={className}>
      <Text className="text-white font-semibold">{child}</Text>
    </TouchableOpacity>
  )
}
