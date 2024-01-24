import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { RootState } from '../../services/store'
import { getTimeAgo } from '../../utils/helper'

export function NotificationCard({ data, isLoading }) {
  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  if (isLoading) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5">
        {/* <Text className='m-auto'><EvilIcons name="spinner" size={28} color="black" /></Text> */}
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  console.log('>>>>>>data', data)

  return (
    <>
      {data === null ? (
        <>
          <Text className="text-sm pt-2 mb-4 " style={{ color: textTheme }}>
            There are no new notifications at the moment
          </Text>
        </>
      ) : (
        data?.map((notification: any) => (
          <ScrollView className="px-4">
            <View
              className="py-2 mb-3 mt-2"
              // style={{ backgroundColor: theme ? '#152955' : 'white' }}
              key={notification.id}
            >
              <View className="flex-row items-center justify-between mx-2">
                {/* <View className="flex-row items-center">
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
                </View> */}
                <View className="flex-row items-center space-x-4">
                  <Image
                    source={require('../../assets/images/notify-icon.jpg')}
                    className="w-10 h-10"
                  />

                  <View>
                    <Text
                      style={{ fontFamily: 'Axiforma' }}
                      className=" text-[12px] w-[240px]"
                    >
                      {notification.description}
                    </Text>
                    <Text
                      style={{ fontFamily: 'Axiforma' }}
                      className=" text-[12px]"
                    >
                      {notification.title}
                    </Text>
                  </View>
                </View>

                <Text
                  className=" text-[12px]"
                  style={{ color: textTheme, fontFamily: 'Axiforma' }}
                >
                  {getTimeAgo(notification.created_at)}
                </Text>
              </View>
            </View>
          </ScrollView>
        ))
      )}
    </>
  )
}
