import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const AuthLogo = () => {
  return (
   

    <View className=''>
     <Image 
     source={require('../assets/images/authSwave.png')}
     className='mb-[50px] w-[94px] h-[24px]'
     />

    {/* <Image 
     source={require('../assets/images/AuthLogo.png')}
     className='w-[200px] h-[200px] mx-auto'
     /> */}
    </View>
   
  )
}

export default AuthLogo