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
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { useSelector } from 'react-redux'
import PlaceBidModal from '../../components/Modals/Errands/PlaceBidModal'
import { ProfileInitials } from '../../components/ProfileInitials'
import { userDetails } from '../../services/auth/userInfo'
import { RootState, useAppDispatch } from '../../services/store'
import { formatDate } from '../../utils/helper'

export default function ErrandDetails({ route, navigation }: any) {
  const dispatch = useAppDispatch()
  const [showBid, setShowBid] = useState(false)
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const snapPoints = useMemo(() => ['48%', '65%'], [])
  const [userId, setUserId] = useState('')

  function openPlaceBid() {
    bottomSheetRef.current?.present()
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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Details',
      headerRight: () => (
        <TouchableOpacity
          className="bg-[#3F60AC] h-6 w-16 flex-row justify-center items-center rounded-lg"
          onPress={() => {
            openPlaceBid()
            dispatch(userDetails({ user_id: userId }))
          }}
        >
          <Text className="text-white text-xs">Bid</Text>
        </TouchableOpacity>
      ),
    })
  }, [])

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
        <SafeAreaView style={{ flex: 1 }} className="">
          <ScrollView scrollEventThrottle={16}>
            {loading ? (
              <View>
                <ActivityIndicator size={'large'} />
              </View>
            ) : (
              <View className="p-4">
                <View className="">
                  <View className="items-center justify-center">
                    <ProfileInitials
                      firstName={user.first_name}
                      lastName={user.last_name}
                      className="w-12 h-12 bg-[#616161] rounded-full text-xl"
                    />

                    <View className="pt-2">
                      <Text className="text-center">
                        {user?.first_name} {user?.last_name}
                      </Text>
                      <View className="flex items-center space-x-2">
                        <Text>{user?.rating}</Text>
                        {/* {showStars(data.rating)} */}
                        <Text className="text-[#6D6D6D] text-sm">
                          ({user?.errands_completed}{' '}
                          {user.errands_completed > 1 ? 'errands' : 'errand'}{' '}
                          Completed)
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                <View className="pt-6">
                  <Text className=" font-medium">Description</Text>
                  <Text className="text-sm pt-1 text-[#383737] border-[0.4px]">
                    {errand.description}
                  </Text>
                </View>

                <View className="pt-6">
                  <Text className=" font-medium">Status</Text>
                  <Text className="text-sm pt-1 text-[#383737] border-[0.4px]">
                    {errand.status}
                  </Text>
                </View>

                <View className="pt-4">
                  <Text className=" font-medium">Category</Text>
                  <Text className="text-sm pt-1 text-[#383737] border-[0.4px]">
                    {errand?.category.name}
                  </Text>
                </View>

                <Text className="pt-4 font-medium ">
                  Budget{' '}
                  <Text className="text-[#b2b1b1]">
                    (this includes all cost of running the errand)
                  </Text>{' '}
                </Text>
                <Text className="text-sm pt-1 text-[#383737]">
                  {' '}
                  &#x20A6; {budgetInNaira.toLocaleString()}
                </Text>

                <Text className="pt-4 t font-medium">Deadline</Text>
                <Text className="text-sm pt-1 ext-[#383737]">
                  {formatDate(errand.expiry_date)}
                </Text>

                <Text className="pt-4 font-medium">Location</Text>
                <Text className="text-sm pt-1 text-[#383737]">
                  From Road 1, ikota shopping complex, Ajah, lagos. To No. 126,
                  Mende, Maryland, Lagos
                </Text>
              </View>
            )}

            <View className="h-[0.4px] bg-slate-400"></View>

            <Text className="font-semibold text-base px-3 pt-4">
              Existing Bids
            </Text>

            {errand.bids.map((bid) => {
              return (
                <View className="border-[0.4px] border-[#ccc] shadow-2xl mx-3 p-3 rounded-lg mt-4 ">
                  <View className="flex-row justify-between mt-4">
                    <View className="flex-row space-x-2">
                      <ProfileInitials
                        firstName={bid?.runner?.first_name}
                        lastName={bid?.runner?.last_name}
                      />
                      <View className="">
                        <Text className="text-sm">
                          {' '}
                          {bid?.runner.first_name} {bid?.runner.last_name}
                        </Text>
                        <Text className="text-[#6D6D6D] text-xs">
                          ({bid?.runner.errands_completed}{' '}
                          {bid?.runner.errands_completed > 1
                            ? 'errands'
                            : 'errand'}{' '}
                          Completed)
                        </Text>
                        <Text className=" w-60 text-sm pt-1">
                          {bid.description}
                        </Text>
                      </View>
                    </View>

                    <Text>
                      {' '}
                      &#x20A6; {(bid?.haggles[0].amount / 100).toLocaleString()}
                    </Text>
                  </View>
                </View>
              )
            })}

            <BottomSheetModal
              ref={bottomSheetRef}
              index={0}
              snapPoints={snapPoints}
            >
              <PlaceBidModal
                owner={owner}
                errand={errand}
                navigation={navigation}
              />
            </BottomSheetModal>
          </ScrollView>
        </SafeAreaView>
      </BottomSheetModalProvider>
    )
  }
}
