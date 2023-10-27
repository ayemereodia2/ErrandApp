import { Entypo, FontAwesome } from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useQuery } from '@tanstack/react-query'
import * as Clipboard from 'expo-clipboard'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import Container from '../../components/Container'
import { ProfileInitials } from '../../components/ProfileInitials'
import SettingsCategory from '../../components/SettingTestFolder/SettingsCategory'
import SettingsTest from '../../components/SettingTestFolder/SettingsTest'
import { _fetch } from '../../services/axios/http'
import { notificationPreferences } from '../../services/notification/preferences'
import { updateNotificationPrefeference } from '../../services/notification/updatePreference'
import { RootState, useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'

const SettingScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userId, setUserId] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef1.current?.dismiss()
        }}

        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const { data: preferences } = useSelector(
    (state: RootState) => state.notificationPreferenceReducer,
  )
  const [interests, setInterests] = useState([])

  const dispatch = useAppDispatch()
  const [notifications, setNotifications] = useState({
    email_notifications: false,
    sms_notifications: false,
  })

  const [loading, setLoading] = useState(false)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

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

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    refetchOnMount: 'always',
  })

  const getInterests = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/category-interest`,
    })

    const rs = await _rs.json()

    console.log('>>>>>>>res', rs)

    setInterests(rs.data)
  }

  console.log('>>>>interests', interests)

  useEffect(() => {
    getInterests()
    dispatch(notificationPreferences())
  }, [])

  useEffect(() => {
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [])

  if (isLoading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        <ActivityIndicator color={theme ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }

  {
    loading ? (
      <ActivityIndicator color={theme ? 'blue' : 'black'} size="large" />
    ) : null
  }

  return (
    <Container>
      <BottomSheetModalProvider>
        <SafeAreaView>
          <ScrollView
            style={{ backgroundColor: backgroundTheme }}
            className="bg-[#F8F9FC]"
          >
            <StatusBar
              backgroundColor={backgroundTheme}
              barStyle={theme ? 'light-content' : 'dark-content'}
            />

             <View className={Platform.OS === 'android' ? "flex-row items-center justify-between mt-6" : "flex-row items-center justify-between"}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginLeft: 20 }}
                className="flex-row items-center justify-between my-3"
              >
                <ProfileInitials
                  firstName={firstName.charAt(0).toUpperCase()}
                  lastName={lastName.charAt(0).toUpperCase()}
                  profile_pic={profilePic}
                  textClass="text-white text-base"
                  width={35}
                  height={35}
                />
              </TouchableOpacity>

              <Text
                className="font-bold text-[20px] leading-7"
                style={{ color: textTheme }}
              >
                Settings
              </Text>

              <View className="items-center flex-row gap-4 mr-2">
                <Text style={{ color: textTheme }}>
                  <FontAwesome
                    name="bell-o"
                    size={24}
                    onPress={() => {
                      navigation.navigate('Notification')
                    }}
                  />
                </Text>
                <TouchableOpacity onPress={openMoreModal}>
                  <Text style={{ color: textTheme }}>
                    <Entypo name="dots-three-vertical" size={24} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View className=" mt-6 px-4">
              <View className=" h-[88px] mt-1 border-b-[#CCCCCC] border-b-[1px]">
                <View className="flex-row justify-between items-center">
                  <View className="flex-row space-x-4 ">
                    {data?.data?.profile_picture ? (
                      <View className="mx-auto">
                        <Image
                          source={{ uri: data?.data?.profile_picture }}
                          className="b rounded-full w-[60px] h-[60px]"
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
                      <Text
                        style={{ color: textTheme }}
                        className="font-semibold text-base"
                      >
                        {data?.data?.first_name} {data?.data?.last_name}{' '}
                      </Text>
                      <Text
                        style={{ color: textTheme }}
                        className="text-[#808080]"
                      >
                        {!data?.data?.email
                          ? 'Email address not available'
                          : data?.data?.email}
                      </Text>
                    </View>
                  </View>
                  {/* <Text className="mt-1 text-[#808080]">
                  <MaterialIcons
                    name="keyboard-arrow-right"
                    size={24}
                    color="#808080"
                  />
                </Text> */}
                </View>
              </View>

              <SettingsTest />

              <SettingsCategory navigation={navigation} interests={interests} />

              <View className="mt-8 ml-4">
                <Text
                  style={{ color: textTheme }}
                  className="pb-2 text-base font-bold leading-6"
                >
                  REFERRAL CODE
                </Text>
              </View>

              <View
                style={{ backgroundColor: theme ? '#152955' : 'white' }}
                className="h-[350px] bg-[#ECF0F8] mt-5 rounded-md pb-4 px-3"
              >
                <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-base"
                    >
                      {data?.data?.referral_code}
                    </Text>
                    <Text
                      className="font-light italic"
                      onPress={() => copyToClipboard(data?.data?.referral_code)}
                      style={{ color: textTheme }}
                    >
                      Tap to Copy Code
                    </Text>
                  </View>
                </View>

                <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-base"
                    >
                      Share Via Email
                    </Text>
                  </View>
                </View>

                {/* <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
                <View className="flex-row items-center justify-between">
                  <Text
                    style={{ color: textTheme }}
                    className="font-medium text-base"
                  >
                    Download Invitation
                  </Text>
                  <Text>
                    <Ionicons
                      name="md-download-sharp"
                      size={24}
                      color={textTheme}
                    />
                  </Text>
                </View>
              </View> */}

                <View className=" mt-5 border-b border-b-[#AAAAAA] bg-[#3F60AC] rounded-lg">
                  <Text className="text-[#FAFAFA] text-base font-light  px-5 py-4">
                    Invite new members by sharing the invitation code{' '}
                    <Text className="font-bold">
                      {data?.data?.referral_code}{' '}
                    </Text>
                    with them. Registration in your group will then take place
                    automatically.
                  </Text>
                </View>
              </View>

              <View className="mt-10 ml-4">
                <Text
                  style={{ color: textTheme }}
                  className="pb-2 text-base font-bold leading-6"
                >
                  NOTIFICATIONS
                </Text>
              </View>

              <View
                style={{ backgroundColor: theme ? '#152955' : 'white' }}
                className=" h-[190px] bg-[#ECF0F8] px-4 mt-5 rounded-md pb-4"
              >
                <View className=" h-[63px]  mt-5 border-b border-b-[#AAAAAA]">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-[18px]"
                    >
                      Send Email notifications
                    </Text>
                  </View>
                  <View className=" mt-2 py-1 flex-row items-center justify-between rounded-lg">
                    <TouchableOpacity>
                      <Switch
                        trackColor={{ false: '#767577', true: 'green' }}
                        value={preferences?.email_notifications}
                        onValueChange={(value: boolean) => {
                          setLoading(true)
                          dispatch(
                            updateNotificationPrefeference({
                              ...preferences,
                              dispatch,
                              Toast,
                              email_notifications: value,
                            }),
                          )
                        }}
                        style={{
                          transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
                        }}
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
                        {preferences.email_notifications
                          ? 'Enabled'
                          : 'Disabled'}{' '}
                      </Text>
                    </View>
                  </View>
                </View>

                <View className=" h-[63px] mt-5 border-b border-b-[#AAAAAA]">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-[18px]"
                    >
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
                        style={{
                          transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
                        }}
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

        <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bottomSheetRef1}
          index={0}
          snapPoints={['45%']}
          backdropComponent={renderBackdrop}
        >
          <Content navigation={navigation} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Container>
  )
}

export default SettingScreen
