import { BottomSheetModal } from '@gorhom/bottom-sheet'
import React, { useRef } from 'react'
import { SafeAreaView, ScrollView, Text } from 'react-native'
import { HaggleComponent } from '../../components/MyBidDetails/HaggleDetail'
import { Bids, Haggles, MarketData } from '../../types'
import BeginErrandModal from '../Modals/Errands/BeginErrand'
import ErrandBid from '../MyBidDetails'

interface BidWrapperProp {
  userId: string
  errand: MarketData
  navigation: any
  toggleNegotiateModal: any
  toggleSuccessDialogue?: any
}
const BidWrapper = ({
  userId,
  errand,
  toggleNegotiateModal,
  navigation,
  toggleSuccessDialogue,
}: BidWrapperProp) => {
  const acceptBidRef = useRef<BottomSheetModal>(null)
  const beginErrandRef = useRef<BottomSheetModal>(null)

  const acceptPoints = ['40%']

  function toggleAcceptModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

  function toggleBeginErrandModal(open: boolean) {
    open ? acceptBidRef.current?.present() : acceptBidRef.current?.dismiss()
  }

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

  console.log('>>>>>bid', userId, errand.total_bids, errand.status)

  return (
    // <BottomSheetModalProvider>
    <SafeAreaView style={{ flex: 1 }} className="">
      <ScrollView scrollEventThrottle={16}>
        {errand?.bids.length === 0 && (
          <Text>No Bids has been attached to the errand selected.</Text>
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

                console.log('>>>haggle', hag.source)

                return (
                  <ErrandBid
                    errand={errand}
                    bid={bid}
                    user_id={userId}
                    haggle={hag}
                    otherHaggles={otherHaggles}
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
              // toggleBeginErrandModal={toggleB}

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
        >
          <BeginErrandModal
            toggleSuccessDialogue={toggleSuccessDialogue}
            toggleBeginErrandModal={toggleBeginErrandModal}
            bid={errand.bids[0]}
            errand={errand}
            user_id={userId}
          />
        </BottomSheetModal>
      </ScrollView>
    </SafeAreaView>
  )
}

export default BidWrapper
