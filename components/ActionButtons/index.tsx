import {
  Feather,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from '@expo/vector-icons'
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
    <TouchableOpacity onPress={onPress} className="mx-2">
      <View className={className}>
        {name === 'x' ? (
          <Feather name="x" size={24} color="#FF0000" />
        ) : name === 'run-fast' ? (
          <MaterialCommunityIcons color={'green'} name="run-fast"  size={22} />
        ) : name === 'comment ' ? (
          <FontAwesome name="commenting-o" size={24} color="#317ACF" />
        ) : (
          <Ionicons name={name} size={24} color={iconColor} />
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ActionButton
