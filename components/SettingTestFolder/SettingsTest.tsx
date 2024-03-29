import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { ActivityIndicator } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { _fetch } from '../../services/axios/http'
import { updateNotificationPrefeference } from '../../services/notification/updatePreference'
import { RootState, useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'
import LoadingModal from '../MainLoader/LoadingModal'

interface Props {
  openVerifyModal: () => void
  loader: boolean
}

const SettingsTest = ({ openVerifyModal, loader }: Props) => {
  const [IsLoading, setIsLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)
  const [accountUpdate, setAccountUpdate] = useState(false)
  const [newsLetter, setNewsLetter] = useState(false)
  const [smsLoading, setSmsLoading] = useState(false)
  const [errandAreaValue, setErrandAreaValue] = useState(true)

  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  {
    loading1 ? (
      <ActivityIndicator color={theme ? 'blue' : 'black'} size="large" />
    ) : null
  }

  const { data: preferences, loading: preferencesLoading } = useSelector(
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
    setSmsLoading(true)
    try {
      const _rs = await _fetch({
        method: 'PUT',
        _url: `/user/profile`,
        body: userData,
      })

      setSmsLoading(false)
      // Check if the response status code indicates an error
      if (!_rs.ok) {
        const errorResponse = await _rs.json()
        throw new Error(`Server error: ${errorResponse.message}`)
      }
      const responseData = await _rs.json()
      const user_id = (await AsyncStorage.getItem('user_id')) || ''
      dispatch(currentUserDetails({ user_id }))

      getUserId({ dispatch })

      return responseData
    } catch (error) {
      throw error
    }
  }

  const toggleTheme = async (theme: boolean) => {
    // const theme = await AsyncStorage.getItem('theme')
    if (theme === true) {
      await AsyncStorage.setItem('theme', 'light')
    } else {
      await AsyncStorage.setItem('theme', 'dark')
    }
  }

  useEffect(() => {
    getUserId({ dispatch })
  }, [])

  if (IsLoading) {
    ;<ActivityIndicator color="black" size="large" />
  }

  if (loading) {
    ;<ActivityIndicator color="black" size="large" />
  }

  if (loading1) {
    ;<ActivityIndicator color="black" size="large" />
  }

  const handleAccountChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        account_update_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleNewsLetterChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    setNewsLetter(!newsLetter)

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        newsletter_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handlePromotionsChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        promotions_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleNewChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        cat_errand_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleAreaChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed
    setErrandAreaValue(!errandAreaValue);

    console.log(">>>>>>location", value);
    

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        location_errand_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleErrandBidsChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        bid_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleErrandStatusChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        errand_status_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  return (
    <ScrollView>
      <View className="mt-6 ml-4 ">
        <Text
          style={{ color: '#444444' }}
          className=" text-base font-bold leading-6"
        >
          GENERAL NOTIFICATIONS
        </Text>
        <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-[14px] ">
          Notifications on all general activities on Swave
        </Text>
      </View>

      <LoadingModal visible={smsLoading} />

      <View
        style={{ backgroundColor: theme ? '#152955' : 'white' }}
        className=" bg-[#ECF0F8] mt-5 rounded-lg pb-4"
      >
        <View
          className=" h-[63px] ml-4 mt-5 border-b border-b-[#C6C3D8]"
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Account Update Notification
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: '#09497D' }}
                onValueChange={(value: boolean) => {
                  // dispatch(
                  //   updateNotificationPrefeference({
                  //     ...preferences,
                  //     dispatch,
                  //     Toast,
                  //     account_update_notifications: value,
                  //   }),
                  // )
                  handleAccountChange(value)
                }}
                value={preferences?.account_update_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm">
            You will be notified when an update is available
          </Text>
        </View>

        <View
          className=" h-[63px] ml-4 mt-5 border-b pb-2 border-b-[#C6C3D8]"
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
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
                  trackColor={{ false: '#767577', true: '#09497D' }}
                  onValueChange={(value: boolean) => {
                    // setNewsLetter(!newsLetter)
                    // dispatch(
                    //   updateNotificationPrefeference({
                    //     ...preferences,
                    //     dispatch,
                    //     Toast,
                    //     newsletter_notifications: value,
                    //   }),
                    // )
                    handleNewsLetterChange(value)
                  }}
                  value={preferences?.newsletter_notifications}
                  style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                />
              </>
            </TouchableWithoutFeedback>
          </View>
          <Text style={{  color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View
          className=" h-[63px] ml-4 mt-5  border-b-[#C6C3D8]"
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Promotions and adverts
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: '#09497D' }}
                onValueChange={(value: boolean) => {
                  // dispatch(
                  //   updateNotificationPrefeference({
                  //     ...preferences,
                  //     dispatch,
                  //     Toast,
                  //     promotions_notifications: value,
                  //   }),
                  // )
                  handlePromotionsChange(value)
                }}
                value={preferences?.promotions_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{  color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>

        {/* <View className=" h-[63px] ml-4 mt-5  border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Dark Mode
            </Text>
          
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
           
          </View>
        </View> */}
      </View>

      <View className="mt-6 ml-4 ">
        <Text
          style={{ color: textTheme }}
          className=" text-base font-bold leading-6"
        >
          DISPLAY
        </Text>
        <Text style={{  color: '#787C82', fontFamily: 'Axiforma' }} className="text-[14px]">
          Change display settings of swave app
        </Text>
      </View>

      <View
        style={{ backgroundColor: theme ? '#152955' : 'white' }}
        className=" bg-[#ECF0F8] mt-5 rounded-lg pb-3"
      >
        <View
          className=" h-[45px] ml-4 mt-5  border-b-[#AAAAAA]"
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
          <View
            className="flex-row items-center justify-between"
            style={{ backgroundColor: theme ? '#152955' : 'white' }}
          >
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Dark Mode
            </Text>
            <Switch
              trackColor={{ false: '#767577', true: '#09497D' }}
              value={data?.preferred_theme === 'light' ? true : false}
              // value={theme === 'light' ? true : false}
              onValueChange={
                (value: boolean) =>
                  updateUserProfile({
                    //    first_name: data.first_name,
                    // last_name: data.last_name,
                    //  bio: data.bio,
                    //  email: data.email,
                    //  dob: data.dob,
                    preferred_theme: value === true ? 'light' : 'dark',
                  })

                // toggleTheme(value)
              }
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
          </View>
        </View>
      </View>

      <View className="mt-6 ml-4 ">
        <Text
          style={{ color: textTheme }}
          className=" text-base font-bold leading-6"
        >
          PIN
        </Text>
        <Text style={{ color: textTheme }} className="text-[14px] font-md">
          set and verify your pin
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => openVerifyModal()}
        style={{ backgroundColor: theme ? '#152955' : 'white' }}
        className=" bg-[#ECF0F8] mt-5 rounded-lg pb-3"
      >
        <View
          className=" h-[45px] mx-4 mt-5  border-b-[#AAAAAA]"
          style={{ backgroundColor: theme ? '#152955' : 'white' }}
        >
          <View
            className="flex-row items-center justify-between"
            style={{ backgroundColor: theme ? '#152955' : 'white' }}
          >
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base "
            >
              Change Pin
            </Text>
            {/* <TouchableOpacity onPress={() => )}> */}
            <AntDesign
              style={{ color: theme ? 'white' : 'black' }}
              onPress={() => openVerifyModal()}
              name="edit"
              size={24}
              className="mr-4"
            />
            {/* </TouchableOpacity> */}
          </View>
        </View>
      </TouchableOpacity>

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
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              New errands in your category interest
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: '#09497D' }}
                onValueChange={(value: boolean) => {
                  // dispatch(
                  //   updateNotificationPrefeference({
                  //     ...preferences,
                  //     dispatch,
                  //     Toast,
                  //     cat_errand_notifications: value,
                  //   }),
                  // )
                  handleNewChange(value)
                }}
                value={preferences?.cat_errand_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            You will be notified when an update is available
          </Text>
        </View>

        <View className="h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Errands within your area
            </Text>
            {errandAreaValue ? 
              <Switch
              trackColor={{ false: '#767577', true: '#09497D' }}
              onValueChange={(value: boolean) => {
                // dispatch(
                //   updateNotificationPrefeference({
                //     ...preferences,
                //     dispatch,
                //     Toast,
                //     location_errand_notifications: value,
                //   }),
                // )
                handleAreaChange(value)
              }}
              value={preferences?.location_errand_notifications}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
            :
            <Switch
              trackColor={{ false: '#767577', true: '#09497D' }}
              onValueChange={(value: boolean) => {
                // dispatch(
                //   updateNotificationPrefeference({
                //     ...preferences,
                //     dispatch,
                //     Toast,
                //     location_errand_notifications: value,
                //   }),
                // )
                handleAreaChange(value)
              }}
              value={!preferences?.location_errand_notifications}
              style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
            />
            }
            
          </View>
          <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            Be in the know when we publish any information
          </Text>
        </View>

        <View className="  h-[63px] ml-4 mt-5 border-b border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Bids on your errands
            </Text>
            <TouchableWithoutFeedback>
              <Switch
                trackColor={{ false: '#767577', true: '#09497D' }}
                onValueChange={(value: boolean) => {
                  // dispatch(
                  //   updateNotificationPrefeference({
                  //     ...preferences,
                  //     dispatch,
                  //     Toast,
                  //     bid_notifications: value,
                  //   }),
                  // )
                  handleErrandBidsChange(value)
                }}
                value={preferences?.bid_notifications}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableWithoutFeedback>
          </View>
          <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>

        <View className="h-[63px] ml-4 mt-5 border-b-[#AAAAAA]">
          <View className="flex-row items-center justify-between">
            <Text
              style={{ color: textTheme }}
              className="font-medium text-base"
            >
              Errand status updates
            </Text>
            <TouchableOpacity>
              <Switch
                trackColor={{ false: '#767577', true: '#09497D' }}
                value={preferences?.errand_status_notifications}
                onValueChange={(value: boolean) => {
                  // dispatch(
                  //   updateNotificationPrefeference({
                  //     ...preferences,
                  //     dispatch,
                  //     Toast,
                  //     errand_status_notifications: value,
                  //   }),
                  // )
                  handleErrandStatusChange(value)
                }}
                style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
              />
            </TouchableOpacity>
          </View>
          <Text style={{ color: '#787C82', fontFamily: 'Axiforma' }} className="text-sm font-light">
            Stay informed about our amazing offers
          </Text>
        </View>
      </View>
    </ScrollView>
  )
}

export default SettingsTest
