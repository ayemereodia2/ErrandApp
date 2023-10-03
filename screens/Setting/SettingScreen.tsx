import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useQuery } from '@tanstack/react-query'
import * as Clipboard from 'expo-clipboard'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import {
  Image,
  SafeAreaView,
  Switch,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import SettingsCategory from '../../components/SettingTestFolder/SettingsCategory'
import SettingsTest from '../../components/SettingTestFolder/SettingsTest'
import { _fetch } from '../../services/axios/http'
import { notificationPreferences } from '../../services/notification/preferences'
import { updateNotificationPrefeference } from '../../services/notification/updatePreference'
import { RootState, useAppDispatch } from '../../services/store'

const SettingScreen = ({ navigation }: any) => {
  const { data: preferences } = useSelector(
    (state: RootState) => state.notificationPreferenceReducer,
  )
  const dispatch = useAppDispatch()
  const [notifications, setNotifications] = useState({
    email_notifications: false,
    sms_notifications: false,
  })

  const copyToClipboard = async (text: string) => {
    Toast.show({
      type: 'success',
      text1: 'Copied',
    })
    await Clipboard.setStringAsync(text)
  }

  const getUserProfile = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/profile`,
    })
    return await _rs.json()
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    refetchOnMount: 'always',
  })

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     title: 'Settings',
  //     headerStyle: { backgroundColor: '#F8F9FC' },
  //     headerLeft: () => (
  //       <View className="flex-row items-center justify-between pl-3">
  //         <TouchableOpacity
  //           onPress={() => navigation.navigate('Main')}
  //           className="flex-row items-center"
  //         >
  //           <AntDesign name="arrowleft" size={24} color="#243763" />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //     headerRight: () => (
  //       <View className="flex-row items-center justify-between py-3 space-x-5 pr-3 ">
  //         <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
  //           <MaterialIcons name="notifications" color={'black'} size={24} />
  //         </TouchableOpacity>
  //         <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
  //           <MenuTrigger>
  //             <Entypo name="dots-three-vertical" color={'black'} size={22} />
  //           </MenuTrigger>
  //           <MenuOptions
  //             customStyles={{
  //               optionWrapper: {
  //                 // borderBottomWidth: 0.2,
  //                 marginTop: 10,
  //                 borderBottomColor: '#AAAAAA',
  //               },
  //               optionText: { textAlign: 'center', fontWeight: '600' },
  //             }}
  //           >
  //             <MenuOption
  //               onSelect={() => navigation.navigate('Account')}
  //               text="Profile"
  //               customStyles={{
  //                 optionWrapper: {
  //                   borderBottomWidth: 1,
  //                   borderBottomColor: '#AAAAAA',
  //                   paddingVertical: 6,
  //                 },
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //             <MenuOption
  //               onSelect={() => navigation.navigate('Contact Us')}
  //               text="Contact Us"
  //               customStyles={{
  //                 optionWrapper: {
  //                   paddingVertical: 6,
  //                 },
  //                 optionText: { textAlign: 'center', fontWeight: '600' },
  //               }}
  //             />
  //           </MenuOptions>
  //         </Menu>
  //       </View>
  //     ),
  //   })
  // }, [])

  useEffect(() => {
    dispatch(notificationPreferences())
  }, [])

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#F8F9FC]">
        <View className=" mt-6 px-4">
          <View className=" h-[88px] mt-1 border-b-[#CCCCCC] border-b-[1px]">
            <View className="flex-row justify-between items-center">
              <View className="flex-row space-x-4 ">
                {data?.data?.profile_picture ? (
                  <View className="mx-auto">
                    <Image
                      source={{ uri: data?.data?.profile_picture }}
                      className="b rounded-full w-[100px] h-[100px]"
                    />
                  </View>
                ) : (
                  <View className="bg-gray-700 w-[60px] h-[60px] rounded-full items-center justify-center">
                    <Text className="text-white font-bold text-center text-2xl">
                      {data?.data?.first_name.charAt(0)}
                      {data?.data?.last_name.charAt(0)}
                    </Text>
                  </View>
                )}
                <View className="mt-2">
                  <Text className="font-semibold text-base">
                    {data?.data?.first_name} {data?.data?.last_name}{' '}
                  </Text>
                  <Text className="text-[#808080]">
                    {!data?.data?.email
                      ? 'Email address not available'
                      : data?.data?.email}
                  </Text>
                </View>
              </View>
              <Text className="mt-1 text-[#808080]">
                <MaterialIcons
                  name="keyboard-arrow-right"
                  size={24}
                  color="#808080"
                />
              </Text>
            </View>
          </View>

          <SettingsTest />

          <SettingsCategory navigation={navigation} />

          <View className="mt-8 ml-4">
            <Text className="pb-2 text-base font-bold leading-6">
              REFERRAL CODE
            </Text>
          </View>

          <View className="h-[350px] bg-[#ECF0F8] mt-5 rounded-md pb-4 px-3">
            <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-base">
                  {data?.data?.referral_code}
                </Text>
                <Text
                  className="font-light italic"
                  onPress={() => copyToClipboard(data?.data?.referral_code)}
                >
                  Tap to Copy Code
                </Text>
              </View>
            </View>

            <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-base">Share Via Email</Text>
              </View>
            </View>

            <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-base">
                  Download Invitation
                </Text>
                <Text>
                  <Ionicons name="md-download-sharp" size={24} color="black" />
                </Text>
              </View>
            </View>

            <View className=" mt-5 border-b border-b-[#AAAAAA] bg-[#3F60AC] rounded-lg">
              <Text className="text-[#FAFAFA] text-base font-light  px-5 py-4">
                Invite new members by sharing the invitation code{' '}
                <Text className="font-bold">{data?.data?.referral_code} </Text>
                with them. Registration in your group will then take place
                automatically.
              </Text>
            </View>
          </View>

          <View className="mt-20 ml-4">
            <Text className="pb-2 text-base font-bold leading-6">
              NOTIFICATIONS
            </Text>
          </View>

          <View className=" h-[190px] bg-[#ECF0F8] px-4 mt-5 rounded-md pb-4">
            <View className=" h-[63px]  mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-[18px]">
                  Send Email notifications
                </Text>
              </View>
              <View className=" mt-2 py-1 flex-row items-center justify-between rounded-lg">
                <TouchableOpacity>
                  <Switch
                    trackColor={{ false: '#767577', true: 'green' }}
                    value={preferences?.email_notifications}
                    onValueChange={(value: boolean) => {
                      dispatch(
                        updateNotificationPrefeference({
                          ...preferences,
                          dispatch,
                          Toast,
                          email_notifications: value,
                        }),
                      )
                    }}
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                  />
                </TouchableOpacity>
                <View
                  className={
                    preferences.email_notifications
                      ? 'text-sm bg-green-300 rounded-lg p-1 mb-1'
                      : ' bg-red-300 rounded-lg p-1 mb-1'
                  }
                >
                  <Text className="text-xs">
                    {preferences.email_notifications ? 'Enabled' : 'Disabled'}{' '}
                  </Text>
                </View>
              </View>
            </View>

            <View className=" h-[63px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-[18px]">
                  Send SMS notifications
                </Text>
              </View>
              <View className=" mt-2 py-1 flex-row items-center justify-between rounded-lg">
                <TouchableOpacity>
                  <Switch
                    trackColor={{ false: '#767577', true: 'green' }}
                    value={preferences?.sms_notifications}
                    onValueChange={(value: boolean) => {
                      dispatch(
                        updateNotificationPrefeference({
                          ...preferences,
                          dispatch,
                          Toast,
                          sms_notifications: value,
                        }),
                      )
                    }}
                    style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }] }}
                  />
                </TouchableOpacity>
                <View
                  className={
                    preferences.sms_notifications
                      ? 'text-sm bg-green-300 rounded-lg p-1 mb-1'
                      : ' bg-red-300 rounded-lg p-1 mb-1'
                  }
                >
                  <Text className="text-xs">
                    {preferences.sms_notifications ? 'Enabled' : 'Disabled'}{' '}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen
