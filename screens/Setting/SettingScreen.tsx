import { AntDesign, Entypo, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Image, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu'
import { useSelector } from 'react-redux'
import SettingsCategory from '../../components/SettingTestFolder/SettingsCategory'
import SettingsTest from '../../components/SettingTestFolder/SettingsTest'
import { notificationPreferences } from '../../services/notification/preferences'
import { RootState, useAppDispatch } from '../../services/store'

const SettingScreen = ({ navigation }: any) => {
  const dispatch = useAppDispatch()
  const { data: preferences } = useSelector(
    (state: RootState) => state.notificationPreferenceReducer,
  )

  const [notifications, setNotifications] = useState({
    email_notifications: false,
    sms_notifications: false,
    account_update_notifications: false,
    newsletter_notifications: false,
    promotions_notifications: false,
    misc_notifications: false,
    cat_errand_notifications: false,
    location_errand_notifications: false,
    bid_notifications: false,
    errand_status_notifications: false,
  })
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Settings',
      headerStyle: { backgroundColor: '#F8F9FC' },
      headerLeft: () => (
        <View className="flex-row items-center justify-between ">
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            className="flex-row items-center"
          >
            <AntDesign name="arrowleft" size={24} color="#243763" />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View className="flex-row items-center justify-between py-3 space-x-5 ">
          <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
            <MaterialIcons name="notifications" color={'black'} size={24} />
          </TouchableOpacity>
          <Menu style={{ shadowColor: 'none', shadowOpacity: 0 }}>
            <MenuTrigger>
              <Entypo name="dots-three-vertical" color={'black'} size={22} />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionWrapper: {
                  // borderBottomWidth: 0.2,
                  marginTop: 10,
                  borderBottomColor: '#AAAAAA',
                },
                optionText: { textAlign: 'center', fontWeight: '600' },
              }}
            >
              <MenuOption
                onSelect={() => navigation.navigate('Account')}
                text="Profile"
                customStyles={{
                  optionWrapper: {
                    borderBottomWidth: 1,
                    borderBottomColor: '#AAAAAA',
                    paddingVertical: 6,
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
              <MenuOption
                onSelect={() => navigation.navigate('Contact Us')}
                text="Contact Us"
                customStyles={{
                  optionWrapper: {
                    paddingVertical: 6,
                  },
                  optionText: { textAlign: 'center', fontWeight: '600' },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      ),
    })
  }, [])

  useEffect(() => {
    dispatch(notificationPreferences())
  }, [])

  return (
    <SafeAreaView>
      <ScrollView className="bg-[#F8F9FC]">
        <View className="mt-10 px-3">
          <View className=" h-[88px] mt-1 border-b-[#CCCCCC] border-b-[1px]">
            <View className="flex-row justify-between items-center">
              <View className="flex-row space-x-4 ">
                <Image
                  source={require('../../assets/images/mide.jpg')}
                  className="w-[60px] h-[60px] rounded-full "
                />
                <View className="mt-2">
                  <Text className="font-semibold text-base">
                    Mide Eliot AjibadeOkonkwo
                  </Text>
                  <Text className="text-[#808080]">
                    midesmailishere@gmail.com
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

          <SettingsCategory />

          <View className="mt-8 ml-4">
            <Text className="pb-2 text-base font-bold leading-6">
              REFERRAL CODE
            </Text>
          </View>

          <View className="h-[350px] bg-[#ECF0F8] mt-5 rounded-md pb-4 px-3">
            <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-base">Enoobong-ga86P</Text>
                <Text className="font-light italic">Tap to Copy Code</Text>
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
                <Text className="font-bold">Enoobong-ga86P </Text>
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

          <View className="w-[390px] h-[190px] bg-[#ECF0F8] px-4 mt-5 rounded-md pb-4">
            <View className=" h-[63px]  mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-[18px]">
                  Send Email notifications
                </Text>
              </View>
              <View className="bg-[#ADF0D1] w-[64px] mt-2 py-1 items-center justify-center rounded-lg">
                <Text className="text-[14px]">Enabled</Text>
              </View>
            </View>

            <View className=" h-[63px] mt-5 border-b border-b-[#AAAAAA]">
              <View className="flex-row items-center justify-between">
                <Text className="font-medium text-[18px]">
                  Send SMS notifications
                </Text>
              </View>
              <View className="bg-[#ADF0D1] rounded-lg w-[64px] mt-2 py-1 items-center justify-center">
                <Text className="text-[14px] ">Enabled</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SettingScreen
