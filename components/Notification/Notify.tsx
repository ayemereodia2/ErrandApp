import { AntDesign, EvilIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { getTimeAgo } from '../../utils/helper'

interface Notify {
  data: any
}

const Notify = ({ data }: Notify) => {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  return (
    <>
      {data
        ? data.data.map((notification: any) => (
          <View className='py-2 mb-1 mt-3 border border-gray-400 rounded-sm' style={{ backgroundColor: theme ? '#152955' : 'white' }} key={notification.id}>
          <View className='flex-row items-center justify-between mx-2 mb-1 mt-1'>

          <View className='flex-row items-center'>
          {notification.type === 0 ? (
                  <Text style={{ color: textTheme }}>
                    {' '}
                    <AntDesign 
                    name="exclamationcircleo" 
                    size={20}
                     color={textTheme} 
                    />{'   '}
                  </Text>
                ) : notification.type === 1 ? (
                  <Text style={{ color: textTheme }}>
                    {' '}
                    <FontAwesome5
                      name="running"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : notification.type === 2 ? (
                  <Text style={{ color: textTheme }}>
                    {' '}
                    <Ionicons
                      name="ios-hammer-outline"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : notification.type === 3 ? (
                  <Text style={{ color: textTheme }}>
                    {' '}
                    <Ionicons
                      name="md-swap-vertical"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : null}
               
                <Text style={{ color: textTheme }} className='text-base font-bold'>{notification.title}</Text>

                </View>

            <Text style={{ color: textTheme }}>{getTimeAgo(notification.created_at)}</Text>
          </View>

          <View>
            <Text className='mx-10 text-base' style={{ color: textTheme }}>{notification.message}</Text>
          </View>
        </View>
      ))
    : 'No Notifications Available'}
    </>
  )
}

export default Notify
