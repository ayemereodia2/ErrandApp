import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { getTimeAgo } from '../../utils/helper'

interface Notify {
 
data: any

}

const Notify = ({data}:Notify) => {

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <>

      {data ? data.data.map((notification:any) => (

  <View className='mt-8 py-2 w-[90vw] mx-auto border border-gray-400 px-2 rounded-md mb-10' key={notification.id} style={{ backgroundColor: theme ? '#152955' : 'white'}}>
      <View className='flex-row justify-between items-center'>

      <View className='flex-row mx-1.5'>
      <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
    />
    <View>
    <Text className='font-semibold text-base' style={{ color: textTheme }}>{notification.message}</Text>
    <Text style={{ color: textTheme }} className=''>{notification.title}</Text>
    </View>
    
    </View>

      
      <Text className='mb-4 text-[#808080]' style={{ color: textTheme }}>{getTimeAgo(notification.created_at)}</Text>
     
      
      </View>

      </View>
        
      )) : 'No Notifications Available'}
      </>
  )
}

export default Notify