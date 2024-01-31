import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

// import AppLoading from 'expo-app-loading';
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
  SimpleLineIcons,
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { ReactNativeZoomableView } from '@openspacelabs/react-native-zoomable-view'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Clipboard from '@react-native-community/clipboard'
import he from 'he'
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import Button from '../../components/Button'
import PlaceBidModal from '../../components/Modals/Errands/PlaceBidModal'
import { ProfileInitials } from '../../components/ProfileInitials'
import ScreenHeader from '../../components/ScreenHeader'
import { userDetails } from '../../services/auth/userInfo'
import { RootState, useAppDispatch } from '../../services/store'
import colors from '../../utils/colors'
import { formatDate, getAddress, getCardTimeAgo } from '../../utils/helper'

const Requirement = ({ name }: any) => {
  return (
    <View className="flex-row items-center border-[0.5px]  border-[#888] bg-[#E2EAF0] rounded-lg  p-1.5">
      <Text
        className="text-xs text-[#09497D] mr-[6px]"
        style={{ fontFamily: 'Axiforma' }}
      >
        <AntDesign name="checkcircleo" size={12} />
      </Text>
      <Text
        className="text-xs text-[#09497D]"
        style={{ fontFamily: 'Axiforma' }}
      >
        {name}
      </Text>
    </View>
  )
}

export default function ErrandDetails({ route, navigation }: any) {
  const dispatch = useAppDispatch()
  const [showBid, setShowBid] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef2 = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => ['74%'], [])
  const [userId, setUserId] = useState('')
  const [showBidBtn, setShowBidBtn] = useState(true)
  const [address, setAddress] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [url, setUrl] = useState('')
  const [panEnabled, setPanEnabled] = useState(false)

  function openSettingsModal() {
    bottomSheetRef2.current?.present()
  }

  const [checked, setChecked] = useState(false)

  const { data: currentUser, backgroundTheme, textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  function openPlaceBid() {
    bottomSheetRef.current?.present()
  }

  function closePlaceBid() {
    bottomSheetRef.current?.dismiss()
  }

  const renderBackdrop = useCallback(
    (props) => (
      <BottomSheetBackdrop
        pressBehavior={'collapse'}
        opacity={0.7}
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        onPress={() => {
          closePlaceBid()
          bottomSheetRef2.current?.dismiss()
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  const handleChecked = () => {
    setChecked(!checked)
  }

  useEffect(() => {
    getAddress({ errand, setAddress })
  }, [])

  const { data: user } = useSelector(
    (state: RootState) => state.externalUserDetailsReducer,
  )

  const { data: owner } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand, loading } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const budgetInNaira = Number(errand?.budget / Number(100))

  const toggleShowBid = () => {
    setShowBid(!showBid)
  }

  const regex = /(<([^>]+)>)/gi
  const result = he.decode(errand.description.replace(regex, ''))

  const getUserId = async () => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    setUserId(userId)
  }

  useEffect(() => {
    getUserId()
  }, [])

  useEffect(() => {
    const b_url = `${process.env.EXPO_PUBLIC_API_URL}`
    const url = b_url.includes('staging')
      ? 'https://staging.swave.ng'
      : `https://swave.ng`
    setUrl(url)
  }, [])

  const handleCopyToClipboard = async (url: string) => {
    Clipboard.setString(url)
    Toast.show({
      type: 'success',
      text1: 'errand link copied successfully',
    })
  }

  if (loading) {
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

  console.log(errand)

  return (
    <BottomSheetModalProvider>
      <ScreenHeader
        openSettingsModal={openSettingsModal}
        screen="Errand Details"
        textTheme={textTheme}
        navigation={navigation}
      />

      <SafeAreaView
        style={{ flex: 1, backgroundColor: backgroundTheme }}
        className="bg-[#F8F9FC]"
      >
        <View
          style={{
            flexDirection: 'column-reverse',
          }}
        >
          <ScrollView
            scrollEventThrottle={16}
            className={!showBidBtn ? 'mb-4' : ''}
          >
            <TouchableNativeFeedback
              onPress={() => {
                setShowBidBtn(true)
                // closePlaceBid()
              }}
            >
              <View>
                {loading ? (
                  <View>
                    <ActivityIndicator size={'large'} />
                  </View>
                ) : (
                  <View className="p-4 px-6">
                    <View className="px-5  rounded-[15px] bg-white mt-5 shadow-lg flex-row  ">
                      <View className="border-r border-[#DBD6D6] w-4/12 py-3">
                        <ProfileInitials
                          textClass="text-white text-3xl"
                          firstName={user.first_name}
                          lastName={user.last_name}
                          profile_pic={user.profile_picture}
                          className="w-20 h-20 bg-[#616161] rounded-full text-2xl"
                        />
                      </View>
                      <View className="rounded-lg pl-4 flex-row items-center">
                        <View className="">
                          <View className=" flex-row">
                            <Text
                              style={{
                                color: '#09497D',
                                fontFamily: 'Chillax-Semibold',
                              }}
                              className="text-lg"
                            >
                              {user?.first_name} {user?.last_name}
                            </Text>
                            {user?.verification === 100 ? (
                              <Text>
                                <MaterialIcons
                                  name="verified"
                                  color="green"
                                  size={20}
                                />
                              </Text>
                            ) : null}
                          </View>
                          <Text
                            style={{
                              fontFamily: 'Chillax-Medium',
                            }}
                            className="text-[#767575] text-[14px]"
                          >
                            {user.occupation ? user.occupation : 'Swave User'}
                          </Text>
                          <View className="flex-row items-center pt-1">
                            <Text
                              style={{
                                fontFamily: 'Chillax-Medium',
                              }}
                              className="text-[#767575] text-[14px]"
                            >
                              <Entypo name="star" size={16} color="#FBB955" />
                              {user?.rating} |{' '}
                              <Text> {getCardTimeAgo(user?.updated_at)} </Text>
                            </Text>
                            {/* <Text
                              style={{ color: textTheme }}
                              className="text-[#6D6D6D] text-sm"
                            >
                              ( {user?.errands_completed}
                              {user.errands_completed > 1
                                ? 'errands'
                                : 'errand'}
                              Completed)
                            </Text> */}
                          </View>
                        </View>
                      </View>
                    </View>

                    <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
                      <View className="mb-2 border-b border-[#DBD6D6]">
                        <Text
                          className="mb-2 text-[16px] text-[#09497D] font-medium"
                          style={{ fontFamily: 'Chillax-Medium' }}
                        >
                          Description
                        </Text>
                      </View>
                      <View className="rounded-lg flex-row justify-between mt-1">
                        <Text
                          style={{ color: textTheme, fontFamily: 'Axiforma' }}
                          className="text-sm  text-[#383737] font-light"
                        >
                          {result}
                        </Text>
                      </View>
                    </View>

                    <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
                      <View className="mb-2 border-b border-[#DBD6D6]">
                        <Text
                          className="mb-2 text-[16px] text-[#09497D] font-medium"
                          style={{ fontFamily: 'Chillax-Medium' }}
                        >
                          Price
                        </Text>
                      </View>
                      <View className="rounded-lg flex-row justify-between mt-1">
                        <Text
                          style={{ color: textTheme, fontFamily: 'Axiforma' }}
                          className="text-sm  font-light"
                        >
                          &#x20A6; {budgetInNaira.toLocaleString()}
                        </Text>
                      </View>
                    </View>

                    <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
                      <View className="mb-5 border-b border-[#DBD6D6]">
                        <Text
                          className="mb-2 text-[16px] text-[#09497D] font-medium"
                          style={{ fontFamily: 'Chillax-Medium' }}
                        >
                          Details
                        </Text>
                      </View>

                      <View className="flex-row justify-between items-center mb-5">
                        <Text
                          className="text-[14px] text-[#888]"
                          style={{ fontFamily: 'Axiforma' }}
                        >
                          Bid
                        </Text>
                        <View className="text-[14px] text-[#09497D] flex-row items-center justify-center">
                          <AntDesign name="arrowup" size={18} color="#888888" />

                          <Text
                            style={{
                              fontFamily: 'Axiforma-Medium',
                              color: colors.DEFAULT_BLUE,
                            }}
                          >
                            {' '}
                            {errand.total_bids}{' '}
                            {errand.total_bids > 1 ? 'Bids' : 'Bid'}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center mb-5">
                        <Text
                          className="text-[14px] text-[#888]"
                          style={{ fontFamily: 'Axiforma' }}
                        >
                          Status
                        </Text>
                        <View className="text-[14px] text-[#09497D] flex-row items-center justify-center">
                          <SimpleLineIcons
                            name="share-alt"
                            size={16}
                            color="#888888"
                          />
                          <Text
                            className="pl-2"
                            style={{
                              fontFamily: 'Axiforma-Medium',
                              color: colors.DEFAULT_BLUE,
                            }}
                          >
                            {errand?.status}
                          </Text>
                        </View>
                      </View>

                      <View className="flex-row justify-between items-center mb-5">
                        <Text
                          className="text-[14px] text-[#888]"
                          style={{ fontFamily: 'Axiforma' }}
                        >
                          Date
                        </Text>
                        <View className="text-[14px] text-[#09497D] flex-row items-center justify-center">
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={'#888888'}
                          />
                          <Text
                            className="pl-2"
                            style={{
                              fontFamily: 'Axiforma-Medium',
                              color: colors.DEFAULT_BLUE,
                            }}
                          >
                            {formatDate(errand.expiry_date)}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className=" px-5 pt-5 pb-4 rounded-[15px] bg-white mt-5  shadow-lg">
                      <View className="mb-2 border-b border-[#DBD6D6]">
                        <Text
                          className="mb-2 text-[16px] text-[#09497D] font-medium"
                          style={{ fontFamily: 'Chillax-Medium' }}
                        >
                          Share Errand
                        </Text>
                      </View>
                      <View className="rounded-lg flex-row justify-between mt-1">
                        <Text
                          style={{ color: textTheme, fontFamily: 'Axiforma' }}
                          className="text-sm  text-[#383737] font-light"
                        >
                          {`${url}/errands?eId=${errand?.id}`}
                        </Text>

                        <Feather
                          onPress={() =>
                            handleCopyToClipboard(
                              `${url}/errands?eId=${errand?.id}`,
                            )
                          }
                          name="copy"
                          size={18}
                        />
                      </View>
                    </View>

                    <View className=" h-[120px] px-3 pt-5 pb-4 rounded-[15px] bg-white mt-5 ">
                      <View className="mb-5 border-b border-[#DBD6D6]">
                        <Text
                          className="mb-2 text-[16px] text-[#09497D] "
                          style={{ fontFamily: 'Chillax-Medium' }}
                        >
                          Requirements
                        </Text>
                      </View>

                      <View className="flex-row items-center justify-between space-x-2 ">
                        <Requirement name="Insurance" />
                        <Requirement name="Qualification" />
                        <Requirement name="Verification" />
                      </View>
                    </View>

                    {/* <View className="space-y-3 mt-3">
                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Status
                        </Text>

                        <Text
                          style={{ color: textTheme }}
                          className="capitalize font-semibold"
                        >
                          {errand?.status}
                        </Text>
                      </View>

                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Date Posted
                        </Text>
                        <Text
                          style={{ color: textTheme }}
                          className=" text-sm text-[#000] w-60 font-semibold"
                        >
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={textTheme}
                          />
                          {formatDate(errand.created_at)}
                        </Text>
                      </View>

                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Deadline
                        </Text>
                        <Text
                          style={{ color: textTheme }}
                          className=" text-sm text-[#000] w-60 font-semibold"
                        >
                          <Ionicons
                            name="calendar-outline"
                            size={18}
                            color={textTheme}
                          />
                          {formatDate(errand.expiry_date)}
                        </Text>
                      </View>

                      <View className="space-x-2 flex-row mt-6">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] w-28 font-medium"
                        >
                          Location
                        </Text>
                        <Text
                          style={{ color: textTheme }}
                          className=" text-sm text-[#000] w-60 font-semibold"
                        >
                          {!address
                            ? errand?.pickup_address?.address_text
                            : address}
                        </Text>
                      </View>

                      <View className="space-x-6 mt-6 flex-row">
                        <Text
                          style={{ color: textTheme }}
                          className=" text-[14px] text-[#999999] font-medium pb-2 w-28"
                        >
                          Requirements
                        </Text>
                        <View className="flex-row space-x-3 w-60">
                          {errand?.has_insurance ? (
                            <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                              <Text className="text-center text-[#3F60AC] text-xs">
                                <FontAwesome
                                  name="check-circle"
                                  size={12}
                                  color={'#3F60AC'}
                                />
                                Insurance
                              </Text>
                            </View>
                          ) : (
                            <Text>No Insurance </Text>
                          )}
                          {errand?.restriction ? (
                            <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                              <Text className="text-center text-[#3F60AC] text-xs flex-row space-x-2">
                                <FontAwesome
                                  className="pr-2"
                                  name="check-circle"
                                  size={12}
                                  color={'#3F60AC'}
                                />
                                <Text> Qualification</Text>
                              </Text>
                            </View>
                          ) : (
                            <Text>No Qualification</Text>
                          )}
                        </View>
                      </View>
                    </View> */}

                    <View className="mt-10 flex-row items-center">
                      <Text
                        style={{ fontFamily: 'Axiforma' }}
                        className="pr-6 font-bold text-lg text-[#0C426F]"
                      >
                        Other Resources
                      </Text>
                    </View>

                    <View
                      className="flex-row space-x-4 mt-5 "
                      // style={{ display: checked ? 'flex' : 'none' }}
                    >
                      {errand?.images?.map((image, index) => (
                        <View className="rounded-2xl">
                          <TouchableOpacity
                            key={index}
                            onPress={() => setSelectedImage(image)}
                          >
                            <Image
                              style={{
                                width: 100,
                                height: 100,
                                borderRadius: 10,
                              }}
                              source={{ uri: image }}
                            />
                          </TouchableOpacity>
                        </View>
                      ))}
                    </View>

                    {errand.user_id !== userId &&
                    errand?.status !== 'completed' ? (
                      <Button
                        className="w-full text-white bg-[#09497D] mt-10 flex-row justify-center items-start py-3.5 rounded-lg mb-5"
                        child={
                          loading ? (
                            <ActivityIndicator size="small" color="white" />
                          ) : (
                            'I can do this'
                          )
                        }
                        onPress={() => {
                          openPlaceBid()
                          dispatch(userDetails({ user_id: userId }))
                          setShowBidBtn(false)
                        }}
                      />
                    ) : (
                      ''
                    )}

                    <Modal
                      visible={selectedImage !== ''}
                      transparent={true}
                      animated
                    >
                      <>
                        <View className='flex-row justify-end pr-6'>
                          <AntDesign
                            onPress={() => setSelectedImage('')}
                            name="closecircle"
                            color="black"
                            size={40}
                            className=""
                          />
                        </View>
                        <ReactNativeZoomableView
                          maxZoom={30}
                          contentWidth={300}
                          contentHeight={150}
                        >
                          <Image
                            source={{ uri: selectedImage }}
                            style={[styles.modalImage]}
                          />
                        </ReactNativeZoomableView>
                      </>
                    </Modal>
                  </View>
                )}
              </View>
            </TouchableNativeFeedback>

            <BottomSheetModal
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              containerStyle={{ marginHorizontal: 0 }}
              backdropComponent={renderBackdrop}
              keyboardBehavior="extend"
              enablePanDownToClose
              keyboardBlurBehavior="restore"
              // android_keyboardInputMode="adjustResize"
            >
              <PlaceBidModal
                owner={owner}
                errand={errand}
                navigation={navigation}
                onSubmit={closePlaceBid}
              />
            </BottomSheetModal>
            <BottomSheetModal
              ref={bottomSheetRef2}
              index={0}
              snapPoints={['55%']}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
            >
              <Content navigation={navigation} />
            </BottomSheetModal>
          </ScrollView>
        </View>

        {errand.user_id !== userId && errand?.status === 'completed' ? (
          <TouchableOpacity
            className="w-full h-[70px] absolute bottom-0 flex-row justify-center items-center bg-[#d8f8e9]"
            disabled={true}
          >
            <Text className="text-black text-lg font-medium">
              This Errand has been completed
            </Text>
          </TouchableOpacity>
        ) : errand.user_id !== userId && errand?.status === 'cancelled' ? (
          <TouchableOpacity
            className="w-full h-[65px] absolute bottom-0 flex-row justify-center items-center bg-red-500"
            disabled={true}
          >
            <Text className="text-white text-lg font-medium">
              This Errand has been completed
            </Text>
          </TouchableOpacity>
        ) : null}
      </SafeAreaView>
    </BottomSheetModalProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    backgroundColor: '#0c1730',
  },
  image: {
    width: 200,
    height: 200,
  },

  _container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalImage: {
    width: '80%',
    height: '80%',
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
