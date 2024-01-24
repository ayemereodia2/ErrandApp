import {
  Feather,
  FontAwesome,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ActivityIndicator,
  BackHandler,
  Image,
  Platform,
  Pressable,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { SelectList } from 'react-native-dropdown-select-list'
import Modal from 'react-native-modal'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'

import { NotificationCard } from '../../components/Notifications'
import PostErrandButton from '../../components/PostErrandBtn'
import UrgentErrandCard from '../../components/UrgentErrandCard'
import { currentUserDetails } from '../../services/auth/currentUserInfo'
import { _fetch } from '../../services/axios/http'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { getNotifications } from '../../services/notification'
import { RootState, useAppDispatch } from '../../services/store'
import CategoryInterestModal from '../Modal/CategoryInterestModal'

type LocationProp = {
  city: string
  country: string
  lga: string
  id: string
  state: string
}

type TextProp = {
  name: string
}

type SelectProp = {
  key: string
  value: string
}

const CategeryText = ({ name }: TextProp) => {
  return (
    <Text
      className="mt-2 mb-2 font-medium text-[12px] w-[68px] text-center "
      style={{
        color: '#787C82',
        fontFamily: 'Axiforma',
      }}
    >
      {name}
    </Text>
  )
}

const Home = ({ navigation }: any) => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['50%'], [])
  const snapPoints1 = useMemo(() => ['80%'], [])
  const [verifiedPin, setVerifiedPin] = useState(true)
  const [refreshing, setRefreshing] = React.useState(false)
  const flatListRef = useRef<any>(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const [states, setStates] = useState([])
  const [locations, setLocations] = useState<LocationProp[]>([])
  const [lgas, setLgas] = useState([])
  const [selected, setSelected] = React.useState('')
  const [selectedlga, setSelectedLga] = useState('')
  const [selectedId, setSelectedId] = useState('')
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [showLocationModal, setShowLocationModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [index, setIndex] = React.useState(0)
  const [market, setMarket] = useState([])
  const [checked, setChecked] = useState(false)
  const dispatch = useAppDispatch()

  function openMoreModal() {
    bottomSheetRef1.current?.present()
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

  const { data: currentUser, textTheme } = useSelector(
    (state: RootState) => state.currentUserDetailsReducer,
  )

  const { notifications, loading: loadingNotification } = useSelector(
    (state: RootState) => state.notifications,
  )

  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const getMarket = async () => {
    const _rs = await _fetch({
      method: 'GET',
      _url: `/errand/market`,
    })
    return await _rs.json()
  }

  const {
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

  const { isLoading, data, isError } = useQuery({
    queryKey: ['get-category'],
    queryFn: getCategory,
    refetchOnMount: 'always',
  })

  const getLocations = async () => {
    const rs = await _fetch({
      method: 'GET',
      _url: `/location/all`,
    })
      .then((rs) => rs.json())
      .then((data) => data.data)

    setLocations(rs)
    const states = rs.map((l: LocationProp) => l.state)
    const allStates = [...new Set(states)].map((l) => {
      return {
        key: l,
        value: l,
      }
    })
    setStates(allStates)
  }

  const onRefresh = React.useCallback(() => {
    getCategory()
    getMarket()
    getNotifications({ userId: currentUser.id })
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 500)
  }, [])

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      className="border-[#aaa] border h-[150px] w-[150px] justify-center  rounded-xl mr-2 bg-white"
      style={{
        backgroundColor: theme ? '#1E3A79' : 'white',
      }}
      onPress={() => {
        dispatch(getDraftErrand())
        navigation.navigate('LandingForm', { category: item })
      }}
      key={item.id}
    >
      {/* Your existing content inside TouchableOpacity */}
      {getCategoryIcon(item.name)}

      <Text
        className="text-sm font-semibold text-center mt-5"
        style={{ color: textTheme }}
      >{`${item.description}`}</Text>
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

  useEffect(() => {
    // checkPinIsVerified()
    // getNotifications()
    // getLocations()
  }, [])

  // console.log('>>>>>selectedLga', selectedlga)

  const findLga = () => {
    const lga = locations
      .filter((l) => {
        if (l.state === selected) return l
      })
      .map((l) => {
        return {
          key: l.id,
          value: l.lga,
        }
      })
    setLgas(lga)
  }

  const saveLocation = async () => {
    setLoading(true)
    await _fetch({
      method: 'PATCH',
      _url: `/user/ci-location`,
      body: { ci_location: selectedId },
    })
      .then((rs) => rs.json())
      .then((rs) => {
        if (rs.success === true) {
          setLoading(false)
          Toast.show({
            type: 'success',
            text1: 'Categories has been added successfully',
          })

          setShowCategoryModal(true)
          setShowLocationModal(false)
        }
      })
  }

  useEffect(() => {
    findLga()
  }, [selected])

  useEffect(() => {
    const lga: SelectProp | any = lgas.find(
      (l: SelectProp) => l.value === selectedlga,
    )
    setSelectedId(lga?.key)
  }, [selectedlga])

  const checkPinIsVerified = async () => {
    const isAuthenticated = await AsyncStorage.getItem('accessToken')
    const user_id = (await AsyncStorage.getItem('user_id')) || ''
    const ci_location = await AsyncStorage.getItem('ci_location')
    dispatch(currentUserDetails({ user_id }))
    // if (
    //   ci_location !== 'true' &&
    //   isAuthenticated
    // ) {
    //   setShowLocationModal(true)
    // }
  }

  useEffect(() => {
    dispatch(getNotifications({ userId: currentUser.id }))
  }, [currentUser.id])

  useEffect(() => {
    checkPinIsVerified()
  }, [])

  const onSwiped = () => {
    setIndex(index + 1)
  }

  return (
    <>
      <View className="bg-[#F2F2F2]">
        <View
          className="bg-purple-200 h-[185px] w-screen shadow-md"
          style={{ borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }}
        >
          <SafeAreaView
            className="bg-[#09497D] h-[180px] pt-[26px] px-6"
            style={{ borderBottomLeftRadius: 70, borderBottomRightRadius: 70 }}
          >
            <View className="flex-row justify-between items-center">
              <Image
                source={require('../../assets/images/swave-log-web.png')}
                alt={'logo'}
              />

              <View className="items-center flex-row gap-4">
                <TouchableOpacity
                  onPress={
                    // navigation.navigate('Contact')
                    openMoreModal
                  }
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

                <Text style={{ color: textTheme }} className="">
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

            <View className="mt-10">
              <View className="flex-row items-center ">
                {currentUser?.profile_picture !== null ? (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <Image
                      source={{ uri: currentUser.profile_picture }}
                      className="h-[60px] w-[60px] rounded-[60px]"
                      alt={'logo'}
                    />
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('Profile')}
                  >
                    <View className="bg-white h-[60px] w-[60px] rounded-[60px] flex-row justify-center items-center">
                      <Text className="text-black text-4xl ">
                        {currentUser.first_name.charAt(0).toUpperCase()}
                        {currentUser.last_name.charAt(0).toUpperCase()}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}

                <View className="ml-4">
                  <Text
                    style={{ fontFamily: 'Chillax-Medium' }}
                    className="text-white text-[22px] leading-[38.4px]"
                  >
                    Welcome!
                  </Text>

                  <Text
                    className="font-normal text-[14px] capitalize  leading-[25px] text-white"
                    // style={{ color: textTheme }}
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    {currentUser?.first_name} {currentUser?.last_name} 👋
                  </Text>
                </View>
              </View>
            </View>
          </SafeAreaView>
        </View>
      </View>

      <View className="w-screen flex-1 h-[100%] bg-[#F2F2F2]">
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
              <View className="flex-row items-center justify-center mt-7 space-x-4">
                <TouchableOpacity
                  onPress={() => navigation.navigate('Market')}
                  className="border-[0.6px] p-1.5 rounded-3xl px-5 shadow-xl shadow-[#09497D1A] border-[#09497D80] "
                  style={{ backgroundColor: '#fff' }}
                >
                  <Text
                    className="text-[12px] text-[#09497D] text-center items-center"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Find an errand <Feather name="arrow-up-right" size={14} />
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('MyErrands')}
                  className="border-[0.6px] p-1.5 rounded-3xl px-5 shadow-xl shadow-[#575656] border-[#09497D80]"
                  style={{ backgroundColor: '#fff' }}
                >
                  <Text
                    className="text-[12px] text-[#09497D]"
                    style={{ fontFamily: 'Axiforma' }}
                  >
                    Find a Business <Feather name="arrow-up-right" size={14} />
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="mt-10">
                <Text
                  className=" text-[18px] text-[#061737] mb-5 leading-normal ml-6 "
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Errand Categories
                </Text>

                <View className="flex-row items-center flex-wrap ml-6">
                  {data
                    ? data.data
                        .filter((category) => category.name !== 'Any Errand')
                        .map((category: any) => (
                          <>
                            <View key={category.id} className="w-1/4 mb-4 ">
                              <View className="">
                                <TouchableOpacity
                                  className="border-[#aaa] h-[68px] shadow-2xl shadow-[#505050]  w-[68px] justify-center rounded-[20px]  bg-white"
                                  style={{
                                    backgroundColor: 'white',
                                  }}
                                  onPress={() => {
                                    dispatch(getDraftErrand())
                                    navigation.navigate('LandingForm', {
                                      category,
                                    })
                                  }}
                                  key={category.id}
                                >
                                  {category.name ===
                                  'Market / Groceries Shopping' ? (
                                    <Image
                                      source={require('../../assets/images/shopping2.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name === 'Laundry service' ? (
                                    <Image
                                      source={require('../../assets/images/detergent.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name === 'Delivery' ? (
                                    <Image
                                      source={require('../../assets/images/delivery2.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name ===
                                    'Cleaning/home service' ? (
                                    <Image
                                      source={require('../../assets/images/cleaning2.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name === 'General Labour' ? (
                                    <Image
                                      source={require('../../assets/images/labour.jpg')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name ===
                                    'Photo / Video Production ' ? (
                                    <Image
                                      source={require('../../assets/images/photo2.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name === 'Home Teacher' ? (
                                    <Image
                                      source={require('../../assets/images/tutor2.png')}
                                      alt="cart"
                                      className="w-[36px] h-[36px] mx-auto"
                                    />
                                  ) : category.name === 'Any Errand' ? (
                                    <Text
                                      className="text-center"
                                      style={{
                                        color: theme ? 'white' : '#3F60AC',
                                      }}
                                    >
                                      <MaterialCommunityIcons
                                        name="run-fast"
                                        size={40}
                                      />
                                    </Text>
                                  ) : null}
                                </TouchableOpacity>

                                {category.name ===
                                'Market / Groceries Shopping' ? (
                                  <CategeryText name="Shopping" />
                                ) : category.name === 'Laundry service' ? (
                                  <CategeryText name="Laundry" />
                                ) : category.name === 'Delivery' ? (
                                  <CategeryText name="Delivery" />
                                ) : category.name ===
                                  'Cleaning/home service' ? (
                                  <CategeryText name="Cleaning" />
                                ) : category.name === 'General Labour' ? (
                                  <CategeryText name="Labour" />
                                ) : category.name ===
                                  'Photo / Video Production ' ? (
                                  <CategeryText name="Photo" />
                                ) : category.name === 'Home Teacher' ? (
                                  <CategeryText name="Tutor" />
                                ) : null}
                              </View>
                            </View>
                          </>
                        ))
                    : null}

                  <View className="w-1/4 mb-4">
                    <TouchableOpacity
                      className="border-[#aaa] h-[68px] shadow-2xl shadow-[#505050]  w-[68px] justify-center rounded-[20px]  bg-white"
                      onPress={() => {
                        navigation.navigate('CreateErrand')
                      }}
                    >
                      <Text
                        className="text-center"
                        style={{ color: '#3F60AC' }}
                      >
                        <MaterialCommunityIcons
                          name="dots-horizontal-circle"
                          color={'#787C82'}
                          size={30}
                        />
                      </Text>
                    </TouchableOpacity>
                    <CategeryText name="More" />
                  </View>
                </View>
              </View>

              <View className="mt-10 mb-14">
                <Text
                  className="ml-6 text-[18px] font-medium text-[#061737] mb-5 leading-normal"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  Urgent Errands
                </Text>

                <View className="mx-5 mb-28">
                  <Swiper
                    cards={marketData ? marketData?.data : []}
                    cardIndex={index}
                    renderCard={(card) => (
                      <UrgentErrandCard
                        card={card}
                        isLoading={loadingMarket}
                        navigation={navigation}
                      />
                    )}
                    onSwiped={onSwiped}
                    stackSize={2}
                    stackScale={12}
                    stackSeparation={10}
                    cardHorizontalMargin={0}
                    cardVerticalMargin={0}
                    disableTopSwipe
                    disableBottomSwipe
                    infinite={true}
                    backgroundColor="transparent"
                  />
                </View>
              </View>

              <View className="mt-48 mb-6 px-6 flex-row justify-between  ">
                <Text
                  className=" text-[18px] font-medium text-[#061737] leading-normal"
                  style={{ fontFamily: 'Chillax-Medium' }}
                >
                  You may have missed
                </Text>

                <Text
                  className=" text-[18px] font-medium text-[#09497D] leading-normal underline"
                  style={{ fontFamily: 'Chillax-Medium' }}
                  onPress={() => {
                    navigation.navigate('Notification')
                  }}
                >
                  See all
                </Text>
              </View>

              <NotificationCard
                data={notifications}
                isLoading={loadingNotification}
              />

              <Modal
                onBackdropPress={() => {
                  setShowLocationModal(false)
                }}
                isVisible={showLocationModal}
              >
                {/* <View style={styles.modalContainer}> */}
                <View className="bg-white text-black w-full rounded-lg px-4 py-10 ">
                  <View>
                    <Text className="text-center text-base pb-2">
                      Select the city that you are currently in
                    </Text>

                    <Pressable
                      onPress={() => {
                        // console.log('.....ttocjed')
                      }}
                    >
                      <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={states}
                        save="value"
                        dropdownShown={false}
                      />
                    </Pressable>
                  </View>

                  {selected ? (
                    <View className="mt-4">
                      <Text className="text-center text-base py-2">
                        Select the lga that you are currently in
                      </Text>

                      <SelectList
                        setSelected={(val) => {
                          setSelectedLga(val)
                        }}
                        data={lgas}
                        save="value"
                        dropdownShown={false}
                      />
                    </View>
                  ) : (
                    ''
                  )}

                  <View className="flex-row items-center justify-center space-x-3 mt-3">
                    <TouchableOpacity
                      disabled={!selectedId}
                      onPress={() => saveLocation()}
                      className={`bg-[#1E3A79] p-3 rounded-lg mt-2 w-1/2 ${
                        !selectedId ? 'bg-[#909398]' : 'bg-[#1E3A79]'
                      }`}
                    >
                      <Text className="text-white text-center">
                        {' '}
                        {loading ? (
                          <ActivityIndicator size="small" color="#000000" />
                        ) : (
                          'Save'
                        )}
                      </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      onPress={() => {
                        setShowLocationModal(false)
                        setShowCategoryModal(true)
                      }}
                      className="border border-red-500 p-3 rounded-lg mt-2  w-1/2 "
                    >
                      <Text className="text-red-600 text-center">Skip</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* </View> */}
              </Modal>

              <Modal isVisible={showCategoryModal}>
                <View style={styles.modalContainer}>
                  <View className="bg-white text-black w-[350px] mx-10 rounded-lg px-4 py-10 ">
                    <CategoryInterestModal
                      setShowCategoryModal={setShowCategoryModal}
                    />
                  </View>
                </View>
              </Modal>
            </ScrollView>

            <BottomSheetModal
              ref={bottomSheetRef1}
              index={0}
              snapPoints={snapPoints1}
              containerStyle={{
                marginHorizontal: 10,
              }}
              backdropComponent={renderBackdrop}
            >
              <Content navigation={navigation} />
            </BottomSheetModal>
          </View>
        </BottomSheetModalProvider>
      </View>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
})

export default Home
