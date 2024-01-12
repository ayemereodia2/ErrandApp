import { AntDesign, Feather, FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react'

import {
  ActivityIndicator,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import UserProfile from '../../components/UsersProfile/UserProfile'
import UserVerification from '../../components/UsersProfile/UserVerification'
import { _fetch } from '../../services/axios/http'

import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Restart } from 'fiction-expo-restart'
import { useSelector } from 'react-redux'
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

  function openEmailModal() {
    bottomSheetRef.current?.present()
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

  const snapPoints = useMemo(() => ['76%'], [])
  const snapPoints1 = useMemo(() => ['88%'], [])
  const snapPoints2 = useMemo(() => ['90%'], [])
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

  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: true,
  //     headerTitleStyle: { color: textTheme },
  //     title: 'My Profile',
  //     headerStyle: { backgroundColor: backgroundTheme },
  //     headerLeft: () => (
  //       <TouchableOpacity
  //         className="flex-row items-center justify-between mx-0 py-3 mr-6"
  //         onPress={() => navigation.goBack()}
  //       >
  //         <AntDesign name="arrowleft" size={24} color={textTheme} />
  //       </TouchableOpacity>
  //     ),
  //     headerRight: () => (
  //       <View className="flex-row items-center justify-between mx-3 py-3 space-x-3 ">
  //         <Feather
  //           onPress={() => navigation.navigate('Contact')}
  //           color={textTheme}
  //           size={24}
  //           name="help-circle"
  //         />
  //       </View>
  //     ),
  //   })
  // }, [])

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

    // console.log(">>>>>>>>>hello", data)

    // setIsLoading(false)

    // setData(data)
  }

  // const { isLoading, isError, data } = useQuery({
  //   queryKey: ['user-profile'],
  //   queryFn: getUserProfile,
  //   refetchOnMount: 'always',
  // })
  // console.log(data)

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
    <View>
    <View className='bg-purple-200 h-[160px] w-screen shadow-md' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
      <View className='bg-[#09497D] h-[150px] pt-[70px] px-6 pb-3 pl-[27px]' style={{borderBottomLeftRadius: 70, borderBottomRightRadius: 70}}>
                  <View
                    className={
                      Platform.OS === 'android'
                        ? 'flex-row items-center justify-between mt-6'
                        : 'flex-row items-center justify-between'
                    }
                  >
              <View className='flex-row items-center mt-2'> 
          <TouchableOpacity
              className=" items-center justify-between mr-8 py-3 "
              onPress={() => navigation.goBack()}
            >
          <Ionicons name="chevron-back-outline" size={24} color="white" />
             </TouchableOpacity>
    
             <Text className='text-white text-xl font-medium' style={{fontFamily: 'Chillax'}}>Profile</Text>
                   
             </View>
             
                {/* <Text
                      className="font-bold text-[20px] leading-7"
                      style={{ color: textTheme }}
                    >
                      Welcome, {currentUser?.first_name}
                    </Text> */}
    
                    <View className="items-center flex-row gap-2">
                     
                      <TouchableOpacity
                        // onPress={
                        //   // navigation.navigate('Contact')
                        //   openMoreModal
                        // }
                      >
                        <Text style={{ color: textTheme }}>
                         
                        <Ionicons
                        name="settings-outline"
                        size={22}
                        color={'white'}
                        style={{ marginLeft: 7 }}
                      />
                        </Text>
                      </TouchableOpacity>
    
                      <Text style={{ color: textTheme }} className='mr-4'>
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
                 </View>

    <SafeAreaView
      style={{ backgroundColor: backgroundTheme }}
      className="h-screen"
    >
      <BottomSheetModalProvider>
        <ScrollView
          style={{ backgroundColor: backgroundTheme }}
          className="bg-white"
        >
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
              style={{ color: '#6D6D6D' , fontFamily: 'Axiforma'}}
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
                  style={{ color: textTheme }}
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
                  style={{ color: textTheme }}
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
                className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
              >
                <Text
                  style={{ color: textTheme }}
                  className="text-base font-medium text-center items-center"
                >
                  {' '}
                  Edit Profile{' '}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Default')
                  clearStorage()
                }}
                className="w-[140px] h-[40px] bg-[#E6E6E6] border border-[#CCC] items-center justify-center rounded-md"
                style={{
                  backgroundColor: theme ? '#1E3A79' : 'white',
                }}
              >
                <Text
                  style={{ color: textTheme }}
                  className="text-base font-medium text-center items-center"
                >
                  {' '}
                  Logout{' '}
                </Text>
              </TouchableOpacity>
            </View>

            <View className="flex-row mr-[16px] mt-8 ml-[16px] md:w-[398px] mx-auto ">
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
            </View>

            {profile ? (
              <UserProfile />
            ) : (
              <UserVerification
                openEmailModal={openEmailModal}
                openGuarantorModal={openGuarantorModal}
                openOfficeModal={openOfficeModal}
                openPersonalId={openPersonalId}
                data={data}
              />
            )}
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
          ref={bottomSheetRef3}
          index={0}
          snapPoints={snapPoints3}
          containerStyle={{ marginHorizontal: 10 }}
          backdropComponent={renderBackdrop}
        >
          <GuarantorModal closeGuarantorModal={closeGuarantorModal} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </SafeAreaView>
    </>
  )
}

export default AccountScreen
