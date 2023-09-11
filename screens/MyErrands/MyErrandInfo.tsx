import { Entypo, MaterialIcons } from '@expo/vector-icons'
import {
  BottomSheetModal,
  BottomSheetModalProvider
} from '@gorhom/bottom-sheet'
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useRef, useState } from 'react'
import { Text, TouchableOpacity, useWindowDimensions, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useSelector } from 'react-redux'
import BidWrapper from '../../components/BidWrapper'
import NegotiateBid from '../../components/Modals/Bids/Negotiate'
import { SuccessDialogue } from '../../components/Modals/Success/SuccessDialogue'
import MyErrandDetails from '../../components/MyErrandDetails'
import MyErrandToggle from '../../components/MyErrandToggle'
import { ProfileInitials } from '../../components/ProfileInitials'
import Timeline from '../../components/Timeline'
import { RootState } from '../../services/store'
import { SingleSubErrand } from '../../types'

const MyErrandInfo = ({ navigation }: any) => {
  const [userId, setUserId] = useState('')
  const negotiateRef = useRef<BottomSheetModal>(null)
  const successDialogueRef = useRef<BottomSheetModal>(null)
  const acceptBidRef = useRef<BottomSheetModal>(null)

  const [subErrand, setSubErrand] = useState<SingleSubErrand>({
    id: '',
    original_errand_id: '',
    sender_id: '',
    runner_id: '',
    amount: 0,
    timeline: {
      id: '',
      errand_id: '',
      updates: [],
      created_at: '',
      updated_at: '',
    },
    status: '',
    cancellation_reason: '',
    created_at: '',
    updated_at: '',
  })

  const [selectedTab, setSelectedItem] = useState('details')
  const layout = useWindowDimensions()

  const { data: user, loading } = useSelector(
    (state: RootState) => state.userDetailsReducer,
  )

  const { data: errand } = useSelector(
    (state: RootState) => state.errandDetailsReducer,
  )

  const snapPoints = ['55%']
  const successPoints = ['30%']
  const acceptPoints = ['40%']

  function toggleNegotiateModal(open: boolean) {
    open ? negotiateRef.current?.present() : negotiateRef.current?.dismiss()
  }

  function toggleSuccessDialogue(open: boolean) {
    open
      ? successDialogueRef.current?.present()
      : successDialogueRef.current?.dismiss()
  }

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
  }, [user, negotiateRef, successDialogueRef])

  return (
    <>
      {errand?.status === 'active' || errand?.status === 'completed' ? (
        <KeyboardAwareScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          enableOnAndroid={true}
          extraScrollHeight={30}
        >
          <Timeline
            errand={errand}
            user_id={userId}
            singleSubErrand={subErrand}
          />
        </KeyboardAwareScrollView>
      ) : (
        <BottomSheetModalProvider>
          <ScrollView className="px-3">
            {/* // errand details and bid screen */}
            <View>
              <MyErrandToggle
                selectedTab={selectedTab}
                setSelectedItem={setSelectedItem}
              />

              {selectedTab === 'details' && (
                <MyErrandDetails errand={errand} user_id={userId} />
              )}
              {selectedTab === 'bids' && (
                <BidWrapper
                  errand={errand}
                  userId={userId}
                  navigation={navigation}
                  toggleNegotiateModal={toggleNegotiateModal}
                  toggleSuccessDialogue={toggleSuccessDialogue}
                />
              )}
            </View>
            {/* Negotiate bid modal */}
            <BottomSheetModal
              ref={negotiateRef}
              index={0}
              snapPoints={snapPoints}
            >
              <NegotiateBid
                bid={errand.bids[0]}
                owner={user}
                errand={errand}
                navigation={navigation}
                user_id={userId}
                toggleNegotiateModal={toggleNegotiateModal}
                toggleSuccessDialogue={toggleSuccessDialogue}
              />
            </BottomSheetModal>

            {/* success Dialogue */}
            <BottomSheetModal
              ref={successDialogueRef}
              index={0}
              snapPoints={successPoints}
            >
              <SuccessDialogue
                toggleSuccessDialogue={toggleSuccessDialogue}
                toggleNegotiateModal={toggleNegotiateModal}
              />
            </BottomSheetModal>
          </ScrollView>
        </BottomSheetModalProvider>
      )}
    </>
  )
}

export default MyErrandInfo
