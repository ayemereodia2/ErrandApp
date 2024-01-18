import React, {
  createRef,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

// import AppLoading from 'expo-app-loading';
import {
  AntDesign,
  Entypo,
  Feather,
  FontAwesome,
  Ionicons,
  MaterialIcons,
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
  Animated,
  // Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { State } from 'react-native-gesture-handler'
import { createImageProgress } from 'react-native-image-progress'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import PlaceBidModal from '../../components/Modals/Errands/PlaceBidModal'
import { ProfileInitials } from '../../components/ProfileInitials'
import { userDetails } from '../../services/auth/userInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { formatDate, getAddress } from '../../utils/helper'

export default function ErrandDetails({ route, navigation }: any) {
  const dispatch = useAppDispatch()
  const [showBid, setShowBid] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['74%'], [])
  const [userId, setUserId] = useState('')
  const [showBidBtn, setShowBidBtn] = useState(true)
  const [address, setAddress] = useState('')
  const [selectedImage, setSelectedImage] = useState('')
  const [url, setUrl] = useState('')
  const [panEnabled, setPanEnabled] = useState(false)

  console.log('>>>>>selectedImage', selectedImage)

  const pinchRef = createRef()
  const panRef = createRef()

  const scale = useRef(new Animated.Value(1)).current
  const translateX = useRef(new Animated.Value(0)).current
  const translateY = useRef(new Animated.Value(0)).current

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true },
  )

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true },
  )

  // const { snapToIndex, close } = useBottomSheet();
  const Image = createImageProgress(FastImage)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

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
        onPress={() => closePlaceBid()}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

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

  console.log('>>>>>errandImages', errand.images)

  const renderImage = ({ source, style }) => {
    return (
      <Image
        source={{ uri: source, priority: 'high' }}
        style={style}
        resizeMode="contain"
        indicator={renderLoading}
      />
    )
  }

  const renderLoading = () => {
    return <ActivityIndicator color={'white'} size="large" />
  }

  const budgetInNaira = Number(errand?.budget / Number(100))

  const toggleShowBid = () => {
    setShowBid(!showBid)
  }

  // const reachedScreen = async () => {
  //   await AsyncStorage.setItem("errandDetail")
  // }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,

      headerTitleStyle: { color: textTheme },
      headerLeft: () => (
        <TouchableOpacity
          className="flex-row items-center justify-between mx-0 py-3 mr-6"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color={textTheme} />
        </TouchableOpacity>
      ),
      headerStyle: { backgroundColor: backgroundTheme, color: textTheme },
      title: 'Errand Details',
    })
  }, [navigation])

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

  const handlePinch = Animated.event([{ nativeEvent: { scale } }], {
    useNativeDriver: true,
  })

  const handlePinchStateChange = ({ nativeEvent }) => {
    // enabled pan only after pinch-zoom
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true)
    }

    // when scale < 1, reset scale back to original (1)
    const nScale = nativeEvent.scale
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start()
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start()
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start()

        setPanEnabled(false)
      }
    }
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
        {/* <Image
          style={styles.image}
          className="mx-auto"
          source={require(loaderGif)}
        /> */}
        <ActivityIndicator color={theme ? 'white' : 'blue'} size="large" />
      </SafeAreaView>
    )
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: backgroundTheme }}
        className="bg-[#F8F9FC]"
      >
        <StatusBar
          backgroundColor={backgroundTheme}
          barStyle={theme ? 'light-content' : 'dark-content'}
        />

        <View
          style={{
            flexDirection: 'column-reverse',
            marginBottom: 60,
          }}
        >
          <ScrollView
            scrollEventThrottle={16}
            className={!showBidBtn ? 'mb-10' : ''}
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
                    <View className="p-4 px-6 mt-2">
                      <View className="">
                        <View className="items-center justify-center">
                          <ProfileInitials
                            textClass="text-white text-2xl"
                            firstName={user.first_name}
                            lastName={user.last_name}
                            profile_pic={user.profile_picture}
                            className="w-20 h-20 bg-[#616161] rounded-full text-2xl"
                          />
                          <View className="pt-2">
                            <View className="flex-row space-x-2 items-center justify-center">
                              <Text
                                style={{ color: textTheme }}
                                className="text-center text-base font-semibold"
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
                            {/* <Text
                              style={{ color: textTheme }}
                              className="text-center text-base font-semibold"
                            >
                              {user?.first_name} {user?.last_name}
                            </Text> */}
                            {/* <MaterialIcons
                              name="verified"
                              color="green"
                              size={20}
                            /> */}
                          </View>
                          <Text
                            style={{ color: textTheme }}
                            className="text-[#555555] text-center py-2 text-base font-semibold"
                          >
                            {user.occupation ? user.occupation : 'Swave User'}
                          </Text>
                          <View className="flex-row items-center">
                            {/* {showStars(data.rating)} */}
                            <Text style={{ color: textTheme }}>
                              {user?.rating}
                              <Entypo name="star" size={16} color="#FBB955" />
                            </Text>
                            <Text
                              style={{ color: textTheme }}
                              className="text-[#6D6D6D] text-sm"
                            >
                              ( {user?.errands_completed}
                              {user.errands_completed > 1
                                ? 'errands'
                                : 'errand'}
                              Completed)
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    <View className="pt-6 ">
                      <Text
                        style={{ color: textTheme }}
                        className=" font-bold text-base text-[#555555]"
                      >
                        Description
                      </Text>
                      <Text
                        style={{ color: textTheme }}
                        className="text-sm pt-1 text-[#383737] font-light"
                      >
                        {result}
                      </Text>
                    </View>

                    <View className="pt-6 ">
                      <Text
                        style={{ color: textTheme }}
                        className=" font-bold text-base text-[#555555]"
                      >
                        Share Errand
                      </Text>
                      <View className="border-[1px] border-[#ccc] rounded-lg p-2 px-4 flex-row justify-between mt-1">
                        <Text
                          style={{ color: textTheme }}
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

                    <View className="pt-6 ">
                      <Text
                        style={{ color: textTheme }}
                        className=" font-bold text-base text-[#555555]"
                      >
                        This errand pays
                      </Text>

                      <View className="flex-row items-center">
                        <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
                          <Text className="text-[#642B02] text-base font-bold">
                            &#x20A6; {budgetInNaira.toLocaleString()}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View className="space-y-3 mt-3">
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
                    </View>

                    <Text
                      style={{ color: textTheme }}
                      className="pr-6 mt-8 font-bold text-base text-[#555555]"
                    >
                      Other Resources
                    </Text>

                    <View className="flex-row space-x-4 mt-4">
                      {errand?.images?.map((image, index) => (
                        <View className="">
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

                    <Modal
                      visible={selectedImage !== ''}
                      transparent={true}
                      animated
                    >
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

                      <TouchableOpacity
                        onPress={() => setSelectedImage('')}
                        style={styles.closeButton}
                      >
                        <Text style={styles.closeButtonText}>Close</Text>
                      </TouchableOpacity>
                      {/* </View> */}
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
          </ScrollView>
        </View>

        {errand.user_id !== userId && errand?.status !== 'completed' ? (
          <TouchableOpacity
            className="w-full h-[60px] absolute bottom-0 flex-row justify-center items-center bg-[#1E3A79]"
            onPress={() => {
              openPlaceBid()
              dispatch(userDetails({ user_id: userId }))
              setShowBidBtn(false)
            }}
          >
            <Text className="text-white text-lg font-medium">
              I can do this
            </Text>
          </TouchableOpacity>
        ) : errand.user_id !== userId && errand?.status === 'completed' ? (
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
    width: '100%',
    height: '100%',
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
