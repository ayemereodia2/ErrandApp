import { MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import BidWrapper from '../../components/BidWrapper'
import MyErrandDetails from '../../components/MyErrandDetails'
import { ProfileInitials } from '../../components/ProfileInitials'
import { RootState } from '../../services/store'

const MyErrandInfo = ({ navigation }: any) => {
  const [userId, setUserId] = useState('')
  const bottomSheetRef = useRef<BottomSheetModal>(null)
  const [selectedTab, setSelectedItem] = useState('details')
  const layout = useWindowDimensions()

  const { data: user, loading } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const snapPoints = ['50%']

  function openBidModal() {
    bottomSheetRef.current?.present()
  }

  console.log('>>>>>>', errand.status, errand.bids)

  const getUserId = async () => {
    const userId = (await AsyncStorage.getItem('user_id')) || ''
    setUserId(userId)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Errand Details',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('Errands')}>
          <MaterialIcons name="arrow-back-ios" color={'white'} size={20} />
        </TouchableOpacity>
      ),
      headerTitle: () => (
        <View className="flex-row items-center space-x-2">
          {/* <Image
            source={require('../../assets/images/timothy.jpg')}
            style={{ width: 30, height: 30, borderRadius: 50, marginRight: 20 }}
          /> */}

          {loading ? (
            <Text>loading....</Text>
          ) : (
            <ProfileInitials
              firstName={user?.first_name}
              lastName={user?.last_name}
            />
          )}

          <Text className="text-white ">
            {user?.first_name} {user?.last_name}
          </Text>
        </View>
      ),
    })
    getUserId()
  }, [user])

  return (
    <BottomSheetModalProvider>
      <ScrollView className="px-3">
        {/* <SafeAreaView className='px-3'> */}
        <View className="w-full border-[#243763] border-[0.6px] h-10 flex-row mt-6">
          <View
            className={`${
              selectedTab === 'details' ? 'bg-[#243763] text-white' : 'bg-white'
            }  w-1/2 justify-center items-center text-sm cursor-pointer`}
          >
            <TouchableOpacity onPress={() => setSelectedItem('details')}>
              <Text
                className={
                  selectedTab === 'details' ? 'text-white' : 'text-[#243763]'
                }
              >
                Errand Details
              </Text>
            </TouchableOpacity>
          </View>

          <View
            className={`${
              selectedTab === 'bids' ? 'bg-[#243763] text-white' : 'bg-white'
            } w-1/2 text-sm justify-center items-center cursor-pointer`}
          >
            <TouchableOpacity onPress={() => setSelectedItem('bids')}>
              <Text
                className={
                  selectedTab === 'bids' ? 'text-white' : 'text-[#243763]'
                }
              >
                Bids
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedTab === 'details' && <MyErrandDetails errand={errand} />}
        {selectedTab === 'bids' && (
          <BidWrapper
            errand={errand}
            userId={userId}
            navigation={navigation}
            openBidModal={openBidModal}
          />
        )}

        <BottomSheetModal
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
        >
          {/* <NegotiateBid
            owner={owner}
            errand={errand}
            navigation={navigation}
          /> */}
        </BottomSheetModal>

        {/* </SafeAreaView> */}
      </ScrollView>
    </BottomSheetModalProvider>
  )
}

export default MyErrandInfo
