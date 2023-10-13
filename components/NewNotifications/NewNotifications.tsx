import { AntDesign, EvilIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { RootState } from '../../services/store'
import { getTimeAgo } from '../../utils/helper'

export default function NewNotifications() {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const getNotifications = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/app-notification?count=5`,
    })
    return await _rs.json()
  }

  const { isLoading, isSuccess, data, isError } = useQuery({
    queryKey: ['get-notification'],
    queryFn: getNotifications,
    refetchOnMount: 'always',
  })

  if (isLoading) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  if (isSuccess) {
    console.log('>>>>>>notigyffff', data.data)
  }

  return (
    <>
      {data
        ? data.data.map((notification: any) => (
          <View
          className="mt-4 py-2 w-full mx-auto border border-gray-400 px-4 rounded-md"
          key={notification.id}
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
          <View className="flex-row justify-between items-center">
            <View className="flex-row mx-1.5">
              <View className="mt-2 mr-0.5">
                {notification.type === 0 ? (
                  <Text>
                    {' '}
                    <AntDesign 
                    name="exclamationcircleo" 
                    size={20}
                     color={textTheme} 
                    />{'   '}
                  </Text>
                ) : notification.type === 1 ? (
                  <Text>
                    {' '}
                    <FontAwesome5
                      name="running"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : notification.type === 2 ? (
                  <Text>
                    {' '}
                    <Ionicons
                      name="ios-hammer-outline"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : notification.type === 3 ? (
                  <Text>
                    {' '}
                    <Ionicons
                      name="md-swap-vertical"
                      size={20}
                      color={textTheme}
                    />{'   '}
                  </Text>
                ) : null}
              </View>
              <View>
                <Text
                  className="font-semibold text-base"
                  style={{ color: textTheme }}
                >
                   {notification.title}
                </Text>
                <Text style={{ color: textTheme }} className="">
                {notification.message} 
                </Text>
              </View>
            </View>

            <Text
              className="mb-4 text-[#808080] left-[-28px]"
              style={{ color: textTheme }}
            >
              {getTimeAgo(notification.created_at)}
            </Text>
          </View>
        </View>
      ))
    : 'No Notifications Available'}
    </>
  )
}
