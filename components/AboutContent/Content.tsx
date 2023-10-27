import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

const Content = ({navigation}:any) => {
    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
        loading,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View style={{backgroundColor: backgroundTheme}} className='h-full'>

   
   <TouchableOpacity className='mb-2 mt-4 w-[300px] border rounded-full py-4 mx-auto' onPress={()=> navigation.navigate('Profile')} style={{borderColor: textTheme}}>
   <Text style={{color: textTheme}} className='text-center text-base'> My Profile </Text>
   </TouchableOpacity>

   <TouchableOpacity className='mb-2 mt-2 w-[300px] border rounded-full py-4 mx-auto' style={{borderColor: textTheme}} onPress={()=> navigation.navigate('About')}>
   <Text className='text-center text-base' style={{color: textTheme}}> About Swave</Text>
   </TouchableOpacity>

   <TouchableOpacity className='mt-2 w-[300px] border rounded-full py-4 mx-auto' onPress={()=> navigation.navigate('Contact')} style={{borderColor: textTheme}}>
   <Text  className='text-center text-base' style={{color: textTheme}}> Contact Us </Text>
   </TouchableOpacity>

   <TouchableOpacity className=' mt-3' onPress={()=> navigation.navigate('Terms')} >
   <Text style={{color: textTheme}} className='text-center text-base'> Terms and Conditions</Text>
   </TouchableOpacity>

   <TouchableOpacity className='mb-4 mt-2 ' onPress={()=> navigation.navigate('Privacy')}>
   <Text style={{color: textTheme}} className='text-center text-base'> Privacy Policy</Text>
   </TouchableOpacity>

   </View>

  )
}

export default Content