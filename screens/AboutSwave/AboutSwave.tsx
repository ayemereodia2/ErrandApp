import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { useNavigation } from '@react-navigation/native'

const AboutSwave = () => {

    const navigation = useNavigation()

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <SafeAreaView className='px-4 h-full pt-4 w-full' style={{backgroundColor: backgroundTheme}}>
        
        <View className='flex-row items-center mb-5'>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
            <Text  style={{color: textTheme}} className='ml-2'> <AntDesign name="arrowleft" size={24} /> </Text>
            </TouchableOpacity>
            <Text style={{color: textTheme}} className='mx-auto text-lg font-bold'> About Swave</Text>
        </View>

      <Text className='mx-4' style={{color: textTheme}}>AboutSwave</Text>
    </SafeAreaView>
  )
}

export default AboutSwave