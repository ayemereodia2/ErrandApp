import { AntDesign } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { NotificationCard } from '../../components/Notifications'
import { getNotifications } from '../../services/notification'
import { RootState, useAppDispatch } from '../../services/store'

const NotificationScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const { data: currentUser, backgroundTheme, textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const { notifications, loading: loadingNotification } = useSelector(
    (state: RootState) => state.notifications,
  )

  useEffect(() => {
    dispatch(getNotifications({ userId: currentUser.id }))
  }, [])

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Notifications',
      headerStyle: { backgroundColor: backgroundTheme, color: textTheme },
      headerTitleStyle: { color: textTheme },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 mr-6"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
    })
  }, [])

  if (loadingNotification) {
    return (
      <SafeAreaView className="pt-20 bg-gray-200 w-screen h-[40vh] mt-5">
        <ActivityIndicator color="black" size="large" />
      </SafeAreaView>
    )
  }

  return (
    <SafeAreaView className="" style={{ backgroundColor: backgroundTheme }}>
      <ScrollView
        style={{ backgroundColor: backgroundTheme }}
        className="h-full mb-30"
      >
        <View className="h-[64px] w-[380px] mx-4 flex-row bg-[#E6E6E6] justify-center items-center">
          <TouchableOpacity>
            <View className="flex-row justify-center items-center mr-2 ml-2">
              <Text className="text-center">Unread Notifications</Text>
              <Text className="bg-red-500 text-white ml-2 p-1 rounded-md">
                {' '}
                {notifications === undefined ? 0 : notifications?.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <NotificationCard
          data={notifications}
          isLoading={loadingNotification}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default NotificationScreen
