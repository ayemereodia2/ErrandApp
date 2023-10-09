import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import React from 'react'
import { View } from 'react-native'

const PostErrandButton = () => {
  return (
    <View className='absolute bottom-20 bg-[#1E3A79] right-0 rounded-full h-16 w-16 flex-row justify-center items-center'>
      <MaterialIcons
        name="add"
        size={30}
        color="white"
        // style={{ top: -40 }}
        className="shadow-lg"
      />
    </View>
  )
}




export default PostErrandButton
