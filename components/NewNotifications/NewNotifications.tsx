import { EvilIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'
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
      _url: `/user/app-notification`,
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
    console.log(">>>>>>notigyffff", data.data)
  }

  return (
    <>
      {data
        ? data.data.map((notification: any) => (
            <View
              className="mt-3 py-2 border border-gray-400 px-2 rounded-md mb-2"
              key={notification.id}
              style={{ backgroundColor: theme ? '#152955' : 'white' }}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row mx-1.5">
                  {/* <Image
      source={require('../../assets/images/franence.jpg')}
      style={{ width: 40, height: 40, borderRadius: 50, marginRight: 8 }}
    /> */}
                  <View className="mt-2">
                    {notification.type === 0 ? (
                      <Text>
                        {' '}
                        <EvilIcons
                          name="question"
                          size={24}
                          color={textTheme}
                        />{'   '}
                      </Text>
                    ) : notification.type === 1 ? (
                      <Text>
                        {' '}
                        <FontAwesome5
                          name="running"
                          size={40}
                          color={textTheme}
                        />{'   '}
                      </Text>
                    ) : notification.type === 2 ? (
                      <Text>
                        {' '}
                        <Ionicons
                          name="ios-hammer-outline"
                          size={24}
                          color={textTheme}
                        />{'  '}
                      </Text>
                    ) : notification.type === 3 ? (
                      <Text>
                        {' '}
                        <Ionicons
                          name="md-swap-vertical"
                          size={24}
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
                      {notification.message}
                    </Text>
                    <Text style={{ color: textTheme }} className="">
                      {notification.title}
                    </Text>
                  </View>
                </View>
                
                <View className='relative left-[-25px]'>
                <Text
                  className="mb-4 text-[#808080] "
                  style={{ color: textTheme }}
                >
                  {getTimeAgo(notification.created_at)}
                </Text>
                </View>
              </View>
            </View>
          ))
        : 'No Notifications Available'}

      {/* <View className='mt-3 py-2 border border-gray-400 px-2 bg-white rounded-md' >
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
 */}
    </>
  )
}
