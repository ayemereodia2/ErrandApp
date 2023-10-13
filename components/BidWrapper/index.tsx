import { BottomSheetBackdrop, BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useCallback, useRef } from 'react'
import { ActivityIndicator, SafeAreaView, ScrollView, Text } from 'react-native'
import { useSelector } from 'react-redux'
import { HaggleComponent } from '../../components/MyBidDetails/HaggleDetail'
import { RootState } from '../../services/store'
import { Bids, Haggles, MarketData, SingleSubErrand } from '../../types'
import BeginErrandModal from '../Modals/Errands/BeginErrand'
import RejectErrandModal from '../Modals/Errands/RejectErrandModal'
import ErrandBid from '../MyBidDetails'

interface BidWrapperProp {
  userId: string
  errand: MarketData
  navigation: any
  toggleNegotiateModal: any
  toggleSuccessDialogue?: any
  singleSubErrand: SingleSubErrand
  setManageErrandClicked: React.Dispatch<React.SetStateAction<boolean>>
  setSubErrand: React.Dispatch<React.SetStateAction<SingleSubErrand>>
  loadingErrand: boolean
}
const BidWrapper = ({
  userId,
  errand,
  toggleNegotiateModal,
  navigation,
  toggleSuccessDialogue,
  setManageErrandClicked,
  setSubErrand,
  loadingErrand,
}: BidWrapperProp) => {
  const acceptBidRef = useRef<BottomSheetModal>(null)
  const beginErrandRef = useRef<BottomSheetModal>(null)
  const RejectErrandRef = useRef<BottomSheetModal>(null)

  const {
    data: currentUser,
    backgroundTheme,
    textTheme,
    landingPageTheme,
  } = useSelector((state: RootState) => state.currentUserDetailsReducer)
  const theme = currentUser?.preferred_theme === 'light' ? true : false

  const acceptPoints = ['40%']

  function toggleAcceptModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

  function toggleBeginErrandModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

  function toggleRejectErrandModal(open: boolean) {
    open
      ? RejectErrandRef.current?.present()
      : RejectErrandRef.current?.dismiss()
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
          toggleAcceptModal(false)
          toggleBeginErrandModal(false)
          toggleRejectErrandModal(false)
        }}
        // onChange={handleSheetChanges}
      />
    ),
    [],
  )

  let lastHaggle: Haggles = {
    id: '',
    source: '',
    created_at: '',
    amount: 0,
    description: '',
  }

  let currentBid: Bids = {
    id: '',
    description: '',
    errand_id: '',
    runner: {
      id: '',
      first_name: '',
      last_name: '',
      is_offline: false,
      profile_picture: '',
      phone: '',
      errands_completed: 0,
      rating: 0,
    },
    state: '',
    haggles: [],
    created_at: '',
    updated_at: '',
    amount: 0,
  }

  let otherHaggles: Haggles[] = []

  errand?.bids.map((bid, index) => {
    try {
      if (bid.runner.id === userId) {
        otherHaggles = bid.haggles

        lastHaggle = otherHaggles.slice(-1)[0]
        currentBid = bid

        if (otherHaggles.length < 2) {
          otherHaggles = []
        } else {
          otherHaggles?.pop()
        }

        if (otherHaggles.length > 0) {
          otherHaggles.reverse()
        }
      }
    } catch (e) {}
  })

  if (loadingErrand) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: backgroundTheme,
        }}
      >
        <ActivityIndicator size="large" color={theme ? 'blue' : 'white'} />
      </SafeAreaView>
    )
  }

  return (
    // <BottomSheetModalProvider>
    <SafeAreaView style={{ flex: 1 }} className="">
      {/* {loadingErrand ? (
        <View className="flex-row items-center justify-center mt-10">
          <ActivityIndicator color="blue" size="large" />
        </View>
      ) : ( */}
      <ScrollView scrollEventThrottle={16}>
        {errand?.bids.length === 0 && (
          <Text
            style={{ color: textTheme }}
            className="text-center pt-4 font-bold"
          >
            No Bids has been attached to the errand selected.
          </Text>
        )}

        {userId === errand.user_id && errand.status === 'open' && (
          <>
            {errand?.bids.map((bid: Bids) => {
              if (bid.state === 'rejected') {
                return null
              }
              let hags = bid.haggles
              let hag = {}
              hags.map((h) => {
                if (h.source === 'runner') {
                  hag = h
                }
              })

              return (
                <ErrandBid
                  bid={bid}
                  user_id={userId}
                  haggle={hag}
                  errand={errand}
                  navigation={navigation}
                  toggleAcceptModal={toggleAcceptModal}
                  toggleNegotiateModal={toggleNegotiateModal}
                  toggleSuccessDialogue={toggleSuccessDialogue}
                  setManageErrandClicked={setManageErrandClicked}
                  setSubErrand={setSubErrand}
                />
              )
            })}
          </>
        )}

        {userId === errand.user_id && errand.status === 'pending' && (
          <>
            {errand.bids.map((bid) => {
              if (bid.state === 'accepted') {
                let hags = bid.haggles
                let hag = hags[hags.length - 1]
                let runner = bid.runner

                return (
                  <ErrandBid
                    errand={errand}
                    bid={bid}
                    user_id={userId}
                    haggle={hag}
                    otherHaggles={otherHaggles}
                    setManageErrandClicked={setManageErrandClicked}
                    // setSearchedErrand={setSearchedErrand}
                  />
                )
              }
            })}
          </>
        )}

        {userId !== errand.user_id && errand.status === 'open' && (
          <>
            <HaggleComponent
              haggle={lastHaggle}
              last={true}
              bid={currentBid}
              errand={errand}
              user_id={userId}
              toggleSuccessDialogue={toggleSuccessDialogue}
              toggleNegotiateModal={toggleNegotiateModal}
              setManageErrandClicked={setManageErrandClicked}
            />
          </>
        )}

        {userId !== errand.user_id && errand.status === 'pending' && (
          <>
            {/* last haggle */}
            <HaggleComponent
              haggle={lastHaggle}
              last={true}
              bid={currentBid}
              errand={errand}
              user_id={userId}
              toggleSuccessDialogue={toggleSuccessDialogue}
              toggleNegotiateModal={toggleNegotiateModal}
              setManageErrandClicked={setManageErrandClicked}

              // setSearchedErrand={setSearchedErrand}
              // singleSubErrand={singleSubErrand}
            />
          </>
        )}

        {/* {userId !== errand.user_id && errand.status === 'open' && (
            <>
              {otherHaggles?.map((haggle) => {
                return (
                  <LastHaggle
                    bid={currentBid}
                    haggle={haggle}
                    errand={errand}
                    user_id={userId}
                    lastHaggle={lastHaggle}
                    toggleSuccessDialogue={toggleSuccessDialogue}
                  />
                )
              })}
            </>
          )} */}

        <BottomSheetModal
          ref={beginErrandRef}
          index={0}
          snapPoints={acceptPoints}
          backdropComponent={renderBackdrop}
        >
          <BeginErrandModal
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleBeginErrandModal={toggleBeginErrandModal}
            toggleRejectErrandModal={toggleRejectErrandModal}
            bid={errand.bids[0]}
            errand={errand}
            user_id={userId}
          />
        </BottomSheetModal>

        <BottomSheetModal
          ref={RejectErrandRef}
          index={0}
          snapPoints={['50%']}
          backdropComponent={renderBackdrop}
        >
          <RejectErrandModal
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleRejectErrandModal={toggleRejectErrandModal}
            bid={errand.bids[0]}
            errand={errand}
            user_id={userId}
            navigation={navigation}
            haggle={lastHaggle}
          />
        </BottomSheetModal>
      </ScrollView>
      {/* )} */}
    </SafeAreaView>
  )
}

export default BidWrapper
