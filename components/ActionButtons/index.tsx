import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
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
    <TouchableOpacity onPress={onPress} className="mx-1">
      <View className={className}>
        {name === 'x' ? (
          <Feather name="x" size={16} color="#FF0000" />
        ) : name === 'comment' ? (
          <FontAwesome
            color={'#317ACF'}
            name="commenting-o"
            size={16}
          />
        ) : name === 'checkmark' ? (
          <Ionicons name="checkmark" size={16} color={iconColor} />
        ) : name === 'commenting ' ? (
          <FontAwesome5 name="comment" size={24} color="#317ACF" />
        ) : (
          ''
        )}
      </View>
    </TouchableOpacity>
  )
}

export default ActionButton
