import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'

export default function NewNotifications() {

    const {
        data: currentUser,
        backgroundTheme,
        textTheme,
        landingPageTheme,
      } = useSelector((state: RootState) => state.currentUserDetailsReducer)
    
      const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <View>

    <View className='mt-3 py-2 border border-gray-400 px-2 bg-white rounded-md' >
      <View className='flex-row justify-between items-center'>

      <View className='flex-row '>
      <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
    />
    <View>
    <Text className='font-semibold text-base' style={{ color: textTheme }}>Francene Smith</Text>
    <Text style={{ color: textTheme }} className=''>Placed a bid on your errand</Text>
    </View>
    
    </View>

      
      <Text className='mb-4 text-[#808080]' style={{ color: textTheme }}>3hrs ago</Text>
     
      
      </View>

      </View>

     
     
      <View className='mt-3 py-2 border border-gray-400 px-2 bg-white rounded-md' >
      <View className='flex-row justify-between items-center'>

      <View className='flex-row '>
      <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
    />
    <View>
    <Text className='font-semibold text-base' style={{ color: textTheme }}>Francene Smith</Text>
    <Text style={{ color: textTheme }} className=''>Placed a bid on your errand</Text>
    </View>
    
    </View>

      
      <Text className='mb-4 text-[#808080]' style={{ color: textTheme }}>3hrs ago</Text>
     
      
      </View>

      </View>

     
     


      <View className='mt-3 py-2 border border-gray-400 px-2 bg-white rounded-md mb-10' >
      <View className='flex-row justify-between items-center'>

      <View className='flex-row '>
      <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
    />
    <View>
    <Text className='font-semibold text-base' style={{ color: textTheme }}>Francene Smith</Text>
    <Text style={{ color: textTheme }} className=''>Placed a bid on your errand</Text>
    </View>
    
    </View>

      
      <Text className='mb-4 text-[#808080]' style={{ color: textTheme }}>3hrs ago</Text>
     
     </View>
     </View>


      </View>
  )
}