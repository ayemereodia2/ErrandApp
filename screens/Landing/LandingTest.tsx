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
import { useFocusEffect } from '@react-navigation/native'
import { useQuery } from '@tanstack/react-query'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  BackHandler,
  Dimensions,
  FlatList,
  Modal,
  Platform,
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import Content from '../../components/AboutContent/Content'
import LandingDetails from '../../components/LandingDetails.tsx/LandingDetails'
import NewNotifications from '../../components/NewNotifications/NewNotifications'
import PostErrandButton from '../../components/PostErrandBtn'
import { _fetch } from '../../services/axios/http'
import { getDraftErrand } from '../../services/errands/getDraftErrand'
import { RootState, useAppDispatch } from '../../services/store'

type LocationProp = {
  city: string
  country: string
  lga: string
  id: string
  state: string
}

type SelectProp = {
  key: string
  value: string
}

const LandingTest = ({ navigation }: any) => {
  const loaderGif = '../../assets/images/loading-SWAVE.gif'
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const bottomSheetRef1 = useRef<BottomSheetModal>(null)
  const snapPoints1 = useMemo(() => ['55%'], [])
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

  useEffect(() => {
    if (data?.data?.length > 0) {
      const scrollInterval = setInterval(() => {
        // Calculate the next index in a circular manner
        const nextIndex = (currentIndex + 1) % data?.data?.length

        // Scroll to the next item
        flatListRef.current?.scrollToIndex({
          index: nextIndex,
          animated: true,
        })

        // Update the currentIndex for the next iteration
        setCurrentIndex(nextIndex)
      }, 2000) // Change the interval time as needed (e.g., 5000 milliseconds for 5 seconds)

      return () => clearInterval(scrollInterval)
    }
  }, [currentIndex, data])

  const handleScroll = (event: any) => {
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent
    const scrollFraction =
      contentOffset.x / (contentSize.width - layoutMeasurement.width)
    setScrollWidth(scrollFraction * Dimensions.get('window').width)
  }

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
    // console.log(">>>>>>newLocations", newLocations);
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
    getLocations()
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
    const rs = await _fetch({
      method: 'PATCH',
      _url: `/user/ci-location`,
      body: { ci_location: selectedId },
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
                  style={{ color: textTheme, marginBottom: 20 }}
                >
                  What do you need help with?
                </Text>

                <FlatList
                  ref={flatListRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ marginBottom: 10 }}
                  data={data?.data}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={renderItem}
                  extraData={currentIndex}
                  onEndReached={() => {
                    // Handle the end of the list if needed
                  }}
                  snapToAlignment="start"
                  decelerationRate="fast"
                  pagingEnabled
                  onScroll={handleScroll}
                />
                <View
                  style={{
                    marginTop: 10,
                    height: 2,
                    // width: '100%',
                    backgroundColor: 'blue', // Set the color of your scroll indicator
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: scrollWidth,
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

              <View className="mt-6 mb-20">
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

              {/* <Modal visible={true} transparent={true}>
                <View style={styles.modalContainer}>
                  <View className="bg-white text-black w-[350px] mx-10 rounded-lg px-4 py-10 ">
                    <View>
                      <Text className="text-center text-base pb-2">
                        Select the city that you are currently in
                      </Text>

                      <SelectList
                        setSelected={(val) => setSelected(val)}
                        data={states}
                        save="value"
                        dropdownShown={false}
                      />
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
                      <TouchableOpacity className="bg-[#1E3A79] p-3 rounded-lg mt-2 w-1/2  ">
                        <Text className="text-white text-center">Save</Text>
                      </TouchableOpacity>

                      <TouchableOpacity className="border border-red-500 p-3 rounded-lg mt-2  w-1/2 ">
                        <Text className="text-red-600 text-center">Close</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal> */}
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
  },
})

export default LandingTest
