import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { Image } from 'react-native'

const AuthLogo = () => {
  return (
    <SafeAreaView>

    <View className='mt-2'>
     <Image 
     source={require('../assets/images/authSwave.png')}
     className='mb-16 w-[94px] h-[24px] ml-4'
     />

<Image 
     source={require('../assets/images/AuthLogo.png')}
     className='w-[200px] h-[200px] mx-auto'
     />
    </View>
    </SafeAreaView>
  )
}

export default AuthLogo