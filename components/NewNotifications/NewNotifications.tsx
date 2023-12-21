import { AntDesign, FontAwesome5, Ionicons } from '@expo/vector-icons'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { RootState } from '../../services/store'
import { getTimeAgo } from '../../utils/helper'

export default function NewNotifications({ data, isLoading }) {
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

  // const { isLoading, isSuccess, data, isError } = useQuery({
  //   queryKey: ['get-notification'],
  //   queryFn: getNotifications,
  //   refetchOnMount: 'always',
  // })

  if (isLoading) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  

  // console.log('>>>>>>data', data.data)

  return (
    <>
      {data?.data === null ? (
        <>
          <Text className="text-sm pt-2 mb-4 " style={{ color: textTheme }}>
            There are no new notifications at the moment
          </Text>
        </>
      ) : (
        data?.data?.map((notification: any) => (
          <ScrollView>
            <View
              className="py-2 mb-3 mt-4 border border-gray-400 rounded-md"
              style={{ backgroundColor: theme ? '#152955' : 'white' }}
              key={notification.id}
            >
              <View className="flex-row items-center justify-between mx-2 mb-1 mt-2">
                <View className="flex-row items-center">
                  {notification.type === 0 ? (
                    <Text style={{ color: textTheme }}>
                      {' '}
                      <AntDesign
                        name="exclamationcircleo"
                        size={20}
                        color={textTheme}
                      />
                      {'   '}
                    </Text>
                  ) : notification.type === 1 ? (
                    <Text style={{ color: textTheme }}>
                      {' '}
                      <FontAwesome5
                        name="running"
                        size={20}
                        color={textTheme}
                      />
                      {'   '}
                    </Text>
                  ) : notification.type === 2 ? (
                    <Text style={{ color: textTheme }}>
                      {' '}
                      <Ionicons
                        name="ios-hammer-outline"
                        size={20}
                        color={textTheme}
                      />
                      {'   '}
                    </Text>
                  ) : notification.type === 3 ? (
                    <Text style={{ color: textTheme }}>
                      {' '}
                      <Ionicons
                        name="md-swap-vertical"
                        size={20}
                        color={textTheme}
                      />
                      {'   '}
                    </Text>
                  ) : null}

                  <Text
                    style={{ color: textTheme }}
                    className="text-base font-bold"
                  >
                    {notification.title}
                  </Text>
                </View>

                <Text style={{ color: textTheme }}>
                  {getTimeAgo(notification.created_at)}
                </Text>
              </View>

              <View>
                <Text className="mx-10 text-base" style={{ color: textTheme }}>
                  {notification.message}
                </Text>
              </View>
            </View>
          </ScrollView>
        ))
      )}
    </>
  )
}
