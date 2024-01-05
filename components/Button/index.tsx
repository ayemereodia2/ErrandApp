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
      <Text className="text-[#EEF2F3] font-semibold text-basse" style={{fontFamily: 'Axiforma'}}>{child}</Text>
    </TouchableOpacity>
  )
}
