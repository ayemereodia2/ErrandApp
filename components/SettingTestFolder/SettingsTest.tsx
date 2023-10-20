import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { _fetch } from '../../services/axios/http'
import { updateNotificationPrefeference } from '../../services/notification/updatePreference'
import { RootState, useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'
import { StyleSheet } from 'react-native'
import { ActivityIndicator } from 'react-native-paper'


const SettingsTest = () => {
  const [IsLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const { data: preferences } = useSelector(
    (state: RootState) => state.notificationPreferenceReducer,
  )

  const { loading } = useSelector(
    (state: RootState) => state.updateNotificationPreferenceReducer,
  )
  const darkMode = useSelector((state: RootState) => state.darkMode.darkMode)

  const { data } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const updateUserProfile = async (userData: any) => {
    setIsLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: userData,
      })

      setIsLoading(false)

      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }
      const responseData = await _rs.json()

      getUserId({ dispatch })
      return responseData
    } catch (error) {
      throw error
    }
  }

  useEffect(() => {
    getUserId({ dispatch })
  }, [])

  if(IsLoading){
    <ActivityIndicator color="black" size="large" />
  }

  return (
    <ScrollView>

     

      <View className="mt-6 ml-4 ">
        <Text
          style={{ color: textTheme }}
          className=" text-base font-bold leading-6"
        >
          GENERAL NOTIFICATIONS
        </Text>
        <Text style={{ color: textTheme }} className="text-[14px] font-md">
          Notifications on all general activities on Swave
        </Text>
      </View>

      <View
        style={{ backgroundColor: theme ? '#152955' : 'white' }}
        className=" bg-[#ECF0F8] mt-5 rounded-lg pb-4"
      >
        <View className=" h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Account Update Notification
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      account_update_notifications: value,
                    }),
                  )
                }}
                value={preferences?.account_update_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            You will be notified when an update is available
          </Text>
        </View>

        <View className=" h-[63px] ml-4 mt-5 border-b pb-2 border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Newsletters and offers
            </Text>
            <TouchableWithoutFeedback>
              <>
                <Switch
                  trackColor={{ false: '#767577', true: 'green' }}
                  onValueChange={(value: boolean) => {
                    dispatch(
                      updateNotificationPrefeference({
                        ...preferences,
                        dispatch,
                        Toast,
                        newsletter_notifications: value,
                      }),
                    )
                  }}
                  value={preferences?.newsletter_notifications}
                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                />
              </>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View className=" h-[63px] ml-4 mt-5  border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Promotions and adverts
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      promotions_notifications: value,
                    }),
                  )
                }}
                value={preferences?.promotions_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>

        <View className=" h-[63px] ml-4 mt-5  border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Dark Mode
            </Text>
            {/* <TouchableOpacity onPress={() => )}> */}
            <Switch
              trackColor={{ false: '#767577', true: 'green' }}
              value={data?.preferred_theme === 'light' ? true : false}
              onValueChange={(value: boolean) =>
                updateUserProfile({
                  first_name: data.first_name,
                  last_name: data.last_name,
                  bio: data.bio,
                  email: data.email,
                  dob: data.dob,
                  preferred_theme: value === true ? 'light' : 'dark',
                })
              }
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </View>

      <View className="mt-8 ml-4">
        <Text
          style={{ color: textTheme }}
          className="pb-2 text-base font-bold leading-6"
        >
          ERRAND NOTIFICATIONS
        </Text>
        <Text style={{ color: textTheme }} className="text-[14px]">
          Errands and bids specific notifications
        </Text>
      </View>

      <View
        style={{ backgroundColor: theme ? '#152955' : 'white' }}
        className=" bg-[#ECF0F8] mt-5 rounded-md pb-4"
      >
        <View className=" h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: textTheme }} className="font-medium text-base">
              New errands in your category interest
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      cat_errand_notifications: value,
                    }),
                  )
                }}
                value={preferences?.cat_errand_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            You will be notified when an update is available
          </Text>
        </View>

        <View className="h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: textTheme }} className="font-medium text-base">
              Errands within your area
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      location_errand_notifications: value,
                    }),
                  )
                }}
                value={preferences?.location_errand_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View className="  h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: textTheme }} className="font-medium text-base">Bids on your errands</Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      bid_notifications: value,
                    }),
                  )
                }}
                value={preferences?.bid_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>

        <View className="h-[63px] ml-4 mt-5 border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: textTheme }} className="font-medium text-base">Errand status updates</Text>
            <TouchableOpacity>
              <Switch
                trackColor={{ false: '#767577', true: 'green' }}
                value={preferences?.errand_status_notifications}
                onValueChange={(value: boolean) => {
                  dispatch(
                    updateNotificationPrefeference({
                      ...preferences,
                      dispatch,
                      Toast,
                      errand_status_notifications: value,
                    }),
                  )
                }}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: textTheme }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}




export default SettingsTest
