import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

interface BtnProp {
  className: string
}

const PostErrandButton = ({className}: BtnProp) => {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('CreateErrand')}
      className={`absolute  bg-[#1E3A79] rounded-full h-14 w-14 flex-row justify-center items-center ${className}`}
    >
      <MaterialIcons
        name="add"
        size={30}
        color="white"
        // style={{ top: -40 }}
        className="shadow-lg"
      />
    </TouchableOpacity>
  )
}

export default PostErrandButton
