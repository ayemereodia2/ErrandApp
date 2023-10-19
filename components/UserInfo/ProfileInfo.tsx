import { View, Text } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const ProfileInfo = ({user}:any) => {

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View className='mx-5 mt-5'>
        <Text className='font-bold text-xl' style={{color: textTheme}}>Bio</Text>
      <Text className='text-base' style={{color: textTheme}}> {user.bio ? user.bio : 'N/A'}</Text>
    </View>
  )
}

export default ProfileInfo