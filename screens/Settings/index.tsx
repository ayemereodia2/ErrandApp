import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useQuery } from '@tanstack/react-query'
import * as Clipboard from 'expo-clipboard'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  ActivityIndicator,
  Modal,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import LoadingModal from '../../components/MainLoader/LoadingModal'
import ScreenHeader from '../../components/ScreenHeader'
import SettingsContent from '../../components/SettingsContent/SettingsContent'
import SettingsCategory from '../../components/SettingTestFolder/SettingsCategory'
import SettingsTest from '../../components/SettingTestFolder/SettingsTest'
import ConfirmPinModal from '../../components/VerificationModals/ConfirmPin'
import PinModal from '../../components/VerificationModals/PinModal'
import VerifyPassword from '../../components/VerifyPassword'
import { _fetch } from '../../services/axios/http'
import { notificationPreferences } from '../../services/notification/preferences'
import { updateNotificationPrefeference } from '../../services/notification/updatePreference'
import { getCategoryIntersts } from '../../services/settings/getCategoryInterests'
import { RootState, useAppDispatch } from '../../services/store'
import { getUserId } from '../../utils/helper'

const SettingScreen = ({ navigation }: any) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userId, setUserId] = useState('')
  const [profilePic, setProfilePic] = useState('')
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)
  const bottomSheetRef3 = useRef<BottomSheetModal>(null)
  const bottomSheetRef4 = useRef<BottomSheetModal>(null)

  const [deleteModal, setDeleteModal] = useState(false)
  const [deletingProfile, setDeletingProfile] = useState(false)
  const [refreshing, setRefreshing] = React.useState(false)

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
          bottomSheetRef2.current?.dismiss()
          bottomSheetRef3.current?.dismiss()
        }}

        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const { data: preferences } = useSelector(
    (state: RootState) => state.notificationPreferenceReducer,
  )
  // const [interests, setInterests] = useState([])

  const dispatch = useAppDispatch()
  const [notifications, setNotifications] = useState({
    email_notifications: false,
    sms_notifications: false,
  })

  const [loading, setLoading] = useState(false)

  const [smsLoading, setSmsLoading] = useState(false)

  const handleSmsChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        sms_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const handleEmailChange = async (value: any) => {
    setSmsLoading(true) // Set loading to true when the switch is changed

    await dispatch(
      updateNotificationPrefeference({
        ...preferences,
        dispatch,
        Toast,
        email_notifications: value,
      }),
    )

    setSmsLoading(false) // Set loading back to false after the action (success or failure)
  }

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const { data: interests } = useSelector(
    (state: RootState) => state.getCategoryInterstsReducer,
  )

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

  const clearStorage = async () => {
    await AsyncStorage.multiRemove([
      'accessToken',
      'refreshToken',
      'user_id',
      'last_name',
      'first_name',
      'profile_pic',
    ])

    // Restart()
  }

  const deleteProfile = async () => {
    setDeletingProfile(true)
    const _rs = await _fetch({
      method: 'DELETE',
      _url: `/user/deleteprofile/${currentUser.id}`,
    })
    const rs = await _rs.json()

    if (rs.success === true) {
      setDeleteModal(false)
      setDeletingProfile(false)
      navigation.navigate('Default')
      clearStorage()
    }
  }

  function closePinModal() {
    bottomSheetRef3.current?.dismiss()
  }

  function openPinModal() {
    bottomSheetRef3.current?.present()
  }

  function openConfirmPinModal() {
    bottomSheetRef4.current?.present()
  }

  function closeConfirmPinModal() {
    bottomSheetRef4.current?.present()
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  function openVerifyModal() {
    bottomSheetRef2.current?.present()
  }

  function closeVerifyModal() {
    bottomSheetRef2.current?.dismiss()
  }

  const { isLoading, isError, data } = useQuery({
    queryKey: ['user-profile'],
    queryFn: getUserProfile,
    refetchOnMount: 'always',
  })

  // const getInterests = async () => {
  //   await _fetch({
  //     method: 'GET',
  //     _url: `/user/category-interest`,
  //   })
  //     .then((rs) => rs.json())
  //     .then((rs) => setInterests(rs.data))
  // }

  useEffect(() => {
    dispatch(notificationPreferences())
    dispatch(getCategoryIntersts())
  }, [])

  useEffect(() => {
    // getInterests()
    getUserId({ setFirstName, setLastName, setProfilePic, dispatch, setUserId })
  }, [userId])

  const onRefresh = React.useCallback(() => {
    // dispatch(myErrandList({ setSearchedErrand }))
    getUserProfile()
    // getInterests()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  function openSettingsModal() {
    bottomSheetRef4.current?.present()
  }

  // console.log(">>>interests", interests);

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

  return (
    <>
      <ScreenHeader
        navigation={navigation}
        textTheme={textTheme}
        screen={'Settings'}
        openSettingsModal={openSettingsModal}
      />
      <BottomSheetModalProvider>
        {/* <View>
          <View
            className="bg-purple-200 h-[160px] w-screen shadow-md"
            style={{ borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }}
          >
            <View
              className="bg-[#09497D] h-[150px] pt-[70px] px-6 pb-3 pl-[27px]"
              style={{
                borderBottomLeftRadius: 70,
                borderBottomRightRadius: 70,
              }}
            >
              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between '
                    : 'flex-row items-center justify-between'
                }
              >
                <View className="flex-row items-center mt-2">
                  <TouchableOpacity
                    className=" items-center justify-between mr-8 py-3 "
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons
                      name="chevron-back-outline"
                      size={24}
                      color="white"
                    />
                  </TouchableOpacity>

                  <Text
                    className="text-white text-xl font-medium"
                    style={{ fontFamily: 'Chillax' }}
                  >
                    Settings
                  </Text>
                </View>

                <View className="items-center flex-row gap-2">
                  <TouchableOpacity>
                    <Text style={{ color: textTheme }}>
                      <Ionicons
                        name="settings-outline"
                        size={22}
                        color={'white'}
                        style={{ marginLeft: 7 }}
                      />
                    </Text>
                  </TouchableOpacity>

                  <Text style={{ color: textTheme }} className="mr-4">
                    <FontAwesome
                      name="bell-o"
                      size={22}
                      color={'white'}
                      onPress={() => {
                        navigation.navigate('Notification')
                      }}
                    />
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View> */}

        <SafeAreaView>
          <ScrollView
            style={{ backgroundColor: backgroundTheme }}
            className="bg-[#F8F9FC] mb-10"
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <View
              className={
                Platform.OS === 'android'
                  ? 'flex-row items-center justify-between '
                  : 'flex-row items-center justify-between'
              }
            >
              {/* <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={{ marginLeft: 20 }}
                className="flex-row items-center justify-between my-3"
              >
                <ProfileInitials
                  firstName={currentUser?.first_name.charAt(0).toUpperCase()}
                  lastName={currentUser?.last_name.charAt(0).toUpperCase()}
                  profile_pic={currentUser?.profile_picture}
                  textClass="text-white text-base"
                  width={30}
                  height={30}
                />
              </TouchableOpacity> */}

              <LoadingModal visible={smsLoading} />
              {/* 
              <Text
                className="font-bold text-[20px] leading-7"
                style={{ color: textTheme }}
              >
                Settings
              </Text> */}

              <View className="items-center flex-row gap-4 mr-2">
                {/* <Text style={{ color: textTheme }}>
                  <FontAwesome
                    name="bell-o"
                    size={24}
                    onPress={() => {
                      navigation.navigate('Notification')
                    }}
                  />
                </Text> */}
                {/* <TouchableOpacity onPress={openMoreModal}>
                  <Text style={{ color: textTheme }}>
                    <Entypo name="dots-three-vertical" size={24} />
                  </Text>
                </TouchableOpacity> */}
              </View>
            </View>

            <View className=" mt-6 px-4">
              {/* <View className=" h-[88px] mt-1 border-b-[#CCCCCC] border-b-[1px]"> */}
              <View className="flex-row justify-between items-center">
                <View className="flex-row space-x-4 ">
                  {/* {data?.data?.profile_picture ? (
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
                    )} */}
                  {/* <View className="mt-2">
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
                    </View> */}
                </View>

                {/* </View> */}
              </View>

              <SettingsContent navigation={navigation} />

              <SettingsTest
                openVerifyModal={openVerifyModal}
                loader={smsLoading}
              />

              <SettingsCategory navigation={navigation} interests={interests} />

              <View className="mt-8 ml-4">
                <Text
                  style={{ color: textTheme }}
                  className="pb-2 text-base font-bold leading-6"
                >
                  REFERRAL CODE
                </Text>
              </View>

              <View className="flex-row items-center py-3 pl-2 pr-2 mx-2 bg-[#fefefe] rounded-[10px]">
                <TouchableOpacity
                  className="bg-[#f3f3f3] flex-row items-center py-2 pl-3 pr-4 rounded-[10px]"
                  style={{ gap: 14 }}
                  onPress={() => copyToClipboard(data?.data?.referral_code)}
                >
                  <Text
                    className="text-sm text-[#09497D]"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    {data?.data?.referral_code}
                  </Text>
                  <Text
                    className="text-[#888686] text-xs"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Tap to copy code
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="ml-6 bg-[#09497D] py-2 px-2 rounded-[15px]">
                  <Text className="text-white">Share</Text>
                </TouchableOpacity>
              </View>

              {/* <View
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

                {/* <View className=" h-[44px] mt-5 border-b border-b-[#AAAAAA]">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-base"
                    >
                      Share Via Email
                    </Text>
                  </View>
                </View>

               

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
              </View> */}

              <View className="mt-10 ml-4">
                <Text
                  style={{ color: textTheme }}
                  className="pb-2 text-base font-bold leading-6"
                >
                  Email Notifications
                </Text>
              </View>

              <View
                style={{ backgroundColor: theme ? '#152955' : 'white' }}
                className=" h-[100px] bg-[#ECF0F8] px-4 mt-5 rounded-md pb-4"
              >
                <View className=" h-[63px]  mt-5">
                  <View className="flex-row items-center justify-between">
                    <Text
                      style={{ color: textTheme }}
                      className="font-medium text-[18px]"
                    >
                      Send Email notifications
                    </Text>

                    <Switch
                      trackColor={{ false: '#767577', true: '#09497D' }}
                      value={preferences?.email_notifications}
                      onValueChange={(value: boolean) => {
                        setLoading(true)
                        // dispatch(
                        //   updateNotificationPrefeference({
                        //     ...preferences,
                        //     dispatch,
                        //     Toast,
                        //     email_notifications: value,
                        //   }),
                        // )
                        handleEmailChange(value)
                      }}
                      style={{
                        transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
                      }}
                    />
                  </View>

                  <View className=" mt-2 py-1 w-[80px] rounded-lg">
                    <View
                      className={
                        preferences?.email_notifications
                          ? 'text-sm bg-green-300 rounded-lg p-1 mb-1'
                          : ' bg-red-300 rounded-lg p-1 mb-1'
                      }
                    >
                      <Text className="text-xs text-center">
                        {preferences?.email_notifications
                          ? 'Enabled'
                          : 'Disabled'}{' '}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              <View className="mt-10 ml-4">
                <Text
                  style={{ color: textTheme }}
                  className="pb-2 text-base font-bold leading-6"
                >
                  Actions
                </Text>
              </View>

              <View
                style={{ backgroundColor: theme ? '#152955' : 'white' }}
                className="  bg-[#ECF0F8] px-4 rounded-md pb-8 mb-48"
              >
                <TouchableOpacity className="flex-row items-center justify-between mt-4">
                  <View className="flex-row items-center">
                    <Text
                      className="text-base text-[#444444] mr-3"
                      style={{ fontFamily: 'Axiforma' }}
                    >
                      <MaterialCommunityIcons
                        name="flag-outline"
                        size={20}
                        color="black"
                      />
                    </Text>
                    <Text
                      className="text-base text-[#444444]"
                      style={{ fontFamily: 'Axiforma' }}
                    >
                      Report a problem
                    </Text>
                  </View>

                  <View>
                    <AntDesign name="right" size={20} color="black" />
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className=" h-[63px]  mt-4"
                  onPress={() => setDeleteModal(true)}
                >
                  <View className=" mt-2 py-1 flex-row items-center justify-between rounded-lg">
                    <View className="flex-row items-center">
                      <AntDesign name="delete" color="red" size={24} />

                      <Text
                        className="text-base text-[#444444] ml-3"
                        style={{ fontFamily: 'Axiforma' }}
                      >
                        Delete My Account
                      </Text>
                    </View>

                    <View>
                      <AntDesign name="right" size={24} color="black" />
                    </View>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  className="flex-row items-center justify-between"
                  onPress={() => {
                    navigation.navigate('Login')
                    clearStorage()
                  }}
                >
                  <View className="flex-row items-center">
                    <Text
                      className="text-base text-[#444444] mr-3"
                      style={{ fontFamily: 'Axiforma' }}
                    >
                      <MaterialIcons name="logout" size={20} color="black" />
                    </Text>
                    <Text
                      className="text-base text-[#444444]"
                      style={{ fontFamily: 'Axiforma' }}
                    >
                      Log out
                    </Text>
                  </View>

                  <View>
                    <AntDesign name="right" size={20} color="black" />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            <Modal visible={deleteModal} transparent={true}>
              <View style={styles.modalContainer}>
                <Text className="px-8 text-base text-center text-white">
                  We are sorry to see you leave. Are you sure you want to delete
                  your account?
                </Text>

                <View className="flex-row space-x-4 mt-6">
                  <TouchableOpacity
                    className="bg-[#1E3A79] h-12 px-3 flex-row justify-center items-center rounded-lg"
                    onPress={() => {
                      setDeleteModal(false)
                    }}
                  >
                    <Text className="text-white text-base">
                      {loading ? (
                        <ActivityIndicator size="small" color="#000000" />
                      ) : (
                        'No, I change my mind'
                      )}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="bg-red-500 h-12 px-3 flex-row justify-center items-center rounded-lg"
                    onPress={() => {
                      deleteProfile()
                    }}
                  >
                    <Text className="text-white text-base">
                      {deletingProfile ? (
                        <ActivityIndicator size="small" color="#000000" />
                      ) : (
                        'Yes, please'
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  onPress={() => setDeleteModal(false)}
                  style={styles.closeButton}
                >
                  {/* You can use a close icon or text */}
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </ScrollView>
        </SafeAreaView>

        <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bottomSheetRef1}
          index={0}
          snapPoints={['55%']}
          backdropComponent={renderBackdrop}
        >
          <Content navigation={navigation} />
        </BottomSheetModal>
        <BottomSheetModal
          // backdropComponent={renderBackdrop}
          ref={bottomSheetRef2}
          index={0}
          snapPoints={['50%']}
          backdropComponent={renderBackdrop}
          keyboardBehavior="extend"
          enablePanDownToClose
          keyboardBlurBehavior="restore"
        >
          <VerifyPassword
            closeVerifyModal={closeVerifyModal}
            openConfirmPinModal={openConfirmPinModal}
            openPinModal={() => {}}
          />
        </BottomSheetModal>

        {/* i am using the same pin modal component to confirm and change the pin */}

        {/* for changing the pin */}
        <BottomSheetModal
          ref={bottomSheetRef3}
          index={0}
          snapPoints={['55%']}
          backdropComponent={renderBackdrop}
          keyboardBehavior="extend"
          enablePanDownToClose
          keyboardBlurBehavior="restore"
        >
          <PinModal
            createErrand={false}
            submitErrandhandler={() => {}}
            closePinModal={closePinModal}
            makeWithdrawalHandler={() => {}}
          />
        </BottomSheetModal>

        {/* for confirming pin */}
        <BottomSheetModal
          ref={bottomSheetRef4}
          index={0}
          snapPoints={['50%']}
          containerStyle={{
            marginHorizontal: 10,
          }}
          backdropComponent={renderBackdrop}
        >
          <ConfirmPinModal
            openPinModal={openPinModal}
            closeConfirmPinModal={closeConfirmPinModal}
          />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },

  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
})
