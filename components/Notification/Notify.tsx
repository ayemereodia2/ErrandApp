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
            <View
              className="mt-4 py-2 w-full  mx-auto border border-gray-400 px-4 rounded-md"
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
                        />{'   '}
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
                       {notification.title}
                    </Text>
                    <Text style={{ color: textTheme }} className="">
                    {notification.message} 
                    </Text>
                  </View>
                </View>

                <Text
                  className="mb-4 text-[#808080]"
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

export default Notify
