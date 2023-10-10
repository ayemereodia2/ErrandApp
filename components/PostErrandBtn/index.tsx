import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

interface BtnProp {
  className: string
}

const PostErrandButton = ({ className }: BtnProp) => {
  const navigation = useNavigation()

  const { data: currentUser } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )
  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <TouchableOpacity
      style={{
        backgroundColor: theme ? '#d2d8e4' : '#1E3A79',
      }}
      onPress={() => navigation.navigate('CreateErrand')}
      className={`absolute   bg-[#1E3A79] rounded-full h-16 w-16 flex-row justify-center items-center ${className}`}
    >
      <MaterialIcons
        name="add"
        size={40}
        color={theme ? 'black' : 'white'}
        // style={{ top: -40 }}
        className="shadow-lg"
      />
    </TouchableOpacity>
  )
}

export default PostErrandButton
