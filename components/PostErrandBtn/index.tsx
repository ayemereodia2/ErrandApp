import { MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
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
    <View className='ml-[180px] w-[60px] h-[60px] relative z-10 bottom-20 ' style={{borderEndEndRadius: 20}}>
    <TouchableOpacity
      style={{
        backgroundColor: theme ? '#d2d8e4' : '#1E3A79',
      }}
      onPress={() => navigation.navigate('CreateErrand')}
      className={` bg-[#1E3A79] rounded-full h-[55.04px] w-[55.04px] flex-row justify-center items-center shadow-xl ${
        theme ? 'shadow-[#283552]' : 'shadow-[#a2a3aa]'
      }`}
    >
      <Text>
      <MaterialIcons
        name="add"
        size={24}
        color={theme ? 'black' : 'white'}
        // style={{ top: -40 }}
        className="shadow-lg"
      />
      </Text>
</TouchableOpacity>  
 </View>
  )
}

export default PostErrandButton
