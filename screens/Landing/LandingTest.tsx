import {
  Entypo,
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BackHandler,
  FlatList,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import LandingDetails from '../../components/LandingDetails.tsx/LandingDetails'
import NewNotifications from '../../components/NewNotifications/NewNotifications'
import PostErrandButton from '../../components/PostErrandBtn'
import PinModal from '../../components/VerificationModals/PinModal'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { _fetch } from '../../services/axios/http'
import getDraftErrand from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'

const LandingTest = ({ navigation }: any) => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['50%'], [])
  const snapPoints1 = useMemo(() => ['55%'], [])
  const [verifiedPin, setVerifiedPin] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const flatListRef = useRef<any>(0)
  const [currentIndex, setCurrentIndex] = useState(0)

  function openPinModal() {
    bottomSheetRef.current?.present()
  }

  function closePinModal() {
    bottomSheetRef.current?.dismiss()
  }

  function openMoreModal() {
    bottomSheetRef1.current?.present()
  }

  function closeMoreModal() {
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
        }}
      />
    ),
    [],
  )

  const [clicked, setClicked] = useState(false)
  const dispatch = useAppDispatch()

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
    loading,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const getMarket = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/market?urgent=1`,
      // _url: `/errand/market`,
    })
    return await _rs.json()
  }

  let {
    isLoading: loadingMarket,
    isSuccess: success,
    data: marketData,
  } = useQuery({
    queryKey: ['get-market'],
    queryFn: getMarket,
  })

  const getCategory = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/categories?limit=8`,
    })
    return await _rs.json()
  }

  const getNotifications = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/user/app-notification?count=5`,
    })
    return await _rs.json()
  }

  const {
    isLoading: loadingNotification,
    isSuccess,
    data: notifications,
  } = useQuery({
    queryKey: ['get-notification'],
    queryFn: getNotifications,
    refetchOnMount: 'always',
  })

  const { isLoading, data, isError } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    refetchOnMount: 'always',
  })

  if (data) {
  }

  const onRefresh = React.useCallback(() => {
    // dispatch(myErrandList({ setSearchedErrand }))
    getCategory()
    getMarket()
    getNotifications()
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Increment index for auto-scrolling
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % data?.length)
  //     // Use scrollToIndex to animate scrolling
  //     // flatListRef.current?.scrollToIndex({
  //     //   index: currentIndex,
  //     //   animated: true,
  //     // })
  //     if (flatListRef.current) {
  //       flatListRef.current.scrollToIndex({
  //         index: (currentIndex + 1) % data.data.length,
  //       })
  //     }
  //   }, 3000) // Change the interval time as needed

  //   return () => clearInterval(interval)
  // }, [currentIndex])

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      style={[styles.carouselItem, { backgroundColor: item.backgroundColor }]}
      onPress={() => navigation.navigate('LandingForm', { category: item })}
    >
      <Text style={styles.carouselIcon}>{getCategoryIcon(item.name)}</Text>
      <Text style={[styles.carouselText, { color: item.textColor }]}>
        {item.description}
      </Text>
    </TouchableOpacity>
  )

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Market / Groceries Shopping':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome name="shopping-bag" size={40} />
          </Text>
        )
      case 'Laundry service':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="local-laundry-service" size={40} />
          </Text>
        )
      case 'Delivery':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialCommunityIcons name="truck-delivery" size={40} />
          </Text>
        )
      case 'Cleaning/home service':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="clean-hands" size={40} />
          </Text>
        )
      case 'General Labour':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialIcons name="work" size={40} />
          </Text>
        )
      case 'Photo / Video Production ':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome name="video-camera" size={40} />
          </Text>
        )
      case 'Home Teacher':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <FontAwesome5 name="chalkboard-teacher" size={40} />
          </Text>
        )
      case 'Any Errand':
        return (
          <Text
            className="text-center"
            style={{ color: theme ? 'white' : '#3F60AC' }}
          >
            <MaterialCommunityIcons name="run-fast" size={40} />
          </Text>
        )
    }
  }

  useFocusEffect(() => {
    const onBackPress = () => {
      if (currentUser) {
        return true // Prevent navigation back to the login screen
      }
      return false // Allow navigation back to the login screen
    }

    BackHandler.addEventListener('hardwareBackPress', onBackPress)

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress)
    }
  })

  const checkPinIsVerified = async () => {
    const isPinVerified = await AsyncStorage.getItem('pin')
    const user_id = (await AsyncStorage.getItem('user_id')) || ''

    dispatch(currentUserDetails({ user_id }))
    if (isPinVerified === 'false') {
      openPinModal()
    }
  }

  useEffect(() => {
    checkPinIsVerified()
  }, [])

  // if (loading ) {
  //   return (
  //     <SafeAreaView
  //       style={{
  //         flex: 1,
  //         justifyContent: 'center',
  //         alignItems: 'center',
  //         backgroundColor: backgroundTheme,
  //       }}
  //     >
  //       <ActivityIndicator color={theme ? 'blue' : 'white'} size="large" />
  //     </SafeAreaView>
  //   )
  // }

  return (
    <>
      <SafeAreaView
        className="px-4 w-screen h-[100%]"
        style={{ backgroundColor: backgroundTheme, flex: 1 }}
      >
        <BottomSheetModalProvider>
          <View
            style={{
              flexDirection: 'column-reverse',
              marginBottom: Platform.OS === 'android' ? 75 : 35,
            }}
          >
            <ScrollView
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            >
              <View
                className={
                  Platform.OS === 'android'
                    ? 'flex-row items-center justify-between mt-6'
                    : 'flex-row items-center justify-between'
                }
              >
                <Text
                  className="font-bold text-[20px] leading-7"
                  style={{ color: textTheme }}
                >
                  Welcome, {currentUser?.first_name}
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
                  <TouchableOpacity
                    onPress={
                      // navigation.navigate('Contact')
                      openMoreModal
                    }
                  >
                    <Text style={{ color: textTheme }}>
                      {/* <Feather
                    name="help-circle"
                    size={24}
                    onPress={() => {
                      navigation.navigate('Contact')
                     
                    }}
                  /> */}
                      <Entypo name="dots-three-vertical" size={24} />
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View className="flex-row items-center gap-4 mt-1">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Market')}
                  className="bg-gray-200 px-4 py-1 rounded-xl border border-[#e9ebf2]"
                  style={{ backgroundColor: '#3F60AC' }}
                >
                  <Text
                    className="text-white text-base"
                    style={{ color: theme ? 'white' : 'white' }}
                  >
                    Find an errand
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('MyErrands')}
                  className=" px-4 py-1 rounded-xl border border-[#e9ebf2]"
                  style={{ backgroundColor: '#3F60AC' }}
                >
                  <Text
                    className=" text-base"
                    style={{ color: theme ? 'white' : 'white' }}
                  >
                    Manage your Errands
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-10">
                <Text
                  className=" text-[25px] leading-7 font-bold"
                  style={{ color: textTheme }}
                >
                  What do you need help with?
                </Text>

                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mt-2  w-[90vw]"
                >
                  {data
                    ? data?.data?.map((category: any) => (
                        <>
                          <View className="flex-row mt-3" key={category.id}>
                            <TouchableOpacity
                              className="border-[#aaa] border h-[150px] w-[150px] justify-center  rounded-xl mr-2 bg-white"
                              style={{
                                backgroundColor: theme ? '#1E3A79' : 'white',
                              }}
                              onPress={() => {
                                dispatch(getDraftErrand())
                                navigation.navigate('LandingForm', { category })
                              }}
                              key={category.id}
                            >
                              {category.name ===
                              'Market / Groceries Shopping' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome name="shopping-bag" size={40} />
                                </Text>
                              ) : category.name === 'Laundry service' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons
                                    name="local-laundry-service"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Delivery' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialCommunityIcons
                                    name="truck-delivery"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Cleaning/home service' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons name="clean-hands" size={40} />
                                </Text>
                              ) : category.name === 'General Labour' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialIcons name="work" size={40} />
                                </Text>
                              ) : category.name ===
                                'Photo / Video Production ' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome name="video-camera" size={40} />
                                </Text>
                              ) : category.name === 'Home Teacher' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <FontAwesome5
                                    name="chalkboard-teacher"
                                    size={40}
                                  />
                                </Text>
                              ) : category.name === 'Any Errand' ? (
                                <Text
                                  className="text-center"
                                  style={{ color: theme ? 'white' : '#3F60AC' }}
                                >
                                  <MaterialCommunityIcons
                                    name="run-fast"
                                    size={40}
                                  />
                                </Text>
                              ) : null}

                              <Text
                                className="text-sm font-semibold text-center mt-5"
                                style={{ color: textTheme }}
                              >{`${category.description}`}</Text>
                            </TouchableOpacity>
                          </View>
                        </>
                      ))
                    : null}

                  <View className="flex-row mt-3 ">
                    <TouchableOpacity
                      className="border-[#aaa] border h-[150px] w-[150px] rounded-xl mr-2 bg-white"
                      style={{
                        backgroundColor: theme ? '#1E3A79' : 'white',
                      }}
                      onPress={() => {
                        navigation.navigate('CreateErrand')
                      }}
                    >
                      <Text
                        className="text-sm font-semibold text-center justify-center pt-[40%]"
                        style={{ color: textTheme }}
                      >
                        I need something else...
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>

                <FlatList
                  ref={flatListRef}
                  horizontal
                  data={data}
                  renderItem={renderItem}
                  keyExtractor={(item: any) => item.id.toString()}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  snapToInterval={150} // Adjust as needed
                  decelerationRate="fast"
                  onScroll={(event) => {
                    const contentOffset = event.nativeEvent.contentOffset.x
                    const currentIndex = Math.floor(contentOffset / 150)
                    setCurrentIndex(currentIndex)
                  }}
                />
              </View>

              <View className="mt-12">
                <Text
                  className=" text-[25px] leading-7 font-bold"
                  style={{ color: textTheme }}
                >
                  Urgent Errands
                </Text>

                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <LandingDetails
                    data={marketData}
                    isLoading={loadingMarket}
                    navigation={navigation}
                  />
                </ScrollView>
              </View>

              <View className="mt-6">
                <Text
                  className=" text-[25px] leading-7 font-bold"
                  style={{ color: textTheme }}
                >
                  You may have missed these...
                </Text>
              </View>
              <NewNotifications
                data={notifications}
                isLoading={loadingNotification}
              />
            </ScrollView>

            <BottomSheetModal
              // android_keyboardInputMode="adjustResize"
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
              // keyboardBehavior="extend"
              // enablePanDownToClose
              // keyboardBlurBehavior="restore"
            >
              <PinModal
                createErrand={false}
                submitErrandhandler={() => {}}
                closePinModal={closePinModal}
                makeWithdrawalHandler={() => {}}
              />
            </BottomSheetModal>

            <BottomSheetModal
              // android_keyboardInputMode="adjustResize"
              ref={bottomSheetRef1}
              index={0}
              snapPoints={snapPoints1}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
              // keyboardBehavior="extend"
              // enablePanDownToClose
              // keyboardBlurBehavior="restore"
            >
              <Content navigation={navigation} />
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </SafeAreaView>
      {!loading && <PostErrandButton className="bottom-20 right-3" />}
    </>
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
  carouselItem: {
    height: 150,
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  carouselIcon: {
    fontSize: 40,
    marginBottom: 5,
  },
  carouselText: {
    fontSize: 12,
    textAlign: 'center',
  },
})

export default LandingTest
