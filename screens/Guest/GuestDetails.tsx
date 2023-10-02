import {
    AbrilFatface_400Regular,
    useFonts,
  } from '@expo-google-fonts/abril-fatface'
  import React, {
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
  } from 'react'
  
  // import AppLoading from 'expo-app-loading';
  import {
    Entypo,
    FontAwesome,
    Ionicons,
    MaterialIcons,
  } from '@expo/vector-icons'
  import {
    BottomSheetModal,
    BottomSheetModalProvider,
  } from '@gorhom/bottom-sheet'
  import AsyncStorage from '@react-native-async-storage/async-storage'
  import {
    ActivityIndicator,
    SafeAreaView,
    ScrollView,
    Text,
    TouchableNativeFeedback,
    TouchableOpacity,
    View,
  } from 'react-native'
  import { useSelector } from 'react-redux'
  import PlaceBidModal from '../../components/Modals/Errands/PlaceBidModal'
  import { ProfileInitials } from '../../components/ProfileInitials'
  import { userDetails } from '../../services/auth/userInfo'
  import { RootState, useAppDispatch } from '../../services/store'
  import { formatDate } from '../../utils/helper'
  
  export default function GuestDetails({ route, navigation }: any) {
    const dispatch = useAppDispatch()
    const [showBid, setShowBid] = useState(false)
    const bottomSheetRef = useRef<BottomSheetModal>(null)
    const snapPoints = useMemo(() => ['63%'], [])
    const [userId, setUserId] = useState('')
    const [showBidBtn, setShowBidBtn] = useState(true)
  
    function openPlaceBid() {
      bottomSheetRef.current?.present()
    }
  
    function closePlaceBid() {
      bottomSheetRef.current?.dismiss()
    }
  
    const { errand_id, user_id } = route.params
  
    let [fontsLoaded] = useFonts({
      AbrilFatface_400Regular,
    })
  
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
  
    // const reachedScreen = async () => {
    //   await AsyncStorage.setItem("errandDetail")
    // }
  
    useLayoutEffect(() => {
      navigation.setOptions({
        headerShown: true,
        headerStyle: { backgroundColor: '#F8F9FC' },
        title: 'Errand Details',
      })
    }, [navigation])
  
    useEffect(() => {
      navigation
        .getParent()
        ?.setOptions({ tabBarStyle: { display: 'none' }, tabBarVisible: false })
      return () =>
        navigation
          .getParent()
          ?.setOptions({ tabBarStyle: undefined, tabBarVisible: undefined })
    }, [navigation])
  
    const getUserId = async () => {
      const userId = (await AsyncStorage.getItem('user_id')) || ''
      setUserId(userId)
    }
  
    useEffect(() => {
      getUserId()
      // dispatch(errandDetails({ errandId: errand_id }))
      // dispatch(userDetails({ user_id }))
    }, [])
  
    if (!fontsLoaded) {
      return (
        <View>
          <Text>Loading ...</Text>
        </View>
      )
    } else {
      return (
        <BottomSheetModalProvider>
          <SafeAreaView style={{ flex: 1 }} className="bg-[#F8F9FC]">
            <ScrollView
              scrollEventThrottle={16}
              className={!showBidBtn ? 'mb-10' : ''}
            >
              <TouchableNativeFeedback
                onPress={() => {
                  setShowBidBtn(true)
                  closePlaceBid()
                }}
              >
                <View>
                  {loading ? (
                    <View>
                      <ActivityIndicator size={'large'} />
                    </View>
                  ) : (
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
                              <Text className="text-center text-base font-semibold">
                                {user?.first_name} {user?.last_name}
                              </Text>
                              <MaterialIcons
                                name="verified"
                                color="green"
                                size={20}
                              />
                            </View>
                            <Text className="text-[#555555] text-center py-2 text-base font-semibold">
                              Swave User
                            </Text>
                            <View className="flex-row items-center">
                              {/* {showStars(data.rating)} */}
                              <Text>
                                {user?.rating}{' '}
                                <Entypo name="star" size={16} color="#FBB955" />{' '}
                              </Text>
                              <Text className="text-[#6D6D6D] text-sm">
                                ( {user?.errands_completed}{' '}
                                {user.errands_completed > 1
                                  ? 'errands'
                                  : 'errand'}{' '}
                                Completed)
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>
  
                      <View className="pt-6 ">
                        <Text className=" font-bold text-base text-[#555555]">
                          Description
                        </Text>
                        <Text className="text-sm pt-1 text-[#383737] font-light">
                          {errand.description}
                        </Text>
                      </View>
  
                      <View className="pt-6 ">
                        <Text className=" font-bold text-base text-[#555555]">
                          Budget
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
                          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
                            Status
                          </Text>
  
                          <Text className="capitalize font-semibold">
                            {errand?.status}
                          </Text>
                        </View>
  
                        <View className="space-x-2 flex-row mt-6">
                          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
                            Duration
                          </Text>
                          <Text className=" text-sm text-[#000] w-60 font-semibold">
                            <Ionicons
                              name="calendar-outline"
                              size={18}
                              color="black"
                            />{' '}
                            {formatDate(errand.expiry_date)}
                          </Text>
                        </View>
  
                        <View className="space-x-2 flex-row mt-6">
                          <Text className=" text-[14px] text-[#999999] w-28 font-medium">
                            Location
                          </Text>
                          <Text className=" text-sm text-[#000] w-60 font-semibold">
                            From Road 1, ikota shopping complex, Ajah, lagos. To
                            No. 126, Mende, Maryland, Lagos
                          </Text>
                        </View>
  
                        <View className="space-x-6 mt-6 flex-row">
                          <Text className=" text-[14px] text-[#999999] font-medium pb-2">
                            Requirements
                          </Text>
                          <View className="flex-row space-x-3 w-60">
                            {errand?.restriction && (
                              <View className="w-20 h-[24px] bg-[#DAE1F1] justify-center  border-[#3F60AC] border rounded-2xl">
                                <Text className="text-center text-[#3F60AC] text-xs">
                                  <FontAwesome
                                    name="check-circle"
                                    size={12}
                                    color={'#3F60AC'}
                                  />{' '}
                                  Insurance
                                </Text>
                              </View>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  )}
  
                  <Text className="p-4 px-6 mt-8 font-bold text-base text-[#555555]">
                    Existing Bids
                  </Text>
  
                  {errand.bids.length === 0 && (
                    <Text className="p-4 px-6 text-base text-[#555555]">
                      No existing bids yet
                    </Text>
                  )}
  
                  {errand.bids.map((bid) => {
                    return (
                      <View className=" shadow-2xl mx-3 p-3 rounded-lg mt-4 ">
                        <View className="flex-row space-x-4">
                          <ProfileInitials
                            textClass="text-white text-2xl"
                            firstName={bid?.runner?.first_name}
                            lastName={bid?.runner?.last_name}
                            className="w-14 h-14 bg-[#616161] rounded-full text-lg"
                          />
                          <View className="flex-row justify-between items-center">
                            <View className="">
                              <Text className="text-[#000000] text-sm font-bold">
                                {bid?.runner.first_name} {bid?.runner.last_name}
                              </Text>
                              <Text className="text-sm font-semibold">
                                1.5
                                <Text className="text-[14px] text-[#777777] font-medium">
                                  {' '}
                                  <Entypo
                                    name="star"
                                    size={16}
                                    color="#FBB955"
                                  />{' '}
                                  ({/* {sender.errands_completed} */}1 Errands
                                  Completed)
                                </Text>
                              </Text>
                            </View>
                          </View>
                        </View>
  
                        <Text className="text-sm pt-1 text-[#444444] font-light">
                          {bid.description}
                        </Text>
                        <View className="flex-row items-center mt-2">
                          <View className="bg-[#FEE1CD] rounded-2xl py-2 px-3 mt-2 ">
                            <Text className="text-[#642B02] text-base font-bold">
                              &#x20A6;{' '}
                              {(bid?.haggles[0].amount / 100).toLocaleString()}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )
                  })}
                </View>
              </TouchableNativeFeedback>
  
              <BottomSheetModal
                ref={bottomSheetRef}
                index={0}
                snapPoints={snapPoints}
                containerStyle={{ marginHorizontal: 10 }}
              >
                <PlaceBidModal
                  owner={owner}
                  errand={errand}
                  navigation={navigation}
                />
              </BottomSheetModal>
            </ScrollView>
  
            {showBidBtn && (
              <>
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
                      Place Your Bid
                    </Text>
                  </TouchableOpacity>
                ) : (
                  ''
                )}
              </>
            )}
          </SafeAreaView>
        </BottomSheetModalProvider>
      )
    }
  }
  