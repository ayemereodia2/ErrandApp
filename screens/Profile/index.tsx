import { MaterialIcons } from '@expo/vector-icons'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import UserVerification from '../../components/UsersProfile/UserVerification'
import { _fetch } from '../../services/axios/http'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Restart } from 'fiction-expo-restart'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import ScreenHeader from '../../components/ScreenHeader'
import EmailModal from '../../components/VerificationModals/EmailModal'
import GuarantorModal from '../../components/VerificationModals/GuarantorModal'
import OfficeAddressModal from '../../components/VerificationModals/OfficeAddressModal'
import PersonalId from '../../components/VerificationModals/PersonalId'
import { RootState, useAppDispatch } from '../../services/store'

interface AccountScreenProp {
  navigation: any
  route: any
}

const AccountScreen = ({ route, navigation }: AccountScreenProp) => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [profile, setProfile] = useState(true)
  // const [data, setData] = useState<any>()
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useAppDispatch()
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)
  const bottomSheetRef3 = useRef<BottomSheetModal>(null)
  const bottomSheetRef4 = useRef<BottomSheetModal>(null)

  function openEmailModal() {
    bottomSheetRef.current?.present()
  }

  function openSettingsModal() {
    bottomSheetRef4.current?.present()
  }

  function closeEmailModal() {
    bottomSheetRef.current?.dismiss()
  }

  function openPersonalId() {
    bottomSheetRef1.current?.present()
  }

  function closePersonalId() {
    bottomSheetRef1.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          bottomSheetRef.current?.dismiss()
          bottomSheetRef1.current?.dismiss()
          bottomSheetRef2.current?.dismiss()
          bottomSheetRef3.current?.dismiss()
          bottomSheetRef4.current?.dismiss()
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  function openOfficeModal() {
    bottomSheetRef2.current?.present()
  }

  function closeOfficeModal() {
    bottomSheetRef2.current?.dismiss()
  }

  function openGuarantorModal() {
    bottomSheetRef3.current?.present()
  }

  function closeGuarantorModal() {
    bottomSheetRef3.current?.dismiss()
  }

  const snapPoints = useMemo(() => ['60%'], [])
  const snapPoints1 = useMemo(() => ['70%'], [])
  const snapPoints2 = useMemo(() => ['75%'], [])
  const snapPoints3 = useMemo(() => ['77%'], [])

  const [refreshing, setRefreshing] = React.useState(false)

  const {
    loading,
    data,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = data?.preferred_theme === 'light' ? true : false

  const handleProfile = () => {
    setProfile(false)
  }

  const handleVerification = () => {
    setProfile(true)
  }

  const getUserProfile = async () => {
    // const user_id = await AsyncStorage.getItem('userId') || ''
    // console.log(">>>user_id", user_id);
    // dispatch(currentUserDetails({user_id}))

    setIsLoading(true)
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/profile`,
    })
    const data = await _rs.json()
  }

  const onRefresh = React.useCallback(() => {
    getUserProfile()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [data])

  const clearStorage = async () => {
    await AsyncStorage.multiRemove([
      'accessToken',
      'refreshToken',
      'user_id',
      'last_name',
      'first_name',
      'profile_pic',
    ])

    Restart()
  }

  useEffect(() => {
    getUserProfile()
  }, [])

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
        className="pt-20 bg-gray-200 w-screen h-[100vh]"
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
        screen={'Profile'}
        openSettingsModal={openSettingsModal}
      />

      <BottomSheetModalProvider>
        <ScrollView>
          {/* Top Profile */}

          {data?.profile_picture ? (
            <View className="mt-8 mx-auto">
              <Image
                source={{ uri: data?.profile_picture }}
                className="b rounded-full w-[100px] h-[100px]"
              />
            </View>
          ) : (
            <View className="bg-gray-700 w-[80px] h-[80px] rounded-full items-center justify-center mx-auto mt-8">
              <Text className="text-white font-bold text-center text-2xl">
                {data?.first_name.charAt(0)}
                {data?.last_name.charAt(0)}
              </Text>
            </View>
          )}

          <View>
            <View className="flex-row justify-center items-center mt-5">
              <Text
                style={{ color: '#09497D' }}
                className="text-[18px] font-bold leading-6"
              >
                {data?.first_name} {data?.last_name}{' '}
              </Text>

              {data?.verification === 100 ? (
                <Text>
                  <MaterialIcons name="verified" size={20} color="green" />
                </Text>
              ) : null}
            </View>

            <Text
              style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }}
              className="text-center mt-3 text-base font-medium"
            >
              {data?.occupation ? data?.occupation : 'Swave User'}
            </Text>

            <Text
              style={{ color: '#6D6D6D', fontFamily: 'Axiforma' }}
              className="text-center mt-3 text-base font-medium"
            >
              {data?.phone_number}
            </Text>

            <View className="flex-row mt-5 mx-auto">
              <View className="ml-3">
                <Text
                  style={{ color: '#09497D' }}
                  className="text-center mb-1 font-bold"
                >
                  {data?.errands_posted}
                </Text>
                <Text
                  style={{ color: textTheme }}
                  className="text-center font-light"
                >
                  Total Errands{' '}
                </Text>
              </View>

              <View className="ml-3">
                <Text
                  style={{ color: '#09497D' }}
                  className="text-center mb-1 font-bold"
                >
                  {data?.errands_completed}
                </Text>
                <Text
                  style={{ color: textTheme }}
                  className="text-center font-light"
                >
                  Errands Completed{' '}
                </Text>
              </View>

              <View className="ml-3 ">
                <Text
                  style={{ color: textTheme }}
                  className="text-center mb-1 font-bold"
                >
                  {data?.errands_cancelled}
                </Text>
                <Text
                  style={{ color: textTheme }}
                  className="text-center font-light"
                >
                  Errands Cancelled{' '}
                </Text>
              </View>
            </View>

            {/* Edit BUtton */}
            <View className=" mt-[30px] flex-row justify-center space-x-6">
              <TouchableOpacity
                style={{
                  backgroundColor: theme ? '#1E3A79' : 'white',
                }}
                onPress={() => navigation.navigate('EditProfile', { data })}
                className="px-8 py-3 bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-[50px]"
              >
                <Text
                  style={{ color: '#09497D' }}
                  className="text-base font-medium text-center items-center"
                >
                  {' '}
                  Edit Profile{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="px-8 py-3 bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-[50px]"
                style={{
                  backgroundColor: theme ? '#1E3A79' : 'white',
                }}
                onPress={() => navigation.navigate('FullProfile', {data})}
              >
                <Text
                  style={{ color: '#09497D' }}
                  className="text-base font-medium text-center items-center"
                >
                  View Full profile
                </Text>
              </TouchableOpacity>
            </View>

            {/* <View className="flex-row mr-[16px] mt-8 ml-[16px] md:w-[398px] mx-auto ">
              <TouchableOpacity onPress={handleVerification}>
                <View
                  className="w-[199px] h-[52px] border-b items-center justify-center "
                  style={{
                    borderBottomColor: profile ? '#3F60AC' : '#243763',
                    borderBottomWidth: profile ? 2 : 1,
                  }}
                >
                  <Text
                    className="text-center font-medium"
                    style={{ color: profile ? '#3F60AC' : '#243763' }}
                  >
                    Profile information
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleProfile}>
                <View
                  className="w-[190px] h-[52px] border-b items-center justify-center "
                  style={{
                    borderBottomColor: profile ? '#243763' : '#3F60AC',
                    borderBottomWidth: profile ? 1 : 2,
                  }}
                >
                  <Text
                    className="text-center font-medium"
                    style={{ color: profile ? '#243763' : '#3F60AC' }}
                  >
                    User verification
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}

            {/* {profile ? (
              <UserProfile />
            ) : (
              <UserVerification
                openEmailModal={openEmailModal}
                openGuarantorModal={openGuarantorModal}
                openOfficeModal={openOfficeModal}
                openPersonalId={openPersonalId}
                data={data}
              />
            )} */}
            <UserVerification
              openEmailModal={openEmailModal}
              openGuarantorModal={openGuarantorModal}
              openOfficeModal={openOfficeModal}
              openPersonalId={openPersonalId}
              data={data}
            />
          </View>
        </ScrollView>

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          containerStyle={{ marginHorizontal: 10 }}
          backdropComponent={renderBackdrop}
        >
          <EmailModal closeEmailModal={closeEmailModal} />
        </BottomSheetModal>

        <BottomSheetModal
          ref={bottomSheetRef1}
          index={0}
          snapPoints={snapPoints1}
          containerStyle={{ marginHorizontal: 10 }}
          backdropComponent={renderBackdrop}
        >
          <PersonalId closePersonalId={closePersonalId} />
        </BottomSheetModal>
        <BottomSheetModal
          ref={bottomSheetRef2}
          index={0}
          snapPoints={snapPoints2}
          containerStyle={{ marginHorizontal: 10 }}
          backdropComponent={renderBackdrop}
        >
          <OfficeAddressModal closeOfficeModal={closeOfficeModal} />
        </BottomSheetModal>

        <BottomSheetModal
          ref={bottomSheetRef4}
          index={0}
          snapPoints={['70%']}
          containerStyle={{
            marginHorizontal: 10,
          }}
          backdropComponent={renderBackdrop}
        >
          <Content navigation={navigation} />
        </BottomSheetModal>

        <BottomSheetModal
          ref={bottomSheetRef3}
          index={0}
          snapPoints={snapPoints3}
          containerStyle={{ marginHorizontal: 10 }}
          backdropComponent={renderBackdrop}
        >
          <GuarantorModal closeGuarantorModal={closeGuarantorModal} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </>
  )
}

export default AccountScreen
