import { EvilIcons, Feather, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'

interface ActionBtnProp {
  className: string
  name: any
  iconColor: string
  onPress?: any
}

const ActionButton = ({
  className,
  name,
  iconColor,
  onPress,
}: ActionBtnProp) => {
  return (
    <TouchableOpacity onPress={onPress} className="mx-1">
      <View className={className}>
        {name === 'x' ? (
          <Feather name="x" size={24} color="#FF0000" />
        ) : name === 'comment ' ? (
          <EvilIcons name="comment" size={24} color="#317ACF" />
        ) : (
          <Ionicons name={name} size={24} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ActionButton
